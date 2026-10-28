import { create } from "zustand";

const useScrollStore = create((set) => ({
  scrollHandler: null,
  setScrollHandler: (handler) => set(() => ({ scrollHandler: handler })),
}));

export default useScrollStore;
