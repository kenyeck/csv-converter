import { useState } from 'react';
import axios from 'axios';
//import { parseCSV } from '@lib/Utils';
import { Button, Input, VStack, Text } from '@chakra-ui/react';
import { ProcessedData } from 'types/file';
   
const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processedData, setProcessedData] = useState<ProcessedData | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      //toaster.Create({ description: 'No file selected', type: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3001/api/upload', formData);
      setProcessedData(response.data);
      //toaster.Create({ description: 'File processed successfully', type: 'success' });
    } catch (_error) {
      //toaster.Create({ description: 'Error processing file', type: 'error' });
    }
  };

  const handleDownload = async (format: 'json' | 'xml' | 'csv') => {
    if (!processedData) return;

    try {
      const response = await axios.post('http://localhost:3001/api/download', { data: processedData, format }, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `processed.${format}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (_error) {
      //toaster.Create({ description: `Error downloading ${format.toUpperCase()}`, type: 'error' });
    }
  };

  return (
    <VStack>
      <Input type="file" accept=".csv,.xlsx" onChange={handleFileChange} />
      <Button onClick={handleUpload} colorScheme="blue">Upload and Process</Button>
      {processedData && (
        <>
          <Text>Download as:</Text>
          <Button onClick={() => handleDownload('json')} colorScheme="green">JSON</Button>
          <Button onClick={() => handleDownload('xml')} colorScheme="green">XML</Button>
          <Button onClick={() => handleDownload('csv')} colorScheme="green">CSV</Button>
        </>
      )}
    </VStack>
  );
};

export default FileUploader;