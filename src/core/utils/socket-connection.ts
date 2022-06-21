import SocketIO from 'socket.io-client';
import { Socket } from "socket.io-client"
import { getItem } from "../../core/utils/storage.helper";
import VueSocketIO from "vue-socket.io"

// socketio connection


class SocketioService {
       socket!: Socket;
       constructor() { }

       setupSocketConnection() {

              let user: { rsa: string | undefined } = getItem(import.meta.env.VITE_ACCESSTK);
              if (user && user.rsa) {
                     this.socket = SocketIO('http://localhost:5000', {
                            extraHeaders: {
                                   Authorization: user.rsa,
                            },
                     });
                     new VueSocketIO({
                            debug: true,
                            connection: this.socket
                     })

              }
       };
       disconnect() {
              if (this.socket) {
                     this.socket.disconnect();
              }
       }
}

export default new SocketioService();