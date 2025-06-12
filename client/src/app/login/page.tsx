'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Box, Button, Field, Heading, Input, Stack } from '@chakra-ui/react';
import { PasswordInput } from '@components/ui/password-input';
import { login } from 'api/api';

interface FormValues {
  username: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(async (data) => {
    const { username, password } = data;
    var result = await login(username, password);
    console.log(`login result: ${JSON.stringify(result)}`);
    if (result.status === 200) {
      router.push('/');
    }
    // TODO: display error message if login fails
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
            <Button onClick={() => router.push('/')}>Cancel</Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}
