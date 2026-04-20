 
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Layout, Menu, Avatar, Typography, Tag } from "antd";
import {
  DashboardOutlined, ProjectOutlined, AppstoreOutlined, FileTextOutlined,
  UserOutlined, LogoutOutlined, BarChartOutlined, TeamOutlined,
  AuditOutlined, LineChartOutlined, CheckCircleOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import { clearTokens, getCurrentUser, ROLE_LABELS, ROLE_COLORS, ROLE_NAV_ACCESS } from "@/lib/auth";
import { useState, useEffect } from "react";

const { Sider } = Layout;
const { Text } = Typography;

const allMenuItems = [
  { key: "/dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
  { type: "divider" as const, group: "masters" },
  { key: "/projects", icon: <ProjectOutlined />, label: "Projects" },
  { key: "/plots", icon: <AppstoreOutlined />, label: "Plots" },
  { key: "/bookings", icon: <FileTextOutlined />, label: "Bookings" },
  { key: "/customers", icon: <UserOutlined />, label: "Customers" },
  { type: "divider" as const, group: "crm" },
  { key: "/leads", icon: <TeamOutlined />, label: "Leads" },
  { key: "/rms", icon: <AuditOutlined />, label: "Relationship Managers" },
  { type: "divider" as const, group: "ops" },
  { key: "/approvals", icon: <CheckCircleOutlined />, label: "Pending Approvals" },
  { key: "/reports", icon: <BarChartOutlined />, label: "Reports" },
  { key: "/analysis", icon: <LineChartOutlined />, label: "Analysis" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(getCurrentUser());

  // Re-read user on mount (after hydration)
  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const allowedPaths = ROLE_NAV_ACCESS[user.role] || ROLE_NAV_ACCESS.admin;

  // Filter menu items: keep items that are in the allowed list, and dividers between visible groups
  const filteredItems = allMenuItems.filter((item) => {
    if ("key" in item) return allowedPaths.includes(item.key as string);
    return true; // keep dividers, we'll clean up consecutive ones
  });

  // Remove consecutive/leading/trailing dividers
  const cleanedItems = filteredItems.filter((item, i, arr) => {
    if (!("type" in item)) return true;
    if (i === 0 || i === arr.length - 1) return false;
    const prev = arr[i - 1];
    if ("type" in prev) return false;
    return true;
  });

  const selectedKey = cleanedItems
    .filter((item): item is { key: string; icon: any; label: string } => "key" in item)
    .find((item) => pathname.startsWith(item.key))?.key || "/dashboard";

  const roleColor = ROLE_COLORS[user.role];
  const roleLabel = ROLE_LABELS[user.role];

  function handleClick({ key }: { key: string }) {
    if (key === "logout") { clearTokens(); router.push("/login"); return; }
    if (key === "switch_role") { clearTokens(); router.push("/login"); return; }
    router.push(key);
  }

  return (
    <Sider
      width={260}
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      style={{ minHeight: "100vh", position: "sticky", top: 0, left: 0 }}
      trigger={null}
    >
      {/* Brand */}
      <div
        style={{
          padding: collapsed ? "20px 12px 16px" : "20px 20px 16px",
          borderBottom: "1px solid #e2e8f0",
          cursor: "pointer",
          textAlign: collapsed ? "center" : "left",
        }}
        onClick={() => setCollapsed(!collapsed)}
      >
        <div style={{ fontSize: 26, lineHeight: 1 }}>🏙️</div>
        {!collapsed && (
          <>
            <div style={{ color: "#0f172a", fontWeight: 700, fontSize: 16, marginTop: 10, letterSpacing: -0.3 }}>
              Project Skyline
            </div>
            <div style={{ color: "#475569", fontSize: 11, marginTop: 2 }}>Real Estate CRM</div>
          </>
        )}
      </div>

      {/* Menu */}
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        theme="light"
        items={[
          ...cleanedItems,
          { type: "divider" },
          { key: "switch_role", icon: <UserOutlined />, label: "Switch Role" },
          { key: "logout", icon: <LogoutOutlined />, label: "Logout", danger: true },
        ] as any}
        onClick={handleClick}
        style={{ marginTop: 8, flex: 1 }}
      />

      {/* User Info */}
      {!collapsed && (
        <div style={{
          padding: "14px 20px",
          borderTop: "1px solid #e2e8f0",
          display: "flex",
          alignItems: "center",
          gap: 12,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#ffffff",
        }}>
          <Avatar size={36} style={{ background: roleColor, fontSize: 14, flexShrink: 0 }}>
            {user.full_name.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </Avatar>
          <div style={{ minWidth: 0 }}>
            <Text style={{ color: "#0f172a", fontSize: 13, fontWeight: 600, display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user.full_name}
            </Text>
            <Tag
              color={roleColor}
              style={{ borderRadius: 4, fontSize: 10, fontWeight: 600, padding: "0 6px", marginTop: 2, lineHeight: "18px" }}
            >
              {roleLabel}
            </Tag>
          </div>
        </div>
      )}
    </Sider>
  );
}
