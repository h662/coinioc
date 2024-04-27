import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import Background from "../components/Background";
import supabaseClient from "../lib/supabaseClient";

const Nickname: FC = () => {
  const { session, profile, setProfile } = useOutletContext<OutletContext>();

  const [nickname, setNickname] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const onClickUpdateeNickname = async () => {
    try {
      if (!nickname) return;

      setIsLoading(true);

      const { data } = await supabaseClient.functions.invoke(
        "update-nickname",
        {
          body: { nickname },
        }
      );

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

  useEffect(() => {
    if (!profile) return;

    setNickname(profile.nickname);
  }, [profile]);

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
              onClick={onClickUpdateeNickname}
              isLoading={isLoading}
              loadingText="처리중..."
              isDisabled={
                isLoading || nickname === profile?.nickname || !nickname
              }
            >
              확인
            </Button>
            <Link to="/">
              <Button colorScheme="blue">홈</Button>
            </Link>
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
