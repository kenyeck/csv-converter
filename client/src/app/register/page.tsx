'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Card,
  Field,
  HStack,
  Input,
  Stack,
  VStack,
  Link,
  Alert,
} from '@chakra-ui/react';
import { PasswordInput } from '@components/ui/password-input';
import { useAuth } from '@components/AuthContext';
import { useState } from 'react';
import { register as registerUser } from 'api/api';
import { messageTimeout } from '@lib/Utils';
import { User } from 'types/user';

interface FormValues {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}

const defaultValues: FormValues = {
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  email: '',
};

export default function RegisterPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues, mode: 'onBlur' });

  const onSubmit = handleSubmit(async (data) => {
    var user: User = data as unknown as User;
    var result = await registerUser(user);
    if (result.status !== 200) {
      setError(result.data.error);
      setTimeout(() => setError(null), messageTimeout);
    } else {
      setSuccess('Account created successfully. Please login.');
      setTimeout(() => setSuccess(null), messageTimeout);
    }
  });

  return (
    <Box
      p={8}
      alignContent={'center'}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Card.Root maxW="sm" w={'100%'} variant={'elevated'}>
        <form onSubmit={onSubmit}>
          <Card.Header>
            <Card.Title>Register Account</Card.Title>
          </Card.Header>
          <Card.Body>
            <Stack gap="4" w="full" direction={'column'}>
              <Field.Root invalid={!!errors.username}>
                <Field.Label>User ID</Field.Label>
                <Input {...register('username')} required />
                <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.password}>
                <Field.Label>Password</Field.Label>
                <PasswordInput
                  {...register('password', {
                    pattern: {
                      value:
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                      message:
                        'Password must be at least 8 characters long and include at least one letter, one number, and one special character.',
                    },
                  })}
                  required
                />
                <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.firstName}>
                <Field.Label>First name</Field.Label>
                <Input {...register('firstName')} required />
                <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.lastName}>
                <Field.Label>Last name</Field.Label>
                <Input {...register('lastName')} required />
                <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.email}>
                <Field.Label>Email</Field.Label>
                <Input
                  {...register('email', {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Must be a valid email address',
                    },
                  })}
                  required
                />
                <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
              </Field.Root>
            </Stack>
          </Card.Body>
          <Card.Footer>
            <VStack w={'100%'}>
              <HStack justifyContent="flex-end" w={'100%'}>
                <Button variant="outline" onClick={() => router.push('/')}>
                  Cancel
                </Button>
                <Button
                  variant="solid"
                  type="submit"
                  color={'white'}
                  background={'blue.500'}
                >
                  Register
                </Button>
              </HStack>
              {error && (
                <Alert.Root status="error">
                  <Alert.Indicator />
                  <Alert.Title>{error}</Alert.Title>
                </Alert.Root>
              )}
              {success && (
                <Alert.Root status="success">
                  <Alert.Indicator />
                  <Alert.Title>{success}</Alert.Title>
                </Alert.Root>
              )}
              <HStack
                mt={5}
                w={'100%'}
                justifyContent="space-between"
                fontSize={'xs'}
              >
                {user && <SigninLink href="/login">Signin</SigninLink>}
              </HStack>
            </VStack>
          </Card.Footer>
        </form>
      </Card.Root>
    </Box>
  );
}

interface SigninLinkProps {
  href: string;
  children?: React.ReactNode;
}
const SigninLink = ({ href, children }: SigninLinkProps) => {
  return (
    <Link href={href} variant="underline" color="blue.500" fontWeight="bold">
      {children}
    </Link>
  );
};
