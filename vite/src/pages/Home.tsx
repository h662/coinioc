import {
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import CoinTabPanel from "../components/CoinTabPanel";
import { ICoinData } from "..";

const Home: FC = () => {
  const [allCoins, setAllCoins] = useState<ICoinData[]>();
  const [page, setPage] = useState<number>(0);
  const [sortedTotalVolumes, setSortedTotalVolumes] = useState<ICoinData[]>([]);
  const [sortedTopGainers, setSortedTopGainers] = useState<ICoinData[]>([]);
  const [axiosError, setAxiosError] = useState<any>();

  const getCoins = async () => {
    try {
      const { data } = await axios.get<ICoinData[]>(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=krw&order=market_cap_desc&per_page=250&page=1&sparkline=false",
        {
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": import.meta.env.VITE_COIN_KEY,
          },
        }
      );

      setAllCoins(data);
    } catch (error) {
      console.error(error);

      setAxiosError(error);
    }
  };

  const onClickNext = () => {
    if (page === 24) {
      setPage(0);
    } else {
      setPage(page + 1);
    }
  };
  const onClickPrev = () => {
    if (page === 0) {
      setPage(24);
    } else {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    getCoins();
  }, []);

  useEffect(() => {
    if (allCoins) {
      const totalVolumes = Object.values(allCoins).sort(
        (coin1, coin2) => coin2.total_volume - coin1.total_volume
      );

      setSortedTotalVolumes(totalVolumes);

      const topGainers = Object.values(allCoins).sort(
        (coin1, coin2) =>
          coin2.price_change_percentage_24h - coin1.price_change_percentage_24h
      );

      setSortedTopGainers(topGainers);
    }
  }, [allCoins]);

  if (!allCoins && axiosError)
    return (
      <Flex
        maxW={768}
        mx="auto"
        minH="100vh"
        px={2}
        flexDir="column"
        textAlign="center"
      >
        <Text>429 Too Many Request.</Text>
        <Text>잠시후 다시 접속해주세요.</Text>
      </Flex>
    );

  if (!allCoins)
    return (
      <Flex maxW={768} mx="auto" minH="100vh" px={2}>
        Loading...
      </Flex>
    );

  return (
    <Tabs variant="soft-rounded">
      <TabList
        justifyContent="space-between"
        maxW={480}
        mt={4}
        w="full"
        mx="auto"
      >
        <Flex>
          <Tab onClick={() => setPage(0)} fontSize={[10, 14]}>
            시가총액 순
          </Tab>
          <Tab onClick={() => setPage(0)} fontSize={[10, 14]}>
            거래량 순(24h)
          </Tab>
          <Tab onClick={() => setPage(0)} fontSize={[10, 14]}>
            상승률 순(24h)
          </Tab>
        </Flex>
        <Flex>
          <Button variant="ghost" onClick={onClickPrev} size={["sm", "md"]}>
            &lt;
          </Button>
          <Button variant="ghost" onClick={onClickNext} size={["sm", "md"]}>
            &gt;
          </Button>
        </Flex>
      </TabList>
      <TabPanels>
        <TabPanel>
          <CoinTabPanel coinData={allCoins} page={page} />
        </TabPanel>
        <TabPanel>
          <CoinTabPanel coinData={sortedTotalVolumes} page={page} />
        </TabPanel>
        <TabPanel>
          <CoinTabPanel coinData={sortedTopGainers} page={page} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Home;
