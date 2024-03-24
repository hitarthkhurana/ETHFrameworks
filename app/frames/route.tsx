import { createFrames, Button } from "frames.js/next";
import Hello from "../components/hello";
import { FrameInput } from "frames.js/next/server";
import { text } from "stream/consumers";

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
