import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

const NotFound = () => {
  const history = useHistory();
  return (
    <Container component={Paper} sx={{height:400}}>
      <Typography variant="h3" color="error" gutterBottom sx={{ p: 2, justifyContent: 'center' , display: 'flex' }}>
          404 ya al7abib
      </Typography>
      <Divider/>
      <Button fullWidth onClick={() => history.push("/catalog")}>
        Go back to the store
      </Button>
    </Container>
  );
};

export default NotFound;
