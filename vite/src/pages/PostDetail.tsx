import { Flex, Image, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabaseClient from "../lib/supabaseClient";
import { IPost } from "..";
import DateText from "../components/DateText";
import { getKoreanCurrency } from "../lib/koreanCurrencyConverter";

const PostDetail: FC = () => {
  const [post, setPost] = useState<IPost>();

  const { id } = useParams();

  useEffect(() => {
    supabaseClient.functions
      .invoke("get-post", { body: { id } })
      .then(({ data }) => {
        setPost({
          id: data.id,
          created_at: data.created_at,
          content: data.content,
          coin_data: JSON.parse(data.coin_data),
          user_id: data.user_id,
          profile: data.profile,
        });
      });
  }, []);

  useEffect(() => {
    console.log(post);
  }, [post]);

  if (!post) return <Flex>Loading...</Flex>;

  return (
    <Flex flexDir="column">
      <Flex roundedTop={12} p={2} flexDir="column">
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
      <Flex roundedBottom={12} p={2} fontSize={[14, 18]}>
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
  );
};

export default PostDetail;
