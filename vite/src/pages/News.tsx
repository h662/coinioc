import { Button, Flex, Grid, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import supabaseClient from "../lib/supabaseClient";
import { INews } from "..";
import NewsCard from "../components/NewsCard";

const News: FC = () => {
  const [newsData, setNewsData] = useState<INews[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getNews = async () => {
    try {
      if (isLastPage) return;

      setIsLoading(true);

      const { data } = await supabaseClient.functions.invoke("get-news", {
        body: { page },
      });

      if (data.length === 0) {
        setIsLastPage(true);
        setIsLoading(false);
        return;
      }

      setNewsData([...newsData, ...data]);
      setPage(page + 1);

      if (data.length !== 5) {
        setIsLastPage(true);
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <Flex
      mx="auto"
      flexDir="column"
      w="full"
      alignItems="start"
      fontSize={[16, 20]}
      mt={8}
      gap={2}
      pb={8}
    >
      <Text fontWeight="bold">주요 뉴스</Text>
      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
        gap={6}
        alignSelf="center"
      >
        {newsData.map((v, i) => (
          <NewsCard key={i} newsData={v} />
        ))}
      </Grid>
      <Flex mt={2} w="full" justifyContent="center">
        <Button
          onClick={getNews}
          isLoading={isLoading}
          isDisabled={isLoading || isLastPage}
        >
          더보기
        </Button>
      </Flex>
    </Flex>
  );
};

export default News;
