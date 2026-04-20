/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card, Row, Col, Table, Tag, Typography } from "antd";
import PageHeader from "@/components/ui/PageHeader";
import KpiCard from "@/components/ui/KpiCard";
import { DollarOutlined, CheckCircleOutlined, WarningOutlined, SyncOutlined, RiseOutlined, BarChartOutlined } from "@ant-design/icons";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, FunnelChart, Funnel, LabelList,
} from "recharts";
import {
  analysisSalesFunnel, analysisBookingVelocity, analysisRevenueByProject,
  analysisPlotAbsorption, analysisCollectionTrend, mockRMs, formatCurrency,
} from "@/lib/mockData";

const { Text } = Typography;

const CHART_COLORS = ["#16a34a", "#34d399", "#10b981", "#f59e0b", "#ef4444", "#10b981"];
const PIE_COLORS = ["#16a34a", "#10b981", "#10b981"];

const tooltipStyle = {
  contentStyle: { background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 8, color: "#0f172a" },
  labelStyle: { color: "#475569" },
};

export default function AnalysisPage() {
  const rmLeaderboard = [...mockRMs]
    .filter((r) => r.status === "Active")
    .sort((a, b) => b.revenue - a.revenue);

  const leaderColumns = [
    { title: "#", key: "rank", width: 40, render: (_: any, __: any, i: number) => <span style={{ color: i === 0 ? "#f59e0b" : "#475569", fontWeight: 700 }}>{i + 1}</span> },
    { title: "RM", dataIndex: "rm_name", key: "n", render: (v: string) => <span style={{ color: "#0f172a", fontWeight: 600 }}>{v}</span> },
    { title: "Leads", dataIndex: "leads_assigned", key: "l", align: "center" as const },
    { title: "Bookings", dataIndex: "bookings_closed", key: "b", align: "center" as const, render: (v: number) => <Tag color="blue">{v}</Tag> },
    { title: "Revenue", dataIndex: "revenue", key: "r", align: "right" as const, render: (v: number) => <span style={{ color: "#10b981", fontWeight: 600 }}>{formatCurrency(v)}</span> },
    { title: "Conversion", key: "conv", align: "center" as const, render: (_: any, r: any) => <Tag color="purple">{Math.round((r.bookings_closed / r.leads_assigned) * 100)}%</Tag> },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Analysis & Performance"
        breadcrumbs={[{ label: "Home", href: "/dashboard" }, { label: "Analysis" }]}
      />

      {/* KPI Row */}
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col xs={12} md={6}><KpiCard title="Total Revenue" value="₹16.2 Cr" icon={<DollarOutlined />} color="#16a34a" trend={{ value: 18, up: true }} /></Col>
        <Col xs={12} md={6}><KpiCard title="Collection Rate" value="77%" icon={<CheckCircleOutlined />} color="#10b981" trend={{ value: 5, up: true }} /></Col>
        <Col xs={12} md={6}><KpiCard title="Overdue Amount" value="₹17.5L" icon={<WarningOutlined />} color="#ef4444" trend={{ value: 3, up: false }} /></Col>
        <Col xs={12} md={6}><KpiCard title="Last Tally Sync" value="2h ago" icon={<SyncOutlined />} color="#34d399" subtitle="43 records synced" /></Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Sales Funnel */}
        <Col xs={24} lg={12}>
          <Card title={<span style={{ color: "#0f172a" }}>Sales Funnel</span>}>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={analysisSalesFunnel} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#475569" />
                <YAxis type="category" dataKey="stage" stroke="#475569" width={90} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                  {analysisSalesFunnel.map((_, i) => <Cell key={i} fill={CHART_COLORS[i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Booking Velocity */}
        <Col xs={24} lg={12}>
          <Card title={<span style={{ color: "#0f172a" }}>Booking Velocity</span>}>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={analysisBookingVelocity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#475569" />
                <YAxis stroke="#475569" />
                <Tooltip {...tooltipStyle} />
                <Line type="monotone" dataKey="bookings" stroke="#16a34a" strokeWidth={3} dot={{ fill: "#16a34a", r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Revenue by Project */}
        <Col xs={24} lg={12}>
          <Card title={<span style={{ color: "#0f172a" }}>Revenue by Project (₹ Cr)</span>}>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={analysisRevenueByProject}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="project" stroke="#475569" tick={{ fontSize: 11 }} />
                <YAxis stroke="#475569" />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                  {analysisRevenueByProject.map((_, i) => <Cell key={i} fill={CHART_COLORS[i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Plot Absorption */}
        <Col xs={24} lg={12}>
          <Card title={<span style={{ color: "#0f172a" }}>Plot Absorption</span>}>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={analysisPlotAbsorption}
                  cx="50%" cy="50%"
                  innerRadius={70} outerRadius={110}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {analysisPlotAbsorption.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
                <Tooltip {...tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Collection Trend */}
        <Col xs={24} lg={12}>
          <Card title={<span style={{ color: "#0f172a" }}>Collection vs Due (₹ Lakhs)</span>}>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={analysisCollectionTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#475569" />
                <YAxis stroke="#475569" />
                <Tooltip {...tooltipStyle} />
                <Area type="monotone" dataKey="due" stroke="#ef4444" fill="#ef444420" strokeWidth={2} />
                <Area type="monotone" dataKey="collected" stroke="#10b981" fill="#10b98120" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* RM Leaderboard */}
        <Col xs={24} lg={12}>
          <Card title={<span style={{ color: "#0f172a" }}>RM Leaderboard</span>}>
            <Table columns={leaderColumns} dataSource={rmLeaderboard} rowKey="id" pagination={false} size="small" />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
