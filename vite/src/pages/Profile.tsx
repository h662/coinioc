import { Avatar, Button, Flex, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import Background from "../components/Background";
import supabaseClient from "../lib/supabaseClient";

const Profile: FC = () => {
  const [nickname, setNickname] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);

  const { session, profile, setProfile, image, setImage } =
    useOutletContext<OutletContext>();

  const navigate = useNavigate();

  const onClickUpdateNickname = async () => {
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

  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.currentTarget.files === null) return;

      const formData = new FormData();

      formData.append("file", e.currentTarget.files[0]);

      const { error } = await supabaseClient.functions.invoke(
        "create-avartar",
        {
          body: formData,
        }
      );

      if (error) return;

      setImage(URL.createObjectURL(formData.get("file") as File));
    } catch (error) {
      console.error(error);
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
            프로필 설정
          </Text>
          <Flex
            mt={4}
            mb={2}
            position="relative"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onTouchStart={() => setIsHover(true)}
            onTouchEnd={() => setIsHover(false)}
          >
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              onChange={onChangeFile}
            />
            <label htmlFor="file">
              <Avatar
                cursor="pointer"
                size="lg"
                name={profile?.nickname}
                src={image}
              />
            </label>
            {isHover && (
              <label
                htmlFor="file"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Flex
                  cursor="pointer"
                  backgroundColor="rgba(255,255,255,0.5)"
                  w="full"
                  h="full"
                  rounded="full"
                  justifyContent="center"
                  alignItems="center"
                  fontWeight="bold"
                >
                  수정
                </Flex>
              </label>
            )}
          </Flex>
          <Input
            my={4}
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            isDisabled={isLoading}
          />
          <Flex gap={2}>
            <Button
              onClick={onClickUpdateNickname}
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

export default Profile;
