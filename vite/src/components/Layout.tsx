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
}

const Layout: FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<IProfile>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    supabaseClient.functions.invoke("get-me").then(({ data }) => {
      if (!data?.nickname) navigate("/profile");

      setProfile(data);
    });

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Flex maxW={768} mx="auto" minH="100vh" flexDir="column" px={2}>
      {location.pathname !== "/profile" && (
        <Header session={session} profile={profile} />
      )}
      <Outlet context={{ session, profile, setProfile }} />
    </Flex>
  );
};

export default Layout;
