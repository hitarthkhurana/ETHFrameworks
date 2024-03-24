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
    pageContent = "This is the first page";
    // imageUrl =
  } else if (pageIndex == 1) {
    pageContent = "This is the second page";
  } else if (pageIndex == 2) {
    pageContent = "This is the third page";
  } else if (pageIndex == 3) {
    pageContent = "This is the fourth page";
  } else if (pageIndex == 4) {
    pageContent = "This is the fifth page";
  } else {
    pageContent = "This is the last page";
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
          query: { pageIndex: (pageIndex - 1) % totalPages },
        }}
      >
        ←
      </Button>,
      <Button
        action="post"
        target={{
          query: { pageIndex: (pageIndex + 1) % totalPages },
        }}
      >
        →
      </Button>,
    ],
    textInput: "Input",
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
