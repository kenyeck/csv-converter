'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { VStack, Heading } from '@chakra-ui/react';
import { useAuth } from '../components/AuthContext';
import FileUploader from '@components/FileUploader';

export default function HomePage() {
  const router = useRouter();

  return (
    <VStack p={8} alignItems={'center'}>
      <Heading mb={6}>CVS Converter</Heading>
      <FileUploader />
    </VStack>
  );
}
