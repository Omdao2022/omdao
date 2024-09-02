import { atom } from 'recoil';
export interface UserState {
  firstName: string;
  lastName: string;
  email: string;
  birthday: Date;
  country: string;
  location: string;
  address: string;
  zipcode: string;
  kycPassed: boolean;
  joined: boolean;
}

export const userAtom = atom<UserState>({
  key: "userAtom",
  default: {
    firstName: 'John',
    lastName: 'Doe',
    email:'example@mail.com',
    birthday: new Date("1990-01-01"),
    country: 'United States',
    location: 'Texas',
    address: '1710 Kenwick Pl',
    zipcode: '1234',
    kycPassed: false,
    joined: false
  }
});