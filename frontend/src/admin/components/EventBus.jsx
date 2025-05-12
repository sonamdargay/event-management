// import mitt from 'mitt';

// export const eventBus = mitt();


// const broadcastChannel = new BroadcastChannel("event_broadcast_channel");

// eventBus.on("broadcastEmitted", (data) => {
//   broadcastChannel.postMessage({ type: "broadcastEmitted", payload: data });
// });

// broadcastChannel.onmessage = (event) => {
//   const { type, payload } = event.data;
//   eventBus.emit(type, payload);
// };