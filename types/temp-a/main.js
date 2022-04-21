import setScrollWatcher from "scroll-watcher";

const cleanupScrollWatcher = setScrollWatcher({
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
  cleanupScrollWatcher();
});
