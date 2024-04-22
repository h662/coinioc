import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import QNA from "./pages/QNA";
import News from "./pages/News";
import SignIn from "./pages/SignIn";
import Nickname from "./pages/Nickname";
import Post from "./pages/Post";
import PostDetail from "./pages/PostDetail";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<Post />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/news" element={<News />} />
          <Route path="/qna" element={<QNA />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/nickname" element={<Nickname />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
