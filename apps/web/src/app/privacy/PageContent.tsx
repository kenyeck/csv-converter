'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

type PageContentProps = {
  filePath: string;
};

export function PageContent({ filePath }: PageContentProps) {
  const [content, setContent] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetch(filePath)
      .then(res => res.text())
      .then(setContent)
      .catch(console.error);
  }, [filePath]);

  console.log('PageContent rendered with filePath:', filePath, content);

  return content ? <ReactMarkdown components={{
   h1: ({ children }) => <h1 style={{ fontSize: '2em', fontWeight: 'bold', paddingBottom: '20px' }}>{children}</h1>,
   h2: ({ children }) => <h2 style={{ fontSize: '1.25em', fontWeight: 'bold', paddingTop: '15px', paddingBottom: '10px' }}>{children}</h2>,
   h3: ({ children }) => <h3 style={{ fontSize: '1.1em', fontWeight: 'bold', paddingTop: '8px', paddingBottom: '10px' }}>{children}</h3>,
   ul: ({ children }) => <ul style={{ paddingLeft: '20px', marginBottom: '15px', color: 'fg-muted' }}>{children}</ul>,
   li: ({ children }) => <li style={{ marginBottom: '5px', color: 'fg-muted' }}>{children}</li>,
   p: ({ children }) => <p style={{  marginBottom: '15px', color: 'fg-muted' }}>{children}</p>,
   a: ({ children, href }) => <a style={{ color: 'blue', textDecoration: 'underline' }} href={href} target="_blank" rel="noopener noreferrer">{children}</a>,
   hr: () => <hr style={{ borderColor: 'fg-muted', margin: '20px 0' }} />
  }}>{content}</ReactMarkdown> : <div>Loading...</div>;
}
