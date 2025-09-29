"use client";

import { title, subtitle } from "@/components/primitives";

import VideoPlayer from "@/components/video-player";
import PageClient from "@/components/page-client";
import { WhopCheckoutButton } from "@/components/whop-checkout-button";

export default function Home() {
  return (
    <PageClient>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>
            Can People See Your Scalp Through Your Hair?{" "}
          </span>
          <br />
          <span className={subtitle({})}>
            The science-backed method that finally solves flat roots, visible
            scalp, and breakage — so you can stop feeling insecure every time
            you look in the mirror
          </span>
        </div>
        <div className="w-full max-w-5xl px-2 sm:px-4">
          <VideoPlayer />
        </div>

        <WhopCheckoutButton />
      </section>
    </PageClient>
  );
}
