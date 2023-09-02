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
import { register } from "../../repositories/auth";

const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const toggleShowPassowrd = useCallback(() => {
    setIsShowPassword(!isShowPassword);
  }, [isShowPassword]);

  const handleChangeInput = useCallback((e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value
    });
  }, [registerForm]);

  const registerMutation = useMutation({
    apiFn: register,
    onSuccess: () => {
      navigate('/login');
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error'
      });
    }
  });

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    registerMutation.mutate(registerForm);
  }, [registerForm, registerMutation]);

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
        <Text fontSize="3xl" fontWeight="bold" mb={5} color="blue.500">Register</Text>

        <form onSubmit={handleSubmit}>
          <VStack spacing={2}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                onChange={handleChangeInput}
                placeholder="Enter name"
                required
                value={registerForm.name}
              />
            </FormControl>
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
                value={registerForm.email}
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
                  value={registerForm.password}
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
              isLoading={registerMutation.isLoading}
              loadingText="Registering"
              w="100%"
            >
              Register
            </Button>

            <Text textAlign="center" mt={3}>
              Have an account? <Text as={Link} to="/login" color="blue.500">Login</Text>
            </Text>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default Register;
