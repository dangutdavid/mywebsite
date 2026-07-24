import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function Button({ href, children, variant = "primary", className }: ButtonProps) {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal",
        variant === "primary" && "bg-teal text-white shadow-soft hover:bg-[#066d70]",
        variant === "secondary" && "border border-line bg-white text-navy hover:border-teal hover:text-teal",
        variant === "ghost" && "text-navy hover:text-teal",
        className
      )}
    >
      {children}
    </Link>
  );
}
