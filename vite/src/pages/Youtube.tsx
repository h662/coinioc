import { Button, Flex, Grid, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import YoutubeCard from "../components/YoutubeCard";
import supabaseClient from "../lib/supabaseClient";
import { IYoutube } from "..";

const Youtube: FC = () => {
  const [youtubeData, setYoutubeData] = useState<IYoutube[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getYotubes = async () => {
    try {
      if (isLastPage) return;

      setIsLoading(true);

      const { data } = await supabaseClient.functions.invoke("get-youtubes", {
        body: { page },
      });

      if (data.length === 0) {
        setIsLastPage(true);
        setIsLoading(false);
        return;
      }

      setYoutubeData([...youtubeData, ...data]);
      setPage(page + 1);

      if (data.length !== 5) {
        setIsLastPage(true);
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  };

  useEffect(() => {
    getYotubes();
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
          isLoading={isLoading}
          isDisabled={isLoading || isLastPage}
        >
          더보기
        </Button>
      </Flex>
    </Flex>
  );
};

export default Youtube;
