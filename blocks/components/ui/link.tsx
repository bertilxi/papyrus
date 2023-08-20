import clsx from "clsx";
import type { PropsWithChildren } from "react";

export function Underline({ active }: { active?: boolean }) {
  return (
    <span
      className={clsx(
        "block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-teal-500",
        active && "max-w-full"
      )}
    />
  );
}

export function Link({ href, children }: PropsWithChildren<{ href: string }>) {
  const path = location?.pathname;

  return (
    <a href={href} className="font-semibold group transition duration-300">
      {children}
      <Underline active={href === path} />
    </a>
  );
}
