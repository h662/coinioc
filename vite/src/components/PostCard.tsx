import { Flex, Image, Text } from "@chakra-ui/react";
import { FC, useState } from "react";
import { IPost } from "..";
import DateText from "./DateText";
import { getKoreanCurrency } from "../lib/koreanCurrencyConverter";
import { Link } from "react-router-dom";

interface PostCardProps {
  post: IPost;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <Link to={`/post/${post.id}`}>
      <Flex
        flexDir="column"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        cursor="pointer"
      >
        <Flex
          roundedTop={12}
          p={2}
          bgColor={isHover ? "gray.200" : "gray.50"}
          flexDir="column"
        >
          <Flex alignItems="center">
            <Text noOfLines={2} isTruncated={true} fontSize={[12, 16]}>
              <Text display="inline-block" fontWeight="semibold">
                {post.profile.nickname}
              </Text>
              (#
              {post.user_id.substring(post.user_id.length - 4)})님의
            </Text>
            <Image
              src={post.coin_data.image}
              alt={post.coin_data.symbol}
              w={[6, 8]}
              h={[6, 8]}
              objectFit="cover"
              rounded="full"
              mx={1}
            />
            <Text fontSize={[12, 16]} fontWeight="semibold">
              {post.coin_data.name}
            </Text>
            <Text fontSize={[12, 16]}>에 대한 의견</Text>
          </Flex>
          <Flex>
            <DateText date={post.created_at} hours={true} fontSize={[12, 16]} />
            <Text fontSize={[12, 16]} ml={1}>
              기준,
            </Text>
            <Text fontSize={[12, 16]} ml={2} fontWeight="semibold">
              {getKoreanCurrency(post.coin_data.current_price)}원
            </Text>
          </Flex>
        </Flex>
        <Flex
          roundedBottom={12}
          p={2}
          bgColor={isHover ? "gray.300" : "gray.100"}
          fontSize={[14, 18]}
        >
          <Flex>
            <Text>→</Text>
          </Flex>
          <Flex ml={2}>
            <Text w={[200, 500]} noOfLines={3}>
              {post.content}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default PostCard;
