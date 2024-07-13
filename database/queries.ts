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
  async (
    firstName: string,
    lastName: string,
    imageUrl: string,
    uploadType: string,
  ) => {
    const [user] = await sql<User[]>`
      INSERT INTO
        users (
          first_name,
          last_name,
          image_url,
          type
        )
      VALUES
        (
          ${firstName},
          ${lastName},
          ${imageUrl},
          ${uploadType}
        )
      RETURNING
        users.first_name,
        users.last_name,
        users.image_url,
        users.type
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
