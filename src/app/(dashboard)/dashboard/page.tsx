/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link";
import { Col, Row, Card, Table, Tag, Typography, List, Avatar, Progress } from "antd";
import {
  ProjectOutlined, FileTextOutlined, UserOutlined, DollarOutlined,
  WarningOutlined, CheckCircleOutlined, ClockCircleOutlined, RiseOutlined,
} from "@ant-design/icons";
import KpiCard from "@/components/ui/KpiCard";
import StatusTag from "@/components/ui/StatusTag";
import PageHeader from "@/components/ui/PageHeader";
import { mockBookings, mockApprovals, mockProjects, formatCurrency } from "@/lib/mockData";
import { getCurrentUser, ROLE_LABELS, ROLE_COLORS, canApprove, canEditMasters, canEditTransactions } from "@/lib/auth";
import { useEffect, useState } from "react";

const { Text } = Typography;

export default function DashboardPage() {
  const [user, setUser] = useState(getCurrentUser());
  useEffect(() => { setUser(getCurrentUser()); }, []);

  const roleColor = ROLE_COLORS[user.role];
  const roleLabel = ROLE_LABELS[user.role];
  const showMasters = canEditMasters(user.role) || user.role === "admin";
  const showTransactions = canEditTransactions(user.role) || user.role === "admin";
  const showApprovals = canApprove(user.role);

  const recentBookings = mockBookings.slice(0, 5);

  const bookingColumns = [
    { title: "Booking #", dataIndex: "booking_number", key: "bn", render: (v: string) => <Text style={{ color: "#22c55e", fontWeight: 600 }}>{v}</Text> },
    { title: "Customer", dataIndex: "customer_name", key: "c" },
    { title: "Project", dataIndex: "project_name", key: "p", render: (v: string) => <Tag color="blue">{v}</Tag> },
    { title: "Value", dataIndex: "final_value", key: "v", render: (v: number) => <Text style={{ color: "#0f172a" }}>{formatCurrency(v)}</Text> },
    { title: "Status", dataIndex: "booking_status", key: "s", render: (v: string) => <StatusTag status={v} /> },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader title="Dashboard" breadcrumbs={[{ label: "Home" }, { label: "Dashboard" }]} />

      {/* Welcome Banner */}
      <Card style={{ marginBottom: 20, background: `linear-gradient(135deg, ${roleColor}15 0%, #f8fafc 100%)`, borderColor: `${roleColor}30` }} styles={{ body: { padding: "16px 24px" } }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <Text style={{ color: "#0f172a", fontSize: 18, fontWeight: 700 }}>Welcome back, {user.full_name.split(" ")[0]}! 👋</Text>
            <div style={{ marginTop: 4 }}>
              <Tag color={roleColor} style={{ borderRadius: 6, fontWeight: 600, fontSize: 12 }}>{roleLabel}</Tag>
              <Text style={{ color: "#475569", fontSize: 12, marginLeft: 8 }}>
                {user.role === "admin" ? "You have full access to all modules" :
                 user.role === "back_office" ? "You can manage projects, plots & RMs" :
                 user.role === "back_office_manager" ? "You can approve projects, plots & RMs" :
                 user.role === "front_office" ? "You can manage leads, bookings & customers" :
                 "You can approve bookings & view analytics"}
              </Text>
            </div>
          </div>
          <Text style={{ color: "#475569", fontSize: 12 }}>
            {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </Text>
        </div>
      </Card>

      {/* KPI Row */}
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={12} xl={6}>
          <KpiCard
            title="Active Projects"
            value={4}
            icon={<ProjectOutlined />}
            color="#16a34a"
            subtitle="1 pending approval"
            trend={{ value: 12, up: true }}
          />
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <KpiCard
            title="Total Bookings"
            value={68}
            icon={<FileTextOutlined />}
            color="#34d399"
            subtitle="8 this month"
            trend={{ value: 23, up: true }}
          />
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <KpiCard
            title="Total Customers"
            value={52}
            icon={<UserOutlined />}
            color="#10b981"
            subtitle="5 new this month"
          />
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <KpiCard
            title="Revenue Collected"
            value="₹16.2 Cr"
            icon={<DollarOutlined />}
            color="#f59e0b"
            subtitle="₹4.8 Cr outstanding"
            trend={{ value: 18, up: true }}
          />
        </Col>
      </Row>

      {/* Second Row - Collection & Plot Summary */}
      <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
        <Col xs={24} sm={12} xl={6}>
          <KpiCard title="Plots Available" value={247} icon={<CheckCircleOutlined />} color="#10b981" subtitle="out of 510 total" />
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <KpiCard title="Pending Approvals" value={6} icon={<ClockCircleOutlined />} color="#f59e0b" subtitle="2 bookings, 2 plots, 1 project, 1 RM" />
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <KpiCard title="Overdue Payments" value={3} icon={<WarningOutlined />} color="#ef4444" subtitle="₹17.5L total overdue" />
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <KpiCard title="Leads This Month" value={12} icon={<RiseOutlined />} color="#10b981" subtitle="4 qualified" trend={{ value: 8, up: true }} />
        </Col>
      </Row>

      <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
        {/* Recent Bookings */}
        <Col xs={24} lg={14}>
          <Card
            title={<span style={{ color: "#0f172a", fontWeight: 600 }}>Recent Bookings</span>}
            extra={<Link style={{ color: "#22c55e", fontSize: 13 }} href="/bookings">View All →</Link>}
          >
            <Table
              columns={bookingColumns}
              dataSource={recentBookings}
              pagination={false}
              size="small"
              rowKey="id"
            />
          </Card>
        </Col>

        {/* Pending Approvals */}
        <Col xs={24} lg={10}>
          <Card
            title={<span style={{ color: "#0f172a", fontWeight: 600 }}>Pending Approvals</span>}
            extra={<a style={{ color: "#22c55e", fontSize: 13 }} href="/approvals">View All →</a>}
          >
            <List
              dataSource={mockApprovals.slice(0, 4)}
              renderItem={(item) => (
                <List.Item style={{ borderBottom: "1px solid #e2e8f0", padding: "12px 0" }}>
                  <List.Item.Meta
                    avatar={
                      <Avatar style={{
                        background: item.type === "Booking" ? "#34d3991a" : item.type === "Project" ? "#16a34a1a" : "#10b9811a",
                        color: item.type === "Booking" ? "#34d399" : item.type === "Project" ? "#16a34a" : "#10b981",
                      }}>
                        {item.type[0]}
                      </Avatar>
                    }
                    title={<Text style={{ color: "#0f172a", fontSize: 13 }}>{item.type}: {item.name}</Text>}
                    description={<Text style={{ color: "#475569", fontSize: 12 }}>by {item.submitted_by} • {item.submitted_on}</Text>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Project Overview */}
      <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
        <Col xs={24}>
          <Card title={<span style={{ color: "#0f172a", fontWeight: 600 }}>Project Overview</span>}>
            {mockProjects.filter(p => p.approval_status === "Approved").map((project) => {
              const total = project.total_plots;
              const booked = project.booked_plots + project.registered_plots;
              const pct = Math.round((booked / total) * 100);
              return (
                <div key={project.id} style={{ marginBottom: 20, padding: "12px 0", borderBottom: "1px solid #ffffff" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <div>
                      <Text style={{ color: "#0f172a", fontWeight: 600, fontSize: 14 }}>{project.project_name}</Text>
                      <Text style={{ color: "#475569", fontSize: 12, marginLeft: 12 }}>{project.city}</Text>
                    </div>
                    <div>
                      <StatusTag status={project.status} />
                      <Text style={{ color: "#475569", fontSize: 12, marginLeft: 8 }}>{booked}/{total} plots sold</Text>
                    </div>
                  </div>
                  <Progress
                    percent={pct}
                    strokeColor={{ from: "#16a34a", to: "#10b981" }}
                    trailColor="#ffffff"
                    showInfo={true}
                    size="small"
                  />
                </div>
              );
            })}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
