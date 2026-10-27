import { Route, Routes } from "react-router-dom";
import BoardFooter from "./components/BoardFooter";
import BoardHeader from "./components/BoardHeader";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostDetail from "./components/PostDetail";
import Login from "./components/Login";

import "./style.css";
import { useAuthContext } from "./useAuthContext.jsx";

export default function App() {

  const { token, login, clearAuth } = useAuthContext();

  function savePost(post) {
    // setPosts((currentPosts) => [
    //   {id: Date.now(), ...post, authorNickname: "학생", createdDatetime: "2026-10-04"},
    //   ...currentPosts,
    // ]);
  }

  // App(토큰 보유) > Todolist(토큰 불필요)
  // > TodoItem(토큰 불필요) > Item(토큰 필요)
  //
  // 자식에게 값을 전달하기 위해
  // 해당 값을 필요로 하지 않는 컴포넌트들을 거치는 문제
  // props drilling
  //
  // Context
  // Auth(토큰 등) 정보를 Context에 저장하고,
  // token이 필요한 컴포넌트가 Context에서 가져다 쓰는 방식

  return (
    <>
      <BoardHeader/>
      <Routes>
        <Route path="/" element={token ? <PostList /> : <Login />}/>
        <Route path="/posts" element={token ? <PostList /> : <Login />}/>
        <Route path="/posts/new" element={token ? <PostForm onSave={savePost} /> : <Login />}/>
        <Route path="/posts/:postId" element={token ? <PostDetail /> : <Login />}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      <BoardFooter />
    </>
  )
}