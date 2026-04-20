"use client";
import { Tag } from "antd";

const STATUS_COLORS: Record<string, string> = {
  // Plot
  "Available": "green",
  "Booked": "blue",
  "Registered": "purple",
  "On Hold": "orange",
  // Booking
  "Draft": "default",
  "Pending Approval": "gold",
  "Payment In Progress": "processing",
  "Possession Due": "warning",
  "Completed": "success",
  "Cancelled": "error",
  // Lead
  "New": "cyan",
  "Contacted": "blue",
  "Qualified": "geekblue",
  "Converted": "green",
  "Lost": "red",
  // Project
  "Active": "green",
  // RM
  "Inactive": "default",
  // Payment
  "Paid": "success",
  "Partial": "warning",
  "Pending": "default",
  "Overdue": "error",
  // Approval
  "Approved": "green",
  "Rejected": "red",
};

export default function StatusTag({ status }: { status: string }) {
  return (
    <Tag color={STATUS_COLORS[status] || "default"} style={{ borderRadius: 6, fontWeight: 500, fontSize: 12 }}>
      {status}
    </Tag>
  );
}
