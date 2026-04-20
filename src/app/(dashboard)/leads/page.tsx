/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Table, Button, Card, Tag, Select, Space, Drawer, Form, Input, InputNumber, message } from "antd";
import { PlusOutlined, FilterOutlined, UserAddOutlined } from "@ant-design/icons";
import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import StatusTag from "@/components/ui/StatusTag";
import { mockLeads, mockProjects, mockRMs } from "@/lib/mockData";

export default function LeadsPage() {
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = mockLeads.filter((l) => {
    if (filterStatus && l.status !== filterStatus) return false;
    return true;
  });

  // Pipeline counts
  const pipeline = [
    { label: "New", count: mockLeads.filter((l) => l.status === "New").length, color: "#06b6d4" },
    { label: "Contacted", count: mockLeads.filter((l) => l.status === "Contacted").length, color: "#3b82f6" },
    { label: "Qualified", count: mockLeads.filter((l) => l.status === "Qualified").length, color: "#16a34a" },
    { label: "Converted", count: mockLeads.filter((l) => l.status === "Converted").length, color: "#10b981" },
    { label: "Lost", count: mockLeads.filter((l) => l.status === "Lost").length, color: "#ef4444" },
  ];

  const columns = [
    { title: "Name", dataIndex: "lead_name", key: "n", render: (v: string) => <span style={{ color: "#0f172a", fontWeight: 600 }}>{v}</span> },
    { title: "Phone", dataIndex: "phone", key: "ph" },
    { title: "Source", dataIndex: "source", key: "src", render: (v: string) => <Tag color="purple">{v}</Tag> },
    { title: "Interested In", dataIndex: "interested_project", key: "ip", render: (v: string) => <Tag color="blue">{v}</Tag> },
    { title: "Budget", dataIndex: "budget", key: "b", align: "right" as const, render: (v: number) => `₹${(v / 100000).toFixed(1)}L` },
    { title: "Preference", dataIndex: "plot_preference", key: "pp", render: (v: string) => <span style={{ color: "#475569", fontSize: 12 }}>{v}</span> },
    { title: "Assigned RM", dataIndex: "assigned_rm", key: "rm" },
    { title: "Status", dataIndex: "status", key: "s", render: (v: string) => <StatusTag status={v} /> },
    { title: "Date", dataIndex: "created_at", key: "d", render: (v: string) => <span style={{ color: "#475569", fontSize: 12 }}>{v}</span> },
  ];

  function handleAdd() {
    message.success("Lead added successfully!");
    setDrawerOpen(false);
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Leads"
        breadcrumbs={[{ label: "Home", href: "/dashboard" }, { label: "Leads" }]}
        extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setDrawerOpen(true)}>Add Lead</Button>}
      />

      {/* Pipeline */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        {pipeline.map((p) => (
          <Card
            key={p.label}
            style={{
              flex: 1, minWidth: 140, cursor: "pointer",
              border: filterStatus === p.label ? `2px solid ${p.color}` : undefined,
            }}
            styles={{ body: { padding: "16px 20px", textAlign: "center" } }}
            onClick={() => setFilterStatus(filterStatus === p.label ? null : p.label)}
          >
            <div style={{ fontSize: 28, fontWeight: 700, color: p.color }}>{p.count}</div>
            <div style={{ color: "#475569", fontSize: 12, marginTop: 4 }}>{p.label}</div>
          </Card>
        ))}
      </div>

      <Card>
        <Table columns={columns} dataSource={filtered} rowKey="id" pagination={{ pageSize: 10 }} size="small" />
      </Card>

      {/* Add Lead Drawer */}
      <Drawer title="Add New Lead" open={drawerOpen} onClose={() => setDrawerOpen(false)} width={480}>
        <Form layout="vertical" onFinish={handleAdd}>
          <Form.Item label="Full Name" name="name" rules={[{ required: true }]}><Input placeholder="e.g., Arun Prasad" /></Form.Item>
          <Form.Item label="Phone" name="phone" rules={[{ required: true }]}><Input placeholder="9876543210" /></Form.Item>
          <Form.Item label="Email" name="email"><Input placeholder="arun@gmail.com" /></Form.Item>
          <Form.Item label="Source" name="source">
            <Select placeholder="Select source" options={["Walk-in", "Referral", "Online", "Campaign", "Other"].map((s) => ({ label: s, value: s }))} />
          </Form.Item>
          <Form.Item label="Interested Project" name="project">
            <Select placeholder="Select project" options={mockProjects.map((p) => ({ label: p.project_name, value: p.id }))} />
          </Form.Item>
          <Form.Item label="Budget (₹)" name="budget"><InputNumber style={{ width: "100%" }} placeholder="3000000" /></Form.Item>
          <Form.Item label="Plot Preference" name="preference"><Input placeholder="Corner, North Facing, 200+ sqyd" /></Form.Item>
          <Form.Item label="Assign RM" name="rm">
            <Select placeholder="Select RM" options={mockRMs.filter((r) => r.status === "Active").map((r) => ({ label: r.rm_name, value: r.id }))} />
          </Form.Item>
          <Form.Item><Button type="primary" htmlType="submit" block>Add Lead</Button></Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}
