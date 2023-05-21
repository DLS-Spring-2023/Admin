// @ts-nocheck
import { ORDERS_SERVER_URL } from "$env/static/private";
import type { PageServerLoad } from "./$types";

const url = `${ORDERS_SERVER_URL}/v1/admin/orders`;

export const load = async ({ fetch, cookies }: Parameters<PageServerLoad>[0]) => {
  const token = cookies.get("access_token");

  console.log(url);

  const fetchOrders = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

  const orders = await fetchOrders();

  return {
    orders: orders,
  };
};
