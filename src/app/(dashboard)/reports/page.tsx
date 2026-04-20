/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Card, Row, Col, Typography, List, Avatar, Tag } from "antd";
import {
  AppstoreOutlined, FileTextOutlined, DollarOutlined, TeamOutlined,
  WarningOutlined, UserOutlined, ClockCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";

const { Text } = Typography;

const reports = [
  {
    key: "plot-inventory", title: "Plot Inventory Status", icon: <AppstoreOutlined />,
    description: "All plots with status, value, booking details, and customer info. Filter by project, status, facing.",
    color: "#16a34a", count: "510 plots",
  },
  {
    key: "booking-register", title: "Booking Register", icon: <FileTextOutlined />,
    description: "All bookings with customer, plot, plan type, value, RM, and status. Filter by date range.",
    color: "#34d399", count: "68 bookings",
  },
  {
    key: "payment-collection", title: "Payment Collection Report", icon: <DollarOutlined />,
    description: "Stage-wise payment details per booking — due, received, balance even overdue status.",
    color: "#10b981", count: "₹16.2 Cr collected",
  },
  {
    key: "rm-performance", title: "RM Performance Report", icon: <TeamOutlined />,
    description: "Per RM: leads assigned, opportunities, bookings, revenue, and outstanding collection.",
    color: "#f59e0b", count: "6 RMs",
  },
  {
    key: "overdue-payments", title: "Overdue Payment Report", icon: <WarningOutlined />,
    description: "All overdue payment stages grouped by RM. Export to Excel for accountability tracking.",
    color: "#ef4444", count: "3 overdue",
  },
  {
    key: "customer-ledger", title: "Customer Ledger", icon: <UserOutlined />,
    description: "Per customer payment statement — all entries, amounts, dates, and balance. Emailable.",
    color: "#10b981", count: "52 customers",
  },
  {
    key: "pending-approvals", title: "Pending Approvals Report", icon: <ClockCircleOutlined />,
    description: "All records across modules pending manager approval, grouped by type and creator.",
    color: "#f97316", count: "6 pending",
  },
];

export default function ReportsPage() {
  const router = useRouter();

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Reports"
        breadcrumbs={[{ label: "Home", href: "/dashboard" }, { label: "Reports" }]}
      />

      <Row gutter={[16, 16]}>
        {reports.map((report) => (
          <Col xs={24} sm={12} lg={8} key={report.key}>
            <Card
              hoverable
              style={{ height: "100%", cursor: "pointer", transition: "all 0.2s" }}
              styles={{ body: { padding: 24 } }}
            >
              <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <Avatar
                  size={48}
                  style={{ background: `${report.color}18`, color: report.color, flexShrink: 0 }}
                  icon={report.icon}
                />
                <div>
                  <Text style={{ color: "#0f172a", fontWeight: 600, fontSize: 15, display: "block", marginBottom: 6 }}>
                    {report.title}
                  </Text>
                  <Text style={{ color: "#475569", fontSize: 12, display: "block", lineHeight: 1.5, marginBottom: 10 }}>
                    {report.description}
                  </Text>
                  <Tag color="blue">{report.count}</Tag>
                  <Tag style={{ cursor: "pointer", marginLeft: 4 }}>Export Excel ↓</Tag>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
