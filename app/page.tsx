import Link from "next/link";
import { currentURL, vercelURL } from "./utils";
import { createDebugUrl } from "./debug";
import type { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "New api example",
    description: "This is a new api example",
    other: {
      ...(await fetchMetadata(
        new URL("/frames", vercelURL() || "http://localhost:3000")
      )),
    },
  };
}

export default async function Home() {
  const url = currentURL("");

  return (
    <div>
      GAME OF LIFE ON WARPCAST. ARE YOU READY TO PLAY?
      <Link href={createDebugUrl(url)} className="underline">
        Debug
      </Link>
    </div>
  );
}
