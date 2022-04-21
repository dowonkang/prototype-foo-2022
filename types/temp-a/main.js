import setScrollWatcher from "scroll-watcher";

const cleanup = setScrollWatcher({
  onScroll(scroll) {
    console.log(scroll);
  },
});
console.log("Hello World!");
