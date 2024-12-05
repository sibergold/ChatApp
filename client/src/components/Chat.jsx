import React, { useEffect, useState } from "react";

const Chat = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  useEffect(() => {
    socket.on("messageReturn", (data) => {
      setMessageList((prev) => [...prev, data]);
    });
  }, [socket]);
  const sendMessage = async () => {
    const messageContent = {
      username: username,
      message: message,
      room: room,
      date:
        new Date(Date.now).getHours() + ":" + new Date(Date.now).getMinutes(),
    };
    await socket.emit("message", messageContent);
    setMessageList((prev) => [...prev, messageContent]);

    setMessage("");
  };
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-1/3 h-[600px] bg-white relative">
        <div className="w-full h-16 bg-gray-700 flex items-center p-3">
          <div className="w-12 h-12 bg-white rounded-full"></div>
        </div>
        <div className="w-full h-[400px] overflow-y-auto">
          {messageList &&
            messageList.map((msg, i) => (
              <div className={`${username === msg.username ? 'flex justify-end' : ''}`}>
                <div className={`${username === msg.username ? 'bg-green-600' : 'bg-blue-600'} w-2/3 h-12 text-white  m-2 rounded-xl rounded-br-none p-2`}>
                  <div>{msg.message}</div>
                  <div className="w-full flex justify-end text-xs">
                    {msg.username}
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="message send"
            className="w-3/4 h-12 border p-3 outline-none"
          />
          <button
            onClick={sendMessage}
            className="w-1/4 bg-indigo-600 text-white h-12 hover:opacity-70"
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
