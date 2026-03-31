"use client";
import Link from "next/link";
import { useApp } from "@/context/app-context";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
export function Footer() {
    const { language, t } = useApp();
    const quickLinks = [
        { href: "/", label: t("home") },
        { href: "/menu", label: t("menu") },
        { href: "/favorites", label: t("favorites") },
        { href: "/cart", label: t("cart") },
    ];
    const supportLinks = [
        { href: "#", label: language === "en" ? "Help Center" : "Центр помощи" },
        { href: "#", label: language === "en" ? "Contact Us" : "Связаться с нами" },
        { href: "#", label: language === "en" ? "FAQs" : "Частые вопросы" },
        { href: "#", label: language === "en" ? "Privacy Policy" : "Политика конфиденциальности" },
    ];
    const socialLinks = [
        { icon: Facebook, href: "#", label: "Facebook" },
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Instagram, href: "#", label: "Instagram" },
        { icon: Youtube, href: "#", label: "YouTube" },
    ];
    return (<footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <span className="text-lg font-bold text-primary-foreground">F</span>
              </div>
              <span className="text-xl font-bold">FoodExpress</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {language === "en"
            ? "Delicious food delivered fast to your doorstep. Experience the best local restaurants from the comfort of your home."
            : "Вкусная еда с быстрой доставкой прямо к вашей двери. Наслаждайтесь лучшими местными ресторанами, не выходя из дома."}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (<a key={social.label} href={social.href} className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground" aria-label={social.label}>
                  <social.icon className="h-5 w-5"/>
                </a>))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              {language === "en" ? "Quick Links" : "Быстрые ссылки"}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (<li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              {language === "en" ? "Support" : "Поддержка"}
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (<li key={index}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              {language === "en" ? "Contact Us" : "Контакты"}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"/>
                <span>
                  {language === "en"
            ? "123 Food Street, Culinary District, NY 10001"
            : "ул. Гастрономическая 123, Кулинарный район, НЙ 10001"}
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0 text-primary"/>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0 text-primary"/>
                <span>hello@foodexpress.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            {language === "en"
            ? "2024 FoodExpress. All rights reserved."
            : "2024 FoodExpress. Все права защищены."}
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary">
              {language === "en" ? "Terms of Service" : "Условия использования"}
            </Link>
            <Link href="#" className="hover:text-primary">
              {language === "en" ? "Privacy Policy" : "Конфиденциальность"}
            </Link>
            <Link href="#" className="hover:text-primary">
              {language === "en" ? "Cookies" : "Cookies"}
            </Link>
          </div>
        </div>
      </div>
    </footer>);
}
