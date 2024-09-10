import { ENV } from "../utils";

export class Course {
  baseApi = ENV.BASE_API;

  async createCourse(accessToken, data) {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.file) {
        formData.set("miniature", data.file);
      }

      const url = `${this.baseApi}/${ENV.API_ROUTES.COURSES_NEW}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      const result = response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateCourse(accessToken, courseId, data) {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.file) {
        formData.set("miniature", data.file);
      }

      const url = `${this.baseApi}/${ENV.API_ROUTES.COURSES}/${courseId}`;

      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      const result = response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
  async deleteCourse(accessToken, courseId) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.COURSES}/${courseId}`;

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

  async getCourses(params) {
    try {
      const pageFilter = `page=${params?.page || 1}`;
      const limitFilter = `limit=${params?.limit || 10}`;

      const url = `${this.baseApi}/${ENV.API_ROUTES.COURSES}?${pageFilter}&${limitFilter}`;

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
