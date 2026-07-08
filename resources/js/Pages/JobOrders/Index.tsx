import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePage } from "@inertiajs/react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { cn } from "@/lib/utils";
import { JobOrder, Paginate } from "@/types";
import { Link, router } from "@inertiajs/react";
import { CopyIcon, Edit, Eye } from "lucide-react";

export default function JobOrderIndex({
    paginate,
    request,
}: {
    paginate: Paginate<JobOrder>;
    request: any;
}) {
    const { props } = usePage<any>();
    const flash = props.flash as { success?: string } | undefined;

    return (
        <Authenticated>
            <Card>
                <CardContent>
                    <div className="container mx-auto py-10">
                        {flash?.success && (
                            <div className="mb-4 rounded-md bg-green-50 border border-green-200 px-4 py-3 text-green-700 text-sm font-medium">
                                {flash.success}
                            </div>
                        )}
                        <div className="flex justify-between">
                            <div>
                                <h1 className="text-2xl font-bold mb-5">
                                    Job Orders
                                </h1>
                            </div>
                            <div>
                                <Link href={route("job-orders.create")}>
                                    <Button>New Job Order</Button>
                                </Link>
                            </div>
                        </div>
                        <form
                            action=""
                            className="grid grid-cols-4 gap-4 items-end"
                        >
                            <div>
                                <Label>Search</Label>
                                <Input
                                    defaultValue={request.search ?? ""}
                                    name="search"
                                    placeholder="Company name or job request #"
                                />
                            </div>
                            <div>
                                <Label>Type</Label>
                                <Select
                                    name="job_order_type"
                                    defaultValue={request.job_order_type ?? "all"}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="All types" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="inspection">
                                            Inspection
                                        </SelectItem>
                                        <SelectItem value="welder_qualifications">
                                            Welder Qualifications
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Button>Search</Button>
                            </div>
                        </form>
                        <br />
                        <div className="rounded-md border">
                            <Table>
                                <TableCaption>
                                    Showing {paginate.data.length} of{" "}
                                    {paginate.total}
                                </TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Department</TableHead>
                                        <TableHead>Job Order ID</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Creator</TableHead>
                                        <TableHead>Assigned To</TableHead>
                                        <TableHead>Client Name</TableHead>
                                        <TableHead>Job Request #</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginate.data.map((jobOrder) => (
                                        <TableRow key={jobOrder.id}>
                                            <TableCell className="font-medium">
                                                {jobOrder.department}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {jobOrder.job_order_code}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="secondary"
                                                    className={cn({
                                                        "text-blue-600 bg-blue-100":
                                                            jobOrder.job_order_type ===
                                                            "inspection",
                                                        "text-green-600 bg-green-100":
                                                            jobOrder.job_order_type ===
                                                            "welder_qualifications",
                                                    })}
                                                >
                                                    {jobOrder.job_order_type ===
                                                    "inspection"
                                                        ? "Inspection"
                                                        : "Welder Qualifications"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {jobOrder.creator?.name ?? "-"}
                                            </TableCell>
                                            <TableCell>
                                                {jobOrder.assigned_to?.name ??
                                                    "-"}
                                            </TableCell>
                                            <TableCell>
                                                {jobOrder.company?.name ?? "-"}
                                            </TableCell>
                                            <TableCell>
                                                {jobOrder.job_request_number ??
                                                    "-"}
                                            </TableCell>
                                            <TableCell>
                                                {jobOrder.location ?? "-"}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    <Link
                                                        href={route(
                                                            "job-orders.show",
                                                            jobOrder.id
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
                                                            "job-orders.edit",
                                                            jobOrder.id
                                                        )}
                                                    >
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => {
                                                            if (
                                                                confirm(
                                                                    "Clone this job order?"
                                                                )
                                                            ) {
                                                                router.post(
                                                                    route(
                                                                        "job-orders.clone",
                                                                        jobOrder.id
                                                                    )
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        <CopyIcon className="h-4 w-4" />
                                                    </Button>
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
