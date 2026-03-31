"use client";
import Link from "next/link";
import { useApp } from "@/context/app-context";
import { FoodCard } from "@/components/food-card";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { foodItems } from "@/data/food-items";
import { Heart, ArrowRight } from "lucide-react";
export default function FavoritesPage() {
    const { language, t, favorites } = useApp();
    const favoriteItems = foodItems.filter((item) => favorites.includes(item.id));
    if (favoriteItems.length === 0) {
        return (<div className="flex min-h-screen flex-col">
        <div className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <Heart className="h-12 w-12 text-muted-foreground"/>
          </div>
          <h1 className="mb-2 text-2xl font-bold">{t("noFavorites")}</h1>
          <p className="mb-6 text-muted-foreground">{t("addSomeFavorites")}</p>
          <Link href="/menu">
            <Button size="lg" className="gap-2">
              {t("browseMenu")}
              <ArrowRight className="h-4 w-4"/>
            </Button>
          </Link>
        </div>
        <Footer />
      </div>);
    }
    return (<div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold md:text-4xl">{t("yourFavorites")}</h1>
            <p className="text-muted-foreground">
              {language === "en"
            ? `${favoriteItems.length} item${favoriteItems.length !== 1 ? "s" : ""} saved`
            : `${favoriteItems.length} ${favoriteItems.length === 1 ? "блюдо" : "блюд"} сохранено`}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favoriteItems.map((item) => (<FoodCard key={item.id} item={item}/>))}
          </div>
        </div>
      </div>
      <Footer />
    </div>);
}
