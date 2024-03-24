import { createFrames, Button } from "frames.js/next";

const totalPages = 5;

const frames = createFrames({
  basePath: "/frames",
});

  const handleRequest = frames(async (ctx) => {
  const pageIndex = Number(ctx.searchParams.pageIndex || 0);
  const rouletteOutcome = ctx.searchParams.rouletteOutcome; // This could be 'win', 'lose', or undefined
  const images = [
    {
      src: "https://tableforchange.com/wp-content/uploads/2020/08/1_1431500821-1.jpg"
    },
    {
      src: "https://assets-global.website-files.com/6344c9cef89d6f2270a38908/658620295b0868b3ba611370_What%20is%20a%20Blockchain%20Developer%20A%2B%20Guide%20For%20Hiring%20in%202024.webp"
      
    },
    {
      src: "https://remote-image.decentralized-content.com/image?url=https%3A%2F%2Fgifyu.com%2Fimage%2FSVKbw&w=1920&q=75",
    },
  ];
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

  

  return {
    image: images[pageIndex % images.length]?.src,
    imageOptions: {
    aspectRatio: "1:1",
    overlaytext: pageContent,
  },
    text: pageContent  
    ,
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
