#!/usr/bin/env python3
"""
Local preview for the VouchTrack site (after `npm run build`).

Serves dist/ the way Vercel does: clean URLs (/pricing -> pricing.html),
directory indexes and the custom 404. For live editing use `npm run dev`.
"""
import http.server
import os
import socketserver
import urllib.parse

PORT = 8000
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dist")


class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=ROOT, **k)

    def do_GET(self):
        path = urllib.parse.urlparse(self.path).path
        fs_path = self.translate_path(path)
        if os.path.exists(fs_path):
            return super().do_GET()
        if os.path.exists(fs_path + ".html"):
            self.path = path + ".html"
            return super().do_GET()
        try:
            with open(os.path.join(ROOT, "404.html"), "rb") as f:
                body = f.read()
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        except OSError:
            return super().do_GET()


if __name__ == "__main__":
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), CleanURLHandler) as httpd:
        print("VouchTrack preview running at http://localhost:%d (serving dist/)" % PORT)
        httpd.serve_forever()
