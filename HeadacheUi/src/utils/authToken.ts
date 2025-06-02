// import { keyToken } from "@/mocks/other.mock";

// interface TokenData {
//     value: string;
//     expires: number;
// }

// export const setToken = (token: string): void => {
//     const now = new Date();
//     const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

//     localStorage.setItem(keyToken.key, JSON.stringify({
//         value: token,
//         expires: endOfDay.getTime()
//     }));
// };

// export const getValidToken = (): string | null => {
//     const tokenData = localStorage.getItem(keyToken.key);

//     if (tokenData) {
//         const parsedData: TokenData = JSON.parse(tokenData);
//         const now = new Date().getTime();

//         if (now < parsedData.expires) {
//             return parsedData.value;
//         } else {
//             localStorage.removeItem(keyToken.key);
//         }
//     }
//     return null;
// };
