import { user as userStore, useAuthStore } from "../store/index";
import { io } from "socket.io-client";
import { getItem } from "../../core/utils/storage.helper";
import VueSocketIO from "vue-3-socket.io";

// socketio connection

class SocketioService {
  socket!: any;
  userStore!: any;
  authStore!: any;
  constructor() {}

  async setupSocketConnection() {
    this.userStore = userStore();
    this.authStore = useAuthStore();

    let user: { rsa: string | undefined } = getItem(
      import.meta.env.VITE_ACCESSTK
    );
    if (user && user.rsa) {
      this.socket = io(
        import.meta.env.prod==true
          ? "https://eddychatapp.herokuapp.com:5000"
          : "http://localhost:5000",
        {
          extraHeaders: {
            Authorization: user.rsa,
          },
          
        }
      );

      // update active status
      return await this.userStore
        .updateProfile({ isLoggedIn: true })
        .then((res: any) => {
          console.log(res.data.data);
          this.authStore.active = true;
          console.log(res, this.socket);
          return Promise.resolve([res, this.socket]);
        })
        .catch((err: any) => {
          return Promise.reject(err);
        });
    }
  }
  async disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      // update active status
      return await this.userStore
        .updateProfile({ isLoggedIn: false })
        .then((res: any) => {
          this.authStore.active = true;
          return Promise.resolve(res);
        })
        .catch((err: any) => {
          return Promise.reject(err);
        });
    }
  }
}

export default new SocketioService();
