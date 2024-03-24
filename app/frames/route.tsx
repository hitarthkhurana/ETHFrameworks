import { createFrames, Button } from "frames.js/next";
import Hello from "../components/hello";
import { FrameInput } from "frames.js/next/server";
import { text } from "stream/consumers";
import { FrameUI, fallbackFrameContext } from "frames.js/render";

const totalPages = 6;
let buttons;

const frames = createFrames({
  basePath: "/frames",
});

const handleRequest = frames(async (ctx) => {
  const pageIndex = Number(ctx.searchParams.pageIndex || 0);
  const rouletteOutcome = ctx.searchParams.rouletteOutcome; // This could be 'win', 'lose', or undefined
  const images = [
    {
      src: "https://tableforchange.com/wp-content/uploads/2020/08/1_1431500821-1.jpg",
    },
    {
      src: "https://tse1.mm.bing.net/th/id/OIG2.Nj7YX8.GvVCbj2NalUxM?pid=ImgGn",
    },
    {
      src: "https://tse3.mm.bing.net/th/id/OIG2.X3eSGkSHUgxEF2w4Pi8v?pid=ImgGn",
    },
    {
      src: "https://tableforchange.com/wp-content/uploads/2020/08/1_1431500821-1.jpg",
    },
    {
      src: "https://tse1.mm.bing.net/th/id/OIG2.Nj7YX8.GvVCbj2NalUxM?pid=ImgGn",
    },
    {
      src: "https://tse1.mm.bing.net/th/id/OIG2.8t1Ti4bnrEnIeu66EUFg?pid=ImgGn",
    },
    {
      src: "data:image/jpeg;base64,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",
    },
  ];
  let pageContent;
  let inputField;
  let storeInput;

  if (pageIndex == 0) {
    pageContent = "Your Cards";
    buttons = [
      <Button
        key="next"
        action="post"
        target={{
          query: { pageIndex: 1 },
        }}
      >
        Next
      </Button>,
    ];
    inputField = "Choose: Blue Pill or Red Pill";
  } else if (pageIndex == 1) {
    inputField = "Choose: Mars, India or Rome";
    buttons = [
      <Button
        key="reset"
        action="post"
        target={{
          query: { pageIndex: 0 },
        }}
      >
        Reset
      </Button>,
      <Button
        key="next"
        action="post"
        target={{
          query: { pageIndex: 5 },
        }}
      >
        Back
      </Button>,
      <Button
        key="next"
        action="post"
        target={{
          query: { pageIndex: 2 },
        }}
      >
        Next
      </Button>,
    ];
  } else if (pageIndex == 2) {
    inputField = "Choose any pet";
    buttons = [
      <Button
        key="reset"
        action="post"
        target={{
          query: { pageIndex: 0 },
        }}
      >
        Reset
      </Button>,
      <Button
        key="next"
        action="post"
        target={{
          query: { pageIndex: 5 },
        }}
      >
        Back
      </Button>,
      <Button
        key="next"
        action="post"
        target={{
          query: { pageIndex: 3 },
        }}
      >
        Next
      </Button>,
    ];
  } else if (pageIndex == 3) {
    buttons = [
      <Button
        key="reset"
        action="post"
        target={{
          query: { pageIndex: 0 },
        }}
      >
        Reset
      </Button>,
      <Button
        key="next"
        action="post"
        target={{
          query: { pageIndex: 5 },
        }}
      >
        Back
      </Button>,
      <Button
        key="next"
        action="post"
        target={{
          query: { pageIndex: 4 },
        }}
      >
        Next
      </Button>,
    ];
  } else if (pageIndex == 4) {
    buttons = [
      <Button
        key="reset"
        action="post"
        target={{
          query: { pageIndex: 0 },
        }}
      >
        Reset
      </Button>,
      <Button
        key="next"
        action="post"
        target={{
          query: { pageIndex: 5 },
        }}
      >
        Back
      </Button>,
      <Button
        key="next"
        action="post"
        target={{
          query: { pageIndex: 6 },
        }}
      >
        Next
      </Button>,
    ];
  } else if (pageIndex == 5) {
    buttons = [
      <Button
        key="reset"
        action="post"
        target={{
          query: { pageIndex: 0 },
        }}
      >
        Reset
      </Button>,
    ];
  } else if (pageIndex == 6) {
    buttons = [
      <Button
        key="reset"
        action="post"
        target={{
          query: { pageIndex: 0 },
        }}
      >
        Reset
      </Button>,
      <Button
        key="reset"
        action="post"
        target={
          {
            //   query: { pageIndex: 0 },
          }
        }
      >
        Mint NFT
      </Button>,
    ];
  }

  return {
    image:
      pageIndex >= 0 && pageIndex < images.length && images[pageIndex]
        ? images[pageIndex]?.src
        : "default_image_url",
    imageOptions: {
      aspectRatio: "1:1",
      overlaytext: pageContent,
    },
    text: pageContent,
    buttons,
    textInput: inputField,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
