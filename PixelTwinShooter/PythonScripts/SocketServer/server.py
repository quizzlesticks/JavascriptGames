from aiohttp import web
import socketio
#exec(open("../ConwayMapGen/gen.py").read())
#sio = socketio.AsyncServer(async_mode='aiohttp')
static_files = { '/': {'filename': '../../pixelshooter.html'}}
sio = socketio.AsyncServer()
app = web.Application()
sio.attach(app)

connected_users = {}

async def index(request):
    print(request)
    with open('../../dist/index.html') as f:
        return web.Response(text=f.read(), content_type='text/html')

async def bundle(request):
    print(request)
    with open('../../dist/bundle.js') as f:
        return web.Response(text=f.read(), content_type='text/javascript')

@sio.on('player_selected')
async def player_selected(sid, data):
    data['id'] = sid
    connected_users[str(sid)] = data
    await sio.emit('player_selected', connected_users, room='main_lobby')

@sio.on('player_move')
async def player_move(sid, data):
    connected_users[str(sid)]["pos"] = data["pos"]
    connected_users[str(sid)]["last_state"] = data["last_state"]
    data['id'] = sid
    await sio.emit('player_move', data, room='main_lobby', skip_sid=sid)


@sio.event
def connect(sid, environ):
        print("connect", sid)
        sio.enter_room(sid, 'main_lobby')

@sio.event
async def disconnect(sid):
        print("disconnect", sid)
        sio.leave_room(sid, 'main_lobby')
        if(str(sid) in connected_users):
            del connected_users[str(sid)]
        await sio.emit('player_left', sid, room='main_lobby')

app.router.add_get('/', index)
app.router.add_get('/bundle.js', bundle)
app.router.add_static('/fav/', path='../../favicon/')
app.router.add_static('/css/', path='../../dist/css')
app.router.add_static('/Spritesheets', path='../../dist/Spritesheets')
app.router.add_static('/Map', path='../../dist/Spritesheets/Map', show_index=True);

if __name__ == '__main__':
    web.run_app(app)
