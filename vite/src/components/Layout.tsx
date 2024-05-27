import { Flex } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Header from "./Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import supabaseClient from "../lib/supabaseClient";
import { IProfile } from "..";

export interface OutletContext {
  session: Session | null;
  profile: IProfile;
  setProfile: Dispatch<SetStateAction<IProfile>>;
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
}

const Layout: FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<IProfile>();
  const [image, setImage] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const getMe = async () => {
      try {
        const { data } = await supabaseClient.functions.invoke("get-me");

        if (!data?.nickname) navigate("/profile");

        setProfile(data);
      } catch (error) {
        console.error(error);
      }
    };

    getMe();
  }, [session]);

  useEffect(() => {
    if (!profile) return;

    if (profile.avartar) {
      supabaseClient.functions
        .invoke("get-avartar", {
          body: { avartar: profile.avartar },
        })
        .then(({ data }) => {
          setImage(data.signedUrl);
        });
    }
  }, [profile]);

  return (
    <Flex maxW={768} mx="auto" minH="100vh" flexDir="column" px={2}>
      {location.pathname !== "/profile" && (
        <Header session={session} profile={profile} image={image} />
      )}
      <Outlet context={{ session, profile, setProfile, image, setImage }} />
    </Flex>
  );
};

export default Layout;
