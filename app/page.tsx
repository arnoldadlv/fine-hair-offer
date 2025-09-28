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
            Stop Getting Asked &ldquo;Are You Going Bald?&rdquo; When You&apos;re Not
          </span>
          <br />
          <span className={subtitle({})}>
            Exact Shampoo Names, Precise Application Order, and the 3-Step
            Blow-Dry Technique That Gives Fine Hair All-Day Volume
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
