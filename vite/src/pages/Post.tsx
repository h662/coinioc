import { FC, useEffect, useState } from "react";
import supabaseClient from "../lib/supabaseClient";
import { IPost } from "..";
import { Button, Flex, Text } from "@chakra-ui/react";
import PostCard from "../components/PostCard";

const Post: FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getPosts = async () => {
    try {
      if (isLastPage) return;

      setIsLoading(true);

      const { data } = await supabaseClient.functions.invoke("get-posts", {
        body: { page },
      });

      if (data.length === 0) {
        setIsLastPage(true);
        setIsLoading(false);
        return;
      }

      const temp = data.map((v: any) => {
        return {
          id: v.id,
          created_at: v.created_at,
          content: v.content,
          coin_data: JSON.parse(v.coin_data),
          user_id: v.user_id,
          profile: v.profile,
          comment_count: v.comment_count,
        };
      });

      setPosts([...posts, ...temp]);
      setPage(page + 1);

      if (data.length !== 2) {
        setIsLastPage(true);
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);

      setIsLoading(true);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  // 로딩 버튼 없이 로딩만 뜨는지 확인
  if (posts.length === 0) return <Flex>Loading...</Flex>;

  return (
    <>
      <Text textAlign="center" my={4} fontSize={[16, 20]} fontWeight="semibold">
        코인에 관한 다양한 의견을 확인할 수 있습니다.
      </Text>
      <Flex flexDir="column" gap={4}>
        {posts?.map((v, i) => (
          <PostCard key={i} post={v} />
        ))}
      </Flex>
      <Flex my={4} justifyContent="center">
        <Button
          onClick={() => getPosts()}
          isLoading={isLoading}
          isDisabled={isLoading}
        >
          더 보기
        </Button>
      </Flex>
    </>
  );
};

export default Post;
