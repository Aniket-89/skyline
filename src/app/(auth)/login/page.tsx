"use client";
import { Typography, Avatar, Tag } from "antd";
import {
  CrownOutlined, ToolOutlined, SafetyCertificateOutlined,
  PhoneOutlined, AuditOutlined,
} from "@ant-design/icons";
import { MOCK_USERS, setDemoUser, ROLE_LABELS, ROLE_COLORS, type UserRole } from "@/lib/auth";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

const ROLE_ICONS: Record<UserRole, React.ReactNode> = {
  admin: <CrownOutlined />,
  back_office: <ToolOutlined />,
  back_office_manager: <SafetyCertificateOutlined />,
  front_office: <PhoneOutlined />,
  front_office_manager: <AuditOutlined />,
};

const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  admin: "Full system access — all modules, all actions",
  back_office: "Manage projects, plots & RMs. Submit for approval.",
  back_office_manager: "Approve projects, plots & RMs. View reports & analysis.",
  front_office: "Manage leads, bookings & customers. Submit for approval.",
  front_office_manager: "Approve bookings. View reports, analysis & leads.",
};

export default function LoginPage() {
  const router = useRouter();

  function handleLogin(user: typeof MOCK_USERS[0]) {
    setDemoUser(user);
    router.push("/dashboard");
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fafc 0%, #1e1b4b 50%, #f8fafc 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🏙️</div>
        <Title level={2} style={{ color: "#0f172a", margin: 0 }}>Project Skyline</Title>
        <Text style={{ color: "#475569", fontSize: 15 }}>Real Estate CRM — Demo Login</Text>
      </div>

      {/* Subtitle */}
      <Text style={{ color: "#475569", fontSize: 13, marginBottom: 24 }}>
        Select a role to explore the system. Each role sees different modules and permissions.
      </Text>

      {/* Role Cards Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 16,
        maxWidth: 960,
        width: "100%",
      }}>
        {MOCK_USERS.map((user) => {
          const color = ROLE_COLORS[user.role];
          return (
            <div
              key={user.id}
              onClick={() => handleLogin(user)}
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                border: "1px solid #e2e8f0",
                borderRadius: 16,
                padding: 24,
                cursor: "pointer",
                transition: "all 0.25s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = color;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${color}25`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#e2e8f0";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Glow orb */}
              <div style={{
                position: "absolute", top: -30, right: -30,
                width: 100, height: 100, borderRadius: "50%",
                background: color, opacity: 0.06,
              }} />

              <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <Avatar
                  size={52}
                  style={{
                    background: `${color}20`,
                    color,
                    fontSize: 22,
                    flexShrink: 0,
                  }}
                  icon={ROLE_ICONS[user.role]}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <Text style={{ color: "#0f172a", fontWeight: 700, fontSize: 15 }}>{user.full_name}</Text>
                  </div>
                  <Tag
                    color={color}
                    style={{ borderRadius: 6, fontWeight: 600, fontSize: 11, marginBottom: 8 }}
                  >
                    {ROLE_LABELS[user.role]}
                  </Tag>
                  <div style={{ color: "#475569", fontSize: 12, lineHeight: 1.5, marginBottom: 8 }}>
                    {ROLE_DESCRIPTIONS[user.role]}
                  </div>
                  <Text style={{ color: "#475569", fontSize: 11 }}>{user.email}</Text>
                </div>
              </div>

              {/* Enter label */}
              <div style={{
                position: "absolute", bottom: 12, right: 16,
                color, fontSize: 12, fontWeight: 600, opacity: 0.6,
              }}>
                Click to enter →
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <Text style={{ color: "#475569", fontSize: 11, marginTop: 32 }}>
        Demo Mode — No real authentication. All data is mock.
      </Text>
    </div>
  );
}
