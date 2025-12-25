"use client"
import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react"
import NavIcon from "../../public/globe.svg"

function Navbar(){
    const {theme,setTheme } = useTheme()
    const {data : session,status }=useSession()
    const themeHandler=()=>{
        theme==='dark' ? setTheme('light') : setTheme('dark')
    }
    if (status === "loading") {
        return (
            <nav className="h-16 flex items-center">
                Loading...
                <Button variant="outline" size="icon" onClick={themeHandler}>
                    {
                        theme==='dark' ? (<Sun />) : (<Moon />)
                    }
                </Button>
            </nav>
        )
    }
    return (
        <nav className="
            sticky top-0 z-50
            w-full
            bg-white/80 dark:bg-slate-900/80
            backdrop-blur
            border-b border-slate-200 dark:border-slate-700
            ">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                <Image
                    src={NavIcon}
                    alt="Yokai Message"
                    width={36}
                    height={36}
                    className="rounded-md"
                />
                <span className="hidden sm:block font-bold text-lg text-slate-800 dark:text-slate-100">
                    Yokai
                </span>
                </Link>

                {/* Navigation */}
                {session ? (
                <div className="flex items-center gap-4">
                    <NavigationMenu>
                    <NavigationMenuList className="hidden md:flex gap-3">

                        {/* Customer */}
                        {session.user.role === "Customer" && (
                        <>
                            <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link
                                href="/place-order"
                                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900"
                                >
                                Place Order
                                </Link>
                            </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link
                                href="/my-order"
                                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900"
                                >
                                My Order
                                </Link>
                            </NavigationMenuLink>
                            </NavigationMenuItem>
                        </>
                        )}

                        {/* Admin */}
                        {session.user.role === "Admin" && (
                        <>
                            <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link
                                href="/menu"
                                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900"
                                >
                                Menu
                                </Link>
                            </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link
                                href="/staff"
                                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900"
                                >
                                Staffs
                                </Link>
                            </NavigationMenuLink>
                            </NavigationMenuItem>
                        </>
                        )}

                        {/* Staff */}
                        {session.user.role === "Staff" && (
                        <>
                            <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link
                                href="/order/pending-order"
                                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-100 dark:hover:bg-amber-900"
                                >
                                Pending
                                </Link>
                            </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link
                                href="/order/served-order"
                                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-100 dark:hover:bg-amber-900"
                                >
                                Served
                                </Link>
                            </NavigationMenuLink>
                            </NavigationMenuItem>
                        </>
                        )}
                    </NavigationMenuList>
                    </NavigationMenu>

                    {/* Logout */}
                    <Button
                    onClick={() => signOut()}
                    className="
                        hidden sm:inline-flex
                        bg-slate-100 dark:bg-slate-800
                        text-slate-900 dark:text-slate-100
                        hover:bg-slate-200 dark:hover:bg-slate-700
                    "
                    >
                    Logout
                    </Button>
                </div>
                ) : (
                <NavigationMenu>
                    <NavigationMenuList className="hidden md:flex gap-3">
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                        <Link
                            href="/sign-up"
                            className="px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                            Sign Up
                        </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                        <Link
                            href="/sign-in"
                            className="px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                            Sign In
                        </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                )}

                {/* Right Actions */}
                <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={themeHandler}
                    className="rounded-full"
                >
                    {theme === "dark" ? <Sun /> : <Moon />}
                </Button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;