import { atom } from 'recoil';

export const userAtom = atom({
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