import { FC, useEffect, useState } from "react";
import { IComment } from "..";
import { Flex, Text } from "@chakra-ui/react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { FiHeart } from "react-icons/fi";
import supabaseClient from "../lib/supabaseClient";

interface CommentCardProps {
  comment: IComment;
}

const CommentCard: FC<CommentCardProps> = ({ comment }) => {
  const [likes, setLikes] = useState<number>();
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const onClickLike = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();

      if (likes === undefined) return;

      const { data } = await supabaseClient.functions.invoke(
        "toggle-comment-like",
        { body: { commentId: comment.id } }
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
      .invoke("get-comment-likes-count", { body: { commentId: comment.id } })
      .then(({ data }) => {
        setLikes(data);
      });

    supabaseClient.functions
      .invoke("get-comment-is-liked", { body: { commentId: comment.id } })
      .then(({ data }) => {
        if (!data) return;

        setIsLiked(data.is_liked);
      });
  }, []);

  return (
    <Flex fontSize={[12, 16]}>
      <Flex w={200} alignItems="end" flexDir="column">
        <Flex>
          <Text fontWeight="semibold">{comment.profile.nickname}</Text>
          (#
          {comment.user_id.substring(comment.user_id.length - 4)})
        </Flex>
        <Text alignSelf="end">
          {formatDistanceToNow(parseISO(comment.created_at), {
            locale: ko,
          })}
        </Text>
      </Flex>
      <Flex flexGrow={1} ml={2}>
        {comment.content}
      </Flex>
      <Flex
        alignItems="center"
        fontSize={[16, 20]}
        gap={1}
        _hover={{ color: "gray.500" }}
        onClick={onClickLike}
        ml={2}
      >
        <FiHeart color={isLiked ? "red" : ""} />{" "}
        <Text w={[2.5, 5]} textAlign="right">
          {likes}
        </Text>
      </Flex>
    </Flex>
  );
};

export default CommentCard;
