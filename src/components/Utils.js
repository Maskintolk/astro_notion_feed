import { Client } from '@notionhq/client';
import dotenv from 'dotenv';

// I can't figure out how to use Astro's (or Snowpack's) built-in import.meta.env...
dotenv.config();

// Notion environment variables
const { NOTION_SECRET, NOTION_DATABASE_ID } = process.env;

// Cache the Notion pages between different astro pages
let pageResults = [];

export const getNewPages = async () => {
  if (pageResults.length == 0) {
    const notion = new Client({ auth: NOTION_SECRET });

    const payload = {
      path: `databases/${NOTION_DATABASE_ID}/query`,
      method: 'POST',
    };

    const { results } = await notion.request(payload);

    pageResults = results.map((page) => {
      return {
        id: page.id,
        url: page.url,
        image: page.cover?.external?.url,
        icon: page.icon,
        title: page?.properties?.Name?.title[0]?.text?.content ?? '',
        date: page?.properties?.Date?.date?.start ?? '',
      };
    });
  }

  return pageResults;
};
