import { atom } from "recoil";

export const sideBarOpenState = atom({
  key: "sideBarOpen",
  default: false,
});

export const resultFullScreenState = atom({
  key: "resultFullScreen",
  default: false,
});
