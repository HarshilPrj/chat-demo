import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_SOCKET_URL);

function App() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const chatBoxRef = useRef(null);

    useEffect(() => {
        socket.emit("JOIN_ROOM", { id: process.env.REACT_APP_ROOM_NAME });

        socket.on("MESSAGE", (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
    }, []);

    useEffect(() => {
        // Scroll to the bottom whenever messages change
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit("SEND_MESSAGE", message);
        setMessage("");
    };

    return (
        <div className=" flex justify-center flex-col w-[50%] ml-20">
            <h1 className="text-2xl font-bold mb-4 p-4 text-green-500">Chat Room</h1>
            <div
                ref={chatBoxRef}
                className="flex flex-col border border-solid border-gray-300 rounded-lg overflow-auto h-[500px] p-4 mb-4 bg-white custom-scrollbar gap-4"
            >
                {messages.map((msg, index) => (
                    <div key={index} className="mb-2 p-2 bg-gray-100 rounded-lg">
                        {msg}
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage} className="flex">
                <div className="w-full flex gap-6">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message here..."
                        className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    />
                    <button
                        type="submit"
                        disabled={!message}
                        class="text-white bg-green-700 cursor-pointer font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
}

export default App;
