import { create } from "zustand";

const useLoaderStore = create((set) => ({
  isLoading: true,
  isMidAnimationTl: false,
  updateLoaderState: (loaderState) => {
    set(() => {
      return {
        isLoading: loaderState,
      };
    });
  },
  updateAnimationState: (animationState) => {
    set(() => {
      return {
        isMidAnimationTl: animationState,
      };
    });
  },
}));

export default useLoaderStore;
