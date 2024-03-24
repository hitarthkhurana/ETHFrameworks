import { createFrames, Button } from "frames.js/next";

const totalPages = 5;

const frames = createFrames({
  basePath: "/frames",
});

const handleRequest = frames(async (ctx) => {
  const pageIndex = Number(ctx.searchParams.pageIndex || 0);
  const rouletteOutcome = ctx.searchParams.rouletteOutcome; // This could be 'win', 'lose', or undefined

  let pageContent;

  if (pageIndex == 0) {
    pageContent = "HOME";
    pageContent = "Dealer's Card";
    pageContent = "Your Cards";
  } else if (pageIndex == 1) {
    pageContent = "HIGHER LOWER";
    if (rouletteOutcome === 'win') {
      pageContent = ": You won!";
    } else if (rouletteOutcome === 'lose') {
      pageContent = ": You lost!";
    }
  } else if (pageIndex == 2) {
    pageContent = "ROULETTE";
  }

  const imageUrl = `https://picsum.photos/seed/frames.js-${pageIndex}/300/200`;

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
          query: { pageIndex: 1, rouletteOutcome: 'win' }, 
        }}
      >
        Spin and Win
      </Button>,
      <Button
        action="post"
        target={{
          query: { pageIndex: 1, rouletteOutcome: 'lose' }, 
        }}
      >
        Spin and Lose
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
