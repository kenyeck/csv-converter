'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
   Box,
   Button,
   Card,
   Checkbox,
   Field,
   HStack,
   Input,
   Stack,
   VStack,
   Link,
   Text,
   Alert
} from '@chakra-ui/react';
import { PasswordInput } from '@components/ui/password-input';
import { useAuth } from '@components/AuthContext';
import { messageTimeout } from '@lib/Utils';

interface FormValues {
   username: string;
   password: string;
   rememberUsername?: boolean;
}

export default function SigninPage() {
   const router = useRouter();
   const { user, login } = useAuth();
   const [error, setError] = useState(null);
   const [checked, setChecked] = useState(getRememberUsernameOrDefault());

   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm<FormValues>({
      defaultValues: {
         username: getUsernameOrDefault(),
         password: ''
         //rememberUsername: false -- currently doesn't work with register (react-hook-form) and chakra
      },
      mode: 'onBlur'
   });

   const onSubmit = handleSubmit(async (data) => {
      const { username, password, rememberUsername } = data;
      const result = await login(username, password);
      if (result.status !== 200) {
         setError(result.data.error);
         setTimeout(() => setError(null), messageTimeout);
      }

      if (rememberUsername) {
         localStorage.setItem(usernameKey, username);
      } else {
         localStorage.removeItem(usernameKey);
      }
      localStorage.setItem(rememberUsernameKey, rememberUsername ? 'true' : 'false');
   });

   useEffect(() => {
      if (user) {
         router.push('/');
      }
   }, [user, router]);

   return (
      <Box p={8} alignContent={'center'} display="flex" flexDirection="column" alignItems="center">
         <Card.Root maxW="sm" variant={'elevated'}>
            <form onSubmit={onSubmit}>
               <Card.Header>
                  <Card.Title>Signin</Card.Title>
               </Card.Header>
               <Card.Body>
                  <Stack gap="4" w="full" direction={'row'}>
                     <Stack gap="4" w="full" direction={'column'}>
                        <Field.Root invalid={!!errors.username}>
                           <Field.Label>User ID</Field.Label>
                           <Input {...register('username')} required />
                           <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root>
                           <Checkbox.Root
                              variant={'solid'}
                              colorPalette={'blue.500'}
                              {...register('rememberUsername')}
                              checked={checked}
                              onCheckedChange={(e) => setChecked(!!e.checked)}
                           >
                              <Checkbox.HiddenInput />
                              <Checkbox.Control />
                              <Checkbox.Label>Remember UserID</Checkbox.Label>
                           </Checkbox.Root>
                        </Field.Root>
                     </Stack>
                     <Field.Root invalid={!!errors.password}>
                        <Field.Label>Password</Field.Label>
                        <PasswordInput {...register('password')} required />
                        <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
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
                           Sign in
                        </Button>
                     </HStack>
                     {error && (
                        <Alert.Root status="error">
                           <Alert.Indicator />
                           <Alert.Title>{error}</Alert.Title>
                        </Alert.Root>
                     )}
                     <HStack mt={5} w={'100%'} justifyContent="space-between" fontSize={'xs'}>
                        <SigninLink href="/register">Register</SigninLink>
                        <Text>
                           Forgot <SigninLink href="/forgot-username">User ID</SigninLink> or{' '}
                           <SigninLink href="/forgot-username">Password</SigninLink>
                        </Text>
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

// local storage
const usernameKey = 'username';
const rememberUsernameKey = 'rememberUsername';

const getUsernameOrDefault = () => {
   if (typeof window !== 'undefined') {
      return localStorage.getItem(usernameKey) ?? '';
   }
   return '';
};

const getRememberUsernameOrDefault = () => {
   if (typeof window !== 'undefined') {
      return localStorage.getItem(rememberUsernameKey) === 'true' ? true : false;
   }
   return false;
};

