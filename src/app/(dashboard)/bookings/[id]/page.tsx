 
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card, Row, Col, Descriptions, Table, Tag, Button, Modal, Form, InputNumber, Select, DatePicker, Input, message, Timeline, Typography, Space } from "antd";
import { DollarOutlined, FileAddOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useState, use } from "react";
import PageHeader from "@/components/ui/PageHeader";
import StatusTag from "@/components/ui/StatusTag";
import KpiCard from "@/components/ui/KpiCard";
import { mockBookings, mockPaymentSchedules, mockDocuments, formatCurrencyFull, formatCurrency } from "@/lib/mockData";

const { Text } = Typography;

export default function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [paymentModal, setPaymentModal] = useState(false);

  const booking = mockBookings.find((b) => b.id === id) || mockBookings[0];
  const schedules = mockPaymentSchedules[booking.id] || mockPaymentSchedules["b1"] || [];
  const docs = mockDocuments.filter((d) => d.booking === booking.booking_number);

  const totalDue = schedules.reduce((s: number, r: any) => s + r.amount_due, 0);
  const totalReceived = schedules.reduce((s: number, r: any) => s + r.amount_received, 0);
  const totalBalance = totalDue - totalReceived;
  const overdueCount = schedules.filter((s: any) => s.status === "Overdue").length;

  const scheduleColumns = [
    { title: "#", dataIndex: "stage_order", key: "so", width: 40 },
    { title: "Stage", dataIndex: "stage_name", key: "sn", render: (v: string) => <span style={{ fontWeight: 600, color: "#0f172a" }}>{v}</span> },
    { title: "%", dataIndex: "percentage", key: "pct", width: 60, render: (v: number) => `${v}%` },
    { title: "Amount Due", dataIndex: "amount_due", key: "ad", align: "right" as const, render: (v: number) => formatCurrencyFull(v) },
    { title: "Due Date", dataIndex: "due_date", key: "dd" },
    { title: "Received", dataIndex: "amount_received", key: "ar", align: "right" as const, render: (v: number) => <span style={{ color: v > 0 ? "#10b981" : "#475569" }}>{formatCurrencyFull(v)}</span> },
    { title: "Balance", dataIndex: "balance", key: "bal", align: "right" as const, render: (v: number) => <span style={{ color: v > 0 ? "#f59e0b" : "#10b981", fontWeight: 600 }}>{formatCurrencyFull(v)}</span> },
    { title: "Status", dataIndex: "status", key: "s", render: (v: string) => <StatusTag status={v} /> },
    { title: "Mode", dataIndex: "payment_mode", key: "pm", render: (v: string) => v !== "-" ? <Tag>{v}</Tag> : <span style={{ color: "#475569" }}>—</span> },
  ];

  const docColumns = [
    { title: "Type", dataIndex: "type", key: "t", render: (v: string) => <Tag color="blue">{v}</Tag> },
    { title: "Document", dataIndex: "name", key: "n" },
    { title: "Uploaded", dataIndex: "uploaded_on", key: "u" },
    { title: "Status", dataIndex: "status", key: "s", render: (v: string) => <Tag color={v === "Uploaded" ? "green" : "red"}>{v}</Tag> },
  ];

  function handlePayment() {
    message.success("Payment recorded successfully!");
    setPaymentModal(false);
  }

  const descStyle = { color: "#475569", background: "#f8fafc" };
  const contStyle = { color: "#0f172a", background: "#ffffff" };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title={booking.booking_number}
        breadcrumbs={[
          { label: "Home", href: "/dashboard" },
          { label: "Bookings", href: "/bookings" },
          { label: booking.booking_number },
        ]}
        extra={
          <Space>
            <Button icon={<FileAddOutlined />}>Upload Document</Button>
            <Button type="primary" icon={<DollarOutlined />} onClick={() => setPaymentModal(true)}>Receive Payment</Button>
          </Space>
        }
      />

      {/* KPI Row */}
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col xs={12} md={6}><KpiCard title="Total Value" value={formatCurrency(totalDue)} icon={<DollarOutlined />} color="#16a34a" /></Col>
        <Col xs={12} md={6}><KpiCard title="Received" value={formatCurrency(totalReceived)} icon={<CheckCircleOutlined />} color="#10b981" /></Col>
        <Col xs={12} md={6}><KpiCard title="Outstanding" value={formatCurrency(totalBalance)} icon={<DollarOutlined />} color="#f59e0b" /></Col>
        <Col xs={12} md={6}><KpiCard title="Overdue Stages" value={overdueCount} icon={<DollarOutlined />} color={overdueCount > 0 ? "#ef4444" : "#10b981"} /></Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Booking Info */}
        <Col xs={24} lg={12}>
          <Card title={<span style={{ color: "#0f172a" }}>Booking Details</span>}>
            <Descriptions column={1} size="small" bordered labelStyle={descStyle} contentStyle={contStyle}>
              <Descriptions.Item label="Booking Date">{booking.booking_date}</Descriptions.Item>
              <Descriptions.Item label="Status"><StatusTag status={booking.booking_status} /></Descriptions.Item>
              <Descriptions.Item label="Approval"><StatusTag status={booking.approval_status} /></Descriptions.Item>
              <Descriptions.Item label="Payment Plan"><Tag color="geekblue">{booking.payment_plan_type}</Tag></Descriptions.Item>
              <Descriptions.Item label="Plot Value">{formatCurrencyFull(booking.plot_value)}</Descriptions.Item>
              <Descriptions.Item label="Discount">{formatCurrencyFull(booking.discount)}</Descriptions.Item>
              <Descriptions.Item label="Final Value"><strong>{formatCurrencyFull(booking.final_value)}</strong></Descriptions.Item>
              <Descriptions.Item label="Possession Date">{booking.possession_date}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Customer & Plot Info */}
        <Col xs={24} lg={12}>
          <Card title={<span style={{ color: "#0f172a" }}>Customer & Plot</span>} style={{ marginBottom: 16 }}>
            <Descriptions column={1} size="small" bordered labelStyle={descStyle} contentStyle={contStyle}>
              <Descriptions.Item label="Customer"><a style={{ color: "#22c55e" }}>{booking.customer_name}</a></Descriptions.Item>
              <Descriptions.Item label="Project"><Tag color="blue">{booking.project_name}</Tag></Descriptions.Item>
              <Descriptions.Item label="Plot"><Tag>{booking.plot_number}</Tag></Descriptions.Item>
              <Descriptions.Item label="Assigned RM">{booking.assigned_rm}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      {/* Payment Schedule */}
      <Card title={<span style={{ color: "#0f172a" }}>Payment Schedule</span>} style={{ marginTop: 16 }}>
        <Table columns={scheduleColumns} dataSource={schedules} rowKey="id" pagination={false} size="small" />
      </Card>

      {/* Documents */}
      <Card title={<span style={{ color: "#0f172a" }}>Document Cabinet</span>} style={{ marginTop: 16 }}>
        {docs.length > 0 ? (
          <Table columns={docColumns} dataSource={docs} rowKey="id" pagination={false} size="small" />
        ) : (
          <div style={{ color: "#475569", textAlign: "center", padding: 24 }}>No documents uploaded for this booking yet.</div>
        )}
      </Card>

      {/* Activity Timeline */}
      <Card title={<span style={{ color: "#0f172a" }}>Activity Log</span>} style={{ marginTop: 16 }}>
        <Timeline
          items={[
            { color: "green", children: <Text style={{ color: "#0f172a" }}>Booking created by {booking.assigned_rm} — {booking.booking_date}</Text> },
            { color: "blue", children: <Text style={{ color: "#0f172a" }}>Booking approved by Manager — {booking.booking_date}</Text> },
            { color: "green", children: <Text style={{ color: "#0f172a" }}>Booking amount received — ₹{schedules[0]?.amount_received?.toLocaleString("en-IN") || "—"}</Text> },
            { color: "gray", children: <Text style={{ color: "#475569" }}>Awaiting next payment...</Text> },
          ]}
        />
      </Card>

      {/* Payment Modal */}
      <Modal title="Receive Payment" open={paymentModal} onCancel={() => setPaymentModal(false)} onOk={handlePayment} okText="Record Payment">
        <Form layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item label="Payment Stage">
            <Select placeholder="Select stage" options={schedules.filter((s: any) => s.status !== "Paid").map((s: any) => ({ label: `${s.stage_name} — Due: ${formatCurrencyFull(s.balance)}`, value: s.id }))} />
          </Form.Item>
          <Form.Item label="Amount Received"><InputNumber style={{ width: "100%" }} placeholder="500000" formatter={(v) => `₹ ${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} /></Form.Item>
          <Form.Item label="Payment Date"><DatePicker style={{ width: "100%" }} /></Form.Item>
          <Form.Item label="Payment Mode">
            <Select placeholder="Select mode" options={[{ label: "Bank Transfer", value: "bank" }, { label: "Cheque", value: "cheque" }, { label: "UPI", value: "upi" }, { label: "Cash", value: "cash" }]} />
          </Form.Item>
          <Form.Item label="Reference Number"><Input placeholder="TXN-12345 or CHQ-67890" /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
