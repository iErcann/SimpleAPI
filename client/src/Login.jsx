import { useRef, useState } from 'react';
import {
    Input, Box, Button, useToast, useColorModeValue, AlertIcon, AlertTitle, AlertDescription, Alert
} from '@chakra-ui/react';
import { useCookies } from 'react-cookie';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const toast = useToast()
    const [cookies, setCookie] = useCookies(['token']);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password.length === 0 || username.length === 0) {
            toast({
                title: 'Error.',
                description: "Please enter each field!",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            return;

        }
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        };


        const response = await fetch('http://localhost:8080/login', requestOptions);
        const json = await response.json();
        if (!response.ok) {
            console.log(response.json())
            toast({
                title: 'Error.',
                description: await json.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        } else {
            toast({
                title: 'Login done.',
                description: "You can use your account now.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
            setCookie('token', json.token, { path: '/' });
        }

    };

    return (
        <Box w={[300, 400, 500]} p={4} shadow='md' borderWidth='1px' >
            <h2>
                Login
            </h2>
            <Box my={4}>
                <Input isRequired={true} my={2} type="text" placeholder="Your username" name="username" onChange={e => setUsername(e.target.value)} />
                <Input my={2} type="password" placeholder="Your password" name="password" onChange={e => setPassword(e.target.value)} />
                <Button onClick={handleSubmit}> Submit </Button>
            </Box>
        </Box>
    )



}



