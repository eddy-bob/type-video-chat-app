import { ref } from "vue";
// import ScreenSizeDetector from "screen-size-detector";
const screenResize = () => {
  const screen = ref(document.documentElement.clientWidth);
  window.addEventListener("resize", () => {
    screen.value = document.documentElement.clientWidth;
  });
  console.log(screen.value);
  return screen.value;
  // const screen = new ScreenSizeDetector(); // Default options
};
export default screenResize;
