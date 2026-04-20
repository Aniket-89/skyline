/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";
import { Card, Row, Col, Descriptions, Table, Tag, Button, Avatar, Typography, Alert, Space } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined, DollarOutlined, FileTextOutlined, WarningOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { use } from "react";
import PageHeader from "@/components/ui/PageHeader";
import StatusTag from "@/components/ui/StatusTag";
import KpiCard from "@/components/ui/KpiCard";
import { mockCustomers, mockBookings, mockPaymentSchedules, mockDocuments, formatCurrency, formatCurrencyFull } from "@/lib/mockData";

const { Text, Title } = Typography;

export default function Customer360Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const customer = mockCustomers.find((c) => c.id === id) || mockCustomers[0];
  const customerBookings = mockBookings.filter((b) => b.customer_name === customer.customer_name);
  const customerDocs = mockDocuments.filter((d) => d.customer === customer.customer_name);

  // Payment summary
  const allSchedules = customerBookings.flatMap((b) => mockPaymentSchedules[b.id] || []);
  const totalDue = allSchedules.reduce((s, r) => s + r.amount_due, 0);
  const totalReceived = allSchedules.reduce((s, r) => s + r.amount_received, 0);
  const overdueItems = allSchedules.filter((s) => s.status === "Overdue");

  const bookingColumns = [
    { title: "Booking #", dataIndex: "booking_number", key: "bn", render: (v: string) => <a style={{ color: "#22c55e", fontWeight: 600 }} href={`/bookings/${v}`}>{v}</a> },
    { title: "Project", dataIndex: "project_name", key: "p", render: (v: string) => <Tag color="blue">{v}</Tag> },
    { title: "Plot", dataIndex: "plot_number", key: "pl", render: (v: string) => <Tag>{v}</Tag> },
    { title: "Plan", dataIndex: "payment_plan_type", key: "ppt" },
    { title: "Value", dataIndex: "final_value", key: "fv", align: "right" as const, render: (v: number) => formatCurrency(v) },
    { title: "Status", dataIndex: "booking_status", key: "s", render: (v: string) => <StatusTag status={v} /> },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Customer 360°"
        breadcrumbs={[
          { label: "Home", href: "/dashboard" },
          { label: "Customers", href: "/customers" },
          { label: customer.customer_name },
        ]}
        extra={
          <Space>
            <Button>Send Reminder</Button>
            <Button type="primary" icon={<DollarOutlined />}>Record Payment</Button>
          </Space>
        }
      />

      {/* Customer Header */}
      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <Avatar size={64} style={{ background: "#16a34a", fontSize: 24 }}>{customer.customer_name[0]}</Avatar>
          <div style={{ flex: 1 }}>
            <Title level={4} style={{ color: "#0f172a", margin: 0 }}>{customer.customer_name}</Title>
            <Space style={{ marginTop: 8 }}>
              <Tag icon={<PhoneOutlined />} color="blue">{customer.phone}</Tag>
              <Tag icon={<MailOutlined />} color="purple">{customer.email}</Tag>
              <Tag>{customer.city}, {customer.state}</Tag>
            </Space>
            <div style={{ color: "#475569", fontSize: 13, marginTop: 6 }}>Assigned RM: <strong style={{ color: "#0f172a" }}>{customer.assigned_rm}</strong></div>
          </div>
        </div>
      </Card>

      {/* KPI Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={12} md={6}><KpiCard title="Total Bookings" value={customerBookings.length} icon={<FileTextOutlined />} color="#16a34a" /></Col>
        <Col xs={12} md={6}><KpiCard title="Total Due" value={formatCurrency(totalDue)} icon={<DollarOutlined />} color="#34d399" /></Col>
        <Col xs={12} md={6}><KpiCard title="Total Paid" value={formatCurrency(totalReceived)} icon={<CheckCircleOutlined />} color="#10b981" /></Col>
        <Col xs={12} md={6}><KpiCard title="Outstanding" value={formatCurrency(totalDue - totalReceived)} icon={<WarningOutlined />} color={totalDue - totalReceived > 0 ? "#f59e0b" : "#10b981"} /></Col>
      </Row>

      {/* Overdue Alerts */}
      {overdueItems.length > 0 && (
        <Alert
          message={`${overdueItems.length} Overdue Payment${overdueItems.length > 1 ? "s" : ""}`}
          description={overdueItems.map((o) => `${o.stage_name}: ${formatCurrencyFull(o.balance)} (due ${o.due_date})`).join(" • ")}
          type="error"
          showIcon
          icon={<WarningOutlined />}
          style={{ marginBottom: 16, background: "#7f1d1d20", border: "1px solid #991b1b" }}
        />
      )}

      {/* Bookings */}
      <Card title={<span style={{ color: "#0f172a" }}>Bookings</span>} style={{ marginBottom: 16 }}>
        <Table columns={bookingColumns} dataSource={customerBookings} rowKey="id" pagination={false} size="small" />
      </Card>

      {/* Documents */}
      <Card title={<span style={{ color: "#0f172a" }}>Documents</span>}>
        {customerDocs.length > 0 ? (
          <Table
            columns={[
              { title: "Type", dataIndex: "type", key: "t", render: (v: string) => <Tag color="blue">{v}</Tag> },
              { title: "Document", dataIndex: "name", key: "n" },
              { title: "Booking", dataIndex: "booking", key: "b" },
              { title: "Uploaded", dataIndex: "uploaded_on", key: "u" },
              { title: "Status", dataIndex: "status", key: "s", render: (v: string) => <Tag color={v === "Uploaded" ? "green" : "red"}>{v}</Tag> },
            ]}
            dataSource={customerDocs}
            rowKey="id"
            pagination={false}
            size="small"
          />
        ) : (
          <div style={{ color: "#475569", textAlign: "center", padding: 24 }}>No documents uploaded yet.</div>
        )}
      </Card>
    </div>
  );
}
