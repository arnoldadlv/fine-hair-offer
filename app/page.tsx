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
            How to Finally Have Hair That Looks Thick and Full
          </span>
          <br />
          <span className={subtitle({})}>
            The complete system for fluffy roots, manageable oil, and strong
            strands - so you can feel confident and beautiful
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
