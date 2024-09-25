import { ENV } from "../utils";

export class Newsletter {
  baseApi = ENV.BASE_API;

  async subscribeEmail(email) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.NEWSLETTER_SUBSCRIBE}`;

      const response = await fetch(url, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.status !== 201) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getEmails(accessToken, page = 1, limit = 10) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.NEWSLETTER_ALL}?page=${page}&limit=${limit}`;

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

  async deleteEmail(accessToken, emailId) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.NEWSLETTER}/${emailId}`;

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
}
