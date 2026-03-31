"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/app-context";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Moon, Sun, ShoppingCart, Heart, User, Menu, Globe, LogOut } from "lucide-react";
import { useState } from "react";
export function Header() {
    const { theme, toggleTheme, language, setLanguage, t, cartCount, user, logout } = useApp();
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navLinks = [
        { href: "/", label: t("home") },
        { href: "/menu", label: t("menu") },
        { href: "/favorites", label: t("favorites") },
    ];
    const isActive = (href) => {
        if (href === "/")
            return pathname === "/";
        return pathname.startsWith(href);
    };
    return (<header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">F</span>
            </div>
            <span className="hidden text-xl font-bold sm:inline-block">FoodExpress</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (<Link key={link.href} href={link.href} className={`text-sm font-medium transition-colors hover:text-primary ${isActive(link.href) ? "text-primary" : "text-muted-foreground"}`}>
                {link.label}
              </Link>))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Globe className="h-4 w-4"/>
                <span className="sr-only">Switch language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "bg-accent" : ""}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("ru")} className={language === "ru" ? "bg-accent" : ""}>
                Русский
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9">
            {theme === "light" ? <Moon className="h-4 w-4"/> : <Sun className="h-4 w-4"/>}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Favorites */}
          <Link href="/favorites">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Heart className="h-4 w-4"/>
              <span className="sr-only">{t("favorites")}</span>
            </Button>
          </Link>

          {/* Cart */}
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <ShoppingCart className="h-4 w-4"/>
              {cartCount > 0 && (<span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                  {cartCount}
                </span>)}
              <span className="sr-only">{t("cart")}</span>
            </Button>
          </Link>

          {/* User Menu */}
          {user ? (<DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <User className="h-4 w-4"/>
                  <span className="sr-only">{t("profile")}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4"/>
                    {t("profile")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="flex items-center gap-2 text-destructive">
                  <LogOut className="h-4 w-4"/>
                  {t("logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>) : (<Link href="/login" className="hidden md:block">
              <Button size="sm">{t("login")}</Button>
            </Link>)}

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden">
                <Menu className="h-4 w-4"/>
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <nav className="mt-8 flex flex-col gap-4">
                {navLinks.map((link) => (<Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className={`text-lg font-medium transition-colors hover:text-primary ${isActive(link.href) ? "text-primary" : "text-muted-foreground"}`}>
                    {link.label}
                  </Link>))}
                <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className={`text-lg font-medium transition-colors hover:text-primary ${isActive("/cart") ? "text-primary" : "text-muted-foreground"}`}>
                  {t("cart")} {cartCount > 0 && `(${cartCount})`}
                </Link>
                {user ? (<>
                    <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary">
                      {t("profile")}
                    </Link>
                    <Button variant="ghost" onClick={() => {
                logout();
                setMobileMenuOpen(false);
            }} className="justify-start px-0 text-lg font-medium text-destructive hover:text-destructive">
                      {t("logout")}
                    </Button>
                  </>) : (<Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full">{t("login")}</Button>
                  </Link>)}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>);
}
