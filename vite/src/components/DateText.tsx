import { Text } from "@chakra-ui/react";
import { FC } from "react";

interface DateTextProps {
  date: string;
  parentheses?: boolean;
  hours?: boolean;
  fontSize?: number | number[];
}

const DateText: FC<DateTextProps> = ({
  date,
  parentheses = false,
  hours = false,
  fontSize = [10, 14],
}) => {
  return (
    <Text display="inline-block" fontSize={fontSize}>
      {parentheses && "("}
      {new Date(date).getFullYear().toString().substring(2)}년{" "}
      {new Date(date).getMonth()}월 {new Date(date).getDate()}일
      {hours && `${" "}${new Date(date).getHours()}시`}
      {parentheses && ")"}
    </Text>
  );
};

export default DateText;
