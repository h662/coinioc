import { FC } from "react";
import { Box } from "@chakra-ui/react";

const Background: FC = () => {
  return (
    <Box
      zIndex={-1}
      bgImage={"url('/images/logo.svg')"}
      bgSize={150}
      position="fixed"
      top={0}
      left={0}
      w="100%"
      minH="100vh"
    />
  );
};

export default Background;
