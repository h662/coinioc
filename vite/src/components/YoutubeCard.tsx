import { Flex, Image, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";

interface YoutubeCardProps {
  item: any;
}

const YoutubeCard: FC<YoutubeCardProps> = ({ item }) => {
  return (
    <Link
      to={`https://www.youtube.com/watch?v=${item.id.videoId}`}
      target="_blank"
    >
      <Flex
        maxW={360}
        flexDir="column"
        bgColor="gray.100"
        _hover={{ bgColor: "gray.200" }}
        rounded={20}
      >
        <Image
          w={360}
          h={270}
          objectFit="cover"
          src={item.snippet.thumbnails.high.url}
          alt={item.snippet.title}
          roundedTop={20}
        />
        <Text mt={2} mx={2} fontWeight="semibold">
          {item.snippet.channelTitle}
        </Text>
        <Text my={2} mx={2}>
          {item.snippet.title}
        </Text>
      </Flex>
    </Link>
  );
};

export default YoutubeCard;
