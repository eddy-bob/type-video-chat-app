import { ref } from "vue";
export const initiateCall = (peerId: string, socket: any, userId: any) => {
  console.log(peerId, userId);
  socket.emit("private_video_call_init", { userId, peerId });
  console.log("starting call");
};
export const answerCall = (
  socket: any,
  callerId: any,
  peerId: string,
  callId: any,
  recieverId: string
) => {
  console.log({
    callerId,
    callId,
    peerId,
  });
  socket.emit("private_video_call_answer", {
    callerId,
    callId,
    peerId,
    recieverId,
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
