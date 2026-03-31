"use client";
import { Card, CardContent } from "@/components/ui/card";
export function ProductCardSkeleton() {
    return (<Card className="overflow-hidden">
      <div className="relative aspect-[4/3] animate-pulse bg-muted"/>
      <CardContent className="p-4">
        <div className="mb-2 h-5 w-3/4 animate-pulse rounded bg-muted"/>
        <div className="flex items-center justify-between">
          <div className="h-6 w-16 animate-pulse rounded bg-muted"/>
          <div className="h-8 w-24 animate-pulse rounded bg-muted"/>
        </div>
      </CardContent>
    </Card>);
}
export function ProductGridSkeleton({ count = 8 }) {
    return (<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(count)].map((_, i) => (<ProductCardSkeleton key={i}/>))}
    </div>);
}
export function HeroSkeleton() {
    return (<div className="relative h-[300px] animate-pulse overflow-hidden rounded-2xl bg-muted md:h-[400px] lg:h-[480px]"/>);
}
export function ProductDetailSkeleton() {
    return (<div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-2xl bg-muted"/>
        <div className="space-y-4">
          <div className="h-10 w-3/4 animate-pulse rounded bg-muted"/>
          <div className="flex gap-4">
            <div className="h-6 w-20 animate-pulse rounded-full bg-muted"/>
            <div className="h-6 w-20 animate-pulse rounded-full bg-muted"/>
          </div>
          <div className="h-8 w-24 animate-pulse rounded bg-muted"/>
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-muted"/>
            <div className="h-4 w-5/6 animate-pulse rounded bg-muted"/>
            <div className="h-4 w-4/6 animate-pulse rounded bg-muted"/>
          </div>
          <div className="flex gap-4 pt-4">
            <div className="h-12 w-32 animate-pulse rounded-lg bg-muted"/>
            <div className="h-12 flex-1 animate-pulse rounded-lg bg-muted"/>
          </div>
        </div>
      </div>
    </div>);
}
