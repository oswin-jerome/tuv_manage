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
import { CertificateType } from "@/types";
import { Link } from "@inertiajs/react";
import { Edit, Eye } from "lucide-react";
import { useState } from "react";

export default function EmployeeList({
    certificateTypes,
}: {
    certificateTypes: CertificateType[];
}) {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <Authenticated>
            <Card>
                <CardContent>
                    <div className="container mx-auto py-10">
                        <div className="flex justify-between">
                            <div>
                                <h1 className="text-2xl font-bold mb-5">
                                    Certificate Types
                                </h1>
                            </div>
                            <Link href={route("certificate-types.create")}>
                                <Button>AddNew</Button>
                            </Link>
                        </div>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {certificateTypes.map((employee) => (
                                        <TableRow key={employee.id}>
                                            <TableCell className="font-medium">
                                                {employee.name}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    {/* <Button
                                                        variant="outline"
                                                        size="icon"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button> */}
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
