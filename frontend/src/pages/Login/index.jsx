import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  useToast
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useMutation from "../../lib/hooks/useMutation";
import { login } from "../../repositories/auth";
import useOAuth from "../../stores/oAuth";

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const oAuth = useOAuth((state) => state);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const toggleShowPassowrd = useCallback(() => {
    setIsShowPassword(!isShowPassword);
  }, [isShowPassword]);

  const handleChangeInput = useCallback((e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    });
  }, [loginForm]);

  const loginMutation = useMutation({
    apiFn: login,
    onSuccess: (data) => {
      oAuth.login(data.token);

      navigate('/');
    },
    onError: (error) => {
      if (error.message === 'Invalid credentials') {
        toast({
          title: 'Email or password is incorrect',
          status: 'error'
        });

        return;
      }

      toast({
        title: 'Error',
        description: error.message,
        status: 'error'
      });
    }
  });

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    loginMutation.mutate(loginForm);
  }, [loginForm, loginMutation]);

  return (
    <Box
      display="grid"
      placeContent="center"
      position="absolute"
      w="100vw"
      h="100vh" top="0"
    >
      <Box
        w="400px"
        boxShadow='2xl'
        rounded="lg"
        p={6}
      >
        <Text fontSize="3xl" fontWeight="bold" mb={5} color="blue.500">Login</Text>

        <form onSubmit={handleSubmit}>
          <VStack spacing={2}>
            <FormControl>
              <FormLabel>
                Email
              </FormLabel>
              <Input
                type='email'
                name="email"
                onChange={handleChangeInput}
                placeholder='Enter email'
                required
                value={loginForm.email}
              />
            </FormControl>
            <FormControl>
              <FormLabel>
                Password
              </FormLabel>
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  type={isShowPassword ? 'text' : 'password'}
                  placeholder='Enter password'
                  name="password"
                  onChange={handleChangeInput}
                  required
                  value={loginForm.password}
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={toggleShowPassowrd}>
                    {isShowPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </VStack>

          <Box>
            <Button
              type="submit"
              colorScheme="blue"
              mt={8}
              isLoading={loginMutation.isLoading}
              w="100%"
            >
              Login
            </Button>

            <Text textAlign="center" mt={3}>
              Don&apos;t have an account? <Text as={Link} to="/register" color="blue.500">Register</Text>
            </Text>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default Login;
