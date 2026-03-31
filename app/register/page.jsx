"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/context/app-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
export default function RegisterPage() {
    const router = useRouter();
    const { language, t, register, user } = useApp();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    // Redirect if already logged in
    if (user) {
        router.push("/profile");
        return null;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (formData.password !== formData.confirmPassword) {
            setError(language === "en" ? "Passwords do not match" : "Пароли не совпадают");
            return;
        }
        if (formData.password.length < 6) {
            setError(language === "en" ? "Password must be at least 6 characters" : "Пароль должен быть не менее 6 символов");
            return;
        }
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        register(formData.name, formData.email, formData.password);
        setIsLoading(false);
        router.push("/");
    };
    return (<div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <span className="text-xl font-bold text-primary-foreground">F</span>
          </div>
          <CardTitle className="text-2xl">{language === "en" ? "Create account" : "Создать аккаунт"}</CardTitle>
          <CardDescription>
            {language === "en" ? "Sign up to get started" : "Зарегистрируйтесь, чтобы начать"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t("name")}</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
                <Input id="name" type="text" placeholder={language === "en" ? "Your name" : "Ваше имя"} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="pl-10" required/>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
                <Input id="email" type="email" placeholder="name@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="pl-10" required/>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("password")}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="********" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="pl-10 pr-10" required/>
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
                <Input id="confirmPassword" type={showPassword ? "text" : "password"} placeholder="********" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} className="pl-10" required/>
              </div>
            </div>

            {error && (<p className="text-sm text-destructive">{error}</p>)}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (language === "en" ? "Creating account..." : "Создание аккаунта...") : t("signUp")}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">{t("alreadyHaveAccount")} </span>
            <Link href="/login" className="font-medium text-primary hover:underline">
              {t("signIn")}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>);
}
