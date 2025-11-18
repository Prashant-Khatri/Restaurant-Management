"use client"
import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu";
import { signOut, useSession } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";
import Image from "next/image";

function Navbar(){
    const {data : session}=useSession()
    const user :User=session?.user as User
    return (
        <nav>
            <a href="#" className="text-2xl sm:text-xl font-bold text-center sm:text-left">
                <Image src="" alt="Yokai Message" className="w-36"></Image>
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
        </nav>
    )
}

export default Navbar;