"use client";

import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  LogOutIcon,
  LucidePackageSearch,
  MenuIcon,
  PercentIcon,
  ShoppingCartIcon,
  ShoppingBagIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import Link from "next/link";
import Cart from "./cart";
import { APP_CONFIG } from "@/config/app.config";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import { Badge } from "./badge";

const Header = () => {
  const { status, data } = useSession();
  const { products } = useContext(CartContext);

  const handleLoginClick = async () => {
    await signIn();
  };
  const handleLogoutClick = async () => {
    await signOut();
  };

  const cartItemsCount = products.reduce((acc, product) => acc + product.quantity, 0);

  return (
    <Card className="flex items-center justify-between gap-4 p-5 lg:px-8">
      {/* Mobile Menu */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent side="left">
            <SheetHeader className="text-left text-lg font-semibold">
              {APP_CONFIG.ui.menu}
            </SheetHeader>

            {status === "authenticated" && data?.user && (
              <div className="div flex-col">
                <div className="flex items-center gap-4 py-2">
                  <Avatar>
                    <AvatarFallback>
                      {data.user.name?.[0].toUpperCase()}
                    </AvatarFallback>
                    {data.user.image && <AvatarImage src={data.user.image} />}
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="font-medium">{data.user.name}</p>
                    <p className="text-sm opacity-75">{APP_CONFIG.ui.welcomeMessage}</p>
                  </div>
                </div>
                <Separator />
              </div>
            )}

            <div className="mt-4 flex-col gap-3">
              {status === "unauthenticated" && (
                <Button
                  onClick={handleLoginClick}
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <LogInIcon size={16} />
                  {APP_CONFIG.ui.login}
                </Button>
              )}

              {status === "authenticated" && (
                <Button
                  onClick={handleLogoutClick}
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <LogOutIcon size={16} />
                  {APP_CONFIG.ui.logout}
                </Button>
              )}

              <SheetClose asChild>
                <Link href="/">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <HomeIcon size={16} />
                    {APP_CONFIG.ui.home}
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/catalog">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <ListOrderedIcon size={16} />
                    {APP_CONFIG.ui.catalog}
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/deals">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <PercentIcon size={16} />
                    {APP_CONFIG.ui.deals}
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/orders">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <LucidePackageSearch size={16} />
                    {APP_CONFIG.ui.orders}
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <ShoppingBagIcon className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold">
          <span className="text-primary">{APP_CONFIG.name}</span>
        </h1>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden flex-1 lg:flex lg:items-center lg:justify-center lg:gap-6">
        <Link
          href="/"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          {APP_CONFIG.ui.home}
        </Link>
        <Link
          href="/catalog"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          {APP_CONFIG.ui.catalog}
        </Link>
        <Link
          href="/deals"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          {APP_CONFIG.ui.deals}
        </Link>
        <Link
          href="/orders"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          {APP_CONFIG.ui.orders}
        </Link>
      </nav>

      {/* Desktop Actions */}
      <div className="hidden items-center gap-3 lg:flex">
        {status === "unauthenticated" && (
          <Button onClick={handleLoginClick} variant="outline" size="sm">
            <LogInIcon className="mr-2 h-4 w-4" />
            {APP_CONFIG.ui.login}
          </Button>
        )}

        {status === "authenticated" && data?.user && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">
                    {data.user.name?.[0].toUpperCase()}
                  </AvatarFallback>
                  {data.user.image && <AvatarImage src={data.user.image} />}
                </Avatar>
                <span className="max-w-[100px] truncate">{data.user.name}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader className="text-left text-lg font-semibold">
                Minha Conta
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      {data.user.name?.[0].toUpperCase()}
                    </AvatarFallback>
                    {data.user.image && <AvatarImage src={data.user.image} />}
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="font-medium">{data.user.name}</p>
                    <p className="text-sm text-muted-foreground">{data.user.email}</p>
                  </div>
                </div>
                <Separator />
                <Button
                  onClick={handleLogoutClick}
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <LogOutIcon size={16} />
                  {APP_CONFIG.ui.logout}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        )}

        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm" variant="outline" className="relative">
              <ShoppingCartIcon className="h-4 w-4" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[350px]">
            <Cart />
          </SheetContent>
        </Sheet>
      </div>

      {/* Mobile Cart */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="relative">
              <ShoppingCartIcon />
              {cartItemsCount > 0 && (
                <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[350px]">
            <Cart />
          </SheetContent>
        </Sheet>
      </div>
    </Card>
  );
};

export default Header;
