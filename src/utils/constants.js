const SERVER_IP = "localhost:3977";

export const ENV = {
  BASE_PATH: `http://${SERVER_IP}`,
  BASE_API: `http://${SERVER_IP}/api/v1`,
  API_ROUTES: {
    REGISTER: "auth/register",
    LOGIN: "auth/login",
    REFRESH_TOKEN: "auth/refresh_access_token",
    USERS: "users",
    USER_ME: "users/me",
    USER_NEW: "users/new",
    USERS_ALL: "users/all",
    MENU: "menu",
    MENU_NEW: "menu/new",
    MENU_ALL: "menu/all",
  },
  JWT: {
    ACCESS: "access",
    REFRESH: "refresh",
  },
};
