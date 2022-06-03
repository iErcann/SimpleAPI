import { useRef, useState, useEffect } from 'react';
import {
    Box, Flex, Badge, Avatar, Text, SimpleGrid
} from '@chakra-ui/react';
import { useCookies } from 'react-cookie';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [cookies, setCookie] = useCookies(['token']);

    useEffect(() => {
        if (cookies.length === 0) return
        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: new Headers({
                'Authorization': 'Basic ' + cookies.token,
                'Content-Type': 'application/json'
            }),
        };

        fetch('http://localhost:8080/users', requestOptions)
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                setUsers(res);
            })

    }, [cookies.token])

    return (
        <Box w={[300, 400, 500]} p={4} shadow='md' borderWidth='1px' >
            <h2>
                Users
            </h2>
            <Box>
                {users.length > 0 ?
                    <Box>
                        <Text> {users.length} Users </Text>
                        <SimpleGrid columns={3} spacing={10}>
                            {users.map((user) => {
                                return (
                                    <Box my='6' key={user.username}>
                                        <Avatar src='https://bit.ly/sage-adebayo' />
                                        <Text fontWeight='bold'>
                                            {user.username}
                                            <Badge ml='1' colorScheme='green'>
                                                USER
                                            </Badge>
                                        </Text>
                                        <Text fontSize='sm'>{user.email}</Text>
                                    </Box>
                                )
                            })}
                        </SimpleGrid>
                    </Box>
                    : "You need to be signed in."
                }

            </Box>
        </Box>
    )



}



