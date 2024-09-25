import { ENV } from "../utils";

export class Blog {
  baseApi = ENV.BASE_API;

  async createPost(accessToken, data) {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.file) {
        formData.set("miniature", data.file);
      }

      const url = `${this.baseApi}/${ENV.API_ROUTES.POSTS_NEW}`;

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

  async updatePost(accessToken, postId, data) {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.file) {
        formData.set("miniature", data.file);
      }

      const url = `${this.baseApi}/${ENV.API_ROUTES.POSTS}/${postId}`;

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

  async deletePost(accessToken, postId) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.POSTS}/${postId}`;

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

  async getPosts(page = 1, limit = 10) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.POSTS}?page=${page}&limit=${limit}`;

      const response = await fetch(url, {
        method: "GET",
      });

      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
