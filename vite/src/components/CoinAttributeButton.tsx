import {
  Button,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { FC } from "react";

interface CoinAttributeButtonProps {
  title: string;
  description: string;
  width: number | number[];
}

const CoinAttributeButton: FC<CoinAttributeButtonProps> = ({
  title,
  description,
  width,
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button w={width} variant="link" fontSize={[10, 14]}>
          {title}
        </Button>
      </PopoverTrigger>
      <PopoverContent p={2}>
        <PopoverCloseButton />
        <PopoverBody>{description}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default CoinAttributeButton;
