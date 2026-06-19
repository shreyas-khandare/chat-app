import { useEffect, useRef, useState } from "react";

import { connectSocket, disconnectSocket } from "../services/socket";

export default function useSocket(token, onMessage) {
  const socketRef = useRef(null);

  const [socketStatus, setSocketStatus] = useState("Connecting");

  useEffect(() => {
    const socket = connectSocket(token);

    socketRef.current = socket;

    socket.on("connect", () => {
      setSocketStatus("Connected");
    });

    socket.on("disconnect", () => {
      setSocketStatus("Disconnected");
    });

    socket.io.on("reconnect_attempt", () => {
      setSocketStatus("Reconnecting...");
    });

    socket.on("newMessage", (msg) => {
      onMessage(msg);
    });

    return () => {
      socket.off("connect");

      socket.off("disconnect");

      socket.off("newMessage");

      disconnectSocket();
    };
  }, []);

  const sendMessage = (text) => {
    if (socketRef.current) {
      socketRef.current.emit("sendMessage", {
        text,
      });
    }
  };

  return {
    socketStatus,

    sendMessage,
  };
}
