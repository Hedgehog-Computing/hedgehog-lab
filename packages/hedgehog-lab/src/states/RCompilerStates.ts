import { atom } from "recoil";

export const compilerLoadingState = atom({
  key: "compilerLoading",
  default: false,
});

export const compilerResultState = atom({
  key: "compilerResult",
  default: {
    outputItem: [],
    outputString: "",
  },
});

export const compilerReFetchState = atom({
  key: "compilerReFetch",
  default: false,
});

export const compilerLiveModeState = atom({
  key: "compilerLiveMode",
  default: "off",
});
