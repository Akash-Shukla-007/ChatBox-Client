import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

function UserListItem({ user, handleFunction }) {
  return (
    <>
      <Box
        onClick={handleFunction}
        cursor="pointer"
        bg={"#E8E8E8"}
        w="100%"
        display={"flex"}
        alignItems="center"
        color={"black"}
        _hover={{
          background: "#38B2AC",
          color: "white",
        }}
        px={3}
        py={2}
        mb={2}
        borderRadius="10px"
      >
        <Avatar
          src={user.pic}
          mr={2}
          size={"sm"}
          cursor={"pointer"}
          name={user.name}
        />
        <Box>
          <Text>{user.name}</Text>
          <Text fontSize={"xs"}>
            <b>Email : </b>
            {user.email}
          </Text>
        </Box>
      </Box>
    </>
  );
}

export default UserListItem;
