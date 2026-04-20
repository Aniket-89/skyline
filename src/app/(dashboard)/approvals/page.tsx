/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";
import { Card, List, Button, Tag, Avatar, Typography, message, Space, Empty, Alert } from "antd";
import { CheckOutlined, CloseOutlined, ProjectOutlined, FileTextOutlined, AppstoreOutlined, TeamOutlined, EyeOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import PageHeader from "@/components/ui/PageHeader";
import { mockApprovals } from "@/lib/mockData";
import { getCurrentUser, canApprove, ROLE_LABELS, type UserRole } from "@/lib/auth";

const { Text } = Typography;

const typeIcons: Record<string, React.ReactNode> = {
  Project: <ProjectOutlined />,
  Booking: <FileTextOutlined />,
  Plot: <AppstoreOutlined />,
  RM: <TeamOutlined />,
};

const typeColors: Record<string, string> = {
  Project: "#16a34a",
  Booking: "#34d399",
  Plot: "#10b981",
  RM: "#f59e0b",
};

/** Which approval types each manager role can action */
const APPROVAL_SCOPE: Record<string, string[]> = {
  admin: ["Project", "Booking", "Plot", "RM"],
  back_office_manager: ["Project", "Plot", "RM"],
  front_office_manager: ["Booking"],
};

export default function ApprovalsPage() {
  const [items, setItems] = useState(mockApprovals);
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => { setUser(getCurrentUser()); }, []);

  const hasApprovePermission = canApprove(user.role);
  const approvalScope = APPROVAL_SCOPE[user.role] || [];

  function canActionType(type: string): boolean {
    return hasApprovePermission && approvalScope.includes(type);
  }

  function handleApprove(id: string) {
    setItems(items.filter((i) => i.id !== id));
    message.success("Approved successfully! ✅");
  }

  function handleReject(id: string) {
    setItems(items.filter((i) => i.id !== id));
    message.warning("Rejected. Sent back for revision.");
  }

  const grouped = {
    Project: items.filter((i) => i.type === "Project"),
    Booking: items.filter((i) => i.type === "Booking"),
    Plot: items.filter((i) => i.type === "Plot"),
    RM: items.filter((i) => i.type === "RM"),
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Pending Approvals"
        breadcrumbs={[{ label: "Home", href: "/dashboard" }, { label: "Approvals" }]}
        extra={<Tag color="gold" style={{ fontSize: 14, padding: "4px 16px" }}>{items.length} Pending</Tag>}
      />

      {!hasApprovePermission && (
        <Alert
          message="View Only"
          description={`Your role (${ROLE_LABELS[user.role]}) can view pending approvals but cannot approve or reject them. Contact a manager.`}
          type="info"
          showIcon
          style={{ marginBottom: 16, background: "#34d39910", border: "1px solid #34d39930" }}
        />
      )}

      {items.length === 0 && (
        <Card><Empty description={<span style={{ color: "#475569" }}>All caught up! No pending approvals. 🎉</span>} /></Card>
      )}

      {Object.entries(grouped).map(([type, typeItems]) => {
        if (typeItems.length === 0) return null;
        const color = typeColors[type];
        const canAction = canActionType(type);
        return (
          <Card
            key={type}
            title={
              <Space>
                <Avatar size={28} style={{ background: `${color}20`, color }}>{typeIcons[type]}</Avatar>
                <span style={{ color: "#0f172a" }}>{type}s</span>
                <Tag color="gold">{typeItems.length}</Tag>
                {!canAction && hasApprovePermission && (
                  <Tag style={{ fontSize: 10 }}>Outside your scope</Tag>
                )}
              </Space>
            }
            style={{ marginBottom: 16 }}
          >
            <List
              dataSource={typeItems}
              renderItem={(item) => (
                <List.Item
                  style={{ padding: "16px 0", borderBottom: "1px solid #e2e8f0" }}
                  actions={canAction ? [
                    <Button
                      key="approve"
                      type="primary"
                      icon={<CheckOutlined />}
                      style={{ background: "#10b981", borderColor: "#10b981" }}
                      onClick={() => handleApprove(item.id)}
                    >
                      Approve
                    </Button>,
                    <Button
                      key="reject"
                      danger
                      icon={<CloseOutlined />}
                      onClick={() => handleReject(item.id)}
                    >
                      Reject
                    </Button>,
                  ] : [
                    <Tag key="view" icon={<EyeOutlined />} color="default">View Only</Tag>,
                  ]}
                >
                  <List.Item.Meta
                    title={<Text style={{ color: "#0f172a", fontWeight: 600, fontSize: 14 }}>{item.name}</Text>}
                    description={
                      <div>
                        <Text style={{ color: "#475569", fontSize: 13 }}>{item.details}</Text>
                        <br />
                        <Text style={{ color: "#475569", fontSize: 12 }}>Submitted by {item.submitted_by} on {item.submitted_on}</Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        );
      })}
    </div>
  );
}
