import { atom } from 'recoil';

export const tabAtom = atom({
  key: "tabAtom",
  default: {
    tabId: 0
  }
});