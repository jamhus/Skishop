import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
interface Props {
  message?: string;
}
const Loading = ({ message = "Loading..." }: Props) => {
  return (
    <Backdrop open invisible>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress size={100} color="primary"></CircularProgress>
        <Typography
          variant="h4"
          sx={{ justifyContent: "center", position: "fixed", top: "60%" }}
        >{message}</Typography>
      </Box>
    </Backdrop>
  );
};

export default Loading;
