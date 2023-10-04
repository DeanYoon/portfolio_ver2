import { atom } from "recoil";

export const promptInput = atom({
  key: "promptInput",
  default: "",
});

export const language = atom({
  key: "language",
  default: true,
});
