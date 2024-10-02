import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <Card>
                <CardHeader>
                    <CardTitle>Dashboard</CardTitle>
                </CardHeader>
            </Card>
        </AuthenticatedLayout>
    );
}
