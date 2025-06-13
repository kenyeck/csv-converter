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
   Text
} from '@chakra-ui/react';
import { PasswordInput } from '@components/ui/password-input';
import { useAuth } from '@components/AuthContext';
import { useEffect, useState } from 'react';
import { checkUsername, register as registerUser } from 'api/api';
import { messageTimeout } from '@lib/Utils';
import { User } from 'types/user';
import { useDebounce } from 'use-debounce';

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
   email: ''
};

const minUsernameLength = 6;

export default function RegisterPage() {
   const { user } = useAuth();
   const router = useRouter();
   const [errorMsg, setErrorMsg] = useState<string | null>(null);
   const [successMsg, setSuccessMsg] = useState<string | null>(null);
   const [invalidUsernameMsg, setInvalidUsernameMsg] = useState<string | null>(null);
   const {
      register,
      handleSubmit,
      setError,
      formState: { errors }
   } = useForm<FormValues>({ defaultValues, mode: 'onBlur' });

   const onSubmit = handleSubmit(async (data) => {
      const user: User = data as unknown as User;
      const result = await registerUser(user);
      if (result.status !== 200) {
         setErrorMsg(result.data.error);
         setTimeout(() => setErrorMsg(null), messageTimeout);
      } else {
         setSuccessMsg('Account created successfully. Please login.');
         setTimeout(() => setSuccessMsg(null), messageTimeout);
      }
   });

   const [text, setText] = useState<string>('');
   const [debouncedText] = useDebounce(text, 500);

   useEffect(() => {
      const validateUsername = async (username: string) => {
         if (username.length < minUsernameLength) {
            setInvalidUsernameMsg(null);
            return;
         }

         const regex = /^[a-zA-Z0-9_]+$/;
         if (!regex.test(username)) {
            setInvalidUsernameMsg(null);
            setError('username', {
               type: 'manual',
               message:
                  'Username must be at least 6 characters long and only contain letters, numbers, and underscores.'
            });
            return;
         } else {
            setError('username', { type: 'manual', message: '' });
         }

         const result = await checkUsername(username);
         if (result.status !== 200) {
            setInvalidUsernameMsg('Username is taken');
         } else {
            setInvalidUsernameMsg('Username is available');
         }
      };
      validateUsername(debouncedText);
   }, [debouncedText, setError]);

   return (
      <Box p={8} alignContent={'center'} display="flex" flexDirection="column" alignItems="center">
         <Card.Root maxW="sm" w={'100%'} variant={'elevated'}>
            <form onSubmit={onSubmit}>
               <Card.Header>
                  <Card.Title>Register Account</Card.Title>
               </Card.Header>
               <Card.Body>
                  <Stack gap="4" w="full" direction={'column'}>
                     <Field.Root invalid={!!errors.username}>
                        <Field.Label>User ID</Field.Label>
                        <Input
                           {...register('username', {
                              minLength: minUsernameLength,
                              onChange: (e) => setText(e.target.value)
                           })}
                           required
                        />
                        {invalidUsernameMsg && errors.username?.message?.length === 0 && (
                           <Text fontSize="xs" color="green.500">
                              {invalidUsernameMsg}
                           </Text>
                        )}
                        <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
                     </Field.Root>

                     <Field.Root invalid={!!errors.password}>
                        <Field.Label>Password</Field.Label>
                        <PasswordInput
                           {...register('password', {
                              pattern: {
                                 value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                 message:
                                    'Password must be at least 8 characters long and include at least one letter, one number, and one special character.'
                              }
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
                                 message: 'Must be a valid email address'
                              }
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
                     {errorMsg && (
                        <Alert.Root status="error">
                           <Alert.Indicator />
                           <Alert.Title>{errorMsg}</Alert.Title>
                        </Alert.Root>
                     )}
                     {successMsg && (
                        <Alert.Root status="success">
                           <Alert.Indicator />
                           <Alert.Title>{successMsg}</Alert.Title>
                        </Alert.Root>
                     )}
                     <HStack mt={5} w={'100%'} justifyContent="space-between" fontSize={'xs'}>
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
