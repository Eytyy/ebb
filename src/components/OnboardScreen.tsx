import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { MoodFace } from "~/components/mood";
import Label from "~/components/new-activity/Label";

export default function OnboardScreen() {
  const { data: sessionData } = useSession();

  if (!sessionData) return null;

  return (
    <div className="pt-16">
      <div className="mb-10 max-w-6xl text-9xl">
        <Label id="name">
          <span>
            Hey {sessionData.user.name?.split(" ")[0]}! let’s start creating
            your first activity{" "}
          </span>
          <span className="inline-block h-24 w-24 rotate-90 rounded-full bg-foreground text-6xl text-background">
            <span className="flex h-full w-full items-center justify-center">
              <MoodFace name="ok" />
            </span>
          </span>
        </Label>
        <Link className="text-6xl" href="/activity/new">
          new activity &rarr;
        </Link>
      </div>
      <div></div>
    </div>
  );
}
