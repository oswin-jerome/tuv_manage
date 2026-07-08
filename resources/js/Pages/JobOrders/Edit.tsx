import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Company, JobOrder, User } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";

const DEPARTMENTS = ["TPI", "Lifting", "Welding", "NDT", "Other"];
const JOB_ORDER_TYPES = [
    "Inspection Job Order",
    "Welder Qualification",
    "NDT Inspection",
    "Other",
];

export default function JobOrderEdit({
    jobOrder,
    companies,
    users,
}: {
    jobOrder: JobOrder;
    companies: Company[];
    users: User[];
}) {
    const { data, setData, put, processing, errors } = useForm({
        department: jobOrder.department ?? "",
        job_order_type: jobOrder.job_order_type ?? "",
        company_id: jobOrder.company_id?.toString() ?? "",
        assigned_to_id: jobOrder.assigned_to_id?.toString() ?? "",
        job_request_number: jobOrder.job_request_number ?? "",
        location: jobOrder.location ?? "",
        date_from: jobOrder.date_from ?? "",
        date_to: jobOrder.date_to ?? "",
        status: jobOrder.status ?? "active",
    });

    const [companyQuery, setCompanyQuery] = useState(jobOrder.company?.name ?? "");
    const [showCompanyList, setShowCompanyList] = useState(false);
    const [userQuery, setUserQuery] = useState(jobOrder.assigned_to?.name ?? "");
    const [showUserList, setShowUserList] = useState(false);
    const [deptOther, setDeptOther] = useState(!DEPARTMENTS.includes(jobOrder.department ?? "") && !!jobOrder.department);
    const [jobTypeOther, setJobTypeOther] = useState(!JOB_ORDER_TYPES.includes(jobOrder.job_order_type ?? "") && !!jobOrder.job_order_type);

    const filteredCompanies = companyQuery.trim()
        ? companies.filter((c) =>
              c.name.toLowerCase().includes(companyQuery.toLowerCase())
          )
        : companies;

    const filteredUsers = userQuery.trim()
        ? users.filter((u) =>
              u.name.toLowerCase().includes(userQuery.toLowerCase())
          )
        : users;

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("job-orders.update", jobOrder.id));
    };

    return (
        <Authenticated>
            <div className="max-w-4xl mx-auto py-8 px-4">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">
                        Edit Job Order — {jobOrder.job_order_code}
                    </h1>
                    <Link href={route("job-orders.index")}>
                        <Button variant="outline">← Back</Button>
                    </Link>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    {/* Client Information */}
                    <Card>
                        <div className="bg-blue-600 text-white px-4 py-2 rounded-t-md font-semibold text-sm">
                            Client Information
                        </div>
                        <CardContent className="pt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Company searchable */}
                            <div className="relative">
                                <Label>Client / Company *</Label>
                                <Input
                                    placeholder="Search company..."
                                    value={companyQuery}
                                    onFocus={() => setShowCompanyList(true)}
                                    onBlur={() =>
                                        setTimeout(() => setShowCompanyList(false), 150)
                                    }
                                    onChange={(e) => {
                                        setCompanyQuery(e.target.value);
                                        setData("company_id", "");
                                        setShowCompanyList(true);
                                    }}
                                />
                                {showCompanyList && filteredCompanies.length > 0 && (
                                    <div className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-md border bg-white shadow-lg">
                                        {filteredCompanies.map((c) => (
                                            <button
                                                type="button"
                                                key={c.id}
                                                className="w-full px-3 py-2 text-left text-sm hover:bg-blue-50"
                                                onMouseDown={() => {
                                                    setData("company_id", c.id.toString());
                                                    setCompanyQuery(c.name);
                                                    setShowCompanyList(false);
                                                }}
                                            >
                                                {c.name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {errors.company_id && (
                                    <p className="text-red-500 text-xs mt-1">{errors.company_id}</p>
                                )}
                            </div>

                            {/* Job Request Number */}
                            <div>
                                <Label>Job Request Number</Label>
                                <Input
                                    value={data.job_request_number}
                                    onChange={(e) =>
                                        setData("job_request_number", e.target.value)
                                    }
                                />
                            </div>

                            {/* Location */}
                            <div>
                                <Label>Location</Label>
                                <Input
                                    value={data.location}
                                    onChange={(e) => setData("location", e.target.value)}
                                />
                            </div>

                            {/* Department */}
                            <div>
                                <Label>Department *</Label>
                                <Select
                                    value={deptOther ? "Other" : data.department}
                                    onValueChange={(v) => {
                                        if (v === "Other") { setDeptOther(true); setData("department", ""); }
                                        else { setDeptOther(false); setData("department", v); }
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {DEPARTMENTS.map((d) => (
                                            <SelectItem key={d} value={d}>{d}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {deptOther && (
                                    <Input
                                        className="mt-2"
                                        placeholder="Specify department..."
                                        value={data.department}
                                        onChange={(e) => setData("department", e.target.value)}
                                    />
                                )}
                                {errors.department && (
                                    <p className="text-red-500 text-xs mt-1">{errors.department}</p>
                                )}
                            </div>

                            {/* Job Order Type */}
                            <div>
                                <Label>Job Order Type *</Label>
                                <Select
                                    value={jobTypeOther ? "Other" : data.job_order_type}
                                    onValueChange={(v) => {
                                        if (v === "Other") { setJobTypeOther(true); setData("job_order_type", ""); }
                                        else { setJobTypeOther(false); setData("job_order_type", v); }
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {JOB_ORDER_TYPES.map((t) => (
                                            <SelectItem key={t} value={t}>{t}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {jobTypeOther && (
                                    <Input
                                        className="mt-2"
                                        placeholder="Specify job order type..."
                                        value={data.job_order_type}
                                        onChange={(e) => setData("job_order_type", e.target.value)}
                                    />
                                )}
                                {errors.job_order_type && (
                                    <p className="text-red-500 text-xs mt-1">{errors.job_order_type}</p>
                                )}
                            </div>

                            {/* Status */}
                            <div>
                                <Label>Status</Label>
                                <Select
                                    value={data.status}
                                    onValueChange={(v) => setData("status", v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="draft">Draft</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Assignment Information */}
                    <Card>
                        <div className="bg-blue-600 text-white px-4 py-2 rounded-t-md font-semibold text-sm">
                            Assignment Information
                        </div>
                        <CardContent className="pt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Date From */}
                            <div>
                                <Label>Date From</Label>
                                <Input
                                    type="date"
                                    value={data.date_from}
                                    onChange={(e) => setData("date_from", e.target.value)}
                                />
                            </div>

                            {/* Date To */}
                            <div>
                                <Label>Date To</Label>
                                <Input
                                    type="date"
                                    value={data.date_to}
                                    onChange={(e) => setData("date_to", e.target.value)}
                                />
                            </div>

                            {/* Assign Order To — searchable */}
                            <div className="relative">
                                <Label>Assign Order To</Label>
                                <Input
                                    placeholder="Search user..."
                                    value={userQuery}
                                    onFocus={() => setShowUserList(true)}
                                    onBlur={() =>
                                        setTimeout(() => setShowUserList(false), 150)
                                    }
                                    onChange={(e) => {
                                        setUserQuery(e.target.value);
                                        setData("assigned_to_id", "");
                                        setShowUserList(true);
                                    }}
                                />
                                {showUserList && filteredUsers.length > 0 && (
                                    <div className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-md border bg-white shadow-lg">
                                        <button
                                            type="button"
                                            className="w-full px-3 py-2 text-left text-sm hover:bg-blue-50 text-gray-400"
                                            onMouseDown={() => {
                                                setData("assigned_to_id", "");
                                                setUserQuery("");
                                                setShowUserList(false);
                                            }}
                                        >
                                            — None —
                                        </button>
                                        {filteredUsers.map((u) => (
                                            <button
                                                type="button"
                                                key={u.id}
                                                className="w-full px-3 py-2 text-left text-sm hover:bg-blue-50"
                                                onMouseDown={() => {
                                                    setData("assigned_to_id", u.id.toString());
                                                    setUserQuery(u.name);
                                                    setShowUserList(false);
                                                }}
                                            >
                                                {u.name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex gap-3">
                        <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700">
                            Save Changes
                        </Button>
                        <Link href={route("job-orders.index")}>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </Link>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
}
