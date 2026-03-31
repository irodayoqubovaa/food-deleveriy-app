"use client";
import Link from "next/link";
import Image from "next/image";
import { useApp } from "@/context/app-context";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/carousel";
import { FoodCard } from "@/components/food-card";
import { Footer } from "@/components/footer";
import { foodItems, categories, promotions } from "@/data/food-items";
import { ArrowRight, Truck, Clock, Shield, Sparkles } from "lucide-react";
export default function HomePage() {
    const { language, t } = useApp();
    const featuredItems = foodItems.slice(0, 6);
    const popularItems = foodItems.filter(item => item.rating >= 4.8).slice(0, 4);
    return (<div className="flex flex-col">
      {/* Hero Carousel */}
      <section className="px-4 py-6 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <Carousel autoPlay interval={5000}>
            {promotions.map((promo) => (<div key={promo.id} className="relative h-[300px] overflow-hidden rounded-2xl md:h-[400px] lg:h-[480px]">
                <Image src={promo.image} alt={language === "en" ? promo.title : promo.titleRu} fill className="object-cover" priority/>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"/>
                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 lg:px-16">
                  <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground">
                    <Sparkles className="h-3.5 w-3.5"/>
                    {t("specialOffers")}
                  </span>
                  <h2 className="mb-3 max-w-lg text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                    {language === "en" ? promo.title : promo.titleRu}
                  </h2>
                  <p className="mb-6 max-w-md text-lg text-white/80">
                    {language === "en" ? promo.subtitle : promo.subtitleRu}
                  </p>
                  <Link href="/menu">
                    <Button size="lg" className="w-fit gap-2 transition-transform hover:scale-105">
                      {t("orderNow")}
                      <ArrowRight className="h-4 w-4"/>
                    </Button>
                  </Link>
                </div>
              </div>))}
          </Carousel>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-border bg-muted/30 px-4 py-8 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="group flex items-center gap-4 rounded-xl bg-card p-4 transition-all hover:shadow-md">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <Truck className="h-7 w-7 text-primary"/>
              </div>
              <div>
                <h3 className="font-semibold">{language === "en" ? "Fast Delivery" : "Быстрая доставка"}</h3>
                <p className="text-sm text-muted-foreground">{language === "en" ? "30-45 minutes" : "30-45 минут"}</p>
              </div>
            </div>
            <div className="group flex items-center gap-4 rounded-xl bg-card p-4 transition-all hover:shadow-md">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <Clock className="h-7 w-7 text-primary"/>
              </div>
              <div>
                <h3 className="font-semibold">{language === "en" ? "Fresh Food" : "Свежая еда"}</h3>
                <p className="text-sm text-muted-foreground">{language === "en" ? "Made to order" : "Готовим на заказ"}</p>
              </div>
            </div>
            <div className="group flex items-center gap-4 rounded-xl bg-card p-4 transition-all hover:shadow-md">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <Shield className="h-7 w-7 text-primary"/>
              </div>
              <div>
                <h3 className="font-semibold">{language === "en" ? "Secure Payment" : "Безопасная оплата"}</h3>
                <p className="text-sm text-muted-foreground">{language === "en" ? "100% protected" : "100% защита"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-12 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold md:text-3xl">{t("popularCategories")}</h2>
            <Link href="/menu" className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:underline">
              {t("viewAll")}
              <ArrowRight className="h-4 w-4"/>
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
            {categories.map((category) => (<Link key={category.id} href={`/menu?category=${category.id}`} className="group flex flex-col items-center gap-3 rounded-xl bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-2 hover:ring-primary/20">
                <span className="text-4xl transition-transform duration-300 group-hover:scale-125">{category.icon}</span>
                <span className="text-sm font-medium transition-colors group-hover:text-primary">{t(category.id)}</span>
              </Link>))}
          </div>
        </div>
      </section>

      {/* Popular Dishes Slider */}
      <section className="bg-muted/20 px-4 py-12 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">
                {language === "en" ? "Most Popular" : "Самые популярные"}
              </h2>
              <p className="mt-1 text-muted-foreground">
                {language === "en" ? "Top rated dishes loved by our customers" : "Блюда с высоким рейтингом, которые любят наши клиенты"}
              </p>
            </div>
            <Link href="/menu" className="hidden items-center gap-1 text-sm font-medium text-primary transition-colors hover:underline sm:flex">
              {t("viewAll")}
              <ArrowRight className="h-4 w-4"/>
            </Link>
          </div>
          <Carousel autoPlay interval={4000} showDots={false}>
            {[0, 1].map((slideIndex) => (<div key={slideIndex} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {popularItems.map((item, idx) => (<FoodCard key={`${slideIndex}-${item.id}-${idx}`} item={foodItems[(slideIndex * 4 + idx) % foodItems.length]}/>))}
              </div>))}
          </Carousel>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="px-4 py-12 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold md:text-3xl">{t("featuredDishes")}</h2>
            <Link href="/menu" className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:underline">
              {t("viewAll")}
              <ArrowRight className="h-4 w-4"/>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredItems.map((item) => (<FoodCard key={item.id} item={item}/>))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-12 md:px-12 md:py-16">
            <div className="relative z-10 max-w-xl">
              <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">
                {language === "en" ? "Ready to Order?" : "Готовы заказать?"}
              </h2>
              <p className="mb-6 text-lg text-primary-foreground/80">
                {language === "en"
            ? "Browse our full menu and discover delicious meals waiting for you."
            : "Откройте наше меню и откройте для себя вкусные блюда, которые вас ждут."}
              </p>
              <Link href="/menu">
                <Button size="lg" variant="secondary" className="gap-2 transition-transform hover:scale-105">
                  {t("browseMenu")}
                  <ArrowRight className="h-4 w-4"/>
                </Button>
              </Link>
            </div>
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10"/>
            <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10"/>
            <div className="absolute bottom-10 right-20 h-20 w-20 rounded-full bg-white/5"/>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>);
}
