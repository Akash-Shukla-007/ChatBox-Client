import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Tooltip,
  Text,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatContext } from "../../../App";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";

function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const { user, setSelectedChat, chats, setChats } = useContext(ChatContext);
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const accessChat = async (userId) => {
    console.log("access");
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("/api/chat", { userId }, config);
      console.log(data);
      if (!chats.find((c) => c._d === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error occoured",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
    // try {
    //   setLoadingChat(true);
    //   const config = {
    //     headers: {
    //       "content-type": "application/json",
    //       Authorization: `Bearer ${user.token}`,
    //     },
    //   };
    //   const { data } = await axios.post("/api/chat", { userId }, config);
    //   // if (!chats.find((c) => c._id === data._id)) {
    //   //   setChats([data, ...chats]);
    //   // }
    //   setSelectedChat(data);
    //   setLoadingChat(false);
    //   onClose();
    // } catch (error) {
    //   toast({
    //     title: "Error occoured",
    //     description: "Failed to load the Chats ",
    //     status: "error",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "bottom-left",
    //   });
    // }
  };

  const handleSearch = async () => {
    if (search) {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`/api/user?search=${search}`, config);
        setLoading(false);
        console.log(user.token);
        setSearchResult(data);
        // console.log(data);
      } catch (error) {
        toast({
          title: "Error occoured",
          description: "Failed to load the search results",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    }
  };

  return (
    <>
      <Box
        w={"100%"}
        bg={"white"}
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
        p={"5px 1-px 5px 10px"}
        borderWidth={"5px"}
      >
        <Tooltip hasArrow label="Search for Users" placeItems="bottom-end">
          <Button variant={"ghost"} onClick={onOpen}>
            <i color="black" class="fa-sharp fa-solid fa-magnifying-glass"></i>
            <Text d={{ base: "none", md: "flex" }} px={4}>
              Search Users
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize={"2xl"} fontFamily={"Work sans"}>
          Chat-Box
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize={"2xl"} m={1} />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                name={user.name}
                cursor="pointer"
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" isOpen={isOpen} onClose={onclose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Search User</DrawerHeader>
          <DrawerBody>
            <Box display={"flex"} pb={"2"}>
              <Input
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult &&
              searchResult.map((user) => {
                return (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                );
              })
            )}
            {loadingChat && <Spinner ml={"auto"} display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Sidebar;
