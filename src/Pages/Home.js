import React, { useEffect } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Input,
  Stack,
  Tabs,
  Text,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { Route, useHistory } from "react-router-dom";
import Login from "../Components/Authentication/Login.js";
import Signup from "../Components/Authentication/Signup.js";

function Home() {
  const history = useHistory();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      history.push("/chats");
    }
  }, [history]);
  return (
    <Container maxW="xl" centerContent>
      <Box
        bg="white"
        d="flex"
        justifyContent="center"
        textAlign="center"
        p={3}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          fontSize="5xl"
          fontFamily="'Oswald',sans-serif"
          letterSpacing="wide"
        >
          Chat-Box
        </Text>
      </Box>
      <Box width="100%" bg="white" p={3} borderRadius="lg" borderWidth="1px">
        <Tabs colorScheme="green" variant={"soft-rounded"}>
          <TabList m={"10px 0 0 0"}>
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Home;
