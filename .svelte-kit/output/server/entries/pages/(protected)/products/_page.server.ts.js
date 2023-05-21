import { P as PRODUCTS_SERVER_URL } from "../../../../chunks/private.js";
import { r as redirect } from "../../../../chunks/index.js";
const url = `${PRODUCTS_SERVER_URL}/products`;
const load = async ({ fetch: fetch2, cookies }) => {
  const token = cookies.get("access_token");
  const url2 = `${PRODUCTS_SERVER_URL}/products`;
  const fetchProducts = async () => {
    try {
      const response = await fetch2(url2, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
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
  const products = await fetchProducts();
  return {
    products
  };
};
const actions = {
  addProduct: async (event) => {
    let success = false;
    const token = event.cookies.get("access_token");
    const { request } = event;
    const formData = await request.formData();
    const productToPost = {
      productDescription: {
        name: formData.get("name")?.toString(),
        price: parseInt(formData.get("price")?.toString() || "0"),
        description: formData.get("description")?.toString(),
        tags: formData.get("tags")?.toString().split(" "),
        photo_url: formData.get("photo_url")?.toString() ? formData.get("photo_url")?.toString() : ""
      },
      productStock: {
        quantity: parseInt(formData.get("quantity")?.toString() || "0")
      }
    };
    console.log(JSON.stringify(productToPost));
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(productToPost)
      });
      if (response.ok) {
        success = true;
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
      throw new Error(`Error: ${error}`);
    }
    if (success) {
      throw redirect(302, `/products`);
    }
  },
  editProduct: async (event) => {
    const token = event.cookies.get("access_token");
    const { request } = event;
    const formData = await request.formData();
    const productToUpdate = {
      productDescription: {
        name: formData.get("name")?.toString(),
        price: parseInt(formData.get("price")?.toString() || "0"),
        description: formData.get("description")?.toString(),
        tags: formData.get("tags")?.toString().split(" "),
        photo_url: formData.get("photo_url")?.toString() ? formData.get("photo_url")?.toString() : ""
      },
      productStock: {
        quantity: parseInt(formData.get("quantity")?.toString() || "0")
      }
    };
    console.log(productToUpdate);
    const productId = formData.get("productId")?.toString();
    if (productId) {
      const updatedProductId = parseInt(productId);
      const newUrl = `${url}/${updatedProductId}`;
      try {
        const response = await fetch(newUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(productToUpdate)
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
    } else {
      console.log("No product id");
    }
  },
  removeProduct: async (event) => {
    const token = event.cookies.get("access_token");
    const { request } = event;
    const formData = await request.formData();
    const productId = formData.get("productId")?.toString();
    if (productId) {
      const productToDelete = parseInt(productId);
      const newUrl = `${url}/${productToDelete}`;
      console.log(productToDelete);
      try {
        const response = await fetch(newUrl, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.ok) {
          console.log("Product deleted");
        } else {
          throw new Error(`Error: ${response.status}`);
        }
      } catch (error) {
        throw new Error(`Error: ${error}`);
      }
    } else {
      console.log("No product id");
    }
  }
};
export {
  actions,
  load
};
