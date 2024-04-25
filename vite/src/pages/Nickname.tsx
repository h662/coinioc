import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import Background from "../components/Background";
import supabaseClient from "../lib/supabaseClient";

const Nickname: FC = () => {
  const [nickname, setNickname] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { session, setProfile } = useOutletContext<OutletContext>();

  const navigate = useNavigate();

  const onClickCreateNickname = async () => {
    try {
      if (!nickname) return;

      setIsLoading(true);

      const { data } = await supabaseClient.functions.invoke("create-profile", {
        body: { nickname },
      });

      setProfile(data);

      navigate("/");
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!session) {
      navigate("/");
    }
  }, [session]);

  return (
    <>
      <Flex flexGrow={1} justifyContent="center" alignItems="center">
        <Flex
          bgColor="white"
          py={8}
          px={16}
          flexDir="column"
          alignItems="center"
        >
          <Text fontSize={20} fontWeight="bold">
            닉네임을 설정해주세요.
          </Text>
          <Input
            my={4}
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            isDisabled={isLoading}
          />
          <Flex gap={2}>
            <Button
              onClick={onClickCreateNickname}
              isLoading={isLoading}
              loadingText="처리중..."
              isDisabled={isLoading}
            >
              확인
            </Button>
            <Button
              onClick={() => supabaseClient.auth.signOut()}
              colorScheme="red"
            >
              로그아웃
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Background />
    </>
  );
};

export default Nickname;
