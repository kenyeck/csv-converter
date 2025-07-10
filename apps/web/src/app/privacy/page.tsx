import { Box } from '@chakra-ui/react/';
import { PageContent } from './PageContent';

const policy = '/policy.md';

export default function PrivacyPage() {
   return (
      <Box css={{ paddingTop: '50px', maxWidth: '800px', margin: '0 auto', h1: { fontSize: '1.5em', fontWeight: 'bold' } }}>
         <PageContent filePath={policy} />
      </Box>
   );
}
