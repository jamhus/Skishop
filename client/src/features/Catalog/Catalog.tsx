import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../../app/interfaces/product";
import ProductsList from "./ProductList";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((response) => setProducts(response.data));
  }, []);

  return (
    <>
      <ProductsList products={products} />
    </>
  );
};

export default Catalog;
