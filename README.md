This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Customization

To personalize this for your girlfriend:

1.  **Replace Images**: Replace the images in `public/images/` with your own photos.
    *   `us1.png`, `us2.png`, `us3.png`, `mosaic_park.png`, `mosaic_ride.png`
    *   Make sure to keep the filenames same or update the code to match new filenames.
    *   **Note**: The code now uses `.png` extension. If you use `.jpg` or `.jpeg`, update the file extensions in `components/Gallery.tsx` and `lib/puzzleData.ts`.

2.  **Update Names & Messages**:
    *   Open `components/Hero.tsx`: Replace `[Name]` and `[Partner]` with your names.
    *   Open `components/LoveNote.tsx`: Replace `[Name]` with your names.
    *   Open `components/Gallery.tsx`: Update the `photos` array with your own captions and descriptions.
    *   Open `lib/puzzleData.ts`: Update the `PUZZLE_PHOTOS` object with your own titles and messages.
