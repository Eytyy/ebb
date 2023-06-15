import React from "react";
import { motion } from "framer-motion";

import {
  BottomLeftBtn,
  BottomRightBtn,
  TopLeftBtn,
  TopRightBtn,
} from "./Buttons";
import Link from "next/link";
import clsx from "clsx";

type Props = {
  step: number;
  lastStep: number;
  onNext: () => void;
  goToStep: (step: number) => void;
  onSubmit: () => void;
};

export default function NewActivityNav({
  step,
  lastStep,
  onNext,
  goToStep,
  onSubmit,
}: Props) {
  return (
    <>
      <TopLeftBtn>new activity</TopLeftBtn>
      <TopRightBtn>
        <div className="flex items-center justify-center gap-4">
          <Step step={1} currentStep={step} goToStep={goToStep} />
          <Step step={2} currentStep={step} goToStep={goToStep} />
          <Step step={3} currentStep={step} goToStep={goToStep} />
          <Step step={4} currentStep={step} goToStep={goToStep} />
        </div>
      </TopRightBtn>
      <BottomLeftBtn>
        <Link href="/dashboard">cancel</Link>
      </BottomLeftBtn>
      <BottomRightBtn>
        <button role="button" onClick={step === lastStep ? onSubmit : onNext}>
          {step === lastStep ? "create" : "next"}
        </button>
      </BottomRightBtn>
    </>
  );
}

function Step({
  step,
  currentStep,
  goToStep,
}: {
  step: number;
  currentStep: number;
  goToStep: (step: number) => void;
}) {
  if (step > currentStep) {
    return null;
  }
  return (
    <button
      className={clsx(
        "h-4 w-4 rounded-full",
        step === currentStep ? "bg-foreground" : "bg-white"
      )}
      role="button"
      onClick={() => goToStep(step)}
    />
  );
}
