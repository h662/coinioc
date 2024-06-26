import { Button, Flex, Image, Text, Textarea } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import supabaseClient from "../lib/supabaseClient";
import { IComment, IPost } from "..";
import DateText from "../components/DateText";
import { getKoreanCurrency } from "../lib/koreanCurrencyConverter";
import { OutletContext } from "../components/Layout";
import CommentCard from "../components/CommentCard";
import FluctuationRange from "../components/FluctuationRange";
import { FiHeart } from "react-icons/fi";

const PostDetail: FC = () => {
  const [post, setPost] = useState<IPost>();
  const [comment, setComment] = useState<IComment[]>([]);
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [createdCommenId, setCreatedCommentId] = useState<number>(0);
  const [likes, setLikes] = useState<number>();
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const { session } = useOutletContext<OutletContext>();

  const { id } = useParams();

  const onClickCreateComment = async () => {
    try {
      if (!content || content.length > 150) return;
      // 150자 이내 표시

      setIsLoading(true);

      const { data } = await supabaseClient.functions.invoke("create-comment", {
        body: {
          content,
          postId: id,
        },
      });

      setCreatedCommentId(data.id);

      setComment([data, ...comment]);

      setContent("");
      setIsLoading(false);
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  };

  const onClickLike = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();

      if (likes === undefined || !session) return;

      const { data } = await supabaseClient.functions.invoke(
        "toggle-post-like",
        { body: { postId: id } }
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
      .invoke("get-post", { body: { id } })
      .then(({ data }) => {
        setPost({
          id: data.id,
          created_at: data.created_at,
          content: data.content,
          coin_data: JSON.parse(data.coin_data),
          user_id: data.user_id,
          profile: data.profile,
          comment_count: data.comment_count,
        });
      });

    supabaseClient.functions
      .invoke("get-comments", { body: { postId: id } })
      .then(({ data }) => {
        setComment(data);
      });

    supabaseClient.functions
      .invoke("get-post-likes-count", { body: { postId: id } })
      .then(({ data }) => {
        setLikes(data);
      });

    supabaseClient.functions
      .invoke("get-post-is-liked", { body: { postId: id } })
      .then(({ data }) => {
        if (!data) return;

        setIsLiked(data.is_liked);
      });
  }, []);

  if (!post) return <Flex>Loading...</Flex>;

  return (
    <Flex flexDir="column">
      <Flex roundedTop={12} p={2} justifyContent="space-between">
        <Flex flexDir={["column", "column", "row"]}>
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
          <Flex alignItems="center" ml={[0, 0, 2]}>
            <DateText date={post.created_at} hours={true} fontSize={[12, 16]} />
            <Text fontSize={[12, 16]} ml={1}>
              기준,
            </Text>
            <Text fontSize={[12, 16]} ml={2} fontWeight="semibold">
              {getKoreanCurrency(post.coin_data.current_price)}원
            </Text>
            <Flex ml={2}>
              <FluctuationRange coinData={post.coin_data} isBrackets={true} />
            </Flex>
          </Flex>
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
      <Flex roundedBottom={12} p={2} fontSize={[14, 18]}>
        <Flex>
          <Text>→</Text>
        </Flex>
        <Flex ml={2}>
          <Text noOfLines={3}>{post.content}</Text>
        </Flex>
      </Flex>
      <Flex flexDir="column">
        <Textarea
          h={20}
          resize="none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          isDisabled={isLoading || !session}
          placeholder={session ? "" : "로그인이 필요합니다."}
        />
        <Button
          onClick={onClickCreateComment}
          isLoading={isLoading}
          isDisabled={isLoading || !session}
          w="fit-content"
          alignSelf="end"
          mt={2}
        >
          댓글 남기기
        </Button>
        <Flex mt={2} gap={2} flexDir="column">
          {comment?.map((v, i) => (
            <CommentCard
              key={i}
              comment={v}
              createdCommentId={createdCommenId}
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PostDetail;
