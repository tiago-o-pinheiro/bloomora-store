"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { cn } from "@/lib/utils"; // adjust path if needed

type AnimationSpeed = "fast" | "normal" | "slow";

const ANIMATIONS = {
  opacity: {
    on: "opacity-100",
    off: "opacity-0",
  },
  translateY: {
    on: "opacity-100 translate-y-0",
    off: "opacity-0 translate-y-8",
  },
  scale: {
    on: "opacity-100 scale-100",
    off: "opacity-0 scale-95",
  },
};

type ContainerProps = PropsWithChildren<{
  className?: string;
  speed?: AnimationSpeed;
  animation?: keyof typeof ANIMATIONS;
}>;

const speedMap: Record<AnimationSpeed, string> = {
  fast: "duration-500",
  normal: "duration-700",
  slow: "duration-1000",
};

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  speed = "normal",
  animation = "opacity",
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={cn(
        "transition-all ease-in-out overflow-hidden",
        speedMap[speed],
        mounted ? ANIMATIONS[animation].on : ANIMATIONS[animation].off,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
