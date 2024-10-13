import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { FileIcon, WatchIcon } from "lucide-react";

export default function Dashboard({
    certificates,
    certificatesThisMonth,
    pending,
}: {
    users: number;
    companies: number;
    certificates: number;
    certificatesThisMonth: number;
    pending: number;
}) {
    const auth = usePage().props.auth;
    const user = auth.user;
    const totalCertificates = certificates;
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <h1 className="text-4xl font-bold mb-12">
                Welcome, <span>{user.name}</span>{" "}
            </h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Certificates Issued
                        </CardTitle>
                        <FileIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {totalCertificates.toLocaleString()}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Certificates This Month
                        </CardTitle>
                        <FileIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {certificatesThisMonth.toLocaleString()}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Pending For Approval
                        </CardTitle>
                        <WatchIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {pending.toLocaleString()}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
