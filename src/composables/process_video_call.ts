import { ref } from "vue";
export const initiateCall = (
  peerId: string,

  socket: any,
  userId: any
) => {
  socket.emit("private_video_call_init", { userId, peerId });
};
export const answerCall = (
  socket: any,
  callerId: any,
  peerId: string,
  callId: any
) => {
  socket.emit("private_video_call_answer", {
    callerId,
    callId,
    peerId,
  });
};
export const rejectCall = (
  socket: any,
  callerId: any,
  peerId: string,
  callId: any
) => {
  socket.emit("private_video_call_reject", {
    callerId,
    callId,
    peerId,
  });
};
export const endCall = (
  socket: any,
  callerId: any,
  peerId: string,
  callId: any
) => {
  socket.emit("private_video_call_end", {
    callerId,
    callId,
    peerId,
  });
};
export const processCall = (
  peerId: string,
  stream: MediaStream,
  peerConnection: any
) => {
  const call = peerConnection.call(peerId, stream);
  return call;
};
