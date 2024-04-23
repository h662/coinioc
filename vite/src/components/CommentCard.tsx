import { FC } from "react";
import { IComment } from "..";
import { Flex, Text } from "@chakra-ui/react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ko } from "date-fns/locale";

interface CommentCardProps {
  comment: IComment;
}

const CommentCard: FC<CommentCardProps> = ({ comment }) => {
  return (
    <Flex fontSize={[12, 16]}>
      <Flex w={240} justifyContent="end">
        <Text fontWeight="semibold" isTruncated={true}>
          {comment.profile.nickname}
        </Text>
        (#
        {comment.user_id.substring(comment.user_id.length - 4)})
        <Text ml={1}>
          {formatDistanceToNow(parseISO(comment.created_at), {
            locale: ko,
          })}
        </Text>
      </Flex>
      <Flex ml={2}>{comment.content}</Flex>
    </Flex>
  );
};

export default CommentCard;
