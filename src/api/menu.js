import { ENV } from "../utils/constants";

export class Menu {
  baseApi = ENV.BASE_API;

  async createMenu(accessToken, data) {
    try {
      const bodyData = {
        title: data.title,
        path: `${data.protocol}${data.path}`,
        order: data.order,
        active: data.active,
      };

      const url = `${this.baseApi}/${ENV.API_ROUTES.MENU_NEW}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(bodyData),
      });

      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getMenus(active = undefined) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.MENU_ALL}?active=${active}`;

      const response = await fetch(url, {
        method: "GET",
      });

      const result = response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
