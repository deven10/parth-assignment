import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Button, Stack, Box, Typography } from "@mui/material";

const Counter = () => {
  const [count, setCount] = useState(() => {
    return Number(localStorage.getItem("count")) || 0;
  });

  useEffect(() => {
    localStorage.setItem("count", count.toString());
  }, [count]);

  const bgColor = useSpring({
    backgroundColor: `rgb(${255 - count * 5}, ${200 - count * 3}, 255)`, // Example of dynamic color change
    config: { tension: 200, friction: 20 },
  });

  return (
    <>
      <h2>Counter App</h2>
      <animated.div
        style={{
          ...bgColor,
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box textAlign="center">
          <Typography variant="h4">Counter: {count}</Typography>
          <Stack spacing={2} direction="row" justifyContent="center" mt={2}>
            <Button variant="contained" onClick={() => setCount(count + 1)}>
              Increment
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setCount(count - 1)}
            >
              Decrement
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setCount(0)}
            >
              Reset
            </Button>
          </Stack>
        </Box>
      </animated.div>
    </>
  );
};

export default Counter;
