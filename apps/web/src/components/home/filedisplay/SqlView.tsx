import { useColorMode } from '@components/chakra/ColorModeButton';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism, dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface SqlViewProps {
   sqlString: string;
}

export function SqlView({ sqlString }: SqlViewProps) {
   const { colorMode } = useColorMode();

   return (
      <SyntaxHighlighter
         language="sql"
         style={colorMode === 'dark' ? dracula : prism}
         showLineNumbers={false}
         wrapLines={true}
         customStyle={{
            padding: 0
         }}
      >
         {sqlString}
      </SyntaxHighlighter>
   );
}
