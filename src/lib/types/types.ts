export type Category = {
  id: number;
  name: string;
};

export type Product = {
  product_id: number;
  name: string;
  price: number;
  description: string;
  tags: string[];
  photo_url?: string;
  productStock: {
    quantity: number;
  };
};
