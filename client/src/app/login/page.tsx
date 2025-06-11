'use client';

import { Box, Button, Field, Heading, Input, Stack } from '@chakra-ui/react';
import { PasswordInput } from '@components/ui/password-input';
import { fetchLogin } from 'api/api';
import { useForm } from 'react-hook-form';

interface FormValues {
  username: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(async (data) => {
    const { username, password } = data;

    var result = await fetchLogin(username, password);
    console.log(result);

    // fetch('/api/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ username, password }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.success) {
    //       // Redirect to dashboard or home page
    //       console.log('Login successful');
    //     } else {
    //       // Handle login failure
    //       console.error('Login failed:', data.message);
    //     }
    //   });
  });

  return (
    <Box
      p={8}
      alignContent={'center'}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Heading mb={6}>Login</Heading>
      <form onSubmit={onSubmit}>
        <Stack gap="4" align="flex-start" maxW="sm">
          <Field.Root invalid={!!errors.username}>
            <Field.Label>Username</Field.Label>
            <Input {...register('username')} />
            <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.password}>
            <Field.Label>Password</Field.Label>
            <PasswordInput {...register('password')} />
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>

          <Box
            pt={5}
            alignContent={'center'}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            w={'100%'}
          >
            <Button type="submit" color={'white'} background={'blue'}>
              Login
            </Button>
            <Button>Cancel</Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );

  // return (
  //   <Box
  //     p={8}
  //     alignContent={'center'}
  //     display="flex"
  //     flexDirection="column"
  //     alignItems="center"
  //   >
  //     <Heading mb={6}>Login</Heading>
  //     <Box as="form" method="post">
  //       <Field.Root required>
  //         <Field.Label>
  //           Username <Field.RequiredIndicator />
  //         </Field.Label>
  //         <Input placeholder="Enter your username" />
  //         <Field.HelperText></Field.HelperText>
  //         <Field.ErrorText>Username is required</Field.ErrorText>
  //       </Field.Root>
  //       <Box mb={4} display="flex" flexDirection={'column'}>
  //         <Box as="label" htmlFor="username" pr={10}>
  //           Username
  //         </Box>
  //         <Input
  //           type="text"
  //           id="username"
  //           name="username"
  //           required
  //           w={'225px'}
  //           variant={'outline'}
  //           value={username}
  //           placeholder="Enter your username"
  //           onChange={(e) => setUsername(e.target.value)}
  //         />
  //         <Box as="label" htmlFor="password" pr={10}>
  //           Password
  //         </Box>
  //         <Input
  //           type="password"
  //           id="password"
  //           name="password"
  //           required
  //           w={'225px'}
  //           variant={'outline'}
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //         />
  //       </Box>
  //       <Box
  //         p={5}
  //         alignContent={'center'}
  //         display="flex"
  //         flexDirection="row"
  //         alignItems="center"
  //         justifyContent="space-between"
  //       >
  //         <Button type="submit" color={'white'} background={'blue'}>
  //           Login
  //         </Button>
  //         <Button>Cancel</Button>
  //       </Box>
  //     </Box>
  //   </Box>
  //);
}
