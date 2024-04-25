import { Flex, Image, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { INews } from "..";

interface NewsCardProps {
  newsData: INews;
}

const NewsCard: FC<NewsCardProps> = ({ newsData }) => {
  return (
    <Link to={newsData.url} target="_blank">
      <Flex
        maxW={360}
        flexDir="column"
        bgColor="gray.100"
        _hover={{ bgColor: "gray.200" }}
        rounded={12}
        pb={2}
      >
        <Image
          w={360}
          h={270}
          objectFit="cover"
          src={newsData.thumbnail}
          alt={newsData.title}
          roundedTop={20}
        />
        <Text mt={2} mx={2} fontWeight="semibold">
          {newsData.channel_title}
        </Text>
        <Text my={2} mx={2}>
          {newsData.title}
        </Text>
      </Flex>
    </Link>
  );
};

export default NewsCard;
