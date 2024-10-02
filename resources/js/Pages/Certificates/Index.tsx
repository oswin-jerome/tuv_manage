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
import { cn } from "@/lib/utils";
import { Certificate } from "@/types";
import { Link } from "@inertiajs/react";
import { Edit, Eye } from "lucide-react";
import moment from "moment";
import { useState } from "react";

export default function EmployeeList({
    certificates,
}: {
    certificates: Certificate[];
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
                                    Certificates
                                </h1>
                            </div>
                            <Link href={route("certificates.create")}>
                                <Button>AddNew</Button>
                            </Link>
                        </div>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Company</TableHead>
                                        <TableHead>Expire</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {certificates.map((certificate) => (
                                        <TableRow key={certificate.id}>
                                            <TableCell className="font-medium">
                                                {certificate.certifier_name}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {certificate.company}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                <span
                                                    className={cn({
                                                        "text-red-500":
                                                            certificate.isExpired,
                                                    })}
                                                >
                                                    {moment(
                                                        certificate.expireAt
                                                    ).format("D MMM Y")}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    <Link
                                                        href={route(
                                                            "certificates.show",
                                                            certificate.id
                                                        )}
                                                    >
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
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
