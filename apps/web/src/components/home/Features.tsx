import { Box, Stack } from '@chakra-ui/react';
import { Section } from './Section';
import {
   LuArrowUpDown,
   LuCombine,
   LuFileDown,
   LuFileJson,
   LuFlipVertical,
   LuFullscreen,
   LuGitCompare,
   LuReplace,
   LuSearch,
   LuType,
   LuUpload,
   LuWand
} from 'react-icons/lu';
import { IconType } from 'react-icons/lib';

export const Features = () => {
   return (
      <Section
         id="features"
         py={'6em'}
         title="Complete CSV Conversion Suite"
         subTitle="Transform, visualize, and export your data with our powerful converter that processes everything locally in your browser."
      >
         <Stack direction={'row'} flexWrap={'wrap'} gap={5} justifyContent={'center'}>
            {features.map((feature, index) => (
               <Feature
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
               />
            ))}
         </Stack>
      </Section>
   );
};

interface FeatureProps {
   icon: IconType;
   title: string;
   description: string;
}

const Feature = ({ icon: Icon, title, description }: FeatureProps) => {
   return (
      <Box w={'22%'} mb={5}>
         <Stack direction="row" alignItems="top" gap={4}>
            <Icon size={32} style={{ paddingTop: '5px' }} color={'blue'} />
            <Stack direction="column" w={'180px'} lineHeight={'1.5em'}>
               <Box fontSize={'1.125em'} fontWeight={'bold'} mb={2} color={'fg.muted'}>
                  {title}
               </Box>
               <Box fontSize={'0.875em'} color={'fg.muted'}>
                  {description}
               </Box>
            </Stack>
         </Stack>
      </Box>
   );
};

const features: FeatureProps[] = [
   {
      icon: LuUpload,
      title: 'Multi-Format Support',
      description:
         'Import CSV, TSV, XLSX, XLS and TXT files with automatic format detection and encoding support.'
   },
   {
      icon: LuWand,
      title: 'Automatic Field Detection',
      description:
         'Smart data type detection (text, number, date, boolean) with preview of irregular data structures.'
   },
   {
      icon: LuType,
      title: 'Header Configuration',
      description:
         'Rename headers, enable/disable fields, and reorder columns with intuitive drag-and-drop interface.'
   },
   {
      icon: LuFlipVertical,
      title: 'Column Splitting',
      description:
         'Split column content based on delimiters to separate combined data into multiple fields.'
   },
   {
      icon: LuCombine,
      title: 'Column Combining',
      description:
         'Merge columns with custom separators to create new combined fields from existing data.'
   },
   {
      icon: LuReplace,
      title: 'Find & Replace',
      description: 'Transform data with text replacement and regular expressions across any column.'
   },
   {
      icon: LuFullscreen,
      title: 'Fullscreen Data Preview',
      description:
         'Expand the data table to a fullscreen view for easier inspection and analysis of large datasets.'
   },
   {
      icon: LuFileJson,
      title: 'JSON & XML Export',
      description:
         'Convert your data to well-formed JSON or XML with proper formatting and encoding.'
   },
   {
      icon: LuFileDown,
      title: 'CSV Export & Transformation',
      description:
         'Export transformed data back to CSV with your modifications and transformations applied.'
   },
   {
      icon: LuSearch,
      title: 'Live Search & Sorting',
      description:
         'Instantly search and filter across all data with column-based sorting in ascending or descending order.'
   },
   {
      icon: LuArrowUpDown,
      title: 'Data Type Conversion',
      description:
         'Transform column data types between string, number, boolean and other formats with one click.'
   },
   {
      icon: LuGitCompare,
      title: 'Data Comparison',
      description:
         'Compare and highlight differences between datasets or track changes made during transformation.'
   }
];

