/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Table, Button, Card, Drawer, Form, Input, Select, DatePicker, InputNumber, Tag, message, Space, Descriptions } from "antd";
import { PlusOutlined, EyeOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import StatusTag from "@/components/ui/StatusTag";
import { mockProjects } from "@/lib/mockData";
import { getCurrentUser, canEditMasters } from "@/lib/auth";

export default function ProjectsPage() {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  useEffect(() => { setUser(getCurrentUser()); }, []);
  const canAdd = canEditMasters(user.role);

  const columns = [
    { title: "Code", dataIndex: "project_code", key: "code", width: 80, render: (v: string) => <Tag color="purple">{v}</Tag> },
    { title: "Project Name", dataIndex: "project_name", key: "name", render: (v: string, r: any) => <a style={{ color: "#22c55e", fontWeight: 600, cursor: "pointer" }} onClick={() => router.push(`/projects/${r.id}`)}>{v}</a> },
    { title: "Location", key: "loc", render: (_: any, r: any) => <span style={{ color: "#475569" }}>{r.location}, {r.city}</span> },
    { title: "Total Plots", dataIndex: "total_plots", key: "tp", align: "center" as const },
    { title: "Available", dataIndex: "available_plots", key: "ap", align: "center" as const, render: (v: number) => <span style={{ color: "#10b981", fontWeight: 600 }}>{v}</span> },
    { title: "Booked", dataIndex: "booked_plots", key: "bp", align: "center" as const, render: (v: number) => <span style={{ color: "#34d399", fontWeight: 600 }}>{v}</span> },
    { title: "Status", dataIndex: "status", key: "s", render: (v: string) => <StatusTag status={v} /> },
    { title: "Approval", dataIndex: "approval_status", key: "as", render: (v: string) => <StatusTag status={v} /> },
    {
      title: "", key: "action", width: 50,
      render: (_: any, record: any) => (
        <Button type="text" icon={<EyeOutlined />} style={{ color: "#22c55e" }} onClick={() => router.push(`/projects/${record.id}`)} />
      ),
    },
  ];

  function handleAdd() {
    message.success("Project submitted for approval!");
    setDrawerOpen(false);
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Projects"
        breadcrumbs={[{ label: "Home", href: "/dashboard" }, { label: "Projects" }]}
        extra={canAdd && <Button type="primary" icon={<PlusOutlined />} onClick={() => setDrawerOpen(true)}>Add Project</Button>}
      />

      <Card>
        <Table columns={columns} dataSource={mockProjects} rowKey="id" pagination={false} />
      </Card>

      {/* Add Project Drawer */}
      <Drawer title="Add New Project" open={drawerOpen} onClose={() => setDrawerOpen(false)} width={500}>
        <Form layout="vertical" onFinish={handleAdd}>
          <Form.Item label="Project Name" name="name" rules={[{ required: true }]}><Input placeholder="e.g., Skyline Heights" /></Form.Item>
          <Form.Item label="Project Code" name="code" rules={[{ required: true }]}><Input placeholder="e.g., SKH" /></Form.Item>
          <Space style={{ width: "100%" }} size={16}>
            <Form.Item label="Location" name="location" style={{ flex: 1 }}><Input placeholder="e.g., Shamshabad" /></Form.Item>
            <Form.Item label="City" name="city" style={{ flex: 1 }}><Input placeholder="e.g., Hyderabad" /></Form.Item>
          </Space>
          <Form.Item label="State" name="state"><Input placeholder="e.g., Telangana" /></Form.Item>
          <Form.Item label="Total Plots" name="total_plots"><InputNumber style={{ width: "100%" }} placeholder="120" /></Form.Item>
          <Space style={{ width: "100%" }} size={16}>
            <Form.Item label="Start Date" name="start_date" style={{ flex: 1 }}><DatePicker style={{ width: "100%" }} /></Form.Item>
            <Form.Item label="Possession Date" name="possession_date" style={{ flex: 1 }}><DatePicker style={{ width: "100%" }} /></Form.Item>
          </Space>
          <Form.Item label="Description" name="description"><Input.TextArea rows={3} placeholder="Project description..." /></Form.Item>
          <Form.Item><Button type="primary" htmlType="submit" block>Submit for Approval</Button></Form.Item>
        </Form>
      </Drawer>

    </div>
  );
}

