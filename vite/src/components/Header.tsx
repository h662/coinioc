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
import { Link } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import { FiMoreVertical } from "react-icons/fi";

import Logo from "/images/logo.svg";
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
      <Box display={["none", "none", "flex"]} alignItems="center">
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
            <MenuList>
              <Link to="/profile">
                <MenuItem>프로필</MenuItem>
              </Link>
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
                {profile && <Avatar size="xs" name={profile.nickname} />}
                {profile ? profile.nickname : session.user.email}
              </Flex>
            </MenuButton>
            <MenuList>
              <Link to="/profile">
                <MenuItem>프로필</MenuItem>
              </Link>
              <MenuItem>
                <Link to="/">코인 가격</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/post">코인 의견</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/news">주요 뉴스</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/qna">Q&A</Link>
              </MenuItem>
              <MenuItem onClick={() => supabaseClient.auth.signOut()}>
                로그아웃
              </MenuItem>
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
                <MenuItem>
                  <Link to="/">코인 가격</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/post">코인 의견</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/news">주요 뉴스</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/qna">Q&A</Link>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
