// import { useRecoilState } from 'recoil';
// import jwt_decode from "jwt-decode";
// import { userAtom } from '../../recoil/atom/userAtom';
// interface DecodedToken {
//   firstName: string;
//   lastName: string;
//   email: string;
//   birthday: string;
//   country: string;
//   location: string;
//   address: string;
//   zipcode: string;
//   kycPassed: boolean;
//   // Add any other fields that are in your JWT
// }
// // eslint-disable-next-line react-hooks/rules-of-hooks
// const [userState, setUserState] = useRecoilState(userAtom);

// const setUserInfo = (token: string) => {

//   if (token) {
//     try {
//       const decoded = jwt_decode<DecodedToken>(token);

//       // Update the user state with the decoded data
//       setUserState({
//         firstName: decoded.firstName,
//         lastName: decoded.lastName,
//         email: decoded.email,
//         birthday: new Date(decoded.birthday),
//         country: decoded.country,
//         location: decoded.location,
//         address: decoded.address,
//         zipcode: decoded.zipcode,
//         kycPassed: decoded.kycPassed,
//         joined: true,
//       });
//     } catch (error) {
//       console.error("Error decoding token:", error);
//     }
//   }
// };

// export default setUserInfo;
