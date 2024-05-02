import { Button, Flex, Grid, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import YoutubeCard from "../components/YoutubeCard";
import supabaseClient from "../lib/supabaseClient";
import { INews, IYoutube } from "..";
import NewsCard from "../components/NewsCard";

const News: FC = () => {
  const [youtubeData, setYoutubeData] = useState<IYoutube[]>([]);
  const [youtubePage, setYoutubePage] = useState<number>(0);
  const [isYoutubeLastPage, setIsYoutubeLastPage] = useState<boolean>(false);
  const [isYoutubeLoading, setIsYoutubeLoading] = useState<boolean>(false);
  const [newsData, setNewsData] = useState<INews[]>([]);
  const [newsPage, setNewsPage] = useState<number>(0);
  const [isNewsLastPage, setIsNewsLastPage] = useState<boolean>(false);
  const [isNewsLoading, setIsNewsLoading] = useState<boolean>(false);

  const getYotubes = async () => {
    try {
      if (isYoutubeLastPage) return;

      setIsYoutubeLoading(true);

      const { data } = await supabaseClient.functions.invoke("get-youtubes", {
        body: { page: youtubePage },
      });

      if (data.length === 0) {
        setIsYoutubeLastPage(true);
        setIsYoutubeLoading(false);
        return;
      }

      setYoutubeData([...youtubeData, ...data]);
      setYoutubePage(youtubePage + 1);

      if (data.length !== 5) {
        setIsYoutubeLastPage(true);
      }

      setIsYoutubeLoading(false);
    } catch (error) {
      console.error(error);

      setIsYoutubeLoading(false);
    }
  };

  const getNews = async () => {
    try {
      if (isNewsLastPage) return;

      setIsNewsLoading(true);

      const { data } = await supabaseClient.functions.invoke("get-news", {
        body: { page: newsPage },
      });

      if (data.length === 0) {
        setIsNewsLastPage(true);
        setIsNewsLoading(false);
        return;
      }

      setNewsData([...newsData, ...data]);
      setNewsPage(newsPage + 1);

      if (data.length !== 5) {
        setIsNewsLastPage(true);
      }

      setIsNewsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getYotubes();
    getNews();
  }, []);

  return (
    <>
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
            isLoading={isNewsLoading}
            isDisabled={isNewsLoading || isNewsLastPage}
          >
            더보기
          </Button>
        </Flex>
      </Flex>
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
        <Text fontWeight="bold">유튜브</Text>
        <Grid
          templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
          gap={6}
          alignSelf="center"
        >
          {youtubeData.map((v, i) => (
            <YoutubeCard key={i} youtubeData={v} />
          ))}
        </Grid>
        <Flex mt={2} w="full" justifyContent="center">
          <Button
            onClick={getYotubes}
            isLoading={isYoutubeLoading}
            isDisabled={isYoutubeLoading || isYoutubeLastPage}
          >
            더보기
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default News;
