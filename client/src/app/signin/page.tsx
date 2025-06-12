'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Box, Button, Field, Heading, Input, Stack } from '@chakra-ui/react';
import { PasswordInput } from '@components/ui/password-input';
import { useAuth } from '@components/AuthContext';

interface FormValues {
  username: string;
  password: string;
}

export default function SigninPage() {
  const router = useRouter();
  const { user, login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(async (data) => {
    const { username, password } = data;
    await login(username, password);
    // TODO: display error message if login fails
  });

  if (user) {
    // If user is already logged in, redirect to home page
    router.push('/');
    return null;
  }

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
              Signin
            </Button>
            <Button onClick={() => router.push('/')}>Cancel</Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}
