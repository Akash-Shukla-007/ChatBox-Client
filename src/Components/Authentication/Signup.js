import {
  VStack,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button,
  FormHelperText,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const Signup = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [emailValidationError, setEmailValidationError] = useState("");
  const [nameValidationError, setNameValidationError] = useState("");
  const [passwordValidationError, setPasswordValidationError] = useState("");
  const [cnPassowordError, setCnPassowordError] = useState("");
  const history = useHistory();

  const validateName = (name) => {
    if (name === "") {
      setNameValidationError("Name is required");
      return false;
    }
    setNameValidationError("");
    return true;
  };
  const validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //email regullar expression
    if (email == "") {
      setEmailValidationError("Email is required");
      return false;
    }
    if (!re.test(email)) {
      setEmailValidationError("Please enter valid email");
      return false;
    }
    setEmailValidationError("");
    return true;
  };

  const validatePassword = (password) => {
    if (password === "") {
      setPasswordValidationError("Password is required");
      return false;
    }
    if (password.length < 8) {
      setPasswordValidationError("Password should min 8 characters");
      return false;
    }
    if (password.search(/[a-z]/i) < 0) {
      setPasswordValidationError("Password must contain atleast one alphabets");
      return false;
    }
    if (password.search(/[0-9]/) < 0) {
      setPasswordValidationError("Password must contain atleast one numbers");
      return false;
    }
    setPasswordValidationError("");
    return true;
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (confirmPassword === "") {
      setCnPassowordError("Confirm Password is required");
      return false;
    }
    if (confirmPassword !== password) {
      setCnPassowordError("Password and Confirm Password should be same");
      return false;
    }
    setCnPassowordError("");
    return true;
  };

  const handleClick = () => {
    setShow(!show);
  };

  const postDetails = (pic) => {};
  const handleSubmit = async () => {
    let v1 = validateName(name);
    let v2 = validateEmail(email);
    let v3 = validatePassword(password);
    let v4 = validateConfirmPassword(confirmPassword, password);
    if (!(v1 && v2 && v3 && v4)) return;
    setLoading(true);
    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      console.log("data  --> " + data);
      history.push("/chats");
    } catch (error) {
      setLoading(false);
      if (error.response.data.message) {
        toast({
          title: error.response.data.message,
          description: "Try to login ",
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
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          type={"text"}
          onChange={(e) => setName(e.target.value)}
        />
        {nameValidationError && (
          <FormHelperText color={"red"}>{nameValidationError}</FormHelperText>
        )}
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          type={"email"}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailValidationError && (
          <FormHelperText color={"red"}>{emailValidationError}</FormHelperText>
        )}
      </FormControl>
      <FormControl id="password" isRequired>
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
        {passwordValidationError && (
          <FormHelperText color={"red"}>
            {passwordValidationError}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Enter the password again"
            type={show ? "text" : "password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement>
            <Button size={"sm"} onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        {cnPassowordError && (
          <FormHelperText color={"red"}>{cnPassowordError}</FormHelperText>
        )}
      </FormControl>
      <FormControl id="picture">
        <FormLabel>Picture</FormLabel>
        <Input
          type={"file"}
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        width={"100%"}
        bg="#c6f6d5"
        style={{ marginTop: 25 }}
        onClick={handleSubmit}
        isLoading={loading}
        colorScheme="teal"
        loadingText="Signup"
        spinnerPlacement="end"
        variant="outline"
      >
        Signup
      </Button>
    </VStack>
  );
};

export default Signup;
