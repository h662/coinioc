import { Text } from "@chakra-ui/react";
import { FC } from "react";

interface FluctuationRangeProps {
  coinData: any;
  width?: number[];
  fontSize?: number[];
  isBrackets?: boolean;
}

const FluctuationRange: FC<FluctuationRangeProps> = ({
  coinData,
  width = "fit-content",
  fontSize = 14,
  isBrackets = false,
}) => {
  return (
    <Text
      fontSize={fontSize}
      color={
        coinData.price_change_percentage_24h.toFixed(1) == 0
          ? "black"
          : coinData.price_change_percentage_24h.toFixed(1) > 0
          ? "red.500"
          : "blue.500"
      }
      w={width}
      align="center"
      fontWeight={
        Math.abs(coinData.price_change_percentage_24h) >= 10 ? "semibold" : ""
      }
      display="inline-block"
    >
      {isBrackets && "("}
      {coinData.price_change_percentage_24h.toFixed(1) == 0
        ? ""
        : coinData.price_change_percentage_24h > 0
        ? "+"
        : "-"}
      {Math.abs(coinData.price_change_percentage_24h.toFixed(1))}%
      {isBrackets && ")"}
    </Text>
  );
};

export default FluctuationRange;
