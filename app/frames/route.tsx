import { createFrames, Button } from "frames.js/next";
import Hello from "../components/hello";
import { FrameInput } from "frames.js/next/server";
import { text } from "stream/consumers";

const totalPages = 5;

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
      src: "https://assets-global.website-files.com/6344c9cef89d6f2270a38908/658620295b0868b3ba611370_What%20is%20a%20Blockchain%20Developer%20A%2B%20Guide%20For%20Hiring%20in%202024.webp",
    },
    {
      src: "https://remote-image.decentralized-content.com/image?url=https%3A%2F%2Fgifyu.com%2Fimage%2FSVKbw&w=1920&q=75",
    },
  ];
  let pageContent;
  let inputField;
  let storeInput;

  if (pageIndex == 0) {
    pageContent = "Your Cards";
    inputField = "Choose: Blue Pill or Red Pill";
  } else if (pageIndex == 1) {
    inputField = "Higher Lower";
    if (rouletteOutcome === "win") {
      pageContent = ": You won!";
    } else if (rouletteOutcome === "lose") {
      pageContent = ": You lost!";
    }
  } else if (pageIndex == 2) {
    pageContent = "ROULETTE";
  }

  return {
    image: images[pageIndex % images.length]?.src || "default_image_url",
    imageOptions: {
      aspectRatio: "1:1",
      overlaytext: pageContent,
    },
    text: pageContent,
    buttons: [
      // eslint-disable-next-line react/jsx-key
      <Button
        action="post"
        target={{
          query: { pageIndex: 0 },
        }}
      >
        Home
      </Button>,
      // eslint-disable-next-line react/jsx-key
      <Button
        action="post"
        target={{
          query: { pageIndex: 1 },
        }}
      >
        Higher/Lower
      </Button>,
      // eslint-disable-next-line react/jsx-key
      <Button
        action="post"
        target={{
          query: { pageIndex: 1, rouletteOutcome: "win" },
        }}
      >
        Spin and Win
      </Button>,
      // eslint-disable-next-line react/jsx-key
      <Button
        action="post"
        target={{
          query: { pageIndex: 1, rouletteOutcome: "lose" },
        }}
      >
        Spin and Lose
      </Button>,
    ],
    textInput: inputField,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
