import React, { createContext, useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import ChatPage from "./Pages/ChatPage";
import Home from "./Pages/Home";
import "./css/app.css";

export const ChatContext = createContext();

function App() {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    setUser(JSON.parse(userInfo));
    if (!userInfo) {
      history.push("/");
    }
  }, [history]);

  return (
    <ChatContext.Provider
      value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}
    >
      <div className="home_root_conatiner">
        <Route path="/" component={Home} exact />
        <Route path="/chats" component={ChatPage} />
      </div>
    </ChatContext.Provider>
  );
}

export default App;
