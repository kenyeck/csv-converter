'use client';

import { Stack, Box, Button } from "@chakra-ui/react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

interface ConvertHeaderProps {
   hide: boolean;
   onToggle: () => void;
}

export const ConvertHeader = ({ hide, onToggle }: ConvertHeaderProps) => {
   return (
      <Stack direction={'row'} justifyContent={'space-between'}>
         <Box fontSize={'1.25em'} fontWeight={'semibold'} mb={5}>
            Convert & Export
         </Box>
         <Button size={'sm'} variant={'outline'} onClick={onToggle}>
            {hide ? <LuChevronDown /> : <LuChevronUp />} {hide ? 'Show Code' : 'Hide Code'}
         </Button>
      </Stack>
   );
};
