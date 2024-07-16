import { cache } from 'react';
import { Image } from '../migrations/00001-createTableImageUploads';
import { sql } from './connect';

export const getImagesInsecure = cache(async () => {
  return await sql<Image[]>`
    SELECT
      image_uploads.*
    FROM
      image_uploads
  `;
});

export const createImageInsecure = cache(async (url: string) => {
  const [image] = await sql<Image[]>`
    INSERT INTO
      image_uploads (url)
    VALUES
      (
        ${url}
      )
    RETURNING
      image_uploads.*
  `;
  return image;
});
