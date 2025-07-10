import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const home: MetadataRoute.Sitemap = [{
         url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        lastModified: new Date().toString(),
    }];

    return home;
}