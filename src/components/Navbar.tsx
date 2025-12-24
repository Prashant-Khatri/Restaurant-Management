"use client"
import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react"

function Navbar(){
    const { setTheme } = useTheme()
    const {data : session,status }=useSession()
    if (status === "loading") {
        <nav className="h-16 flex items-center">
            Loading...
            <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            </Button>
        </nav>
    }
    return (
        <nav>
            <a href="#" className="text-2xl sm:text-xl font-bold text-center sm:text-left">
                <Image src="./globe.svg" alt="Yokai Message" width={36} height={36}></Image>
            </a>
            {
                session ? (
                    <NavigationMenu>
                    <NavigationMenuList className="flex-wrap">
                        {
                            session.user.role==='Customer' &&
                            <div>
                                <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href="/place-order">Place-Order</Link>
                                </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href="/my-order">My-Order</Link>
                                </NavigationMenuLink>
                                </NavigationMenuItem>
                            </div>
                        }
                        {
                            session.user.role==='Admin' &&
                            <div>
                                <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href="/menu">Menu</Link>
                                </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href="/staff">Staffs</Link>
                                </NavigationMenuLink>
                                </NavigationMenuItem>
                            </div>
                        }
                        {
                            session.user.role==='Staff' &&
                            <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href="/order/pending-order">Pending Orders</Link>
                            </NavigationMenuLink>
                            </NavigationMenuItem>
                        }
                        {
                            session.user.role==='Staff' &&
                            <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href="/order/served-order">Served Orders</Link>
                            </NavigationMenuLink>
                            </NavigationMenuItem>
                        }
                    </NavigationMenuList>
                    <Button
                    onClick={() => signOut()}
                    className="w-full sm:w-auto bg-slate-100 text-black cursor-pointer"
                    variant="outline"
                    >
                    Logout
                    </Button>
                </NavigationMenu>
                ) : (
                    <NavigationMenu>
                        <NavigationMenuList className="flex-wrap">
                            <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href="/sign-up">SignUp</Link>
                            </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href="/sign-in">SignIn</Link>
                            </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                )
            }
            <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            </Button>
        </nav>
    )
}

export default Navbar;