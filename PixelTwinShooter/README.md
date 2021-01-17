# Server
The server requires python 3.6+, socket.io for python, and ahttpio.

You can get python3 using:
```bash
sudo  apt install python3
```
You can use pip3 to get the other packages:
```bash
sudo apt install python3-pip
```
You can download socket.io using:
```bash
pip3 install python-socketio
```
You can download ahttpio with various speedup libraries using:
```bash
pip3 install aiohttp[speedups]
```

Then cd into the /JavascriptGames/PixelTwinShooter/PythonScripts/SocketServer and run
```bash
python3 socket.py
```

Finally, connect on a browser by going to localhost:8080 or by connecting to the IP address of the server running the socket.py script.
