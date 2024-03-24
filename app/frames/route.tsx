type AllowedFrameButtonItems = any; // replace 'any' with the actual type
import { createFrames, Button } from "frames.js/next";
import { FrameInput } from "frames.js/next/server";
import { text } from "stream/consumers";
import { FrameUI, fallbackFrameContext } from "frames.js/render";
import {
  saveImageFromURL,
  generatePrompt,
  processImageGeneration,
} from "../ImageAI/OpenAI";


let inputTextArray: string[] = [];
let img: Promise<any>;

const totalPages = 6;
let buttons: any[] = [];

const frames = createFrames({
  basePath: "/frames",
});

function addInputText(inputTextArray: string[], inputText: string): void {
  inputTextArray.push(inputText);
}

const handleRequest = frames(async (ctx) => {
  const pageIndex = Number(ctx.searchParams.pageIndex || 0);
  const rouletteOutcome = ctx.searchParams.rouletteOutcome;

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
      src: "https://tse4.mm.bing.net/th/id/OIG2.ZBhjh8RcsEZdf71AlArq?pid=ImgGn",
    },
    {
      src: "https://tse4.mm.bing.net/th/id/OIG2.jbD_ALd9ZWF3zuMubKdi?pid=ImgGn",
    },
    {
      src: "https://tse1.mm.bing.net/th/id/OIG2.8t1Ti4bnrEnIeu66EUFg?pid=ImgGn",
    },
    {
      src: img ? `${img}`: "https://tse1.mm.bing.net/th/id/OIG2.8t1Ti4bnrEnIeu66EUFg?pid=ImgGn",
    },
  ];
  let pageContent: string = ""; // Default value to ensure it's never undefined
  let inputField: string = ""; // Default value
  let storeInput;
  const image = images[pageIndex]?.src || "";

  let imageUrl: string = images[pageIndex]?.src ?? "default_image_url";

  if (pageIndex == 0) {
    pageContent = "Your Cards";
    addInputText(inputTextArray, ctx.message?.inputText);
    console.log(inputTextArray);
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
    inputField = "Choose your location ";
    addInputText(inputTextArray, ctx.message?.inputText);
    console.log(inputTextArray);
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
    inputField = "Choose your pet";
    addInputText(inputTextArray, ctx.message?.inputText);
    console.log(inputTextArray);
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
    inputField = "Choose your profession!";
    addInputText(inputTextArray, ctx.message?.inputText);
    console.log(inputTextArray);
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
    inputField = "Choose your gender";
    //addInputText(inputTextArray,ctx.message?.inputText);
    //console.log(inputTextArray);
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
    addInputText(inputTextArray, ctx.message?.inputText);

    inputField = "";
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
    const prompt = generatePrompt(inputTextArray);
    const imgProm = processImageGeneration(prompt, "../ImageAI/assets");
    img = await imgProm;
    console.log(inputTextArray);
    inputTextArray = [];
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
        key="lifeStory" 
        action="link"
        target="https://imgur.com/a/fH7p0pK"
      >
        Get your Generated Life Story
      </Button>,
];
  }

  const safePageContent = pageContent || "";
  const safeInputField = inputField || "";
  imageUrl =
    (pageIndex >= 0 && pageIndex < images.length
      ? images[pageIndex]?.src
      : imageUrl) ?? "";

  return {
    image: imageUrl || "",
    imageOptions: {
      aspectRatio: "1:1",
      overlaytext: pageContent || "",
    },
    text: pageContent,
    buttons: buttons as [
      AllowedFrameButtonItems,
      AllowedFrameButtonItems,
      AllowedFrameButtonItems,
      AllowedFrameButtonItems
    ],
    textInput: inputField,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
