/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Table, Button, Card, Tag, Select, Space } from "antd";
import { PlusOutlined, FilterOutlined, EyeOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import StatusTag from "@/components/ui/StatusTag";
import { mockBookings, formatCurrency } from "@/lib/mockData";
import { getCurrentUser, canEditTransactions } from "@/lib/auth";

export default function BookingsPage() {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterProject, setFilterProject] = useState<string | null>(null);
  const [user, setUser] = useState(getCurrentUser());
  useEffect(() => { setUser(getCurrentUser()); }, []);
  const canAdd = canEditTransactions(user.role);

  const filtered = mockBookings.filter((b) => {
    if (filterStatus && b.booking_status !== filterStatus) return false;
    if (filterProject && b.project_name !== filterProject) return false;
    return true;
  });

  const columns = [
    { title: "Booking #", dataIndex: "booking_number", key: "bn", render: (v: string) => <span style={{ color: "#22c55e", fontWeight: 600 }}>{v}</span> },
    { title: "Date", dataIndex: "booking_date", key: "d" },
    { title: "Customer", dataIndex: "customer_name", key: "c", render: (v: string) => <span style={{ color: "#0f172a" }}>{v}</span> },
    { title: "Project", dataIndex: "project_name", key: "p", render: (v: string) => <Tag color="blue">{v}</Tag> },
    { title: "Plot", dataIndex: "plot_number", key: "pl", render: (v: string) => <Tag>{v}</Tag> },
    { title: "Plan", dataIndex: "payment_plan_type", key: "ppt", render: (v: string) => <Tag color={v === "Down Payment" ? "cyan" : "geekblue"}>{v}</Tag> },
    { title: "Value", dataIndex: "final_value", key: "fv", align: "right" as const, render: (v: number) => <span style={{ fontWeight: 600 }}>{formatCurrency(v)}</span> },
    { title: "Status", dataIndex: "booking_status", key: "s", render: (v: string) => <StatusTag status={v} /> },
    {
      title: "", key: "action", width: 50,
      render: (_: any, r: any) => (
        <Button type="text" icon={<EyeOutlined />} style={{ color: "#22c55e" }} onClick={() => router.push(`/bookings/${r.id}`)} />
      ),
    },
  ];

  const uniqueProjects = [...new Set(mockBookings.map((b) => b.project_name))];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Bookings"
        breadcrumbs={[{ label: "Home", href: "/dashboard" }, { label: "Bookings" }]}
        extra={canAdd && <Button type="primary" icon={<PlusOutlined />}>New Booking</Button>}
      />

      <Card style={{ marginBottom: 16 }} styles={{ body: { padding: "12px 16px" } }}>
        <Space wrap>
          <FilterOutlined style={{ color: "#475569" }} />
          <Select placeholder="All Projects" allowClear style={{ width: 200 }} onChange={(v) => setFilterProject(v || null)}
            options={uniqueProjects.map((p) => ({ label: p, value: p }))} />
          <Select placeholder="All Statuses" allowClear style={{ width: 200 }} onChange={(v) => setFilterStatus(v || null)}
            options={["Pending Approval", "Booked", "Payment In Progress", "Completed", "Cancelled"].map((s) => ({ label: s, value: s }))} />
          <span style={{ color: "#475569", fontSize: 13 }}>{filtered.length} bookings</span>
        </Space>
      </Card>

      <Card>
        <Table columns={columns} dataSource={filtered} rowKey="id" pagination={{ pageSize: 10 }} size="small" />
      </Card>
    </div>
  );
}
