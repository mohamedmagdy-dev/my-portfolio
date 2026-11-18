import { create } from "zustand";

const isUserWentBefore = window.sessionStorage.getItem("went_before")

const useLoaderStore = create((set) => ({
  isLoading: isUserWentBefore ? false : true,
  isMidAnimationTl: isUserWentBefore ? true : false,
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
