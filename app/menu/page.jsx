"use client";
import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useApp } from "@/context/app-context";
import { FoodCard } from "@/components/food-card";
import { Footer } from "@/components/footer";
import { ProductGridSkeleton } from "@/components/product-skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { foodItems, categories, searchFoods, getFoodsByCategory } from "@/data/food-items";
import { Search, X, SlidersHorizontal } from "lucide-react";
function MenuContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category") || "all";
    const { language, t } = useApp();
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("default");
    const filteredItems = useMemo(() => {
        let items = selectedCategory === "all" ? foodItems : getFoodsByCategory(selectedCategory);
        if (searchQuery.trim()) {
            items = searchFoods(searchQuery, language);
            if (selectedCategory !== "all") {
                items = items.filter((item) => item.category === selectedCategory);
            }
        }
        // Sort items
        if (sortBy === "price-low") {
            items = [...items].sort((a, b) => a.price - b.price);
        }
        else if (sortBy === "price-high") {
            items = [...items].sort((a, b) => b.price - a.price);
        }
        else if (sortBy === "rating") {
            items = [...items].sort((a, b) => b.rating - a.rating);
        }
        return items;
    }, [selectedCategory, searchQuery, language, sortBy]);
    const clearFilters = () => {
        setSearchQuery("");
        setSelectedCategory("all");
        setSortBy("default");
    };
    return (<div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold md:text-4xl">{t("menu")}</h1>
            <p className="text-muted-foreground">
              {language === "en"
            ? `Explore our delicious selection of ${foodItems.length} dishes`
            : `Откройте для себя наш вкусный выбор из ${foodItems.length} блюд`}
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
              <Input type="search" placeholder={t("searchPlaceholder")} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 pr-10"/>
              {searchQuery && (<button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4"/>
                </button>)}
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground"/>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="default">{language === "en" ? "Default" : "По умолчанию"}</option>
                <option value="price-low">{language === "en" ? "Price: Low to High" : "Цена: по возрастанию"}</option>
                <option value="price-high">{language === "en" ? "Price: High to Low" : "Цена: по убыванию"}</option>
                <option value="rating">{language === "en" ? "Top Rated" : "По рейтингу"}</option>
              </select>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-8 flex flex-wrap gap-2">
            <Button variant={selectedCategory === "all" ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory("all")} className="transition-all hover:scale-105">
              {t("allCategories")}
            </Button>
            {categories.map((category) => (<Button key={category.id} variant={selectedCategory === category.id ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory(category.id)} className="gap-1.5 transition-all hover:scale-105">
                <span>{category.icon}</span>
                {t(category.id)}
              </Button>))}
          </div>

          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {language === "en"
            ? `Showing ${filteredItems.length} ${filteredItems.length === 1 ? "item" : "items"}`
            : `Показано ${filteredItems.length} ${filteredItems.length === 1 ? "блюдо" : "блюд"}`}
            </p>
            {(searchQuery || selectedCategory !== "all" || sortBy !== "default") && (<Button variant="ghost" size="sm" onClick={clearFilters} className="text-primary">
                {language === "en" ? "Clear filters" : "Сбросить фильтры"}
              </Button>)}
          </div>

          {/* Results */}
          {filteredItems.length > 0 ? (<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredItems.map((item) => (<FoodCard key={item.id} item={item}/>))}
            </div>) : (<div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted text-5xl">
                🍽️
              </div>
              <h3 className="mb-2 text-xl font-semibold">{t("noResults")}</h3>
              <p className="mb-6 text-muted-foreground">
                {language === "en"
                ? "Try adjusting your search or filter to find what you're looking for."
                : "Попробуйте изменить поисковый запрос или фильтры."}
              </p>
              <Button onClick={clearFilters}>
                {language === "en" ? "Clear all filters" : "Сбросить все фильтры"}
              </Button>
            </div>)}
        </div>
      </div>
      <Footer />
    </div>);
}
export default function MenuPage() {
    return (<Suspense fallback={<div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="mb-2 h-10 w-32 animate-pulse rounded bg-muted"/>
          <div className="h-5 w-64 animate-pulse rounded bg-muted"/>
        </div>
        <div className="mb-6 h-10 w-full max-w-md animate-pulse rounded bg-muted"/>
        <div className="mb-8 flex gap-2">
          {[...Array(7)].map((_, i) => (<div key={i} className="h-8 w-20 animate-pulse rounded-full bg-muted"/>))}
        </div>
        <ProductGridSkeleton count={12}/>
      </div>}>
      <MenuContent />
    </Suspense>);
}
