import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Bell,
    FileIcon,
    LayoutDashboard,
    ListIcon,
    Menu,
    Search,
    UserIcon,
    X,
} from "lucide-react";
import { useState } from "react";
export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const pathname = usePage().url;

    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const sidebarItems = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
        { icon: UserIcon, label: "Users", href: route("users.index") },
        {
            icon: FileIcon,
            label: "Certificates",
            href: route("certificates.index"),
        },
        {
            icon: ListIcon,
            label: "Certificate Types",
            href: route("certificate-types.index"),
        },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div
                className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:inset-0 transition duration-300 ease-in-out
      `}
            >
                <div className="flex items-center justify-between h-16 px-6 bg-primary text-white">
                    <span className="text-2xl font-semibold">FormCraft</span>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="h-6 w-6" />
                    </Button>
                </div>
                <nav className="mt-6">
                    {sidebarItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={`
                flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100
                ${pathname === item.href ? "bg-gray-100" : ""}
              `}
                        >
                            <item.icon className="h-5 w-5 mr-3" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <header className="flex items-center justify-between h-16 px-6 bg-white border-b">
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden mr-2"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="h-6 w-6" />
                        </Button>
                        <div className="relative">
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="pl-8 w-64"
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
                    {children}
                </main>

                {/* Footer */}
                <footer className="bg-white border-t py-4 px-6 text-center text-sm text-gray-600">
                    <p>© 2023 </p>
                </footer>
            </div>
        </div>
    );
}