"use client";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/context/app-context";
import { Button } from "@/components/ui/button";
import { FoodCard } from "@/components/food-card";
import { getFoodById, getFoodsByCategory } from "@/data/food-items";
import { Heart, Minus, Plus, Clock, Star, ArrowLeft, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { notFound } from "next/navigation";
export default function ProductPage({ params }) {
    const { id } = use(params);
    const { language, t, addToCart, toggleFavorite, isFavorite, cart, updateQuantity } = useApp();
    const [quantity, setQuantity] = useState(1);
    const item = getFoodById(Number(id));
    if (!item) {
        notFound();
    }
    const name = language === "en" ? item.name : item.nameRu;
    const description = language === "en" ? item.description : item.descriptionRu;
    const cartItem = cart.find((i) => i.id === item.id);
    const similarItems = getFoodsByCategory(item.category).filter((i) => i.id !== item.id).slice(0, 3);
    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(item);
        }
        setQuantity(1);
    };
    return (<div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      {/* Back Button */}
      <Link href="/menu" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4"/>
        {language === "en" ? "Back to Menu" : "Назад к меню"}
      </Link>

      {/* Product Details */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-2xl">
          <Image src={item.image} alt={name} fill className="object-cover" priority/>
          <button onClick={() => toggleFavorite(item.id)} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background">
            <Heart className={`h-5 w-5 ${isFavorite(item.id) ? "fill-red-500 text-red-500" : "text-foreground"}`}/>
          </button>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm font-medium">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400"/>
              {item.rating}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm font-medium">
              <Clock className="h-4 w-4"/>
              {item.deliveryTime}
            </span>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {t(item.category)}
            </span>
          </div>

          <h1 className="mb-4 text-3xl font-bold md:text-4xl">{name}</h1>
          
          <p className="mb-6 text-lg text-muted-foreground">{description}</p>

          <div className="mb-6">
            <span className="text-3xl font-bold text-primary">${item.price.toFixed(2)}</span>
          </div>

          {/* Quantity Selector */}
          {!cartItem ? (<div className="mb-6 flex items-center gap-4">
              <div className="flex items-center rounded-lg border border-border">
                <Button variant="ghost" size="icon" onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="h-10 w-10">
                  <Minus className="h-4 w-4"/>
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => setQuantity((q) => q + 1)} className="h-10 w-10">
                  <Plus className="h-4 w-4"/>
                </Button>
              </div>
              <Button onClick={handleAddToCart} size="lg" className="flex-1 gap-2">
                <ShoppingCart className="h-5 w-5"/>
                {t("addToCart")} - ${(item.price * quantity).toFixed(2)}
              </Button>
            </div>) : (<div className="mb-6 flex items-center gap-4">
              <div className="flex items-center rounded-lg border border-border">
                <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, cartItem.quantity - 1)} className="h-10 w-10">
                  <Minus className="h-4 w-4"/>
                </Button>
                <span className="w-12 text-center font-medium">{cartItem.quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, cartItem.quantity + 1)} className="h-10 w-10">
                  <Plus className="h-4 w-4"/>
                </Button>
              </div>
              <Link href="/cart" className="flex-1">
                <Button variant="secondary" size="lg" className="w-full gap-2">
                  <ShoppingCart className="h-5 w-5"/>
                  {t("inCart")} ({cartItem.quantity})
                </Button>
              </Link>
            </div>)}

          {/* Description Section */}
          <div className="rounded-xl bg-muted/50 p-6">
            <h3 className="mb-2 font-semibold">{t("description")}</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>

      {/* Similar Dishes */}
      {similarItems.length > 0 && (<section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">{t("similarDishes")}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similarItems.map((item) => (<FoodCard key={item.id} item={item}/>))}
          </div>
        </section>)}
    </div>);
}
