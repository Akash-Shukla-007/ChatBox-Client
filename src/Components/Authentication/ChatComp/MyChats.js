import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../../App";
import { getSender } from "../../../configs/ChatLogic";
import ChatLoading from "./ChatLoading";

function MyChats() {
  const [loggedUser, setloggedUser] = useState();
  const { user, selectedChat, setSelectedChat, chats, setChats } =
    useContext(ChatContext);
  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      console.log(data);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error occoured",
        description: "failed to load fetch the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setloggedUser(JSON.parse(localStorage.getItem("userInfo")));
    console.log("LOGGED USER --> " + loggedUser);
    fetchChats();
  }, []);
  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems={"center"}
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth={"1px"}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "20px", md: "20px" }}
        fontFamily="Work sans"
        display={"flex"}
        w={"100%"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        My Chats
        <Button
          rightIcon={<AddIcon />}
          display={"flex"}
          fonts={{ base: "17px", md: "10px", lg: "17px" }}
        >
          New Group Chat
        </Button>
      </Box>
      <Box
        display={"flex"}
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        borderRadius={"lg"}
        overflow="hidden"
      >
        {chats ? (
          <Stack overflowY={"scroll"} w="100%">
            {chats.map((chat) => (
              <Box
                onClick={setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat == chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat == chat ? "white" : "black"}
                px={3}
                py={2}
                w="100%"
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
}

export default MyChats;
