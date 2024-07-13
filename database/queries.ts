import { cache } from 'react';
import { User } from '../migrations/00000-createTableUsers';
import { Image } from '../migrations/00001-createTableImages';
import { sql } from './connect';

export const getUsersInsecure = cache(async () => {
  return await sql<User[]>`
    SELECT
      users.*
    FROM
      users
  `;
});

export const createUserInsecure = cache(
  async (firstName: string, lastName: string, imageUrl: string) => {
    const [user] = await sql<User[]>`
      INSERT INTO
        users (
          first_name,
          last_name,
          image_url
        )
      VALUES
        (
          ${firstName},
          ${lastName},
          ${imageUrl}
        )
      RETURNING
        users.*
    `;
    return user;
  },
);

export const getImagesInsecure = cache(async () => {
  return await sql<Image[]>`
    SELECT
      images.*
    FROM
      images
  `;
});

export const createImageInsecure = cache(async (url: string, type: string) => {
  const [image] = await sql<Image[]>`
    INSERT INTO
      images (url, type)
    VALUES
      (
        ${url},
        ${type}
      )
    RETURNING
      images.*
  `;
  return image;
});
