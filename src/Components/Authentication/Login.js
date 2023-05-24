import {
  VStack,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button,
  FormHelperText,
  Toast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

import { useHistory } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const Login = () => {
  const toast = useToast();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = () => {
    setShow(!show);
  };
  const handleSubmit = async () => {
    if ((email && password) === "") return;
    setLoading(true);

    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      console.log("data  --> " + data);
      history.push("/chats");
    } catch (error) {
      console.log(error.response.dat);
      setLoading(false);
      if (error.response.data.message) {
        toast({
          title: error.response.data.message,
          description: "Create an account to login ",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        console.log(error);
      }
    }
  };

  return (
    <VStack spacing="5" fontSize="3xl">
      <FormControl id="email">
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          type={"email"}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!email && (
          <FormHelperText color={"red"}>Email is required</FormHelperText>
        )}
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Enter your password"
            type={show ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement>
            <Button size={"sm"} onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        {!password && (
          <FormHelperText color={"red"}>Password is required</FormHelperText>
        )}
      </FormControl>

      <Button
        width={"100%"}
        bg="#c6f6d5"
        style={{ marginTop: 25 }}
        onClick={handleSubmit}
        isLoading={loading}
        colorScheme="teal"
        loadingText="Login"
        spinnerPlacement="end"
        variant="outline"
      >
        Login
      </Button>
      <Button
        variant={"solid"}
        colorScheme="blue"
        color={"black"}
        width={"100%"}
        onClick={() => {
          setEmail("test@gmail.com");
          setPassword("Test@123");
          handleSubmit();
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
