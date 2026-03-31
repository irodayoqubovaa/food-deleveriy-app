"use client";
import { createContext, useContext, useState, useEffect } from "react";
const translations = {
    en: {
        // Navigation
        home: "Home",
        menu: "Menu",
        cart: "Cart",
        favorites: "Favorites",
        profile: "Profile",
        login: "Login",
        register: "Register",
        logout: "Logout",
        // Home
        heroTitle: "Delicious Food Delivered To Your Door",
        heroSubtitle: "Order your favorite meals from the best local restaurants",
        orderNow: "Order Now",
        browseMenu: "Browse Menu",
        featuredDishes: "Featured Dishes",
        popularCategories: "Popular Categories",
        specialOffers: "Special Offers",
        viewAll: "View All",
        // Menu
        allCategories: "All",
        searchPlaceholder: "Search for dishes...",
        noResults: "No dishes found",
        // Product
        addToCart: "Add to Cart",
        inCart: "In Cart",
        deliveryTime: "Delivery Time",
        rating: "Rating",
        description: "Description",
        similarDishes: "Similar Dishes",
        // Cart
        yourCart: "Your Cart",
        emptyCart: "Your cart is empty",
        continueShopping: "Continue Shopping",
        subtotal: "Subtotal",
        deliveryFee: "Delivery Fee",
        total: "Total",
        checkout: "Checkout",
        remove: "Remove",
        // Checkout
        checkoutTitle: "Checkout",
        deliveryAddress: "Delivery Address",
        paymentMethod: "Payment Method",
        cashOnDelivery: "Cash on Delivery",
        creditCard: "Credit Card",
        placeOrder: "Place Order",
        orderSuccess: "Order Placed Successfully!",
        orderSuccessMessage: "Your order will be delivered soon",
        backToHome: "Back to Home",
        // Favorites
        yourFavorites: "Your Favorites",
        noFavorites: "No favorites yet",
        addSomeFavorites: "Start adding your favorite dishes!",
        // Profile
        myProfile: "My Profile",
        editProfile: "Edit Profile",
        orderHistory: "Order History",
        settings: "Settings",
        // Auth
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm Password",
        name: "Name",
        dontHaveAccount: "Don't have an account?",
        alreadyHaveAccount: "Already have an account?",
        signUp: "Sign Up",
        signIn: "Sign In",
        // Categories
        pizza: "Pizza",
        burgers: "Burgers",
        sushi: "Sushi",
        desserts: "Desserts",
        drinks: "Drinks",
        salads: "Salads",
        // Misc
        free: "Free",
        off: "OFF",
    },
    ru: {
        // Navigation
        home: "Главная",
        menu: "Меню",
        cart: "Корзина",
        favorites: "Избранное",
        profile: "Профиль",
        login: "Вход",
        register: "Регистрация",
        logout: "Выход",
        // Home
        heroTitle: "Вкусная еда с доставкой на дом",
        heroSubtitle: "Заказывайте любимые блюда из лучших местных ресторанов",
        orderNow: "Заказать",
        browseMenu: "Открыть меню",
        featuredDishes: "Популярные блюда",
        popularCategories: "Популярные категории",
        specialOffers: "Специальные предложения",
        viewAll: "Смотреть все",
        // Menu
        allCategories: "Все",
        searchPlaceholder: "Поиск блюд...",
        noResults: "Блюда не найдены",
        // Product
        addToCart: "В корзину",
        inCart: "В корзине",
        deliveryTime: "Время доставки",
        rating: "Рейтинг",
        description: "Описание",
        similarDishes: "Похожие блюда",
        // Cart
        yourCart: "Ваша корзина",
        emptyCart: "Корзина пуста",
        continueShopping: "Продолжить покупки",
        subtotal: "Подытог",
        deliveryFee: "Доставка",
        total: "Итого",
        checkout: "Оформить заказ",
        remove: "Удалить",
        // Checkout
        checkoutTitle: "Оформление заказа",
        deliveryAddress: "Адрес доставки",
        paymentMethod: "Способ оплаты",
        cashOnDelivery: "Оплата при получении",
        creditCard: "Банковская карта",
        placeOrder: "Оформить заказ",
        orderSuccess: "Заказ успешно оформлен!",
        orderSuccessMessage: "Ваш заказ скоро будет доставлен",
        backToHome: "На главную",
        // Favorites
        yourFavorites: "Ваше избранное",
        noFavorites: "Пока нет избранных",
        addSomeFavorites: "Добавьте любимые блюда!",
        // Profile
        myProfile: "Мой профиль",
        editProfile: "Редактировать",
        orderHistory: "История заказов",
        settings: "Настройки",
        // Auth
        email: "Эл. почта",
        password: "Пароль",
        confirmPassword: "Подтвердите пароль",
        name: "Имя",
        dontHaveAccount: "Нет аккаунта?",
        alreadyHaveAccount: "Уже есть аккаунт?",
        signUp: "Зарегистрироваться",
        signIn: "Войти",
        // Categories
        pizza: "Пицца",
        burgers: "Бургеры",
        sushi: "Суши",
        desserts: "Десерты",
        drinks: "Напитки",
        salads: "Салаты",
        // Misc
        free: "Бесплатно",
        off: "СКИДКА",
    },
};
const AppContext = createContext(undefined);
export function AppProvider({ children }) {
    const [theme, setTheme] = useState("light");
    const [language, setLanguage] = useState("en");
    const [cart, setCart] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const savedLang = localStorage.getItem("language");
        const savedCart = localStorage.getItem("cart");
        const savedFavorites = localStorage.getItem("favorites");
        const savedUser = localStorage.getItem("user");
        if (savedTheme)
            setTheme(savedTheme);
        if (savedLang)
            setLanguage(savedLang);
        if (savedCart)
            setCart(JSON.parse(savedCart));
        if (savedFavorites)
            setFavorites(JSON.parse(savedFavorites));
        if (savedUser)
            setUser(JSON.parse(savedUser));
    }, []);
    useEffect(() => {
        localStorage.setItem("theme", theme);
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        }
        else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);
    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);
    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };
    const t = (key) => {
        return translations[language][key] || key;
    };
    const addToCart = (item) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };
    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((i) => i.id !== id));
    };
    const updateQuantity = (id, quantity) => {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }
        setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
    };
    const clearCart = () => setCart([]);
    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const toggleFavorite = (id) => {
        setFavorites((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
    };
    const isFavorite = (id) => favorites.includes(id);
    const login = (email, _password) => {
        const userData = { name: email.split("@")[0], email };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };
    const register = (name, email, _password) => {
        const userData = { name, email };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };
    return (<AppContext.Provider value={{
            theme,
            toggleTheme,
            language,
            setLanguage,
            t,
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartCount,
            favorites,
            toggleFavorite,
            isFavorite,
            user,
            login,
            logout,
            register,
        }}>
      {children}
    </AppContext.Provider>);
}
export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used within AppProvider");
    }
    return context;
}
