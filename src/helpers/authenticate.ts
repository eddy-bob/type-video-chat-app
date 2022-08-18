import { getItem } from '../core/utils/storage.helper';
import { VueCookieNext } from "vue-cookie-next"

const isAuthenticated = (): boolean => {

       if (getItem(import.meta.env.VITE_ACCESSTK)) {

              return true
       }
       else return false
}
export default isAuthenticated