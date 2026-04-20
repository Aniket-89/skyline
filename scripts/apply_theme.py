import os
import re

# Directory to scan
DIR = "/home/aniket/Desktop/projectSkyline/frontend/src"

# Color mappings (Dark Theme -> Light Green Theme)
COLOR_MAP = {
    # Backgrounds
    "#0f172a": "#f0fdf4",  # Slate-900 -> Tailwind Green-50 (Soft green app bg)
    "#1e293b": "#ffffff",  # Slate-800 -> White (Card bg)
    
    # Texts
    "#f1f5f9": "#0f172a",  # Slate-100 -> Slate-900 (Primary dark text)
    "#94a3b8": "#475569",  # Slate-400 -> Slate-600 (Secondary text)
    "#64748b": "#475569",  # Slate-500 -> Slate-600 (Secondary text)
    
    # Borders
    "#334155": "#dcfce7",  # Slate-700 -> Green-100 (Borders / dividers)
    
    # Accents (Indigo/Violet/Blue -> Green shades)
    "#6366f1": "#16a34a",  # Indigo-500 -> Green-600 (Primary accent)
    "#4f46e5": "#15803d",  # Indigo-600 -> Green-700 (Darker accent)
    "#818cf8": "#22c55e",  # Indigo-400 -> Green-500 (Lighter accent)
    "#8b5cf6": "#10b981",  # Violet-500 -> Emerald-500
    "#0ea5e9": "#34d399",  # Sky-500 -> Emerald-400
}

def replace_colors():
    updated_files = []
    
    for root, dirs, files in os.walk(DIR):
        for file in files:
            if file.endswith((".tsx", ".ts", ".css")):
                filepath = os.path.join(root, file)
                
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read()
                
                original_content = content
                
                for dark_hex, light_hex in COLOR_MAP.items():
                    # Case-insensitive replace for hex colors
                    content = re.sub(re.escape(dark_hex), light_hex, content, flags=re.IGNORECASE)
                
                if content != original_content:
                    with open(filepath, "w", encoding="utf-8") as f:
                        f.write(content)
                    updated_files.append(filepath)
    
    print(f"✅ Replaced colors in {len(updated_files)} files.")
    for f in updated_files:
        print(f"  - {f.replace(DIR, '')}")

if __name__ == "__main__":
    replace_colors()
