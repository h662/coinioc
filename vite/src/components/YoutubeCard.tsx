import { Flex, Image, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { IYoutube } from "..";
import axios from "axios";
import { FiHeart } from "react-icons/fi";
import supabaseClient from "../lib/supabaseClient";
import { OutletContext } from "./Layout";

interface YoutubeCardProps {
  youtubeData: IYoutube;
}

const YoutubeCard: FC<YoutubeCardProps> = ({ youtubeData }) => {
  const [channelTitle, setChannelTitle] = useState<string>("");
  const [title, setTitle] = useState<string>("");

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
        "toggle-youtube-like",
        { body: { youtubeId: youtubeData.id } }
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

    supabaseClient.functions
      .invoke("get-youtube-likes-count", {
        body: { youtubeId: youtubeData.id },
      })
      .then(({ data }) => {
        setLikes(data);
      });

    supabaseClient.functions
      .invoke("get-youtube-is-liked", { body: { youtubeId: youtubeData.id } })
      .then(({ data }) => {
        if (!data) return;

        setIsLiked(data.is_liked);
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
        pb={4}
      >
        <Image
          w={360}
          h={270}
          objectFit="cover"
          src={`https://img.youtube.com/vi/${youtubeData.video_id}/0.jpg`}
          alt={youtubeData.video_id}
          roundedTop={20}
        />
        <Text mt={2} mx={4} fontWeight="semibold">
          {channelTitle}
        </Text>
        <Text my={2} mx={4}>
          {title}
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

export default YoutubeCard;
