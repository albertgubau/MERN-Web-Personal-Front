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
}
