import { cache } from 'react';
import { Image } from '../migrations/00001-createTableImages';
import { sql } from './connect';

export const getImagesInsecure = cache(async () => {
  return await sql<Image[]>`
    SELECT
      images.*
    FROM
      images
  `;
});

export const createImageInsecure = cache(async (url: string) => {
  const [image] = await sql<Image[]>`
    INSERT INTO
      images (url)
    VALUES
      (
        ${url}
      )
    RETURNING
      images.*
  `;
  return image;
});
