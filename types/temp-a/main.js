import createScrollWatcher from "scroll-watcher";
import { on } from "@local/util";

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

on(window, "beforeunload", () => {
  scrollWatcher.destroy();
});
