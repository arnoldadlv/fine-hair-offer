"use client";

import { useState } from "react";
import { title, subtitle } from "@/components/primitives";
import VideoPlayer from "@/components/video-player";
import { Button } from "@heroui/button";
import PageClient from "@/components/page-client";
import { WhopCheckoutButton } from "@/components/whop-checkout-button";

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <PageClient>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>
            Stop Getting Asked "Are You Going Bald?" When You're Not
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
