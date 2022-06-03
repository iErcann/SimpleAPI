import {
    Box, Button
} from '@chakra-ui/react';
import { useCookies } from 'react-cookie';

export default function Signout() {
    const [cookies, setCookie] = useCookies(['token']);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
        };

        const response = await fetch('http://localhost:8080/signout', requestOptions);
        const json = await response.json();
        setCookie('token', undefined, { path: '/' });
    };

    return (
        <Box w={[300, 400, 500]} p={4} shadow='md' borderWidth='1px' >
            <h2>
                Signout
            </h2>
            <Box my={4}>
                <Button color={"red"} onClick={handleSubmit}> Signout </Button>
            </Box>
        </Box>
    )
}

