"use client";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/context/app-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/footer";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
export default function CartPage() {
    const { language, t, cart, updateQuantity, removeFromCart, cartTotal } = useApp();
    const deliveryFee = cartTotal > 25 ? 0 : 3.99;
    const total = cartTotal + deliveryFee;
    if (cart.length === 0) {
        return (<div className="flex min-h-screen flex-col">
        <div className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <ShoppingBag className="h-12 w-12 text-muted-foreground"/>
          </div>
          <h1 className="mb-2 text-2xl font-bold">{t("emptyCart")}</h1>
          <p className="mb-6 text-muted-foreground">
            {language === "en" ? "Add some delicious items to your cart!" : "Добавьте вкусные блюда в корзину!"}
          </p>
          <Link href="/menu">
            <Button size="lg" className="gap-2">
              {t("continueShopping")}
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
      <h1 className="mb-8 text-3xl font-bold md:text-4xl">{t("yourCart")}</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map((item) => {
            const name = language === "en" ? item.name : item.nameRu;
            return (<Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Link href={`/product/${item.id}`} className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                        <Image src={item.image} alt={name} fill className="object-cover"/>
                      </Link>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <Link href={`/product/${item.id}`} className="font-semibold hover:text-primary">
                            {name}
                          </Link>
                          <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center rounded-lg border border-border">
                            <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8">
                              <Minus className="h-3 w-3"/>
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8">
                              <Plus className="h-3 w-3"/>
                            </Button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                            <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="h-8 w-8 text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4"/>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>);
        })}
          </div>

          <Link href="/menu" className="mt-6 inline-flex items-center gap-2 text-sm text-primary hover:underline">
            {t("continueShopping")}
          </Link>
        </div>

          {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h2 className="mb-6 text-xl font-semibold">
                {language === "en" ? "Order Summary" : "Итого заказа"}
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("subtotal")}</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("deliveryFee")}</span>
                  <span className="font-medium">
                    {deliveryFee === 0 ? (<span className="text-green-600">{t("free")}</span>) : (`$${deliveryFee.toFixed(2)}`)}
                  </span>
                </div>
                {cartTotal < 25 && (<p className="text-xs text-muted-foreground">
                    {language === "en"
                ? `Add $${(25 - cartTotal).toFixed(2)} more for free delivery`
                : `Добавьте еще $${(25 - cartTotal).toFixed(2)} для бесплатной доставки`}
                  </p>)}
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">{t("total")}</span>
                    <span className="text-lg font-bold text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link href="/checkout" className="mt-6 block">
                <Button size="lg" className="w-full gap-2">
                  {t("checkout")}
                  <ArrowRight className="h-4 w-4"/>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
        </div>
      </div>
      <Footer />
    </div>);
}
