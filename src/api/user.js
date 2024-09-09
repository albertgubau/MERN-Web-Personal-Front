import { ENV } from "../utils/constants";

export class User {
  baseApi = ENV.BASE_API;

  async getMe(accessToken) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.USER_ME}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async createUser(accessToken, data) {
    try {
      // To deal with the avatar multipart form we use FormData
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.fileAvatar) {
        formData.set("avatar", data.fileAvatar);
        formData.delete("fileAvatar");
      }

      const url = `${this.baseApi}/${ENV.API_ROUTES.USER_NEW}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.status !== 201) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(accessToken, userId, userData) {
    try {
      const data = userData;

      if (!data.password) {
        delete data.password;
      }

      // To deal with the avatar multipart form we use FormData
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.fileAvatar) {
        formData.set("avatar", data.fileAvatar);
        formData.delete("fileAvatar");
      }

      const url = `${this.baseApi}/${ENV.API_ROUTES.USERS}/${userId}`;

      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(accessToken, userId) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.USERS}/${userId}`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getUsers(accessToken, active = undefined) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.USERS_ALL}?active=${active}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
