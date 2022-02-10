import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import Loading from "../../app/components/Loading";
import { Product } from "../../app/interfaces/product";
import ProductsList from "./ProductList";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.list().then(products => setProducts(products)).finally(()=> setLoading(false));
  }, []);

  if (loading) return <Loading message="Loading products..."/>
  return (
    <>
      <ProductsList products={products} />
    </>
  );
};

export default Catalog;
