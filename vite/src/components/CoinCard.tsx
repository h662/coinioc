import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import FluctuationRange from "./FluctuationRange";
import supabaseClient from "../lib/supabaseClient";
import DateText from "./DateText";
import { getKoreanCurrency } from "../lib/koreanCurrencyConverter";
import { OutletContext } from "./Layout";

interface CoinCardProps {
  index: number;
  coinData: any;
}

const CoinCard: FC<CoinCardProps> = ({ index, coinData }) => {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { session } = useOutletContext<OutletContext>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const onClickCreatePost = async () => {
    try {
      if (!content || content.length > 150) return;
      // 150자 이내 표시

      setIsLoading(true);

      const { data } = await supabaseClient.functions.invoke("create-post", {
        body: {
          content,
          coinData: JSON.stringify(coinData),
        },
      });

      // navigate("/post") => navigate("/post/[id]")
      navigate(`/post/${data.id}`);
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  };

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        bgColor="gray.100"
        shadow={200}
        p={1}
        _hover={{ bgColor: "gray.200" }}
        rounded={8}
        mx="auto"
        cursor="pointer"
        onClick={onOpen}
        w="full"
        maxW={480}
      >
        <Flex alignItems="center" justifyContent="space-between">
          <Text
            fontSize={[16, 16, 20]}
            noOfLines={1}
            fontWeight="bold"
            w={[10, 12]}
            align="center"
          >
            {index + 1}
          </Text>
          <Image
            src={coinData.image}
            alt={coinData.symbol}
            w={[8, 8, 10]}
            h={[8, 8, 10]}
            objectFit="cover"
            rounded="full"
          />
          <Text
            fontSize={[12, 14, 20]}
            noOfLines={1}
            w={[20, 24, 40]}
            fontWeight="bold"
            pl={1}
          >
            {coinData.name}
          </Text>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between">
          <Text
            fontSize={
              coinData.current_price >= 100 ? [12, 14, 20] : [8, 10, 16]
            }
            w={[20, 24, 40]}
            align="right"
          >
            {coinData.current_price >= 100
              ? getKoreanCurrency(coinData.current_price)
              : coinData.current_price >= 0.001
              ? coinData.current_price.toFixed(3)
              : coinData.current_price.toFixed(6)}
            원
          </Text>
          <FluctuationRange coinData={coinData} width={[12, 14, 16]} />
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={2}>
          <ModalHeader>
            #{coinData.market_cap_rank} {coinData.name}{" "}
            <Text fontWeight="semibold" display="inline-block">
              {coinData.symbol}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            fontSize={[12, 16]}
            display="flex"
            flexDir="column"
            gap={4}
          >
            <Image
              src={coinData.image}
              alt={coinData.symbol}
              w={20}
              h={20}
              objectFit="cover"
              rounded="full"
            />
            <Box mt={4}>
              <Text w={24} display="inline-block" fontWeight="semibold">
                총 발행량
              </Text>{" "}
              {getKoreanCurrency(Math.round(coinData.total_supply))} 개
            </Box>
            <Box>
              <Text w={24} display="inline-block" fontWeight="semibold">
                시가총액
              </Text>{" "}
              {getKoreanCurrency(coinData.market_cap)}원
            </Box>
            <Box>
              <Text w={24} display="inline-block" fontWeight="semibold">
                거래량(24h)
              </Text>{" "}
              {getKoreanCurrency(coinData.total_volume)}원
            </Box>
            <Box>
              <Text w={24} display="inline-block" fontWeight="semibold">
                현재가
              </Text>{" "}
              {coinData.current_price >= 100
                ? getKoreanCurrency(coinData.current_price)
                : coinData.current_price >= 0.001
                ? coinData.current_price.toFixed(3)
                : coinData.current_price.toFixed(6)}
              원 <FluctuationRange coinData={coinData} fontSize={[12, 16]} />
            </Box>
            <Box>
              <Text w={24} display="inline-block" fontWeight="semibold">
                사상 최고가
              </Text>{" "}
              {coinData.ath >= 100
                ? getKoreanCurrency(Math.ceil(coinData.ath))
                : coinData.ath >= 0.001
                ? coinData.ath.toFixed(3)
                : coinData.ath.toFixed(6)}
              원{" "}
              <Text display="inline-block" textColor="blue.500" fontSize={14}>
                {coinData.ath_change_percentage.toFixed(2)}%
              </Text>{" "}
              <DateText date={coinData.ath_date} parentheses={true} />
            </Box>
            <Textarea
              h={40}
              resize="none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              isDisabled={isLoading || !session}
              placeholder={session ? "" : "로그인이 필요합니다."}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              onClick={onClickCreatePost}
              isLoading={isLoading}
              isDisabled={isLoading || !session}
            >
              의견 남기기
            </Button>
            <Button
              mr={3}
              onClick={onClose}
              colorScheme="red"
              isDisabled={isLoading}
            >
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CoinCard;
