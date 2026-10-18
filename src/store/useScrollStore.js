import { create } from "zustand";

const useScrollStore = create((set) => ({
  isScrollPaused: false,
  scrollHandler: null,
  setScrollHandler: (handler) => set(() => ({ scrollHandler: handler })),
  setIsScrollPaused: (scrollState) =>
    set(() => ({ isScrollPaused: scrollState })),
}));

export default useScrollStore;
