#!/usr/bin/env python3
"""Local dev server with GitHub Pages-style clean URLs.

`python -m http.server` only serves exact filenames, so links like
href="generate_a_seed" 404 locally even though GitHub Pages resolves
them to generate_a_seed.html in production. This wraps the stdlib
server to do the same fallback.
"""
import http.server
import os
import socketserver
import sys


class CleanUrlHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        full_path = super().translate_path(path)
        if not os.path.exists(full_path):
            root, ext = os.path.splitext(full_path)
            if not ext and os.path.exists(full_path + ".html"):
                return full_path + ".html"
        return full_path


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    with socketserver.TCPServer(("", port), CleanUrlHandler) as httpd:
        print(f"Serving HTTP on 0.0.0.0 port {port} (clean URLs enabled) ...")
        httpd.serve_forever()


if __name__ == "__main__":
    main()
