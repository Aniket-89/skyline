import os
import re

# Directory to scan
DIR = "/home/aniket/Desktop/projectSkyline/frontend/src"

# Color mappings (Green-tinted Light Theme -> Grayscale Light Theme)
COLOR_MAP = {
    "#f0fdf4": "#f8fafc",  # Green-50 -> Slate-50 (Neutral app bg)
    "#dcfce7": "#e2e8f0",  # Green-100 -> Slate-200 (Neutral borders)
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
                
                for green_hex, gray_hex in COLOR_MAP.items():
                    # Case-insensitive replace for hex colors
                    content = re.sub(re.escape(green_hex), gray_hex, content, flags=re.IGNORECASE)
                
                if content != original_content:
                    with open(filepath, "w", encoding="utf-8") as f:
                        f.write(content)
                    updated_files.append(filepath)
    
    print(f"✅ Replaced colors in {len(updated_files)} files.")
    for f in updated_files:
        print(f"  - {f.replace(DIR, '')}")

if __name__ == "__main__":
    replace_colors()
