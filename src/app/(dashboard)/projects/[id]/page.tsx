/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card, Row, Col, Descriptions, Table, Tag, Progress, Typography, Tabs, Timeline, Avatar, Space } from "antd";
import {
  AppstoreOutlined, CheckCircleOutlined, DollarOutlined, TeamOutlined,
  FileTextOutlined, CalendarOutlined, EnvironmentOutlined, ClockCircleOutlined,
  WarningOutlined, RiseOutlined,
} from "@ant-design/icons";
import { use } from "react";
import PageHeader from "@/components/ui/PageHeader";
import StatusTag from "@/components/ui/StatusTag";
import KpiCard from "@/components/ui/KpiCard";
import { mockProjects, mockPlots, mockBookings, mockRMs, formatCurrency, formatCurrencyFull } from "@/lib/mockData";

const { Text, Title } = Typography;

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = mockProjects.find((p) => p.id === id) || mockProjects[0];

  // Derived data
  const projectPlots = mockPlots.filter((p) => p.project_id === project.id);
  const projectBookings = mockBookings.filter((b) => b.project_id === project.id);
  const availablePlots = projectPlots.filter((p) => p.status === "Available");
  const bookedPlots = projectPlots.filter((p) => p.status === "Booked");
  const registeredPlots = projectPlots.filter((p) => p.status === "Registered");

  const totalRevenue = projectBookings.reduce((s, b) => s + b.final_value, 0);
  const totalCollected = projectBookings.filter((b) => b.booking_status === "Completed").reduce((s, b) => s + b.final_value, 0);
  const activeBookings = projectBookings.filter((b) => b.booking_status === "Payment In Progress" || b.booking_status === "Booked");
  const completedBookings = projectBookings.filter((b) => b.booking_status === "Completed");

  const absorptionPct = project.total_plots > 0
    ? Math.round(((project.booked_plots + project.registered_plots) / project.total_plots) * 100)
    : 0;

  // Unique RMs for this project
  const projectRMNames = [...new Set(projectBookings.map((b) => b.assigned_rm))];
  const projectRMs = mockRMs.filter((rm) => projectRMNames.includes(rm.rm_name));

  // Plot status breakdown for mini chart
  const plotBreakdown = [
    { label: "Available", count: project.available_plots, color: "#10b981" },
    { label: "Booked", count: project.booked_plots, color: "#16a34a" },
    { label: "Registered", count: project.registered_plots, color: "#10b981" },
    { label: "On Hold", count: project.total_plots - project.available_plots - project.booked_plots - project.registered_plots, color: "#f59e0b" },
  ].filter((b) => b.count > 0);

  const plotColumns = [
    { title: "Plot #", dataIndex: "plot_number", key: "pn", render: (v: string) => <span style={{ color: "#22c55e", fontWeight: 600 }}>{v}</span> },
    { title: "Sector", dataIndex: "sector", key: "sec", width: 80, align: "center" as const },
    { title: "Area (sqyd)", dataIndex: "plot_area", key: "area", align: "right" as const },
    { title: "Facing", dataIndex: "facing", key: "f", render: (v: string) => <Tag>{v}</Tag> },
    { title: "Type", dataIndex: "plot_type", key: "t", render: (v: string) => <Tag color={v === "Commercial" ? "orange" : "cyan"}>{v}</Tag> },
    { title: "Rate/sqyd", dataIndex: "rate_per_unit", key: "r", align: "right" as const, render: (v: number) => `₹${v.toLocaleString("en-IN")}` },
    { title: "Total Value", dataIndex: "total_value", key: "tv", align: "right" as const, render: (v: number) => <span style={{ fontWeight: 600 }}>{formatCurrencyFull(v)}</span> },
    { title: "Status", dataIndex: "status", key: "s", render: (v: string) => <StatusTag status={v} /> },
  ];

  const bookingColumns = [
    { title: "Booking #", dataIndex: "booking_number", key: "bn", render: (v: string, r: any) => <a style={{ color: "#22c55e", fontWeight: 600 }} href={`/bookings/${r.id}`}>{v}</a> },
    { title: "Customer", dataIndex: "customer_name", key: "c" },
    { title: "Plot", dataIndex: "plot_number", key: "pl", render: (v: string) => <Tag>{v}</Tag> },
    { title: "Plan", dataIndex: "payment_plan_type", key: "ppt", render: (v: string) => <Tag color={v === "Down Payment" ? "cyan" : "geekblue"}>{v}</Tag> },
    { title: "Value", dataIndex: "final_value", key: "fv", align: "right" as const, render: (v: number) => <span style={{ fontWeight: 600 }}>{formatCurrency(v)}</span> },
    { title: "RM", dataIndex: "assigned_rm", key: "rm" },
    { title: "Status", dataIndex: "booking_status", key: "s", render: (v: string) => <StatusTag status={v} /> },
  ];

  const descStyle = { color: "#475569", background: "#f8fafc" };
  const contStyle = { color: "#0f172a", background: "#ffffff" };

  const tabItems = [
    {
      key: "plots",
      label: <span><AppstoreOutlined /> Plots ({projectPlots.length})</span>,
      children: (
        <Table
          columns={plotColumns}
          dataSource={projectPlots}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          size="small"
        />
      ),
    },
    {
      key: "bookings",
      label: <span><FileTextOutlined /> Bookings ({projectBookings.length})</span>,
      children: projectBookings.length > 0 ? (
        <Table
          columns={bookingColumns}
          dataSource={projectBookings}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          size="small"
        />
      ) : (
        <div style={{ color: "#475569", textAlign: "center", padding: 40 }}>No bookings for this project yet.</div>
      ),
    },
    {
      key: "rms",
      label: <span><TeamOutlined /> RMs ({projectRMs.length})</span>,
      children: projectRMs.length > 0 ? (
        <Row gutter={[16, 16]}>
          {projectRMs.map((rm) => {
            const rmBookings = projectBookings.filter((b) => b.assigned_rm === rm.rm_name);
            const rmRevenue = rmBookings.reduce((s, b) => s + b.final_value, 0);
            return (
              <Col xs={24} sm={12} lg={8} key={rm.id}>
                <Card styles={{ body: { padding: 20 } }}>
                  <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 16 }}>
                    <Avatar size={44} style={{ background: "#16a34a" }}>
                      {rm.rm_name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </Avatar>
                    <div>
                      <Text style={{ color: "#0f172a", fontWeight: 600, display: "block" }}>{rm.rm_name}</Text>
                      <Text style={{ color: "#475569", fontSize: 12 }}>{rm.designation}</Text>
                    </div>
                  </div>
                  <Row gutter={[8, 8]}>
                    <Col span={12}>
                      <div style={{ background: "#f8fafc", borderRadius: 8, padding: "10px 12px", textAlign: "center" }}>
                        <div style={{ color: "#34d399", fontSize: 18, fontWeight: 700 }}>{rmBookings.length}</div>
                        <div style={{ color: "#475569", fontSize: 11 }}>Bookings</div>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div style={{ background: "#f8fafc", borderRadius: 8, padding: "10px 12px", textAlign: "center" }}>
                        <div style={{ color: "#10b981", fontSize: 18, fontWeight: 700 }}>{formatCurrency(rmRevenue)}</div>
                        <div style={{ color: "#475569", fontSize: 11 }}>Revenue</div>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : (
        <div style={{ color: "#475569", textAlign: "center", padding: 40 }}>No RMs assigned to this project yet.</div>
      ),
    },
    {
      key: "timeline",
      label: <span><ClockCircleOutlined /> Timeline</span>,
      children: (
        <Timeline
          items={[
            { color: "blue", children: <Text style={{ color: "#0f172a" }}>Project created — {project.created_at}</Text> },
            { color: project.approval_status === "Approved" ? "green" : "gold", children: <Text style={{ color: "#0f172a" }}>{project.approval_status === "Approved" ? "Project approved by Manager" : "Awaiting approval..."}</Text> },
            { color: "blue", children: <Text style={{ color: "#0f172a" }}>Development started — {project.project_start_date}</Text> },
            ...(projectBookings.length > 0 ? [{ color: "green" as const, children: <Text style={{ color: "#0f172a" }}>First booking: {projectBookings[projectBookings.length - 1]?.booking_number} on {projectBookings[projectBookings.length - 1]?.booking_date}</Text> }] : []),
            ...(completedBookings.length > 0 ? [{ color: "green" as const, children: <Text style={{ color: "#0f172a" }}>{completedBookings.length} booking(s) completed — {formatCurrency(totalCollected)} collected</Text> }] : []),
            { color: "gray", children: <Text style={{ color: "#475569" }}>Expected possession — {project.expected_possession_date}</Text> },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title={project.project_name}
        breadcrumbs={[
          { label: "Home", href: "/dashboard" },
          { label: "Projects", href: "/projects" },
          { label: project.project_name },
        ]}
      />

      {/* Project Header Card */}
      <Card style={{ marginBottom: 20 }}>
        <Row gutter={[24, 16]} align="middle">
          <Col flex="auto">
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: "linear-gradient(135deg, #16a34a 0%, #10b981 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, fontWeight: 700, color: "white",
              }}>
                {project.project_code}
              </div>
              <div>
                <Title level={4} style={{ color: "#0f172a", margin: 0 }}>{project.project_name}</Title>
                <Space style={{ marginTop: 4 }}>
                  <Tag icon={<EnvironmentOutlined />} color="blue">{project.location}, {project.city}</Tag>
                  <StatusTag status={project.status} />
                  <StatusTag status={project.approval_status} />
                </Space>
              </div>
            </div>
            <Text style={{ color: "#475569", fontSize: 13 }}>{project.description}</Text>
          </Col>
          <Col>
            <div style={{ textAlign: "center" }}>
              <Progress
                type="circle"
                percent={absorptionPct}
                size={100}
                strokeColor={{ "0%": "#16a34a", "100%": "#10b981" }}
                trailColor="#e2e8f0"
                format={(pct) => (
                  <div>
                    <div style={{ color: "#0f172a", fontSize: 22, fontWeight: 700 }}>{pct}%</div>
                    <div style={{ color: "#475569", fontSize: 10 }}>Absorbed</div>
                  </div>
                )}
              />
            </div>
          </Col>
        </Row>
      </Card>

      {/* KPI Row */}
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col xs={12} md={6}>
          <KpiCard title="Total Plots" value={project.total_plots} icon={<AppstoreOutlined />} color="#16a34a" />
        </Col>
        <Col xs={12} md={6}>
          <KpiCard title="Available" value={project.available_plots} icon={<CheckCircleOutlined />} color="#10b981" subtitle={`${Math.round((project.available_plots / project.total_plots) * 100)}% remaining`} />
        </Col>
        <Col xs={12} md={6}>
          <KpiCard title="Total Bookings" value={projectBookings.length} icon={<FileTextOutlined />} color="#34d399" subtitle={`${activeBookings.length} active, ${completedBookings.length} completed`} />
        </Col>
        <Col xs={12} md={6}>
          <KpiCard title="Revenue Booked" value={formatCurrency(totalRevenue)} icon={<DollarOutlined />} color="#f59e0b" subtitle={`${formatCurrency(totalCollected)} collected`} />
        </Col>
      </Row>

      {/* Plot Status Breakdown */}
      <Card style={{ marginBottom: 20 }}>
        <Text style={{ color: "#0f172a", fontWeight: 600, fontSize: 15, display: "block", marginBottom: 16 }}>Plot Status Breakdown</Text>
        <div style={{ display: "flex", gap: 0, height: 32, borderRadius: 8, overflow: "hidden", marginBottom: 16 }}>
          {plotBreakdown.map((b) => (
            <div
              key={b.label}
              style={{
                flex: b.count,
                background: b.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 600,
                color: "white",
                minWidth: b.count > 0 ? 40 : 0,
                transition: "all 0.3s ease",
              }}
            >
              {b.count > 2 && b.count}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {plotBreakdown.map((b) => (
            <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: b.color }} />
              <Text style={{ color: "#475569", fontSize: 13 }}>{b.label}: <strong style={{ color: "#0f172a" }}>{b.count}</strong></Text>
            </div>
          ))}
        </div>
      </Card>

      {/* Project Info + Dates */}
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col xs={24} lg={12}>
          <Card title={<span style={{ color: "#0f172a" }}>Project Details</span>}>
            <Descriptions column={1} size="small" bordered labelStyle={descStyle} contentStyle={contStyle}>
              <Descriptions.Item label="Project Code"><Tag color="purple">{project.project_code}</Tag></Descriptions.Item>
              <Descriptions.Item label="Location">{project.location}</Descriptions.Item>
              <Descriptions.Item label="City">{project.city}, {project.state}</Descriptions.Item>
              <Descriptions.Item label="Status"><StatusTag status={project.status} /></Descriptions.Item>
              <Descriptions.Item label="Approval"><StatusTag status={project.approval_status} /></Descriptions.Item>
              <Descriptions.Item label="Created By">{project.created_by}</Descriptions.Item>
              <Descriptions.Item label="Created On">{project.created_at}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title={<span style={{ color: "#0f172a" }}>Key Dates & Metrics</span>}>
            <Descriptions column={1} size="small" bordered labelStyle={descStyle} contentStyle={contStyle}>
              <Descriptions.Item label="Start Date"><Tag icon={<CalendarOutlined />}>{project.project_start_date}</Tag></Descriptions.Item>
              <Descriptions.Item label="Expected Possession"><Tag icon={<CalendarOutlined />} color="blue">{project.expected_possession_date}</Tag></Descriptions.Item>
              <Descriptions.Item label="Total Inventory Value">{formatCurrencyFull(projectPlots.reduce((s, p) => s + p.total_value, 0))}</Descriptions.Item>
              <Descriptions.Item label="Revenue Booked"><span style={{ color: "#10b981", fontWeight: 600 }}>{formatCurrency(totalRevenue)}</span></Descriptions.Item>
              <Descriptions.Item label="Active RMs">{projectRMs.length}</Descriptions.Item>
              <Descriptions.Item label="Absorption Rate"><span style={{ color: "#16a34a", fontWeight: 700 }}>{absorptionPct}%</span></Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      {/* Tabs: Plots, Bookings, RMs, Timeline */}
      <Card>
        <Tabs items={tabItems} defaultActiveKey="plots" />
      </Card>
    </div>
  );
}
