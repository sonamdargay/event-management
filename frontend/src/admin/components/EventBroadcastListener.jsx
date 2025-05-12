import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001");

const EventBroadCastListener = () => {
  useEffect(() => {
    socket.on("eventUpdated", (data) => {
      alert("An event has been updated please refresh the page");
    });

    return () => {
      socket.off("eventUpdated");
    };
  }, []);

  return null;
};

export default EventBroadCastListener;
