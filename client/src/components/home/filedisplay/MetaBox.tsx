import { Box } from "@chakra-ui/react";

interface MetaBoxProps {
   uppercase?: boolean;
   children: React.ReactNode;
}

export const MetaBox = ({ uppercase = false, children }: MetaBoxProps) => {
   console.log(`FileDetailsBox ${children}, uppercase=${uppercase}`);
   return (
      <Box background={'bg.muted'} paddingX={'8px'} borderRadius={'25px'} textTransform={uppercase ? 'uppercase' : undefined }>
         {children}
      </Box>
   );
};

