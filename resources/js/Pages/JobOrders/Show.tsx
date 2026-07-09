import { Badge } from "@/components/ui/badge";
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
import { JobOrder } from "@/types";
import { Link, router } from "@inertiajs/react";
import { ClipboardList, Edit, Copy, Plus, Printer } from "lucide-react";
import moment from "moment";

export default function JobOrderShow({ jobOrder }: { jobOrder: JobOrder }) {
    const statusClass = cn({
        "bg-green-100 text-green-700": jobOrder.status === "active",
        "bg-gray-100 text-gray-600": jobOrder.status === "completed",
        "bg-orange-100 text-orange-600": jobOrder.status === "draft",
    });

    const certificates = jobOrder.certificates ?? [];

    return (
        <Authenticated>
            <div className="max-w-6xl mx-auto py-8 px-4 space-y-6">

                {/* Top bar */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <ClipboardList className="w-6 h-6 text-blue-600" />
                        <div>
                            <p className="text-xs text-gray-500">Dashboard &rsaquo; Job Orders &rsaquo; Preview Job Order</p>
                            <h1 className="text-xl font-bold">{jobOrder.job_order_code}</h1>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => window.print()}>
                            <Printer className="w-4 h-4 mr-1" /> Print PDF
                        </Button>
                        <Link href={route("job-orders.edit", jobOrder.id)}>
                            <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4 mr-1" /> Edit
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                if (confirm("Clone this job order?")) {
                                    router.post(route("job-orders.clone", jobOrder.id));
                                }
                            }}
                        >
                            <Copy className="w-4 h-4 mr-1" /> Clone
                        </Button>
                        <Link href={route("job-orders.index")}>
                            <Button variant="ghost" size="sm">← Back</Button>
                        </Link>
                    </div>
                </div>

                {/* Client Information */}
                <Card>
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-t-md font-semibold text-sm">
                        Client Information
                    </div>
                    <CardContent className="pt-5">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-6">
                            <Field label="Client / Company" value={jobOrder.company?.name} />
                            <Field label="Department" value={jobOrder.department} />
                            <Field label="Job Order Type" value={jobOrder.job_order_type} />
                            <Field label="Location" value={jobOrder.location} />
                            <Field label="Job Request #" value={jobOrder.job_request_number} />
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Status</p>
                                <Badge variant="secondary" className={statusClass}>
                                    {jobOrder.status}
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Assignment Information */}
                <Card>
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-t-md font-semibold text-sm">
                        Assignment Information
                    </div>
                    <CardContent className="pt-5">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-6">
                            <Field label="Assigned To" value={jobOrder.assigned_to?.name} />
                            <Field label="Created By" value={jobOrder.creator?.name} />
                            <Field
                                label="Date From"
                                value={jobOrder.date_from ? moment(jobOrder.date_from).format("D MMM YYYY") : undefined}
                            />
                            <Field
                                label="Date To"
                                value={jobOrder.date_to ? moment(jobOrder.date_to).format("D MMM YYYY") : undefined}
                            />
                            <Field
                                label="Created At"
                                value={moment(jobOrder.created_at).format("D MMM YYYY")}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Candidates / Certificates Section */}
                <Card>
                    <div className="bg-slate-700 text-white px-4 py-2 rounded-t-md font-semibold text-sm flex items-center justify-between">
                        <span>Candidates To Be Assessed</span>
                        <Link
                            href={route("certificates.create") + "?job_order_id=" + jobOrder.id}
                        >
                            <Button size="sm" className="bg-white text-slate-700 hover:bg-gray-100 h-7 text-xs font-semibold">
                                <Plus className="w-3 h-3 mr-1" /> Add Candidates
                            </Button>
                        </Link>
                    </div>
                    <CardContent className="pt-4 px-0 pb-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-amber-50 border-b border-amber-200">
                                    <TableHead className="text-amber-800 font-semibold">Candidate Name</TableHead>
                                    <TableHead className="text-amber-800 font-semibold">Candidate ID (Iqama)</TableHead>
                                    <TableHead className="text-amber-800 font-semibold">Certificate Type</TableHead>
                                    <TableHead className="text-amber-800 font-semibold">Ref No.</TableHead>
                                    <TableHead className="text-amber-800 font-semibold">Issued</TableHead>
                                    <TableHead className="text-amber-800 font-semibold">Expires</TableHead>
                                    <TableHead className="text-amber-800 font-semibold">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {certificates.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center text-gray-400 py-10">
                                            No candidates added to this job order yet.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    certificates.map((cert) => (
                                        <TableRow key={cert.id} className="hover:bg-gray-50">
                                            <TableCell className="font-medium">
                                                <Link
                                                    href={route("certificates.show", cert.id)}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    {cert.certifier_name}
                                                </Link>
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-600">
                                                {cert.iqama || "-"}
                                            </TableCell>
                                            <TableCell className="text-sm">
                                                {cert.certificate_type?.layout === "file_based"
                                                    ? cert.certificate_name
                                                    : cert.certificate_type?.name ?? "-"}
                                            </TableCell>
                                            <TableCell className="font-mono text-xs text-gray-700">
                                                {cert.ref_no || "-"}
                                            </TableCell>
                                            <TableCell className="text-sm">
                                                {cert.issuedAt
                                                    ? moment(cert.issuedAt).format("D MMM YYYY")
                                                    : "-"}
                                            </TableCell>
                                            <TableCell className="text-sm">
                                                <span className={cn({ "text-red-500 font-medium": cert.isExpired })}>
                                                    {cert.expireAt == null
                                                        ? "N/A"
                                                        : moment(cert.expireAt).format("D MMM YYYY")}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="secondary"
                                                    className={cn({
                                                        "text-orange-600 bg-orange-100": cert.approval_status === "pending",
                                                        "text-red-600 bg-red-100": cert.approval_status === "rejected",
                                                        "text-green-600 bg-green-100": cert.approval_status === "approved",
                                                    })}
                                                >
                                                    {cert.approval_status === "pending"
                                                        ? "In Progress"
                                                        : cert.approval_status === "approved"
                                                        ? "Approved"
                                                        : "Rejected"}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Log Hours */}
                <Card>
                    <div className="bg-slate-700 text-white px-4 py-2 rounded-t-md font-semibold text-sm">
                        Log Hours
                    </div>
                    <CardContent className="py-8 text-center text-gray-400 text-sm">
                        There is no any data to show in this table.
                    </CardContent>
                </Card>

            </div>
        </Authenticated>
    );
}

function Field({ label, value }: { label: string; value?: string | null }) {
    return (
        <div>
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className="font-medium text-sm">{value || "-"}</p>
        </div>
    );
}
