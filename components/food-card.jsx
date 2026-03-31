"use client";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/context/app-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Plus, Clock, Star, Check } from "lucide-react";
export function FoodCard({ item }) {
    const { language, t, addToCart, toggleFavorite, isFavorite, cart } = useApp();
    const name = language === "en" ? item.name : item.nameRu;
    const isInCart = cart.some((i) => i.id === item.id);
    const liked = isFavorite(item.id);
    return (<Card className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link href={`/product/${item.id}`}>
          <Image src={item.image} alt={name} fill className="object-cover transition-transform duration-500 group-hover:scale-110"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"/>
        </Link>
        
        {/* Favorite Button */}
        <button onClick={() => toggleFavorite(item.id)} className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 ${liked
            ? "bg-red-500 text-white scale-110"
            : "bg-background/80 text-foreground hover:bg-background hover:scale-110"}`}>
          <Heart className={`h-4 w-4 transition-transform ${liked ? "fill-current scale-110" : ""}`}/>
        </button>

        {/* Badges */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
            <Clock className="h-3 w-3 text-muted-foreground"/>
            {item.deliveryTime}
          </span>
          <span className="flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400"/>
            {item.rating}
          </span>
        </div>
      </div>

      <CardContent className="p-4">
        <Link href={`/product/${item.id}`}>
          <h3 className="line-clamp-1 font-semibold transition-colors duration-200 group-hover:text-primary">
            {name}
          </h3>
        </Link>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-primary">${item.price.toFixed(2)}</span>
          <Button size="sm" onClick={() => addToCart(item)} variant={isInCart ? "secondary" : "default"} className="h-9 gap-1.5 transition-all duration-200 hover:scale-105 active:scale-95">
            {isInCart ? (<>
                <Check className="h-4 w-4"/>
                {t("inCart")}
              </>) : (<>
                <Plus className="h-4 w-4"/>
                {t("addToCart")}
              </>)}
          </Button>
        </div>
      </CardContent>
    </Card>);
}
