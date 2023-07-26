import { useState } from "react";
import { Box, Typography, Stack, Button } from "@mui/material";

function App() {
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleIncrement = () => setCounter(counter + 1);
  const handleDecrement = () => setCounter(counter - 1);
  const handleAsyncIncrement = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCounter(counter + 1);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Box
      sx={{
        backgroundColor: "lightcoral",
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack spacing={4} alignItems="center">
        <Typography fontWeight={900} fontSize={22}>
          Counter:
        </Typography>
        <Typography fontSize={70}>{counter}</Typography>
        <Stack direction="row" spacing={2}>
          <Button
            onClick={handleIncrement}
            disabled={isLoading}
            variant="contained"
            color="success"
          >
            Plus
          </Button>
          <Button
            onClick={handleDecrement}
            disabled={isLoading}
            variant="contained"
            color="error"
          >
            Minus
          </Button>
          <Button
            onClick={handleAsyncIncrement}
            disabled={isLoading}
            variant="contained"
            color="primary"
          >
            Add async
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default App;
