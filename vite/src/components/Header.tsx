import {
  Avatar,
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
import Logo from "/images/logo.svg";
import { Link } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import supabaseClient from "../lib/supabaseClient";

interface HeaderProps {
  session: Session | null;
  profile: any;
}

const Header: FC<HeaderProps> = ({ session, profile }) => {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Link to="/">
        <Flex py={4} alignItems="center">
          <Image src={Logo} alt="CoinioC" w={[6, 8]} />
          <Text ml={1} fontSize={[18, 20]} fontWeight="bold">
            Coinioc
          </Text>
        </Flex>
      </Link>
      <Flex alignItems="center">
        <Link to="/">
          <Button variant="ghost" size={["xs", "md"]}>
            코인 가격
          </Button>
        </Link>
        <Link to="/post">
          <Button variant="ghost" size={["xs", "md"]}>
            코인 의견
          </Button>
        </Link>
        <Link to="/news">
          <Button variant="ghost" size={["xs", "md"]}>
            주요 뉴스
          </Button>
        </Link>
        <Link to="/qna">
          <Button variant="ghost" size={["xs", "md"]}>
            Q&A
          </Button>
        </Link>
        {session ? (
          <Menu>
            <MenuButton
              as={Button}
              maxW={[20, 40]}
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
            <MenuList>
              <MenuItem>프로필</MenuItem>
              <MenuItem onClick={() => supabaseClient.auth.signOut()}>
                로그아웃
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Link to="/sign-in">
            <Button ml={2} size={["xs", "md"]}>
              로그인
            </Button>
          </Link>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
