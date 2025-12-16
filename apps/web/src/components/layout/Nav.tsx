'use client';

import React from 'react';
import { Button, Stack, Menu, Portal, Separator, Box, Avatar, Link } from '@chakra-ui/react';
import { redirect, useRouter } from 'next/navigation';
import { ColorModeButton } from '../chakra/ColorModeButton';
import { useSession } from 'next-auth/react';
import { LuAppWindow, LuLogOut } from 'react-icons/lu';

export const Nav = () => {
   return (
      <Box
         as="nav"
         display={'flex'}
         justifyContent={'space-between'}
         alignItems={'center'}
         width={'100%'}
         padding={'10px'}
         background={'bg'}
         boxShadow={'0 2px 4px rgba(0, 0, 0, 0.1)'}
         position={'fixed'}
         zIndex={2}
         paddingLeft={'50px'}
         paddingRight={'50px'}
      >
         <Link
            href={process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}
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
            <Link href="/#features" style={{ fontSize: '1.1em', marginRight: '8px' }}>
               Features
            </Link>
            <Link href="/#pricing" style={{ fontSize: '1.1em' }}>
               Pricing
            </Link>
            <Stack direction={'row'} alignItems={'center'} gap={5}>
               <ColorModeButton />
               <AvatarButton />
            </Stack>
         </Stack>
      </Box>
   );
};

function AvatarButton() {
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
                        <MenuItemContent href="/billing" icon={<LuAppWindow />} name="Billing" />
                        <Separator />
                        <MenuItemContent
                           href="/api/auth/signout"
                           icon={<LuLogOut />}
                           name="Log out"
                        />
                     </Menu.Content>
                  </Menu.Positioner>
               </Portal>
            </Menu.Root>
         </>
      );
   }
   return (
      <Button onClick={() => redirect('/register')} mr={'8px'}>
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
   const router = useRouter();
   return (
      <Menu.Item
         value={name}
         w={'100%'}
         cursor={'pointer'}
         onClick={() => router.push(href)}
         _notLast={{ my: 1 }}
         _last={{ mt: 1 }}
      >
         <Stack direction={'row'} alignItems={'center'} gap={2}>
            {icon}
            <Box>{name}</Box>
         </Stack>
      </Menu.Item>
   );
}
