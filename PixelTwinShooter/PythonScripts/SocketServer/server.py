from aiohttp import web
import socketio

#sio = socketio.AsyncServer(async_mode='aiohttp')
static_files = { '/': {'filename': '../../pixelshooter.html'}}
sio = socketio.AsyncServer()
app = web.Application()
sio.attach(app)

async def index(request):
    print(request)
    with open('../../pixelshooter.html') as f:
        return web.Response(text=f.read(), content_type='text/html')

@sio.on('message')
def handleMessage(sid, data):
    print("Message: " + str(sid) + ": " + str(data))

@sio.on('player_pos_update')
def handleMessage(sid, data):
    print("Player_pos_update: " + sid + ": " + str(data))

@sio.event
def connect(sid, environ):
        print("connect", sid)

@sio.event
def disconnect(sid):
        print("disconnect", sid)

app.router.add_get('/', index)
app.router.add_static('/css/', path='../../css')
app.router.add_static('/js/', path='../../js')
app.router.add_static('/Spritesheets', path='../../Spritesheets')

if __name__ == '__main__':
    web.run_app(app)
