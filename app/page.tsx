import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameReducer,
  NextServerPageProps,
  getPreviousFrame,
  useFramesReducer,
} from "frames.js/next/server";
import Link from "next/link";
import { currentURL } from "./utils";
import { createDebugUrl } from "./debug";

type State = {
  pageIndex: number;
};

const totalPages = 5;
const initialState: State = { pageIndex: 0 };

const reducer: FrameReducer<State> = (state, action) => {
  const buttonIndex = action.postBody?.untrustedData.buttonIndex;

  return {
    pageIndex: buttonIndex
      ? (state.pageIndex + (buttonIndex === 2 ? 1 : -1)) % totalPages
      : state.pageIndex,
  };
};

// This is a react server component only
export default async function Home({ searchParams }: NextServerPageProps) {
  const url = currentURL("/examples/multi-page");
  const previousFrame = getPreviousFrame<State>(searchParams);
  const [state] = useFramesReducer<State>(reducer, initialState, previousFrame);
  const imageUrl = `https://picsum.photos/seed/frames.js-${state.pageIndex}/1146/600`;

  // then, when done, return next frame
  return (
    <div>
      Multi-page example <Link href={createDebugUrl(url)}>Debug</Link>
      <FrameContainer
        pathname="/examples/multi-page"
        postUrl="/examples/multi-page/frames"
        state={state}
        previousFrame={previousFrame}
      >
        <FrameImage src="https://media.istockphoto.com/id/1272564863/photo/dark-web-browser-close-up-on-lcd-screen-with-shallow-focus-on-https-padlock.jpg?s=612x612&w=0&k=20&c=zIB-jYrqTnsbckMpTwrJSAVwfUdZvBo2g1p_86fKJFM=">
          <div tw="flex flex-col">
            <div tw="flex">
              This is slide {state.pageIndex + 1} / {totalPages}
            </div>
          </div>
        </FrameImage>
        <FrameButton>←</FrameButton>
        <FrameButton>→</FrameButton>
      </FrameContainer>
    </div>
  );
}
