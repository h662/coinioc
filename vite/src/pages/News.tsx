import { Flex, Grid, Text } from "@chakra-ui/react";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import YoutubeCard from "../components/YoutubeCard";

const News: FC = () => {
  const [youtubeData, setYouTubeData] = useState<any[]>([]);

  const getYoutube = async () => {
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?key=${
          import.meta.env.VITE_YOUTUBE_KEY
        }&part=snippet&maxResults=6&q=${encodeURI("블록체인")}`
      );

      setYouTubeData(data.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getYoutube();
  }, []);

  return (
    <>
      <Flex
        mx="auto"
        flexDir="column"
        w="full"
        alignItems="start"
        fontSize={[16, 20]}
        mt={4}
        gap={2}
      >
        <Text fontWeight="bold">주요 뉴스</Text>
        <Link to="https://www.blockmedia.co.kr/archives/505538" target="_blank">
          <Text decoration="underline">
            - 비트코인 장기보유자 매도세 4개월 만에 주춤
          </Text>
        </Link>
        <Link
          to="https://www.digitaltoday.co.kr/news/articleView.html?idxno=514014"
          target="_blank"
        >
          <Text decoration="underline">
            - 1분기 암호화폐 거래량, 원화가 달러 추월…"거래소 수수료 전쟁 덕"
          </Text>
        </Link>
        <Link to="https://www.coinreaders.com/106664" target="_blank">
          <Text decoration="underline">
            - 이더리움 고래들 패닉에 빠졌다?...ETH 3천달러 위협
          </Text>
        </Link>
        <Link to="https://www.etoday.co.kr/news/view/2351323" target="_blank">
          <Text decoration="underline">
            - 파월 ‘매파 발언’에 우는 비트코인…중동 위기 감소·美 경제 강세에도
            약세 [Bit코인]
          </Text>
        </Link>
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
            <YoutubeCard key={i} item={v} />
          ))}
        </Grid>
      </Flex>
    </>
  );
};

export default News;
