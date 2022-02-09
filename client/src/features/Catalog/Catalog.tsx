import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { Product } from "../../app/interfaces/product";
import ProductsList from "./ProductList";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    agent.Catalog.list().then(products => setProducts(products));
  }, []);

  return (
    <>
      <ProductsList products={products} />
    </>
  );
};

export default Catalog;
