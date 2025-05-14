import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_API_BASE_URL);

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
