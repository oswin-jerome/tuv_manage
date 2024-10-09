import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
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
import { Certificate, Paginate } from "@/types";
import { Link } from "@inertiajs/react";
import { CopyIcon, Edit, Eye, Trash2Icon } from "lucide-react";
import moment from "moment";
import { useState } from "react";

export default function EmployeeList({
    paginate,
    request,
}: {
    paginate: Paginate<Certificate>;
    request: any;
}) {
    const [searchTerm, setSearchTerm] = useState("");
    // const page = router.;
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
                        <form action="" className="flex gap-4 items-end">
                            <div>
                                <Label>Ref #</Label>
                                <Input
                                    defaultValue={request.ref_no ?? ""}
                                    name="ref_no"
                                />
                            </div>
                            <div>
                                <Button>Search</Button>
                            </div>
                        </form>
                        <br />
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
                                    {paginate.data.map((certificate) => (
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
                    </div>
                </CardContent>
                <CardFooter>
                    <Pagination>
                        <PaginationContent>
                            {paginate.links.map((link, k) => {
                                if (link.label == "Next &raquo;") {
                                    return (
                                        <PaginationItem
                                            key={k}
                                            className={cn({
                                                "opacity-25": link.active,
                                            })}
                                        >
                                            <PaginationNext
                                                href={link.url ?? "#"}
                                            />
                                        </PaginationItem>
                                    );
                                }
                                if (link.label == "&laquo; Previous") {
                                    return (
                                        <PaginationItem
                                            key={k}
                                            className={cn({
                                                "opacity-25": link.active,
                                            })}
                                        >
                                            <PaginationPrevious
                                                href={link.url ?? "#"}
                                            />
                                        </PaginationItem>
                                    );
                                }
                                return (
                                    <PaginationItem
                                        key={k}
                                        className={cn({
                                            "opacity-25": link.active,
                                        })}
                                    >
                                        <PaginationLink href={link.url ?? "#"}>
                                            {link.label}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            })}
                        </PaginationContent>
                    </Pagination>
                </CardFooter>
            </Card>
        </Authenticated>
    );
}
