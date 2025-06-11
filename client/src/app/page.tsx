'use client';

import { Box, Heading } from '@chakra-ui/react';
import FileUploader from '@components/FileUploader';

export default function HomePage() {
  return (
    <Box p={8}>
      <Heading mb={6}>CVS Converter</Heading>
      <FileUploader />
    </Box>
  );
}
