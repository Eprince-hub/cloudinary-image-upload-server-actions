# Cloudinary Image Upload Examples in Next.js

This repository contains examples of how to upload images to Cloudinary in a Next.js application. The examples are based on the [Cloudinary documentation](https://cloudinary.com/documentation/upload_images) and the [Next.js documentation](https://nextjs.org/docs). The examples are written in TypeScript and it shows how you can upload images to Cloudinary using `server actions`.

## Technologies

- Next.js
- TypeScript
- Cloudinary
- Tailwind CSS
- Database: PostgreSQL
- Migrations: Ley

## Features

- Upload image to Cloudinary using `server action`
- Return data from the `server action` and access the data in the client
- Error handling in the `server action` and displaying the error message in the client
- Display the uploaded image in the client

## Getting Started

### Clone the repository

```bash
git clone https://github.com/Eprince-hub/cloudinary-image-upload-example.git
```

### Change the directory

```bash
cd cloudinary-image-upload-example
```

### Install the dependencies

```bash
pnpm install
```

### Create a `.env` file in the root directory

```bash
touch .env
```

### Add the following environment variables to the `.env` file: reference the `.env.example` file

```bash
PGHOST=localhost
PGDATABASE=your_database_name
PGUSERNAME=your_database_username
PGPASSWORD=your_database_password
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Run the migrations

```bash
pnpm migrate up
```

### Start the development server

```bash
pnpm dev
```

### Open your browser and visit `http://localhost:3000`

### UI

#### Uploaded image

<img width="931" alt="Screenshot 2024-07-16 at 13 52 29" src="https://github.com/user-attachments/assets/cb619aea-46ed-45e8-b727-251c885cd87a">

### Error handling

<img width="931" alt="Screenshot 2024-07-16 at 13 49 32" src="https://github.com/user-attachments/assets/82c49c4a-fbcc-4b50-9733-6a9b40ed2394">

### Resources

- [Cloudinary](https://cloudinary.com/documentation/upload_images)
- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [Cloudinary and Next.js Server action](https://cloudinary.com/documentation/upload_assets_with_server_actions_nextjs_tutorial)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Ley](https://github.com/lukeed/ley)
- [Node.js](https://nodejs.org/en/docs/)
- [React](https://react.dev/)
- [Vercel](https://vercel.com/docs)
- [pnpm](https://pnpm.io/)

## License

This project is open source and available under the [MIT License](LICENSE).
