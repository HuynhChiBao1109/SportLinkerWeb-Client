import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

const API_BASE_URL = "http://localhost:3333";

interface Token {
  accessToken: string;
  refreshToken: string;
}

interface User {
  token: Token;
}

const getUserFromStorage = (): User | null => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? (JSON.parse(user) as User) : null;
  }
  return null;
};

const axiosClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Timeout after 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
// axiosClient.interceptors.request.use(
//   (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
//     const user = getUserFromStorage();
//     if (user) {
//       const { accessToken, refreshToken } = user.token;
//       config.headers.Authorization = `Bearer ${accessToken}`;
//       config.headers.Refresh = refreshToken;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Refresh Access Token Function
// const refreshAccessToken = async (): Promise<string> => {
//   const user = getUserFromStorage();
//   if (!user || !user.token.refreshToken) {
//     throw new Error("No refresh token available");
//   }

//   const response = await axios.post<{ metadata: string }>(
//     `${API_BASE_URL}/auths/getAccessToken`,
//     {
//       refreshToken: user.token.refreshToken,
//     }
//   );

//   const newAccessToken = response.data.metadata;
//   user.token.accessToken = newAccessToken;

//   // Update localStorage with new access token
//   if (typeof window !== "undefined") {
//     localStorage.setItem("user", JSON.stringify(user));
//   }

//   return newAccessToken;
// };

// // Response Interceptor
// axiosClient.interceptors.response.use(
//   (response: AxiosResponse): AxiosResponse => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 &&
//       error.response.data.message === "jwt expired"
//     ) {
//       try {
//         const newAccessToken = await refreshAccessToken();
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return axiosClient(originalRequest);
//       } catch (refreshError) {
//         if (typeof window !== "undefined") {
//           localStorage.removeItem("user");
//           window.location.href = "/login";
//         }
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosClient;
