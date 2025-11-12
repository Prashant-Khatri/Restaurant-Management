import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu";
import { useSession } from "next-auth/react";
import { User } from "next-auth";

function Navbar(){
    const {data : session}=useSession()
    const user :User=session?.user as User
    return (
        <div>
            {
                session ? (
                    <NavigationMenu>
                    <NavigationMenuList className="flex-wrap">
                        <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </NavigationMenuLink>
                        </NavigationMenuItem>
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
                        <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/menu">Menu</Link>
                        </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/orders">Pending Orders</Link>
                        </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/docs">Documentation</Link>
                        </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/staffs">Staffs</Link>
                        </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                ) : (<div></div>)
            }
        </div>
    )
}

export default Navbar;