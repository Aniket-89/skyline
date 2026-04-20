"use client";
import { Table, Button, Card, Select, Tag, Space } from "antd";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import StatusTag from "@/components/ui/StatusTag";
import { mockPlots, mockProjects, formatCurrencyFull } from "@/lib/mockData";

export default function PlotsPage() {
  const [filterProject, setFilterProject] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const filtered = mockPlots.filter((p) => {
    if (filterProject && p.project_id !== filterProject) return false;
    if (filterStatus && p.status !== filterStatus) return false;
    return true;
  });

  const columns = [
    { title: "Plot #", dataIndex: "plot_number", key: "pn", render: (v: string) => <span style={{ color: "#22c55e", fontWeight: 600 }}>{v}</span> },
    { title: "Project", dataIndex: "project_name", key: "proj", render: (v: string) => <Tag color="blue">{v}</Tag> },
    { title: "Sector", dataIndex: "sector", key: "sec", width: 80, align: "center" as const },
    { title: "Area (sqyd)", dataIndex: "plot_area", key: "area", align: "right" as const },
    { title: "Facing", dataIndex: "facing", key: "f", render: (v: string) => <Tag>{v}</Tag> },
    { title: "Type", dataIndex: "plot_type", key: "t", render: (v: string) => <Tag color={v === "Commercial" ? "orange" : "cyan"}>{v}</Tag> },
    { title: "Rate/sqyd", dataIndex: "rate_per_unit", key: "r", align: "right" as const, render: (v: number) => <span>₹{v.toLocaleString("en-IN")}</span> },
    { title: "Total Value", dataIndex: "total_value", key: "tv", align: "right" as const, render: (v: number) => <span style={{ fontWeight: 600, color: "#0f172a" }}>{formatCurrencyFull(v)}</span> },
    { title: "Status", dataIndex: "status", key: "s", render: (v: string) => <StatusTag status={v} /> },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Plots"
        breadcrumbs={[{ label: "Home", href: "/dashboard" }, { label: "Plots" }]}
        extra={<Button type="primary" icon={<PlusOutlined />}>Add Plot</Button>}
      />

      {/* Filters */}
      <Card style={{ marginBottom: 16 }} styles={{ body: { padding: "12px 16px" } }}>
        <Space wrap>
          <FilterOutlined style={{ color: "#475569" }} />
          <Select
            placeholder="All Projects"
            allowClear
            style={{ width: 200 }}
            onChange={(v) => setFilterProject(v || null)}
            options={mockProjects.map((p) => ({ label: p.project_name, value: p.id }))}
          />
          <Select
            placeholder="All Statuses"
            allowClear
            style={{ width: 160 }}
            onChange={(v) => setFilterStatus(v || null)}
            options={[
              { label: "Available", value: "Available" },
              { label: "Booked", value: "Booked" },
              { label: "Registered", value: "Registered" },
              { label: "On Hold", value: "On Hold" },
            ]}
          />
          <span style={{ color: "#475569", fontSize: 13 }}>{filtered.length} plots shown</span>
        </Space>
      </Card>

      <Card>
        <Table
          columns={columns}
          dataSource={filtered}
          rowKey="id"
          pagination={{ pageSize: 15, showSizeChanger: false, showTotal: (t) => <span style={{ color: "#475569" }}>{t} total plots</span> }}
          size="small"
        />
      </Card>
    </div>
  );
}
