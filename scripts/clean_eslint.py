import re

# Format of warning output: "Unused eslint-disable directive (no problems were reported from '...')"
unused_map = {
    "src/app/(dashboard)/analysis/page.tsx": ["@typescript-eslint/no-explicit-any"],
    "src/app/(dashboard)/approvals/page.tsx": ["@typescript-eslint/no-explicit-any"],
    "src/app/(dashboard)/bookings/[id]/page.tsx": ["@typescript-eslint/no-explicit-any", "@typescript-eslint/no-unused-vars"],
    "src/app/(dashboard)/bookings/page.tsx": ["@typescript-eslint/no-explicit-any", "@typescript-eslint/no-unused-vars"],
    "src/app/(dashboard)/customers/[id]/page.tsx": ["@typescript-eslint/no-explicit-any"],
    "src/app/(dashboard)/customers/page.tsx": ["@typescript-eslint/no-explicit-any", "@typescript-eslint/no-unused-vars"],
    "src/app/(dashboard)/dashboard/page.tsx": ["@typescript-eslint/no-explicit-any"],
    "src/app/(dashboard)/leads/page.tsx": ["@typescript-eslint/no-explicit-any"],
    "src/app/(dashboard)/projects/[id]/page.tsx": ["@typescript-eslint/no-explicit-any"],
    "src/app/(dashboard)/projects/page.tsx": ["@typescript-eslint/no-explicit-any"],
    "src/app/(dashboard)/reports/page.tsx": ["@typescript-eslint/no-explicit-any"],
    "src/app/(dashboard)/rms/page.tsx": ["@typescript-eslint/no-explicit-any"],
    "src/components/layout/Sidebar.tsx": ["@typescript-eslint/no-explicit-any", "@typescript-eslint/no-unused-vars"],
    "src/components/ui/PageHeader.tsx": ["@typescript-eslint/no-explicit-any"],
    "src/lib/mockData.ts": ["@typescript-eslint/no-explicit-any"]
}

for file_path, unused_rules in unused_map.items():
    full_path = f"/home/aniket/Desktop/projectSkyline/frontend/{file_path}"
    with open(full_path, "r", encoding="utf-8") as f:
        content = f.read()

    # The string we injected previously was: 
    # /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
    
    # If both were unused, we remove the entire line.
    if len(unused_rules) == 2:
        content = content.replace("/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */\n", "")
    else:
        # If only no-explicit-any is unused, change the line to only disable no-unused-vars
        content = content.replace("/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */", "/* eslint-disable @typescript-eslint/no-unused-vars */")
        
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Removed unused eslint-disable directives.")
