import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import agent from "../../app/api/agent";

const AboutPage = () => {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const getValidationErrors = () =>
    agent.TestErrors.getValidationError()
      .then(() => {})
      .catch((error) => setValidationErrors(error));
  return (
    <Container>
      <Typography variant="h2">Errors for testing</Typography>
      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get400Error().catch((error) => console.log(error))
          }
        >
          test 400
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get401Error().catch((error) => console.log(error))
          }
        >
          test 401
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get404Error().catch((error) => console.log(error))
          }
        >
          test 404
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get500Error().catch((error) => console.log(error))
          }
        >
          test 500
        </Button>
        <Button variant="contained" onClick={getValidationErrors}>
          test Validation
        </Button>
      </ButtonGroup>

      {validationErrors.length > 0 && (
        <Alert severity="error">
          <AlertTitle>Validation errors</AlertTitle>
          <List>
            {validationErrors?.map((error) => (
              <ListItem key={error}>
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  );
};

export default AboutPage;
