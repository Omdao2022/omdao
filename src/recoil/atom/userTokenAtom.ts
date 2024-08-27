import { atom } from 'recoil';

export const userTokenAtom = atom({
  key: "userToken",
  default: {userToken: localStorage.userToken},
})