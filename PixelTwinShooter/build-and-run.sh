#!/bin/bash
cls # not needed, just clears the command line
npm install
npm run build
cd PythonScripts/SocketServer && python server.py
