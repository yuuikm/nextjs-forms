import { Inter } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={cn("flex flex-col items-center", inter.className)}
    >
      <div
        className={cn(
          "area relative flex flex-col items-center justify-center h-screen"
        )}
      >
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <div className={cn("relative flex flex-col items-center bg-white md:p-32 rounded-xl p-16")}>
          <h1
            className={cn(
              "font-bold text-3xl main-color",
              "text-transparent bg-clip-text"
            )}
          >
            NextJs forms
          </h1>
          <Link
            href="/forms"
            className={cn(
              "group rounded-lg border border-transparent px-4 py-2",
              "transition-color mt-16"
            )}
          >
            <h2 className={cn("mb-3 text-2xl font-semibold")}>
              Get Started{" "}
              <span
                className={cn(
                  "inline-block transition-transform group-hover:translate-x-1",
                  "motion-reduce:transform-none"
                )}
              >
                -&gt;
              </span>
            </h2>
          </Link>
        </div>
      </div>
    </main>
  );
}
