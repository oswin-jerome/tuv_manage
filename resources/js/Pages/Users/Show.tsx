import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Certificate, Role, User } from "@/types";
import { Link } from "@inertiajs/react";
import { CopyIcon, Edit, Eye, Trash2Icon } from "lucide-react";
import moment from "moment";
import * as z from "zod";

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    phone: z
        .string()
        .min(10, { message: "Phone number must be at least 10 digits." }),
    password: z.string(),
    roles: z
        .array(z.string())
        .min(1, { message: "Please select at least one role." }),
});

export default function AddUser({
    roles,
    user,
    certificates,
}: {
    roles: Role[];
    user: User;
    certificates: Certificate[];
}) {
    return (
        <Authenticated>
            <div className="container mx-auto grid gap-6">
                <Card className="">
                    <CardHeader></CardHeader>
                    <CardContent>
                        <form className="gap-4 grid grid-cols-2">
                            <div>
                                <Label>Name</Label>
                                <Input value={user.name} readOnly />
                            </div>
                            <div>
                                <Label>Email</Label>
                                <Input value={user.email} readOnly />
                            </div>
                            <div>
                                <Label>Phone</Label>
                                <Input value={user.phone} readOnly />
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Created by {user.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Ref #</TableHead>
                                        <TableHead>Expire</TableHead>
                                        <TableHead>Approved</TableHead>
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
                                                {certificate.ref_no}
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
                                            <TableCell className="font-medium">
                                                <Badge
                                                    variant={"secondary"}
                                                    className={cn({
                                                        "text-orange-500 bg-orange-100":
                                                            certificate.approval_status ==
                                                            "pending",
                                                        "text-red-500 bg-red-100":
                                                            certificate.approval_status ==
                                                            "rejected",
                                                        "text-green-500 bg-green-100":
                                                            certificate.approval_status ==
                                                            "approved",
                                                    })}
                                                >
                                                    {
                                                        certificate.approval_status
                                                    }
                                                </Badge>
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
                                                    <Link
                                                        href={route(
                                                            "certificates.edit",
                                                            certificate.id
                                                        )}
                                                    >
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link
                                                        href={route(
                                                            "certificates.destroy",
                                                            certificate.id
                                                        )}
                                                        method="delete"
                                                        onClick={(e) => {
                                                            const res =
                                                                confirm(
                                                                    "Are you sure?"
                                                                );
                                                            if (res) {
                                                                return;
                                                            } else {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    >
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                        >
                                                            <Trash2Icon className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link
                                                        href={route(
                                                            "certificates.duplicate",
                                                            certificate.id
                                                        )}
                                                        method="post"
                                                        onClick={(e) => {
                                                            const res =
                                                                confirm(
                                                                    "Are you sure?"
                                                                );
                                                            if (res) {
                                                                return;
                                                            } else {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    >
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                        >
                                                            <CopyIcon className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Authenticated>
    );
}
