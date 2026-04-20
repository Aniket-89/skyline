"use client";
import { Card, Statistic } from "antd";
import { ReactNode } from "react";

interface KpiCardProps {
  title: string;
  value: string | number;
  prefix?: string;
  icon: ReactNode;
  color: string;
  subtitle?: string;
  trend?: { value: number; up: boolean };
}

export default function KpiCard({ title, value, icon, color, subtitle, trend }: KpiCardProps) {
  return (
    <Card
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        border: "1px solid #e2e8f0",
        borderRadius: 14,
        overflow: "hidden",
        position: "relative",
      }}
      styles={{ body: { padding: "20px 24px" } }}
    >
      <div style={{
        position: "absolute", top: -20, right: -20, width: 80, height: 80,
        borderRadius: "50%", background: color, opacity: 0.07,
      }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ color: "#475569", fontSize: 13, fontWeight: 500, marginBottom: 8 }}>{title}</div>
          <Statistic
            value={value}
            styles={{ content: { color: "#0f172a", fontSize: 26, fontWeight: 700, lineHeight: 1 } }}
          />
          {subtitle && <div style={{ color: "#475569", fontSize: 12, marginTop: 6 }}>{subtitle}</div>}
          {trend && (
            <div style={{ color: trend.up ? "#10b981" : "#ef4444", fontSize: 12, marginTop: 6, fontWeight: 500 }}>
              {trend.up ? "↑" : "↓"} {trend.value}% vs last month
            </div>
          )}
        </div>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, color,
        }}>
          {icon}
        </div>
      </div>
    </Card>
  );
}
