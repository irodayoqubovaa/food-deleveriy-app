"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useApp } from "@/context/app-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, CreditCard, Banknote, ArrowLeft, Home } from "lucide-react";
export default function CheckoutPage() {
    const { language, t, cart, cartTotal, clearCart } = useApp();
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        apartment: "",
        notes: "",
    });
    const deliveryFee = cartTotal > 25 ? 0 : 3.99;
    const total = cartTotal + deliveryFee;
    const handleSubmit = (e) => {
        e.preventDefault();
        setOrderPlaced(true);
        clearCart();
    };
    if (orderPlaced) {
        return (<div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle2 className="h-12 w-12 text-green-600"/>
        </div>
        <h1 className="mb-2 text-2xl font-bold">{t("orderSuccess")}</h1>
        <p className="mb-6 text-muted-foreground">{t("orderSuccessMessage")}</p>
        <Link href="/">
          <Button size="lg" className="gap-2">
            <Home className="h-4 w-4"/>
            {t("backToHome")}
          </Button>
        </Link>
      </div>);
    }
    if (cart.length === 0) {
        return (<div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
        <p className="mb-6 text-muted-foreground">{t("emptyCart")}</p>
        <Link href="/menu">
          <Button>{t("continueShopping")}</Button>
        </Link>
      </div>);
    }
    return (<div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <Link href="/cart" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4"/>
        {language === "en" ? "Back to Cart" : "Назад в корзину"}
      </Link>

      <h1 className="mb-8 text-3xl font-bold md:text-4xl">{t("checkoutTitle")}</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Delivery Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-semibold">{t("deliveryAddress")}</h2>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">{t("name")}</Label>
                    <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required/>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">{language === "en" ? "Phone" : "Телефон"}</Label>
                    <Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required/>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">{language === "en" ? "Street Address" : "Улица и дом"}</Label>
                    <Input id="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} required/>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="apartment">{language === "en" ? "Apartment / Floor" : "Квартира / Этаж"}</Label>
                    <Input id="apartment" value={formData.apartment} onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}/>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">{language === "en" ? "Delivery Notes" : "Комментарий"}</Label>
                    <Input id="notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder={language === "en" ? "Any special instructions..." : "Особые инструкции..."}/>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-semibold">{t("paymentMethod")}</h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  <div className="flex items-center space-x-3 rounded-lg border border-border p-4 cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="cash" id="cash"/>
                    <Label htmlFor="cash" className="flex flex-1 cursor-pointer items-center gap-3">
                      <Banknote className="h-5 w-5"/>
                      {t("cashOnDelivery")}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 rounded-lg border border-border p-4 cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="card" id="card"/>
                    <Label htmlFor="card" className="flex flex-1 cursor-pointer items-center gap-3">
                      <CreditCard className="h-5 w-5"/>
                      {t("creditCard")}
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-semibold">
                  {language === "en" ? "Your Order" : "Ваш заказ"}
                </h2>

                <div className="mb-4 max-h-64 space-y-3 overflow-y-auto">
                  {cart.map((item) => {
            const name = language === "en" ? item.name : item.nameRu;
            return (<div key={item.id} className="flex items-center gap-3">
                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                          <Image src={item.image} alt={name} fill className="object-cover"/>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-sm font-medium">{name}</p>
                          <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                        </div>
                        <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>);
        })}
                </div>

                <div className="space-y-2 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("subtotal")}</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("deliveryFee")}</span>
                    <span>{deliveryFee === 0 ? <span className="text-green-600">{t("free")}</span> : `$${deliveryFee.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2">
                    <span className="font-semibold">{t("total")}</span>
                    <span className="font-bold text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button type="submit" size="lg" className="mt-6 w-full">
                  {t("placeOrder")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>);
}
