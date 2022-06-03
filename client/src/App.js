import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import Register from './Register';
import Login from './Login';
import Users from './Users';
import Signout from './Signout';
import { useCookies } from 'react-cookie';

function App() {
  const [cookies, setCookie] = useCookies();
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        {JSON.stringify(cookies)}
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            {
              cookies.token != "undefined" ? <Signout /> : <div>  <Login />
                <Register /> </div>
            }
            <Users />
          </VStack>

        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
