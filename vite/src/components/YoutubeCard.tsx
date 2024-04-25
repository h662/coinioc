import { Flex, Image, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IYoutube } from "..";
import axios from "axios";

interface YoutubeCardProps {
  youtubeData: IYoutube;
}

const YoutubeCard: FC<YoutubeCardProps> = ({ youtubeData }) => {
  const [channelTitle, setChannelTitle] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${
          youtubeData.video_id
        }&key=${import.meta.env.VITE_YOUTUBE_KEY}`
      )
      .then(({ data }) => {
        setTitle(data.items[0].snippet.title);
        setChannelTitle(data.items[0].snippet.channelTitle);
      });
  }, []);

  return (
    <Link
      to={`https://www.youtube.com/watch?v=${youtubeData.video_id}`}
      target="_blank"
    >
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
          src={`https://img.youtube.com/vi/${youtubeData.video_id}/0.jpg`}
          alt={youtubeData.video_id}
          roundedTop={20}
        />
        <Text mt={2} mx={2} fontWeight="semibold">
          {channelTitle}
        </Text>
        <Text my={2} mx={2}>
          {title}
        </Text>
      </Flex>
    </Link>
  );
};

export default YoutubeCard;
