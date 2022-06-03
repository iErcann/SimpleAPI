import {  useState } from 'react';
import {
    Input, Box, Button, useToast
} from '@chakra-ui/react';
export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const toast = useToast()

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (email.length === 0 || password.length === 0 || username.length === 0) {
            alert("Please enter each field!");
            return;

        }  
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email })
        };

        const response = await fetch('http://localhost:8080/register', requestOptions);
        const json = await response.json();
        if (!response.ok) {
            toast({
                title: 'Error.',
                description: await json.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        } else {
            toast({
                title: 'Account created!',
                description: "You can use your account now.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            })

        }

        
    };

    return (
        <Box w={[300, 400, 500]} p={4}  shadow='md' borderWidth='1px' >
            <h2>
                Register
            </h2>
            <Box my={4}>
                <Input isRequired={true} my={2} type="text" placeholder="Your username" name="username" onChange={e => setUsername(e.target.value)} />
                <Input my={2} type="email" placeholder="Your email" name="email" onChange={e => setEmail(e.target.value)} />
                <Input my={2} type="password" placeholder="Your password" name="password" onChange={e => setPassword(e.target.value)} />
                <Button onClick={handleSubmit}> Submit </Button>
            </Box>
        </Box>
    )



}



