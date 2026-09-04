#!/usr/bin/env python3
"""
Convert raw character sprites in koraku/ to optimized transparent WebP images.
Limits maximum dimension to 1920px (LANCZOS) with quality=85 and method=6.
"""

import os
import shutil
from PIL import Image

IMAGES = [
    "小樂-預設.png",
    "小樂-2P色.png",
    "泳裝小樂.png",
    "泳裝小樂_西瓜.png",
    "凝視小樂.png"
]

MAX_DIM = 1920
BASE_DIR = os.path.join(os.path.dirname(__file__), "..", "koraku")
ARCHIVE_DIR = os.path.join(BASE_DIR, "raw_png_archive")

def main():
    os.makedirs(ARCHIVE_DIR, exist_ok=True)
    
    for filename in IMAGES:
        base_name, _ = os.path.splitext(filename)
        src_path = os.path.join(BASE_DIR, filename)
        archive_path = os.path.join(ARCHIVE_DIR, filename)
        
        if os.path.exists(src_path):
            img_to_open = src_path
        elif os.path.exists(archive_path):
            img_to_open = archive_path
        else:
            print(f"[WARN] File not found: {filename}")
            continue
            
        with Image.open(img_to_open) as img:
            orig_w, orig_h = img.size
            orig_size = os.path.getsize(img_to_open) / 1024
            
            scale = min(1.0, MAX_DIM / max(orig_w, orig_h))
            new_w = int(orig_w * scale)
            new_h = int(orig_h * scale)
            
            if scale < 1.0:
                resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
            else:
                resized = img
                
            out_path = os.path.join(BASE_DIR, f"{base_name}.webp")
            resized.save(out_path, "WEBP", quality=85, method=6)
            new_size = os.path.getsize(out_path) / 1024
            
            print(f"[CONVERT] {filename} ({orig_w}x{orig_h}, {orig_size:.1f} KB) -> {base_name}.webp ({new_w}x{new_h}, {new_size:.1f} KB)")
            
        if os.path.exists(src_path) and src_path != archive_path:
            shutil.move(src_path, archive_path)

if __name__ == "__main__":
    main()
