import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { FC } from "react";

interface QNAItemProps {
  question: string;
  answer: string;
}

const QNAItem: FC<QNAItemProps> = ({ question, answer }) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left" fontWeight="semibold">
            Q. {question}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>A. {answer}</AccordionPanel>
    </AccordionItem>
  );
};

export default QNAItem;
