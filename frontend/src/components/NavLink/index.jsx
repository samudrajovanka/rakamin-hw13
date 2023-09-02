/* eslint-disable react/prop-types */
import { Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NavLink = ({
  children,
  to
}) => {
  return (
    <Text
      as={Link}
      to={to}
      fontWeight="medium"
      _hover={{
        textDecoration: 'underline'
      }}
    >
      {children}  
    </Text>
  )
}

export default NavLink;
