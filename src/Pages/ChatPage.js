import React, { useContext, useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import axios from "axios";
import Sidebar from "../Components/Authentication/ChatComp/Sidebar";
import MyChats from "../Components/Authentication/ChatComp/MyChats";
import ChatBox from "../Components/Authentication/ChatComp/ChatBox";
import { ChatContext } from "../App";

function ChatPage() {
  const { user } = useContext(ChatContext);
  return (
    <div style={{ width: "100%" }}>
      {user && <Sidebar />}
      <Box display={"flex "} justifyContent="space-between  ">
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
}

export default ChatPage;
