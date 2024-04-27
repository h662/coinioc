import { Flex, Image, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { INews } from "..";
import { FiHeart } from "react-icons/fi";
import supabaseClient from "../lib/supabaseClient";
import { OutletContext } from "./Layout";

interface NewsCardProps {
  newsData: INews;
}

const NewsCard: FC<NewsCardProps> = ({ newsData }) => {
  const [likes, setLikes] = useState<number>();
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const { session } = useOutletContext<OutletContext>();

  const onClickLike = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();

      if (likes === undefined || !session) return;

      const { data } = await supabaseClient.functions.invoke(
        "toggle-news-like",
        { body: { newsId: newsData.id } }
      );

      if (data.is_liked) {
        setLikes(likes + 1);
        setIsLiked(true);
      } else {
        setLikes(likes - 1);
        setIsLiked(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    supabaseClient.functions
      .invoke("get-news-likes-count", { body: { newsId: newsData.id } })
      .then(({ data }) => {
        setLikes(data);
      });

    supabaseClient.functions
      .invoke("get-news-is-liked", { body: { newsId: newsData.id } })
      .then(({ data }) => {
        if (!data) return;

        setIsLiked(data.is_liked);
      });
  }, []);

  return (
    <Link to={newsData.url} target="_blank">
      <Flex
        maxW={360}
        flexDir="column"
        bgColor="gray.100"
        _hover={{ bgColor: "gray.200" }}
        rounded={12}
        pb={4}
      >
        <Image
          w={360}
          h={270}
          objectFit="cover"
          src={newsData.thumbnail}
          alt={newsData.title}
          roundedTop={20}
        />
        <Text mt={2} mx={4} fontWeight="semibold">
          {newsData.channel_title}
        </Text>
        <Text mx={4} my={2}>
          {newsData.title}
        </Text>
        <Flex
          justifyContent="end"
          alignItems="center"
          fontSize={[16, 20]}
          gap={1}
          _hover={{ color: "gray.500" }}
          onClick={onClickLike}
          px={4}
        >
          <FiHeart color={isLiked ? "red" : ""} />{" "}
          <Text w={[2.5, 5]} textAlign="right">
            {likes}
          </Text>
        </Flex>
      </Flex>
    </Link>
  );
};

export default NewsCard;
