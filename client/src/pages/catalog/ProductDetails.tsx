import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import Loading from "../../app/components/Loading";
import { Product } from "../../app/interfaces/product";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.details(id).then(product => setProduct(product))
    .finally(() => setLoading(false));
  }, [id]);

  if(loading) return <Loading message="Loading product..."/>

  if(!product) return <h3>product not found</h3>

  return (
    <Grid container spacing={6}>
      <Grid item sm={12} md={6}>
        <img src={product.pictureUrl} alt={product.name} style={{width:'100%'}}/>
      </Grid>
      <Grid item sm={12} md={6}>
        <Typography variant="h3">
          {product.name}
        </Typography>
        <Divider sx={{mb:2}}/>
        <Typography variant="h4" color="secondary">
          {(product.price/100).toFixed(2)}$
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{fontWeight:700}}>name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{fontWeight:700}}>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{fontWeight:700}}>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{fontWeight:700}}>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{fontWeight:700}}>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
};

export default ProductDetails;
