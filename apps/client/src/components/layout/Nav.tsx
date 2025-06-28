'use client';

import { Button, Stack, Menu, Portal, Separator, Box, Avatar, Link } from '@chakra-ui/react';
import { ColorModeButton } from '../chakra/ColorModeButton';
import { signIn, useSession } from 'next-auth/react';
import { LuAppWindow, LuLogOut } from 'react-icons/lu';
import React from 'react';

export const Nav = () => {
   return (
      <nav
         style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: '10px',
         }}
      >
         <Link
            href="https://csvconvert.com"
            style={{
               textDecoration: 'none',
               color: 'inherit',
               fontSize: '1.5em',
               fontWeight: 'bold'
            }}
         >
            CSVConvert
         </Link>
         <Stack direction={'row'} justifyContent={'flex-end'} alignItems={'center'} gap={8}>
            <Link href="/#pricing" style={{ fontSize: '1.1em' }}>
               Pricing
            </Link>
            <Link href="/#features" style={{ fontSize: '1.1em', marginRight: '8px' }}>
               Features
            </Link>
            <Stack direction={'row'} alignItems={'center'} gap={5}>
               <ColorModeButton />
               <AuthButton />
            </Stack>
         </Stack>
      </nav>
   );
};

function AuthButton() {
   const { data: session } = useSession();

   if (session) {
      return (
         <>
            <Menu.Root>
               <Menu.Trigger rounded="full">
                  <Avatar.Root size="md" cursor={'pointer'}>
                     <Avatar.Fallback name={session?.user?.name ?? ''} />
                     <Avatar.Image
                        src={session?.user?.image ?? ''}
                        alt={session?.user?.name ?? ''}
                     />
                  </Avatar.Root>
               </Menu.Trigger>
               <Portal>
                  <Menu.Positioner>
                     <Menu.Content>
                        <Stack p={'8px'} alignItems={'flex-start'} pr={10}>
                           <Box fontWeight={'bold'}>{session?.user?.name ?? ''}</Box>
                           <Box fontSize={'sm'} color={'fg.muted'}>
                              {session?.user?.email ?? ''}
                           </Box>
                        </Stack>
                        <Separator />
                        <Menu.Item value="billing" py={2}>
                           <MenuItemContent href="/billing" icon={<LuAppWindow />} name="Billing" />
                        </Menu.Item>
                        <Separator />
                        <Menu.Item value="logout" py={2}>
                           <MenuItemContent
                              href="/api/auth/signout"
                              icon={<LuLogOut />}
                              name="Log out"
                           />
                        </Menu.Item>
                     </Menu.Content>
                  </Menu.Positioner>
               </Portal>
            </Menu.Root>
         </>
      );
   }
   return (
      <Button onClick={() => signIn()} mr={'8px'}>
         Get Started
      </Button>
   );
}

interface MenuItemContentProps {
   href: string;
   icon: React.ReactNode;
   name: string;
}

function MenuItemContent({ href, icon, name }: MenuItemContentProps) {
   return (
      <Link href={href} _focusVisible={{ outline: 'none' }} _hover={{ textDecoration: 'none' }}>
         <Stack direction={'row'} alignItems={'center'} gap={2}>
            {icon}
            <Box>{name}</Box>
         </Stack>
      </Link>
   );
}
