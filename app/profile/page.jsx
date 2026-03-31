"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/context/app-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Heart, ShoppingBag, Settings, LogOut, ChevronRight } from "lucide-react";
export default function ProfilePage() {
    const router = useRouter();
    const { language, t, user, logout, favorites, cart } = useApp();
    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);
    if (!user) {
        return null;
    }
    const handleLogout = () => {
        logout();
        router.push("/");
    };
    const menuItems = [
        {
            icon: ShoppingBag,
            label: t("orderHistory"),
            description: language === "en" ? "View your past orders" : "Посмотреть историю заказов",
            href: "#",
        },
        {
            icon: Heart,
            label: t("favorites"),
            description: language === "en" ? `${favorites.length} saved items` : `${favorites.length} сохраненных блюд`,
            href: "/favorites",
        },
        {
            icon: Settings,
            label: t("settings"),
            description: language === "en" ? "Manage your preferences" : "Управление настройками",
            href: "#",
        },
    ];
    return (<div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold md:text-4xl">{t("myProfile")}</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <Avatar className="mb-4 h-24 w-24">
                <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h2 className="mb-1 text-xl font-semibold">{user.name}</h2>
              <p className="mb-4 text-sm text-muted-foreground">{user.email}</p>
              <Button variant="outline" size="sm" className="gap-2">
                <User className="h-4 w-4"/>
                {t("editProfile")}
              </Button>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="mt-4">
            <CardContent className="grid grid-cols-2 gap-4 p-6">
              <div className="text-center">
                <p className="text-2xl font-bold">{favorites.length}</p>
                <p className="text-sm text-muted-foreground">{t("favorites")}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{cart.length}</p>
                <p className="text-sm text-muted-foreground">{t("cart")}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Menu Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Account" : "Аккаунт"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-0">
              {menuItems.map((item, index) => (<Link key={index} href={item.href} className="flex items-center justify-between border-b border-border px-6 py-4 last:border-0 hover:bg-muted/50">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <item.icon className="h-5 w-5"/>
                    </div>
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground"/>
                </Link>))}
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>{language === "en" ? "Contact Information" : "Контактная информация"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground"/>
                <div>
                  <p className="text-sm text-muted-foreground">{t("email")}</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logout Button */}
          <Button variant="outline" className="mt-6 w-full gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground" onClick={handleLogout}>
            <LogOut className="h-4 w-4"/>
            {t("logout")}
          </Button>
        </div>
      </div>
    </div>);
}
