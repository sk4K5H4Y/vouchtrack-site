#!/usr/bin/env python3
"""
Local preview for the VouchTrack site.

Mimics Vercel's behavior so the site looks exactly like production:
  - clean URLs:  /pricing  ->  pricing.html
  - directories: /features ->  features/index.html
  - custom 404 page

Usage:
    python3 preview.py
Then open  http://localhost:8000  in your browser. Ctrl+C to stop.
"""
import http.server
import os
import socketserver
import urllib.parse

PORT = 8000


class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        path = urllib.parse.urlparse(self.path).path
        fs_path = self.translate_path(path)

        # Exists as file or directory -> default handling
        # (directories redirect to trailing slash, then serve index.html)
        if os.path.exists(fs_path):
            return super().do_GET()

        # Vercel cleanUrls: /pricing -> pricing.html
        if os.path.exists(fs_path + ".html"):
            self.path = path + ".html"
            return super().do_GET()

        # Custom 404, like production
        try:
            with open(self.translate_path("/404.html"), "rb") as f:
                body = f.read()
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        except OSError:
            return super().do_GET()


if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), CleanURLHandler) as httpd:
        print("VouchTrack preview running at http://localhost:%d" % PORT)
        print("Press Ctrl+C to stop.")
        httpd.serve_forever()
