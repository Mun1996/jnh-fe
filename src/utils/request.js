import axios from "axios";
import setting from "../../data/setting.json";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function useRequest() {
  const navigate = useNavigate();

  const request = useCallback(() => {
    const axiosInstance = axios.create({
      baseURL: `${setting.BASE_URL}`,
      validateStatus: () => true,
    });

    // 请求拦截器
    axiosInstance.interceptors.request.use(
      (config) => {
        try {
          const storedUser = localStorage.getItem("user");
          let token = "";
          if (storedUser && storedUser !== "null") {
            token = JSON.parse(storedUser)?.token || "";
          }
          config.headers["Authorization"] = "Bearer " + token;
          return config;
        } catch (error) {
          console.error("Error retrieving storedUser:", error);
          return Promise.reject(error);
        }
      },
      (error) => {
        console.log("Request error", error);
        return Promise.reject(error);
      }
    );

    // 刷新 token 的函数
    const refreshAuthToken = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const userInfo = storedUser && storedUser !== "null" ? JSON.parse(storedUser) : null;

        if (userInfo?.token) {
          const res = await axios.post(
            `${setting.BASE_URL}/auth/refresh`,
            null,
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
            }
          );

          if (res.status === 200) {
            const newToken = res.data.token;
            localStorage.setItem("user", JSON.stringify(res.data));
            return newToken;
          }
        }
        return null;
      } catch (error) {
        console.error("Error refreshing token:", error);
        return null;
      }
    };

    // 响应拦截器
    axiosInstance.interceptors.response.use(
      async (response) => {
        if ([200, 201, 204].includes(response.status)) {
          return response.data;
        } else if (response.status === 401) {
          // const newToken = await refreshAuthToken();
          // if (newToken) {
          //   const config = response.config;
          //   config.headers["Authorization"] = "Bearer " + newToken;
          //   return axiosInstance(config);
          // } else {
          //   localStorage.removeItem("user");
          //   navigate("/", { replace: true });
          //   return Promise.reject(response);
          // }
        } else {
          return Promise.reject(response);
        }
      },
      (error) => {
        console.log("Response error", error);
        return Promise.reject(error);
      }
    );

    return axiosInstance;
  }, [navigate]);

  return request();
}
