import { Flex, Image, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiMessageSquare } from "react-icons/fi";
import { IPost } from "..";
import DateText from "./DateText";
import { getKoreanCurrency } from "../lib/koreanCurrencyConverter";
import supabaseClient from "../lib/supabaseClient";
import FluctuationRange from "./FluctuationRange";

interface PostCardProps {
  post: IPost;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>();
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const onClickLike = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();

      if (likes === undefined) return;

      const { data } = await supabaseClient.functions.invoke(
        "toggle-post-like",
        { body: { postId: post.id } }
      );

      if (data.is_liked) {
        setLikes(likes + 1);
        setIsLiked(true);
      } else {
        setLikes(likes - 1);
        setIsLiked(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    supabaseClient.functions
      .invoke("get-post-likes-count", { body: { postId: post.id } })
      .then(({ data }) => {
        setLikes(data);
      });

    supabaseClient.functions
      .invoke("get-post-is-liked", { body: { postId: post.id } })
      .then(({ data }) => {
        if (!data) return;

        setIsLiked(data.is_liked);
      });
  }, []);

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
          justifyContent="space-between"
        >
          <Flex flexDir="column">
            <Flex alignItems="center">
              <Flex noOfLines={2} isTruncated={true} fontSize={[12, 16]}>
                <Text display="inline-block" fontWeight="semibold">
                  {post.profile.nickname}
                </Text>
                (#
                {post.user_id.substring(post.user_id.length - 4)})님의
              </Flex>
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
              <DateText
                date={post.created_at}
                hours={true}
                fontSize={[12, 16]}
              />
              <Text fontSize={[12, 16]} ml={1}>
                기준,
              </Text>
              <Text fontSize={[12, 16]} ml={2} fontWeight="semibold">
                {getKoreanCurrency(post.coin_data.current_price)}원
              </Text>
              <Flex alignItems="center" ml={2}>
                <FluctuationRange coinData={post.coin_data} isBrackets={true} />
              </Flex>
            </Flex>
          </Flex>
          {likes !== undefined && (
            <Flex alignItems="start" gap={[2, 4]}>
              <Flex
                display="flex"
                alignItems="center"
                fontSize={[16, 20]}
                gap={1}
                _hover={{ color: "gray.500" }}
              >
                <FiMessageSquare />
                <Text w={[2.5, 5]} textAlign="right">
                  {post.comment_count}
                </Text>
              </Flex>
              <Flex
                display="flex"
                alignItems="center"
                fontSize={[16, 20]}
                gap={1}
                _hover={{ color: "gray.500" }}
                onClick={onClickLike}
              >
                <FiHeart color={isLiked ? "red" : ""} />{" "}
                <Text w={[2.5, 5]} textAlign="right">
                  {likes}
                </Text>
              </Flex>
            </Flex>
          )}
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
            <Text noOfLines={3}>{post.content}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default PostCard;
