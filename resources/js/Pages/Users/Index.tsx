import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { User } from "@/types";
import { Link } from "@inertiajs/react";
import { Edit, Eye } from "lucide-react";
import { useState } from "react";

export default function EmployeeList({ users }: { users: User[] }) {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <Authenticated>
            <Card>
                <CardContent>
                    <div className="container mx-auto py-10">
                        <div className="flex justify-between">
                            <div>
                                <h1 className="text-2xl font-bold mb-5">
                                    User List
                                </h1>
                            </div>
                            <Link href={route("users.create")}>
                                <Button>AddNew</Button>
                            </Link>
                        </div>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((employee) => (
                                        <TableRow key={employee.id}>
                                            <TableCell className="font-medium">
                                                {employee.name}
                                            </TableCell>
                                            <TableCell>
                                                {employee.email}
                                            </TableCell>
                                            <TableCell>
                                                {employee.phone}
                                            </TableCell>
                                            <TableCell>
                                                {employee.roles
                                                    .map((r) => r.name)
                                                    .toString()}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    <Link
                                                        href={route(
                                                            "users.show",
                                                            employee.id
                                                        )}
                                                    >
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link
                                                        href={route(
                                                            "users.edit",
                                                            employee.id
                                                        )}
                                                    >
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Authenticated>
    );
}
