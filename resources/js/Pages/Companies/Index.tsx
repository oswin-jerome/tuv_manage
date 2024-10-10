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
import { Company } from "@/types";
import { Link } from "@inertiajs/react";
import { Eye } from "lucide-react";
import { useState } from "react";

export default function EmployeeList({ companies }: { companies: Company[] }) {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <Authenticated>
            <Card>
                <CardContent>
                    <div className="container mx-auto py-10">
                        <div className="flex justify-between">
                            <div>
                                <h1 className="text-2xl font-bold mb-5">
                                    Companies
                                </h1>
                            </div>
                            <Link href={route("companies.create")}>
                                <Button>AddNew</Button>
                            </Link>
                        </div>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Short Code</TableHead>
                                        <TableHead>Next SEQ</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {companies.map((company) => (
                                        <TableRow key={company.id}>
                                            <TableCell className="font-medium">
                                                {company.name}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {company.short_code}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {company.sequence}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    <Link
                                                        href={route(
                                                            "companies.show",
                                                            company.id
                                                        )}
                                                    >
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    {/* <Button
                                                        variant="outline"
                                                        size="icon"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button> */}
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
