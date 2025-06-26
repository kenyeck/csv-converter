'use client';

import { Separator } from '@chakra-ui/react';
import { Main } from './Main';
import { Features } from './Features';
import { Pricing } from './Pricing';

export const Home = () => {
   return (
      <>
         <Main />
         <Separator />
         <Features />
         <Separator />
         <Pricing />
      </>
   );
};
