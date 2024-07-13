import { Sql } from 'postgres';
import { z } from 'zod';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  imageUrl: string;
  type: string;
};

export const userSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),

  // Image url must be a url that starts with https://res.cloudinary.com/fluema-digital/
  imageUrl: z
    .string()
    .url()
    .regex(/https:\/\/res\.cloudinary\.com\/fluema-digital\//, {
      message: 'Invalid image url',
    }),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      first_name varchar(80) NOT NULL,
      last_name varchar(80) NOT NULL,
      image_url varchar(255) NOT NULL,
      type varchar(20) NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE users`;
}
