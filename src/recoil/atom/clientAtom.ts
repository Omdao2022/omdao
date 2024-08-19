import { atom } from 'recoil';

export const clientAtom = atom({
  key: "clientState",
  default: {userId: ""},
})