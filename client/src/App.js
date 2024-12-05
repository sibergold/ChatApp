import { useState } from 'react';
import './App.css';
import Room from './components/Room'
import Chat from './components/Chat'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:5000')
function App() {
const [username,setUsername] = useState('')
const [room,setRoom] = useState('')
const [chatSecreen,setChatScreen] = useState(false)
  return (
    <div className="App">
      {
        !chatSecreen ? 
     <Room username={username} room={room} setUsername={setUsername} setRoom={setRoom} setChatScreen={setChatScreen} socket={socket}/>
     : 
     <Chat socket={socket} username={username} room={room} />
      }
    </div>
  );
}

export default App;
