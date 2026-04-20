/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Card, Row, Col, Avatar, Tag, Typography, Progress, Table, Button } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined, TrophyOutlined } from "@ant-design/icons";
import PageHeader from "@/components/ui/PageHeader";
import StatusTag from "@/components/ui/StatusTag";
import { mockRMs, formatCurrency } from "@/lib/mockData";

const { Text, Title } = Typography;

export default function RMsPage() {
  const activeRMs = mockRMs.filter((r) => r.status === "Active");
  const topRM = activeRMs.reduce((a, b) => (a.revenue > b.revenue ? a : b));

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Relationship Managers"
        breadcrumbs={[{ label: "Home", href: "/dashboard" }, { label: "RMs" }]}
        extra={<Button type="primary">Add RM</Button>}
      />

      {/* RM Cards */}
      <Row gutter={[16, 16]}>
        {mockRMs.map((rm) => (
          <Col xs={24} sm={12} lg={8} key={rm.id}>
            <Card
              style={{ height: "100%", position: "relative", overflow: "hidden" }}
              styles={{ body: { padding: 24 } }}
            >
              {rm.id === topRM.id && (
                <div style={{
                  position: "absolute", top: 12, right: 12,
                  background: "#f59e0b20", color: "#f59e0b", padding: "2px 10px",
                  borderRadius: 20, fontSize: 11, fontWeight: 600,
                  display: "flex", alignItems: "center", gap: 4,
                }}>
                  <TrophyOutlined /> Top Performer
                </div>
              )}

              <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 20 }}>
                <Avatar size={56} style={{ background: rm.status === "Active" ? "#16a34a" : "#475569" }}>
                  {rm.rm_name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </Avatar>
                <div>
                  <Title level={5} style={{ color: "#0f172a", margin: 0 }}>{rm.rm_name}</Title>
                  <Text style={{ color: "#475569", fontSize: 12 }}>{rm.designation}</Text>
                  <div style={{ marginTop: 4 }}>
                    <StatusTag status={rm.status} />
                    <Tag style={{ marginLeft: 4 }}>{rm.rm_code}</Tag>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                <Tag icon={<PhoneOutlined />} color="blue">{rm.mobile}</Tag>
                <Tag icon={<MailOutlined />} color="purple">{rm.email}</Tag>
              </div>

              <Row gutter={[12, 12]}>
                <Col span={12}>
                  <div style={{ background: "#f8fafc", borderRadius: 10, padding: "12px 14px", textAlign: "center" }}>
                    <div style={{ color: "#16a34a", fontSize: 20, fontWeight: 700 }}>{rm.leads_assigned}</div>
                    <div style={{ color: "#475569", fontSize: 11 }}>Leads</div>
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ background: "#f8fafc", borderRadius: 10, padding: "12px 14px", textAlign: "center" }}>
                    <div style={{ color: "#10b981", fontSize: 20, fontWeight: 700 }}>{rm.bookings_closed}</div>
                    <div style={{ color: "#475569", fontSize: 11 }}>Bookings</div>
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ background: "#f8fafc", borderRadius: 10, padding: "12px 14px", textAlign: "center" }}>
                    <div style={{ color: "#f59e0b", fontSize: 20, fontWeight: 700 }}>{formatCurrency(rm.revenue)}</div>
                    <div style={{ color: "#475569", fontSize: 11 }}>Revenue</div>
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ background: "#f8fafc", borderRadius: 10, padding: "12px 14px", textAlign: "center" }}>
                    <div style={{ color: "#34d399", fontSize: 20, fontWeight: 700 }}>{rm.active_bookings}</div>
                    <div style={{ color: "#475569", fontSize: 11 }}>Active</div>
                  </div>
                </Col>
              </Row>

              {rm.status === "Active" && (
                <div style={{ marginTop: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <Text style={{ color: "#475569", fontSize: 11 }}>Conversion Rate</Text>
                    <Text style={{ color: "#0f172a", fontSize: 11 }}>{Math.round((rm.bookings_closed / rm.leads_assigned) * 100)}%</Text>
                  </div>
                  <Progress
                    percent={Math.round((rm.bookings_closed / rm.leads_assigned) * 100)}
                    strokeColor={{ from: "#16a34a", to: "#10b981" }}
                    trailColor="#ffffff"
                    showInfo={false}
                    size="small"
                  />
                </div>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
