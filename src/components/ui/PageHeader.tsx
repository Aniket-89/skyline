/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";
import { Typography, Breadcrumb, Button, Space } from "antd";
import { ReactNode } from "react";

const { Title } = Typography;

interface PageHeaderProps {
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
  extra?: ReactNode;
}

export default function PageHeader({ title, breadcrumbs, extra }: PageHeaderProps) {
  return (
    <div style={{ marginBottom: 24 }}>
      {breadcrumbs && (
        <Breadcrumb
          style={{ marginBottom: 8 }}
          items={breadcrumbs.map((b) => ({
            title: <span style={{ color: b.href ? "#22c55e" : "#475569" }}>{b.label}</span>,
            href: b.href,
          }))}
        />
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Title level={3} style={{ color: "#0f172a", margin: 0 }}>{title}</Title>
        {extra && <Space>{extra}</Space>}
      </div>
    </div>
  );
}
