import { Button, Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";
import Background from "../components/Background";

const NotFound: FC = () => {
  return (
    <>
      <Flex minH="100vh" justifyContent="center" alignItems="center">
        <Flex
          bgColor="white"
          rounded={20}
          py={[4, 10]}
          px={[6, 20]}
          flexDir="column"
          alignItems="center"
          gap={10}
        >
          <Text fontSize={20} fontWeight="bold">
            404 Not Found.
          </Text>
          <Text fontSize={28}>페이지를 찾을 수 없습니다.</Text>
          <Link to="/">
            <Button>홈으로</Button>
          </Link>
        </Flex>
      </Flex>
      <Background />
    </>
  );
};

export default NotFound;
