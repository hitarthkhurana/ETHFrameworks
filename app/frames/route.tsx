/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";

const totalPages = 5;

const frames = createFrames({
  basePath: "/frames",
});

const handleRequest = frames(async (ctx) => {
  const pageIndex = Number(ctx.searchParams.pageIndex || 0);

  const imageUrl = `https://picsum.photos/seed/frames.js-${pageIndex}/300/200`;

  let pageContent;

  if (pageIndex == 0) {
    pageContent = "HOME";
  } else if (pageIndex == 1) {
    pageContent = "HIGHER LOWER";
  } else if (pageIndex == 2) {
    pageContent = "ROULETTE";
  }

  return {
    image: (
      <div tw="flex flex-col">
        <img width={300} height={200} src={imageUrl} alt="Image" />
        <div tw="flex">{pageContent}</div>
      </div>
    ),
    buttons: [
      <Button
        action="post"
        target={{
          query: { pageIndex: 0 },
        }}
      >
        Home
      </Button>,
      <Button
        action="post"
        target={{
          query: { pageIndex: 1 },
        }}
      >
        Higher/Lower
      </Button>,
      <Button
        action="post"
        target={{
          query: { pageIndex: 2 },
        }}
      >
        Roulette
      </Button>,
    ],
    textInput: "",
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
