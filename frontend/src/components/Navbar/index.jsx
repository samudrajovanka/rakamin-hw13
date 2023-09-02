import { Box, Button, Container, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import useOAuth from "../../stores/oAuth";
import NavLink from "../NavLink";

const Navbar = () => {
  const oAuth = useOAuth((state) => state);

  return (
    <Box
      as="nav"
      bg='blue.500'
      py="4"
      color="white"
      position="sticky"
      top={0}
      zIndex={99}
    >
      <Container maxW="6xl">
        <Flex justifyContent="space-between" alignItems="center" h="40px">
          <Flex gap={8}>
            <NavLink to="/">
              Home
            </NavLink>

            {oAuth.isLogged ? (
              <NavLink to="/books/create">
                Create Book
              </NavLink>
            ) : null}
          </Flex>

          {oAuth.isLogged ? (
            <Button
              onClick={oAuth.logout}
              variant="outline"
              colorScheme="white"
            >
              Logout
            </Button>
          ) : (
            <Flex gap={4}>
              <Link to="/register">
                <Button colorScheme="blue">
                  Register
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" colorScheme="white">
                  Login
                </Button>
              </Link>
            </Flex>
          )}
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar;
