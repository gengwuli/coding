"""
python file.py
display logs 
"""
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
import commands
import re

class S(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        s = commands.getstatusoutput('cd ~/coding && docker-compose logs --tail=50')[1]
        res = '\n'.join([re.sub(r'\|.*?\[0m','|',re.sub(r'^.*?\d+m','',x)) for x in s.split('\n')])
        self.wfile.write('<pre>'+res+'</pre>')
  
def run(server_class=HTTPServer, handler_class=S, port=8182):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    httpd.serve_forever()

if __name__ == "__main__":
        run()
