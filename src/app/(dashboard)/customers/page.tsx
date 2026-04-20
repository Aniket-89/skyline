 
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Table, Button, Card, Input, Tag } from "antd";
import { PlusOutlined, SearchOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import { mockCustomers, formatCurrency } from "@/lib/mockData";

export default function CustomersPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = mockCustomers.filter((c) =>
    c.customer_name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { title: "Customer Name", dataIndex: "customer_name", key: "cn", render: (v: string, r: any) => <a style={{ color: "#22c55e", fontWeight: 600 }} onClick={() => router.push(`/customers/${r.id}`)}>{v}</a> },
    { title: "Phone", dataIndex: "phone", key: "ph" },
    { title: "Email", dataIndex: "email", key: "em", render: (v: string) => <span style={{ color: "#475569" }}>{v}</span> },
    { title: "City", dataIndex: "city", key: "c", render: (v: string) => <Tag>{v}</Tag> },
    { title: "Assigned RM", dataIndex: "assigned_rm", key: "rm" },
    { title: "Bookings", dataIndex: "total_bookings", key: "tb", align: "center" as const, render: (v: number) => <Tag color="blue">{v}</Tag> },
    { title: "Paid", dataIndex: "total_paid", key: "tp", align: "right" as const, render: (v: number) => <span style={{ color: "#10b981" }}>{formatCurrency(v)}</span> },
    { title: "Outstanding", dataIndex: "total_outstanding", key: "to", align: "right" as const, render: (v: number) => <span style={{ color: v > 0 ? "#f59e0b" : "#10b981", fontWeight: 600 }}>{formatCurrency(v)}</span> },
    {
      title: "", key: "action", width: 50,
      render: (_: any, r: any) => <Button type="text" icon={<EyeOutlined />} style={{ color: "#22c55e" }} onClick={() => router.push(`/customers/${r.id}`)} />,
    },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Customers"
        breadcrumbs={[{ label: "Home", href: "/dashboard" }, { label: "Customers" }]}
        extra={<Button type="primary" icon={<PlusOutlined />}>Add Customer</Button>}
      />

      <Card style={{ marginBottom: 16 }} styles={{ body: { padding: "12px 16px" } }}>
        <Input
          prefix={<SearchOutlined style={{ color: "#475569" }} />}
          placeholder="Search by name, phone, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 400 }}
          allowClear
        />
      </Card>

      <Card>
        <Table columns={columns} dataSource={filtered} rowKey="id" pagination={{ pageSize: 10 }} size="small" />
      </Card>
    </div>
  );
}
