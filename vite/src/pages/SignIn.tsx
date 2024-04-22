import { Auth } from "@supabase/auth-ui-react";
import { FC, useEffect } from "react";
import supabaseClient from "../lib/supabaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate, useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";

const SignIn: FC = () => {
  const { session } = useOutletContext<OutletContext>();

  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, []);

  return (
    <Auth
      supabaseClient={supabaseClient}
      appearance={{
        theme: ThemeSupa,
        style: {
          button: {
            background: "#E2E8F0",
            color: "#1A202C",
            borderColor: "white",
          },
        },
      }}
      providers={["google", "kakao"]}
      localization={{
        variables: {
          sign_in: {
            email_input_placeholder: "이메일을 입력하세요.",
            password_input_placeholder: "패스워드를 입력하세요.",
            button_label: "로그인",
          },
          sign_up: {
            email_input_placeholder: "이메일을 입력하세요.",
            password_input_placeholder: "패스워드를 입력하세요.",
            button_label: "회원가입",
          },
        },
      }}
    />
  );
};

export default SignIn;
