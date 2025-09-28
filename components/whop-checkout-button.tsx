"use client";

import { useState } from "react";

import { Button } from "@heroui/button";
import { WhopCheckoutEmbed } from "@whop/checkout/react";
import { ShieldCheck } from "lucide-react";

import { title, subtitle } from "@/components/primitives";

import { trackInitiateCheckout } from "@/lib/facebook-client";

export function WhopCheckoutButton() {
  const [showCheckout, setShowCheckout] = useState(false);

  if (showCheckout) {
    return (
      <div className="flex flex-col items-center gap-2 mt-4">
        <WhopCheckoutEmbed planId="plan_Vl7w0Wq7HZsCH" />
        <span className={title({ size: "sm" })}>
          60 Day Money-Back Guarantee
        </span>
        <span className={`${subtitle()} text-green-600`}>
          100% Risk-Free Investment
        </span>
        <span className={subtitle()}>
          If this guide doesn&apos;t transform your fine hair routine and give you
          the volume you&apos;ve been looking for, I&apos;ll refund every penny. No
          questions asked. You have 60 full days to try everything in the guide.
          If you&apos;re not completely satisfied, just email me and get your money
          back instantly. You risk absolutely nothing.
        </span>
        <ShieldCheck size={125} />
      </div>
    );
  }

  return (
    <div>
      <Button
        className="mt-4 px-4 py-8 text-xl"
        color="primary"
        variant="shadow"
        onPress={() => {
          trackInitiateCheckout();
          setShowCheckout(true);
        }}
      >
        Show Me The Exact Steps
      </Button>
    </div>
  );
}
