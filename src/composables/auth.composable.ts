// imports
import { ref } from "vue";

import { notify } from "@kyvg/vue3-notification";

// variables

const success = ref("");
const error = ref("");
export const useAuth = (
  
  store: any,
  loading: { value: boolean }
): any => {
  store
    .then((res: Response | any) => {
      success.value = res.message;
      // set the loading notice to false
      setTimeout(() => {
        loading.value = false;
      }, 1000);
      //   send out notification to tell that the signup was successful
      notify({
        type: "success",
        title: "Success",
        text: "Successful",
      });
    })
    .catch((err: any) => {
      setTimeout(() => {
        loading.value = false;
      }, 1000);

      if (err.data && err.data.Error) {
        console.log(err.data.Error);
        error.value =
          err.data.Error === import.meta.env.VITE_GOOGLE_MAP_ERROR
            ? "Network error"
            : err.data.Error;
        notify({
          type: "error",
          title: "Error",
          text:
            err.data.Error === import.meta.env.VITE_GOOGLE_MAP_ERROR
              ? "Network error"
              : err.data.Error,
        });
      } else {
        notify({
          type: "error",
          title: "Error",
          text: err,
        });
      }
    });
  return [error, success];
};
