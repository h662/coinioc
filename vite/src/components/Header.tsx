import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import { FiMoreVertical } from "react-icons/fi";

import Logo from "/images/logo.svg";
import supabaseClient from "../lib/supabaseClient";
import { IProfile } from "..";

interface HeaderProps {
  session: Session | null;
  profile: IProfile | undefined;
  image: string;
}

const Header: FC<HeaderProps> = ({ session, profile, image }) => {
  const navigate = useNavigate();

  const links = [
    {
      to: "/",
      text: "코인가격",
    },
    {
      to: "/post",
      text: "코인 의견",
    },
    {
      to: "/news",
      text: "주요 뉴스",
    },
    {
      to: "/youtube",
      text: "유튜브",
    },
    {
      to: "/qna",
      text: "Q&A",
    },
  ];

  const myMenu = (
    <>
      <MenuItem onClick={() => navigate("/profile")}>프로필</MenuItem>
      <MenuItem onClick={() => supabaseClient.auth.signOut()}>
        로그아웃
      </MenuItem>
    </>
  );

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex py={4} alignItems="center" onClick={() => navigate("/")}>
        <Image src={Logo} alt="CoinioC" w={[6, 8]} />
        <Text ml={1} fontSize={[18, 20]} fontWeight="bold">
          Coinioc
        </Text>
      </Flex>
      <Box display={["none", "none", "flex"]} alignItems="center">
        {links.map((v, i) => (
          <Button
            key={i}
            variant="ghost"
            size={["xs", "md"]}
            onClick={() => navigate(v.to)}
          >
            {v.text}
          </Button>
        ))}
        {session ? (
          <Menu>
            <MenuButton
              as={Button}
              maxW={40}
              noOfLines={1}
              display="flex"
              alignItems="center"
              variant="ghost"
              size={["xs", "md"]}
            >
              <Flex alignItems="center" gap={1}>
                {profile && <Avatar size="sm" name={profile.nickname} />}
                {profile ? profile.nickname : session.user.email}
              </Flex>
            </MenuButton>
            <MenuList>{myMenu}</MenuList>
          </Menu>
        ) : (
          <Button
            ml={2}
            size={["xs", "md"]}
            onClick={() => navigate("/sign-in")}
          >
            로그인
          </Button>
        )}
      </Box>
      <Box display={["flex", "flex", "none"]}>
        {session ? (
          <Menu>
            <MenuButton
              as={Button}
              maxW={40}
              noOfLines={1}
              display="flex"
              alignItems="center"
              variant="ghost"
              size={["xs", "md"]}
            >
              <Flex alignItems="center" gap={1} fontSize={[10, 12]}>
                {profile && (
                  <Avatar size="xs" name={profile.nickname} src={image} />
                )}
                {profile ? profile.nickname : session.user.email}
              </Flex>
            </MenuButton>
            <MenuList>
              {links.map((v, i) => (
                <MenuItem key={i} onClick={() => navigate(v.to)}>
                  {v.text}
                </MenuItem>
              ))}
              {myMenu}
            </MenuList>
          </Menu>
        ) : (
          <Flex alignItems="center">
            <Link to="/sign-in">
              <Button ml={2} size={["xs", "md"]}>
                로그인
              </Button>
            </Link>
            <Menu>
              <MenuButton
                as={Button}
                maxW={40}
                noOfLines={1}
                display="flex"
                alignItems="center"
                variant="ghost"
                size={["xs", "md"]}
                mt={0.5}
              >
                <FiMoreVertical size={16} />
              </MenuButton>
              <MenuList>
                {links.map((v, i) => (
                  <MenuItem key={i} onClick={() => navigate(v.to)}>
                    {v.text}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
