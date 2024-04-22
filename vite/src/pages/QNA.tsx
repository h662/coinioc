import { Accordion } from "@chakra-ui/react";
import { FC } from "react";
import QNAItem from "../components/QNAItem";

const qnaList = [
  {
    question: "Coinioc는 어떤 서비스인가요?",
    answer:
      "Coinioc는 암호화폐에 대한 종합적인 정보를 제공하는 플랫폼입니다. 사용자들은 Coinioc을 통해 다양한 코인의 실시간 가격, 시장 상황, 역사적데이터, 팀 정보, 뉴스 및 이벤트 등을 손쉽게 확인할 수 있습니다. 또한, Coinioc은 사용자들에게 유용한 분석 도구와 커뮤니티 기능을 제공하여 암호화폐 투자에 대한 결정을 내릴 때 도움을 줍니다.",
  },
  {
    question: "Coinioc에서 제공하는 서비스에는 어떠한 것들이 있나요?",
    answer:
      "Coinioc은 기본적인 코인 시세 정보뿐만 아니라 현재 활발한 거래가 이루어지고 있는 코인, 가격이 가파르게 상승하고 있는 코인 등 다양한 정보를 제공합니다.",
  },
  {
    question: "Coinioc을 사용하는 장점은 무엇인가요?",
    answer:
      "Coinioc을 사용하면 실시간으로 업데이트되는 코인 시세 정보를 쉽게 확인할 수 있을 뿐만 아니라, 활발한 거래가 이루어지고 있는 코인이나 최신 트렌드를 파악할 수 있어 투자에 도움이 됩니다.",
  },
  {
    question: "Coinioc은 어떤 종류의 코인 정보를 제공하나요?",
    answer:
      "Coinioc은 비트코인을 비롯한 수많은 코인의 정보를 제공합니다. 주요 코인부터 토큰까지 다양한 종류의 코인에 대한 실시간 가격, 거래량, 시가총액 등의 정보를 제공합니다.",
  },
];

const QNA: FC = () => {
  return (
    <Accordion>
      {qnaList.map((v, i) => (
        <QNAItem key={i} question={v.question} answer={v.answer} />
      ))}
    </Accordion>
  );
};

export default QNA;
