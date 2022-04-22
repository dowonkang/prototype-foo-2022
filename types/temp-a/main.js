import createScrollWatcher from "scroll-watcher";

const scrollWatcher = createScrollWatcher({
  onScrollStart(scroll) {
    console.log("onScrollStart", scroll);
  },
  onScroll(scroll) {
    console.log("onScroll", scroll);
  },
  onScrollEnd(scroll) {
    console.log("onScrollEnd", scroll);
  },
});

window.addEventListener("beforeunload", () => {
  scrollWatcher.destroy();
});
