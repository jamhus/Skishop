import { useEffect, useState } from "react";
import { Product } from "../../app/interfaces/product";
import ProductsList from "./ProductList";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <>
      <ProductsList products={products} />
    </>
  );
};

export default Catalog;
