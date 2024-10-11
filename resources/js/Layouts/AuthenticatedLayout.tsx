import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import {
    CheckCircleIcon,
    FactoryIcon,
    FileIcon,
    LayoutDashboard,
    ListIcon,
    LogOut,
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
    const auth = usePage().props.auth;
    const user = auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const sidebarItems = [
        {
            icon: LayoutDashboard,
            label: "Dashboard",
            href: "/dashboard",
            show: true,
        },
        {
            icon: UserIcon,
            label: "Users",
            href: route("users.index"),
            show: auth.roles.includes("admin"),
        },
        {
            icon: FileIcon,
            label: "Certificates",
            href: route("certificates.index"),
            show: true,
        },
        {
            icon: CheckCircleIcon,
            label: "Pending Approvals",
            href: route("certificates.pending"),
            show: auth.roles.includes("admin"),
        },
        {
            icon: ListIcon,
            label: "Certificate Types",
            href: route("certificate-types.index"),
            show: auth.roles.includes("admin"),
        },
        {
            icon: FactoryIcon,
            label: "Companies",
            href: route("companies.index"),
            show: auth.roles.includes("admin"),
        },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            <Toaster position="top-right" richColors={true} theme="light" />
            {/* Sidebar */}
            <div
                className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:inset-0 transition duration-300 ease-in-out
      `}
            >
                <div className="flex items-center justify-between h-16 px-6 bg-primary text-white">
                    <span className="text-2xl font-semibold">TUV Experts</span>
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
                    {sidebarItems
                        .filter((c) => c.show)
                        .map((item, index) => (
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
                        <Link href={route("logout")} method="post">
                            <Button variant="ghost" size="icon">
                                <LogOut className="h-5 w-5" />
                            </Button>
                        </Link>
                        <Avatar>
                            <AvatarImage
                                src={
                                    "https://ui-avatars.com/api/?name=" +
                                    user.name
                                }
                            />
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
                    <p>© 2024, TUV Experts </p>
                </footer>
            </div>
        </div>
    );
}
