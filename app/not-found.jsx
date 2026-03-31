"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";
export default function NotFound() {
    return (<div className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-16 text-center">
      {/* Decorative Elements */}
      <div className="relative mb-8">
        <div className="absolute -inset-4 animate-pulse rounded-full bg-primary/10"/>
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-primary/5 text-8xl md:h-40 md:w-40 md:text-9xl">
          <span className="animate-bounce">🍔</span>
        </div>
      </div>

      {/* Error Code */}
      <div className="mb-4 flex items-center gap-2 text-7xl font-bold md:text-9xl">
        <span className="text-primary">4</span>
        <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl text-primary-foreground md:h-20 md:w-20 md:text-4xl">
          0
        </span>
        <span className="text-primary">4</span>
      </div>

      {/* Message */}
      <h1 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
        Oops! Page Not Found
      </h1>
      <p className="mb-8 max-w-md text-muted-foreground">
        Looks like this page went out for delivery and never came back. 
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/">
          <Button size="lg" className="gap-2">
            <Home className="h-4 w-4"/>
            Back to Home
          </Button>
        </Link>
        <Link href="/menu">
          <Button size="lg" variant="outline" className="gap-2">
            <Search className="h-4 w-4"/>
            Browse Menu
          </Button>
        </Link>
      </div>

      {/* Back Link */}
      <button onClick={() => window.history.back()} className="mt-8 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
        <ArrowLeft className="h-4 w-4"/>
        Go back to previous page
      </button>

      {/* Background Decoration */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-20 top-1/4 text-8xl opacity-5">🍕</div>
        <div className="absolute -right-10 top-1/3 text-7xl opacity-5">🍣</div>
        <div className="absolute bottom-1/4 left-1/4 text-6xl opacity-5">🥗</div>
        <div className="absolute bottom-1/3 right-1/4 text-9xl opacity-5">🍰</div>
      </div>
    </div>);
}
