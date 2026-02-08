#!/usr/bin/env python3
"""
Generate a simple manifest JSON for images placed in `images/instagram/`.

This script scans the folder and writes `data/instagram.json` with a list
of image entries suitable for the existing client-side gallery.

Usage:
  python scripts/generate_manifest.py --src images/instagram --out data/instagram.json

Run this locally after you add or remove images, then commit the generated
`data/instagram.json` so the static site can render the gallery without tokens.
"""
import os
import json
import argparse

IMAGE_EXTS = {'.jpg', '.jpeg', '.png', '.gif', '.webp'}

def is_image(name):
    _, ext = os.path.splitext(name.lower())
    return ext in IMAGE_EXTS

def main():
    p = argparse.ArgumentParser()
    p.add_argument('--src', default='images/instagram', help='Source images folder')
    p.add_argument('--out', default='data/instagram.json', help='Output manifest path')
    args = p.parse_args()

    if not os.path.isdir(args.src):
        print(f"Source folder '{args.src}' not found. Create it and add images.")
        return

    items = []
    for name in sorted(os.listdir(args.src)):
        if not is_image(name):
            continue
        rel = os.path.join(args.src, name).replace('\\','/')
        items.append({
            'file': rel,
            'caption': '',
            'permalink': ''
        })

    os.makedirs(os.path.dirname(args.out) or '.', exist_ok=True)
    with open(args.out, 'w', encoding='utf-8') as fh:
        json.dump({'data': items}, fh, ensure_ascii=False, indent=2)

    print(f'Wrote {len(items)} items to {args.out}')

if __name__ == '__main__':
    main()
