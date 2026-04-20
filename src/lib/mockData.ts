/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// ============================================================
// MOCK DATA — Project Skyline Demo
// ============================================================

// ---- PROJECTS ----
export const mockProjects = [
  {
    id: "p1", project_name: "Skyline Heights", project_code: "SKH",
    location: "Shamshabad", city: "Hyderabad", state: "Telangana",
    total_plots: 120, available_plots: 78, booked_plots: 38, registered_plots: 4,
    project_start_date: "2025-03-15", expected_possession_date: "2027-06-30",
    status: "Active", approval_status: "Approved",
    description: "Premium residential plots near Rajiv Gandhi International Airport",
    created_by: "Priya Sharma", created_at: "2025-03-01",
  },
  {
    id: "p2", project_name: "Green Valley Enclave", project_code: "GVE",
    location: "Yelahanka", city: "Bangalore", state: "Karnataka",
    total_plots: 85, available_plots: 52, booked_plots: 30, registered_plots: 3,
    project_start_date: "2025-06-01", expected_possession_date: "2028-01-15",
    status: "Active", approval_status: "Approved",
    description: "Eco-friendly township with lush greenery and modern amenities",
    created_by: "Priya Sharma", created_at: "2025-05-10",
  },
  {
    id: "p3", project_name: "Royal Residency", project_code: "RYR",
    location: "Kompally", city: "Hyderabad", state: "Telangana",
    total_plots: 60, available_plots: 60, booked_plots: 0, registered_plots: 0,
    project_start_date: "2026-01-10", expected_possession_date: "2028-09-30",
    status: "Active", approval_status: "Pending Approval",
    description: "Luxury residential plots with clubhouse and swimming pool",
    created_by: "Rahul Verma", created_at: "2026-01-05",
  },
  {
    id: "p4", project_name: "Sunrise Meadows", project_code: "SRM",
    location: "Electronic City", city: "Bangalore", state: "Karnataka",
    total_plots: 200, available_plots: 12, booked_plots: 150, registered_plots: 38,
    project_start_date: "2023-08-01", expected_possession_date: "2026-03-31",
    status: "Active", approval_status: "Approved",
    description: "Flagship township near IT corridor",
    created_by: "Priya Sharma", created_at: "2023-07-15",
  },
  {
    id: "p5", project_name: "Lake View Gardens", project_code: "LVG",
    location: "Whitefield", city: "Bangalore", state: "Karnataka",
    total_plots: 45, available_plots: 45, booked_plots: 0, registered_plots: 0,
    project_start_date: "2026-05-01", expected_possession_date: "2029-01-31",
    status: "On Hold", approval_status: "Approved",
    description: "Scenic plots overlooking Varthur Lake",
    created_by: "Rahul Verma", created_at: "2026-03-20",
  },
];

// ---- PLOTS ----
const facings = ["North", "South", "East", "West", "Corner", "Park Facing"];
const plotTypes = ["Residential", "Commercial"];
const plotStatuses = ["Available", "Booked", "Registered", "On Hold"];

function generatePlots() {
  const plots: any[] = [];
  const sectors = ["A", "B", "C", "D"];
  let id = 1;
  const projectPlotConfig = [
    { pid: "p1", pcode: "SKH", count: 12 },
    { pid: "p2", pcode: "GVE", count: 8 },
    { pid: "p4", pcode: "SRM", count: 10 },
  ];

  for (const cfg of projectPlotConfig) {
    for (let i = 1; i <= cfg.count; i++) {
      const sector = sectors[Math.floor(Math.random() * sectors.length)];
      const area = Math.floor(150 + Math.random() * 200);
      const rate = Math.floor(8000 + Math.random() * 7000);
      const statusIdx = i <= cfg.count * 0.5 ? 1 : i <= cfg.count * 0.7 ? 2 : 0;
      const status = cfg.pid === "p1" || cfg.pid === "p4" ? plotStatuses[statusIdx] : "Available";
      plots.push({
        id: `plot-${id}`,
        plot_number: `${cfg.pcode}-${sector}-${String(i).padStart(3, "0")}`,
        project_id: cfg.pid,
        project_name: mockProjects.find(p => p.id === cfg.pid)?.project_name || "",
        sector,
        plot_area: area,
        area_unit: "sqyd",
        facing: facings[Math.floor(Math.random() * facings.length)],
        plot_type: i % 8 === 0 ? "Commercial" : "Residential",
        rate_per_unit: rate,
        total_value: area * rate,
        status,
        approval_status: status === "On Hold" ? "Pending Approval" : "Approved",
        created_at: "2025-04-10",
      });
      id++;
    }
  }
  return plots;
}

export const mockPlots = generatePlots();

// ---- CUSTOMERS ----
export const mockCustomers = [
  { id: "c1", customer_name: "Rajesh Kumar Reddy", email: "rajesh.reddy@gmail.com", phone: "9876543210", address: "Flat 402, MG Road", city: "Hyderabad", state: "Telangana", assigned_rm: "Vikram Singh", total_bookings: 2, total_paid: 3200000, total_outstanding: 1800000, created_at: "2025-05-12" },
  { id: "c2", customer_name: "Anita Deshmukh", email: "anita.d@gmail.com", phone: "9823456789", address: "Villa 12, Jubilee Hills", city: "Hyderabad", state: "Telangana", assigned_rm: "Meena Iyer", total_bookings: 1, total_paid: 1500000, total_outstanding: 900000, created_at: "2025-06-03" },
  { id: "c3", customer_name: "Mohammed Irfan", email: "irfan.m@outlook.com", phone: "9765432100", address: "22, Infantry Road", city: "Bangalore", state: "Karnataka", assigned_rm: "Vikram Singh", total_bookings: 1, total_paid: 2800000, total_outstanding: 0, created_at: "2025-07-18" },
  { id: "c4", customer_name: "Priya Nair", email: "priya.nair@yahoo.com", phone: "9654321098", address: "Apt 8B, Koramangala", city: "Bangalore", state: "Karnataka", assigned_rm: "Deepak Joshi", total_bookings: 1, total_paid: 500000, total_outstanding: 2100000, created_at: "2025-08-22" },
  { id: "c5", customer_name: "Suresh Babu Gowda", email: "suresh.g@gmail.com", phone: "9543210987", address: "15, Banjara Hills", city: "Hyderabad", state: "Telangana", assigned_rm: "Meena Iyer", total_bookings: 3, total_paid: 7500000, total_outstanding: 3200000, created_at: "2025-04-05" },
  { id: "c6", customer_name: "Kavitha Srinivasan", email: "kavitha.s@gmail.com", phone: "9432109876", address: "303, HSR Layout", city: "Bangalore", state: "Karnataka", assigned_rm: "Arjun Mehta", total_bookings: 1, total_paid: 0, total_outstanding: 2600000, created_at: "2026-01-15" },
  { id: "c7", customer_name: "Venkat Rao Patil", email: "venkat.rao@gmail.com", phone: "9321098765", address: "67, Begumpet", city: "Hyderabad", state: "Telangana", assigned_rm: "Vikram Singh", total_bookings: 1, total_paid: 1800000, total_outstanding: 400000, created_at: "2025-09-10" },
  { id: "c8", customer_name: "Lakshmi Devi Sharma", email: "lakshmi.s@rediff.com", phone: "9210987654", address: "Plot 5, Gachibowli", city: "Hyderabad", state: "Telangana", assigned_rm: "Deepak Joshi", total_bookings: 1, total_paid: 3600000, total_outstanding: 0, created_at: "2025-03-28" },
];

// ---- RELATIONSHIP MANAGERS ----
export const mockRMs = [
  { id: "rm1", rm_name: "Vikram Singh", rm_code: "RM-VS", mobile: "9876500001", email: "vikram@skyline.com", designation: "Senior Sales Manager", joining_date: "2024-01-15", status: "Active", leads_assigned: 32, bookings_closed: 18, revenue: 48500000, active_bookings: 5, approval_status: "Approved" },
  { id: "rm2", rm_name: "Meena Iyer", rm_code: "RM-MI", mobile: "9876500002", email: "meena@skyline.com", designation: "Sales Executive", joining_date: "2024-06-01", status: "Active", leads_assigned: 24, bookings_closed: 12, revenue: 31200000, active_bookings: 4, approval_status: "Approved" },
  { id: "rm3", rm_name: "Deepak Joshi", rm_code: "RM-DJ", mobile: "9876500003", email: "deepak@skyline.com", designation: "Sales Executive", joining_date: "2024-09-15", status: "Active", leads_assigned: 18, bookings_closed: 8, revenue: 22800000, active_bookings: 3, approval_status: "Approved" },
  { id: "rm4", rm_name: "Arjun Mehta", rm_code: "RM-AM", mobile: "9876500004", email: "arjun@skyline.com", designation: "Junior Sales Executive", joining_date: "2025-03-01", status: "Active", leads_assigned: 15, bookings_closed: 5, revenue: 13500000, active_bookings: 2, approval_status: "Approved" },
  { id: "rm5", rm_name: "Sneha Kulkarni", rm_code: "RM-SK", mobile: "9876500005", email: "sneha@skyline.com", designation: "Sales Executive", joining_date: "2025-01-10", status: "Active", leads_assigned: 20, bookings_closed: 9, revenue: 25600000, active_bookings: 3, approval_status: "Approved" },
  { id: "rm6", rm_name: "Ravi Teja P", rm_code: "RM-RT", mobile: "9876500006", email: "ravi@skyline.com", designation: "Junior Sales Executive", joining_date: "2025-08-01", status: "Inactive", leads_assigned: 8, bookings_closed: 2, revenue: 5200000, active_bookings: 0, approval_status: "Approved" },
];

// ---- BOOKINGS ----
export const mockBookings = [
  { id: "b1", booking_number: "BK-2025-00001", booking_date: "2025-05-20", project_id: "p1", project_name: "Skyline Heights", plot_id: "plot-1", plot_number: "SKH-A-001", customer_id: "c1", customer_name: "Rajesh Kumar Reddy", assigned_rm: "Vikram Singh", payment_plan_type: "Down Payment", plot_value: 2800000, discount: 0, final_value: 2800000, possession_date: "2027-06-30", booking_status: "Payment In Progress", approval_status: "Approved" },
  { id: "b2", booking_number: "BK-2025-00002", booking_date: "2025-06-10", project_id: "p1", project_name: "Skyline Heights", plot_id: "plot-2", plot_number: "SKH-B-002", customer_id: "c2", customer_name: "Anita Deshmukh", assigned_rm: "Meena Iyer", payment_plan_type: "Development Linked", plot_value: 2400000, discount: 50000, final_value: 2350000, possession_date: "2027-06-30", booking_status: "Payment In Progress", approval_status: "Approved" },
  { id: "b3", booking_number: "BK-2025-00003", booking_date: "2025-07-25", project_id: "p2", project_name: "Green Valley Enclave", plot_id: "plot-13", plot_number: "GVE-A-001", customer_id: "c3", customer_name: "Mohammed Irfan", assigned_rm: "Vikram Singh", payment_plan_type: "Down Payment", plot_value: 2900000, discount: 100000, final_value: 2800000, possession_date: "2028-01-15", booking_status: "Completed", approval_status: "Approved" },
  { id: "b4", booking_number: "BK-2025-00004", booking_date: "2025-09-01", project_id: "p4", project_name: "Sunrise Meadows", plot_id: "plot-21", plot_number: "SRM-C-001", customer_id: "c4", customer_name: "Priya Nair", assigned_rm: "Deepak Joshi", payment_plan_type: "Development Linked", plot_value: 2600000, discount: 0, final_value: 2600000, possession_date: "2026-03-31", booking_status: "Payment In Progress", approval_status: "Approved" },
  { id: "b5", booking_number: "BK-2025-00005", booking_date: "2025-04-15", project_id: "p1", project_name: "Skyline Heights", plot_id: "plot-3", plot_number: "SKH-C-003", customer_id: "c5", customer_name: "Suresh Babu Gowda", assigned_rm: "Meena Iyer", payment_plan_type: "Down Payment", plot_value: 3200000, discount: 200000, final_value: 3000000, possession_date: "2027-06-30", booking_status: "Completed", approval_status: "Approved" },
  { id: "b6", booking_number: "BK-2026-00006", booking_date: "2026-01-20", project_id: "p2", project_name: "Green Valley Enclave", plot_id: "plot-14", plot_number: "GVE-B-002", customer_id: "c6", customer_name: "Kavitha Srinivasan", assigned_rm: "Arjun Mehta", payment_plan_type: "Development Linked", plot_value: 2600000, discount: 0, final_value: 2600000, possession_date: "2028-01-15", booking_status: "Pending Approval", approval_status: "Pending Approval" },
  { id: "b7", booking_number: "BK-2025-00007", booking_date: "2025-10-05", project_id: "p4", project_name: "Sunrise Meadows", plot_id: "plot-22", plot_number: "SRM-A-002", customer_id: "c7", customer_name: "Venkat Rao Patil", assigned_rm: "Vikram Singh", payment_plan_type: "Down Payment", plot_value: 2200000, discount: 0, final_value: 2200000, possession_date: "2026-03-31", booking_status: "Payment In Progress", approval_status: "Approved" },
  { id: "b8", booking_number: "BK-2025-00008", booking_date: "2025-04-01", project_id: "p4", project_name: "Sunrise Meadows", plot_id: "plot-23", plot_number: "SRM-B-003", customer_id: "c8", customer_name: "Lakshmi Devi Sharma", assigned_rm: "Deepak Joshi", payment_plan_type: "Down Payment", plot_value: 3600000, discount: 0, final_value: 3600000, possession_date: "2026-03-31", booking_status: "Completed", approval_status: "Approved" },
  { id: "b9", booking_number: "BK-2025-00009", booking_date: "2025-06-28", project_id: "p1", project_name: "Skyline Heights", plot_id: "plot-4", plot_number: "SKH-D-004", customer_id: "c5", customer_name: "Suresh Babu Gowda", assigned_rm: "Meena Iyer", payment_plan_type: "Development Linked", plot_value: 3500000, discount: 150000, final_value: 3350000, possession_date: "2027-06-30", booking_status: "Payment In Progress", approval_status: "Approved" },
  { id: "b10", booking_number: "BK-2025-00010", booking_date: "2025-11-12", project_id: "p1", project_name: "Skyline Heights", plot_id: "plot-5", plot_number: "SKH-A-005", customer_id: "c1", customer_name: "Rajesh Kumar Reddy", assigned_rm: "Vikram Singh", payment_plan_type: "Down Payment", plot_value: 2200000, discount: 0, final_value: 2200000, possession_date: "2027-06-30", booking_status: "Booked", approval_status: "Approved" },
];

// ---- PAYMENT SCHEDULES (for booking b1) ----
export const mockPaymentSchedules: Record<string, any[]> = {
  b1: [
    { id: "ps1", stage_name: "Booking Amount", stage_order: 1, percentage: 10, amount_due: 280000, due_date: "2025-05-20", amount_received: 280000, balance: 0, status: "Paid", payment_mode: "Bank Transfer", reference: "HDFC-TXN-98234" },
    { id: "ps2", stage_name: "30-Day Payment", stage_order: 2, percentage: 80, amount_due: 2240000, due_date: "2025-06-19", amount_received: 1500000, balance: 740000, status: "Partial", payment_mode: "Cheque", reference: "CHQ-445566" },
    { id: "ps3", stage_name: "Possession Payment", stage_order: 3, percentage: 10, amount_due: 280000, due_date: "2027-06-30", amount_received: 0, balance: 280000, status: "Pending", payment_mode: "-", reference: "-" },
  ],
  b2: [
    { id: "ps4", stage_name: "Booking Amount", stage_order: 1, percentage: 10, amount_due: 235000, due_date: "2025-06-10", amount_received: 235000, balance: 0, status: "Paid", payment_mode: "UPI", reference: "UPI-REF-112233" },
    { id: "ps5", stage_name: "60-Day Installment", stage_order: 2, percentage: 30, amount_due: 705000, due_date: "2025-08-09", amount_received: 705000, balance: 0, status: "Paid", payment_mode: "Bank Transfer", reference: "SBI-TXN-44556" },
    { id: "ps6", stage_name: "120-Day Installment", stage_order: 3, percentage: 30, amount_due: 705000, due_date: "2025-10-08", amount_received: 500000, balance: 205000, status: "Overdue", payment_mode: "Cheque", reference: "CHQ-778899" },
    { id: "ps7", stage_name: "270-Day Installment", stage_order: 4, percentage: 20, amount_due: 470000, due_date: "2026-03-08", amount_received: 0, balance: 470000, status: "Pending", payment_mode: "-", reference: "-" },
    { id: "ps8", stage_name: "Possession Payment", stage_order: 5, percentage: 10, amount_due: 235000, due_date: "2027-06-30", amount_received: 0, balance: 235000, status: "Pending", payment_mode: "-", reference: "-" },
  ],
  b4: [
    { id: "ps9", stage_name: "Booking Amount", stage_order: 1, percentage: 10, amount_due: 260000, due_date: "2025-09-01", amount_received: 260000, balance: 0, status: "Paid", payment_mode: "Cash", reference: "CASH-001" },
    { id: "ps10", stage_name: "60-Day Installment", stage_order: 2, percentage: 30, amount_due: 780000, due_date: "2025-10-31", amount_received: 0, balance: 780000, status: "Overdue", payment_mode: "-", reference: "-" },
    { id: "ps11", stage_name: "120-Day Installment", stage_order: 3, percentage: 30, amount_due: 780000, due_date: "2025-12-30", amount_received: 0, balance: 780000, status: "Pending", payment_mode: "-", reference: "-" },
    { id: "ps12", stage_name: "270-Day Installment", stage_order: 4, percentage: 20, amount_due: 520000, due_date: "2026-05-29", amount_received: 0, balance: 520000, status: "Pending", payment_mode: "-", reference: "-" },
    { id: "ps13", stage_name: "Possession Payment", stage_order: 5, percentage: 10, amount_due: 260000, due_date: "2026-03-31", amount_received: 0, balance: 260000, status: "Pending", payment_mode: "-", reference: "-" },
  ],
};

// ---- LEADS ----
export const mockLeads = [
  { id: "l1", lead_name: "Arun Prasad", email: "arun.p@gmail.com", phone: "9888001122", source: "Walk-in", interested_project: "Skyline Heights", budget: 3000000, assigned_rm: "Vikram Singh", status: "Qualified", plot_preference: "North Facing, 200+ sqyd", created_at: "2026-04-01" },
  { id: "l2", lead_name: "Divya Ramesh", email: "divya.r@gmail.com", phone: "9888003344", source: "Online", interested_project: "Green Valley Enclave", budget: 2500000, assigned_rm: "Meena Iyer", status: "Contacted", plot_preference: "Corner plot, Residential", created_at: "2026-04-05" },
  { id: "l3", lead_name: "Sanjay Gupta", email: "sanjay.g@yahoo.com", phone: "9888005566", source: "Referral", interested_project: "Skyline Heights", budget: 3500000, assigned_rm: "Arjun Mehta", status: "New", plot_preference: "Park Facing, 250 sqyd", created_at: "2026-04-12" },
  { id: "l4", lead_name: "Fatima Begum", email: "fatima.b@outlook.com", phone: "9888007788", source: "Campaign", interested_project: "Royal Residency", budget: 4000000, assigned_rm: "Sneha Kulkarni", status: "Qualified", plot_preference: "Commercial, 300 sqyd", created_at: "2026-03-20" },
  { id: "l5", lead_name: "Karthik Narayan", email: "karthik.n@gmail.com", phone: "9888009900", source: "Walk-in", interested_project: "Sunrise Meadows", budget: 2200000, assigned_rm: "Deepak Joshi", status: "Converted", plot_preference: "East Facing, any size", created_at: "2025-12-15" },
  { id: "l6", lead_name: "Pooja Agarwal", email: "pooja.a@gmail.com", phone: "9888002211", source: "Online", interested_project: "Green Valley Enclave", budget: 2800000, assigned_rm: "Vikram Singh", status: "Contacted", plot_preference: "200 sqyd, Residential", created_at: "2026-04-10" },
  { id: "l7", lead_name: "Abdul Rahman", email: "abdul.r@gmail.com", phone: "9888004433", source: "Referral", interested_project: "Skyline Heights", budget: 3200000, assigned_rm: "Meena Iyer", status: "New", plot_preference: "West Facing, 180+ sqyd", created_at: "2026-04-15" },
  { id: "l8", lead_name: "Neha Jain", email: "neha.j@gmail.com", phone: "9888006655", source: "Campaign", interested_project: "Sunrise Meadows", budget: 2000000, assigned_rm: "Arjun Mehta", status: "Lost", plot_preference: "Budget plot, any facing", created_at: "2026-02-01" },
  { id: "l9", lead_name: "Ramesh Choudhary", email: "ramesh.c@rediff.com", phone: "9888008877", source: "Walk-in", interested_project: "Royal Residency", budget: 5000000, assigned_rm: "Sneha Kulkarni", status: "Qualified", plot_preference: "Premium corner, 300+ sqyd", created_at: "2026-04-08" },
  { id: "l10", lead_name: "Swathi Reddy", email: "swathi.r@gmail.com", phone: "9888000099", source: "Online", interested_project: "Green Valley Enclave", budget: 2600000, assigned_rm: "Deepak Joshi", status: "Contacted", plot_preference: "South Facing, 200 sqyd", created_at: "2026-04-18" },
];

// ---- PENDING APPROVALS ----
export const mockApprovals = [
  { id: "a1", type: "Project", name: "Royal Residency", submitted_by: "Rahul Verma", submitted_on: "2026-01-05", details: "New luxury project in Kompally, 60 plots" },
  { id: "a2", type: "Booking", name: "BK-2026-00006", submitted_by: "Arjun Mehta", submitted_on: "2026-01-20", details: "Kavitha Srinivasan — GVE-B-002 — ₹26,00,000" },
  { id: "a3", type: "Plot", name: "SKH-D-010", submitted_by: "Priya Sharma", submitted_on: "2026-04-14", details: "New plot in Sector D, 220 sqyd, ₹12,500/sqyd" },
  { id: "a4", type: "Plot", name: "SKH-D-011", submitted_by: "Priya Sharma", submitted_on: "2026-04-14", details: "New plot in Sector D, 185 sqyd, ₹13,000/sqyd" },
  { id: "a5", type: "RM", name: "Ananya Pillai", submitted_by: "Rahul Verma", submitted_on: "2026-04-10", details: "New Junior Sales Executive, joining 01-May-2026" },
  { id: "a6", type: "Booking", name: "BK-2026-00011", submitted_by: "Sneha Kulkarni", submitted_on: "2026-04-16", details: "Ramesh Choudhary — RYR-A-001 — ₹50,00,000 (pending project approval)" },
];

// ---- DOCUMENTS ----
export const mockDocuments = [
  { id: "d1", type: "ID Proof", name: "Aadhar Card", customer: "Rajesh Kumar Reddy", booking: "BK-2025-00001", uploaded_on: "2025-05-20", status: "Uploaded" },
  { id: "d2", type: "Address Proof", name: "Electricity Bill", customer: "Rajesh Kumar Reddy", booking: "BK-2025-00001", uploaded_on: "2025-05-20", status: "Uploaded" },
  { id: "d3", type: "Booking Agreement", name: "Signed Agreement", customer: "Rajesh Kumar Reddy", booking: "BK-2025-00001", uploaded_on: "2025-05-22", status: "Uploaded" },
  { id: "d4", type: "ID Proof", name: "PAN Card", customer: "Anita Deshmukh", booking: "BK-2025-00002", uploaded_on: "2025-06-10", status: "Uploaded" },
  { id: "d5", type: "Payment Receipt", name: "Booking Amount Receipt", customer: "Anita Deshmukh", booking: "BK-2025-00002", uploaded_on: "2025-06-11", status: "Uploaded" },
  { id: "d6", type: "Application Form", name: "-", customer: "Anita Deshmukh", booking: "BK-2025-00002", uploaded_on: "-", status: "Missing" },
];

// ---- ANALYSIS DATA ----
export const analysisSalesFunnel = [
  { stage: "Leads", count: 120 },
  { stage: "Contacted", count: 85 },
  { stage: "Qualified", count: 52 },
  { stage: "Opportunity", count: 38 },
  { stage: "Booking", count: 28 },
];

export const analysisBookingVelocity = [
  { month: "Nov 25", bookings: 5 },
  { month: "Dec 25", bookings: 3 },
  { month: "Jan 26", bookings: 7 },
  { month: "Feb 26", bookings: 4 },
  { month: "Mar 26", bookings: 8 },
  { month: "Apr 26", bookings: 6 },
];

export const analysisRevenueByProject = [
  { project: "Skyline Heights", revenue: 4.8 },
  { project: "Green Valley", revenue: 3.1 },
  { project: "Sunrise Meadows", revenue: 8.2 },
  { project: "Royal Residency", revenue: 0 },
];

export const analysisPlotAbsorption = [
  { name: "Booked", value: 218 },
  { name: "Available", value: 247 },
  { name: "Registered", value: 45 },
];

export const analysisCollectionTrend = [
  { month: "Nov 25", collected: 32, due: 45 },
  { month: "Dec 25", collected: 28, due: 38 },
  { month: "Jan 26", collected: 41, due: 52 },
  { month: "Feb 26", collected: 35, due: 48 },
  { month: "Mar 26", collected: 50, due: 55 },
  { month: "Apr 26", collected: 38, due: 60 },
];

// ---- HELPER: Format currency ----
export function formatCurrency(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
  return `₹${value.toLocaleString("en-IN")}`;
}

export function formatCurrencyFull(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}
