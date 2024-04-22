import { Flex, TabPanel } from "@chakra-ui/react";
import { FC } from "react";
import CoinAttributeButton from "./CoinAttributeButton";
import CoinCard from "./CoinCard";
import { ICoinData } from "..";

const coinAttributeList = [
  {
    title: "순위",
    description: "코인의 시가총액을 기준으로 한 순위입니다.",
    width: [10, 12],
  },
  {
    title: "로고",
    description: "각 코인을 상징하는 이미지입니다.",
    width: [8, 10],
  },
  {
    title: "이름",
    description:
      "코인의 이름입니다. 코인의 상세 정보는 클릭하면 확인할 수 있습니다.",
    width: [20, 40],
  },
  {
    title: "가격",
    description:
      "현재 코인의 가격입니다.(원화) 가격이 100원 이하인 경우 작은 글씨로 소수 3자리까지 표현됩니다.",
    width: [24, 40],
  },
  {
    title: "등락폭",
    description:
      "24시간 기준 코인의 등락폭을 나타냅니다. 급등락(10%)하는 경우는 굵은 글씨로 표현됩니다.",
    width: 16,
  },
];

interface CoinTabPanelProps {
  coinData: ICoinData[];
  page: number;
}

const CoinTabPanel: FC<CoinTabPanelProps> = ({ coinData, page }) => {
  return (
    <TabPanel>
      <Flex
        justifyContent="center"
        alignItems="center"
        p={1}
        textAlign="center"
        mx="auto"
      >
        {coinAttributeList.map((v, i) => (
          <CoinAttributeButton
            key={i}
            title={v.title}
            description={v.description}
            width={v.width}
          />
        ))}
      </Flex>
      <Flex flexDir="column" gap={4} mt={4} flexGrow={1}>
        {coinData.map(
          (v, i) =>
            i >= page * 10 &&
            i <= page * 10 + 9 && <CoinCard key={i} index={i} coinData={v} />
        )}
      </Flex>
    </TabPanel>
  );
};

export default CoinTabPanel;
