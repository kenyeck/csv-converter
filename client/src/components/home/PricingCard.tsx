import { Box, Button, Card, List, Stack } from '@chakra-ui/react/';

interface PricingCardProps {
   title: string;
   description: string;
   tag?: string;
   price: string;
   includes: string[];
   onClick: () => void;
   buttonText: string;
   primary?: boolean;
}

export const PricingCard = ({
   title,
   description,
   tag,
   price,
   includes,
   buttonText,
   primary = false,
   onClick
}: PricingCardProps) => {
   return (
      <Card.Root
         variant={'elevated'}
         width={'35%'}
         minH={'560px'}
         px={2}
         shadow={primary ? 'lg' : 'md'}
         boxShadow={
            primary
               ? '0 4px 24px 0 rgba(56, 132, 255, 0.55)' // blue shadow
               : '0 4px 24px 0 rgba(0, 0, 0, 0.10)' // gray shadow
         }
      >
         <Card.Header h={'130px'}>
            <Card.Title>
               <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                  <Box fontSize={'1.5em'} mb={3}>
                     {title}
                  </Box>
                  <Button
                     variant={primary ? 'solid' : 'outline'}
                     colorPalette={primary ? 'blue' : 'gray'}
                     size={'xs'}
                     fontSize={'0.65em'}
                     borderRadius={'lg'}
                     border={'1px solid'}
                     height={'2em'}
                     px={2}
                     cursor={'default'}
                  >
                     {tag}
                  </Button>
               </Stack>
            </Card.Title>
            <Card.Description fontSize={'1.125em'}>{description}</Card.Description>
         </Card.Header>
         <Card.Body>
            <Stack direction={'column'} alignItems={'flex-start'} gap={2}>
               <Box
                  color={'fg'}
                  fontSize={'3em'}
                  fontWeight={'bold'}
                  textAlign={'center'}
                  w={'100%'}
               >
                  {price}
               </Box>
               {includes && (
                  <List.Root pl={4} fontSize={'0.9em'} color={'fg.muted'} lineBreak={'4em'}>
                     {includes.map((item, index) => (
                        <List.Item key={index}>{item}</List.Item>
                     ))}
                  </List.Root>
               )}
            </Stack>
         </Card.Body>
         <Card.Footer>
            <Button
               variant={primary ? 'solid' : 'outline'}
               colorPalette={primary ? 'blue' : 'gray'}
               onClick={onClick}
               width={'100%'}
            >
               {buttonText}
            </Button>
         </Card.Footer>
      </Card.Root>
   );
};
