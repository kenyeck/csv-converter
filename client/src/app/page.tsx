'use client';

import { VStack, Heading } from '@chakra-ui/react';
import FileUploader from '@components/FileUploader';

export default function HomePage() {

  return (
    <VStack p={8} alignItems={'center'}>
      <Heading mb={6}>CSV Converter</Heading>
      <FileUploader />
    </VStack>
  );
}
