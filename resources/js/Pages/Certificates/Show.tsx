import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Certificate } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import JoditEditor from "jodit-react";
import moment from "moment";
import { useRef } from "react";
import { usePDF } from "react-to-pdf";

const Show = ({ certificate }: { certificate: Certificate }) => {
    const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
    const auth = usePage().props.auth;
    const user = auth.user;
    const editor = useRef(null);

    return (
        <Authenticated>
            <div className="space-y-4">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center flex-wrap gap-2">
                            <CardTitle>
                                {certificate.certifier_name} -{" "}
                                {certificate.ref_no}
                            </CardTitle>
                            <div className="flex items-center gap-2">
                                {auth.roles.includes("admin") && (
                                    <a
                                        href={route(
                                            "certificates.pdf",
                                            certificate.id
                                        )}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button variant="outline" size="sm">
                                            View PDF
                                        </Button>
                                    </a>
                                )}
                                {auth.roles.includes("admin") &&
                                    certificate.approval_status == "pending" && (
                                        <>
                                            <Link
                                                href={route(
                                                    "certificates.action",
                                                    certificate.id
                                                )}
                                                method="post"
                                                data={{ status: "approved" }}
                                            >
                                                <Button>Approve</Button>
                                            </Link>
                                            <Link
                                                href={route(
                                                    "certificates.action",
                                                    certificate.id
                                                )}
                                                method="post"
                                                data={{ status: "rejected" }}
                                            >
                                                <Button variant={"destructive"}>
                                                    Reject
                                                </Button>
                                            </Link>
                                        </>
                                    )}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Certifier / Equipment Name</Label>
                            <Input
                                value={certificate.certifier_name}
                                readOnly
                            />
                        </div>
                        <div>
                            <Label>Certificate Type</Label>
                            <Input
                                value={certificate.certificate_type.name}
                                readOnly
                            />
                        </div>
                        <div>
                            <Label>Iqama</Label>
                            <Input value={certificate.iqama} readOnly />
                        </div>
                        <div>
                            <Label>Company</Label>
                            <Input
                                value={certificate?.company?.name}
                                readOnly
                            />
                        </div>
                        <div>
                            <Label>Ref #</Label>
                            <Input value={certificate.ref_no} readOnly />
                        </div>
                        <div>
                            <Label>Witnessed By</Label>
                            <Input value={certificate.witness} readOnly />
                        </div>
                        <div>
                            <Label>Issued At</Label>
                            <Input
                                value={moment(certificate.issuedAt).format(
                                    "D MMM Y"
                                )}
                                readOnly
                            />
                        </div>
                        <div>
                            <Label>Expires At</Label>
                            <Input
                                value={
                                    certificate.expireAt == null
                                        ? "Not Applicable"
                                        : moment(certificate.expireAt).format(
                                              "D MMM Y"
                                          )
                                }
                                readOnly
                            />
                        </div>
                        <div>
                            <Label>Approval Status</Label>
                            <Input
                                value={certificate.approval_status}
                                readOnly
                            />
                        </div>
                        {certificate.custom_fields.map((cf) => {
                            if (cf.type == "custom") {
                                return (
                                    <div className="md:col-span-2">
                                        <Label>{cf.key}</Label>
                                        <JoditEditor
                                            config={{
                                                readonly: true,
                                                style: {
                                                    fontSize: "12px",
                                                },
                                            }}
                                            className="prose max-w-full"
                                            ref={editor}
                                            value={cf.value ?? ""}
                                            onChange={(newContent) => {}}
                                        />
                                    </div>
                                );
                            }

                            return (
                                <div>
                                    <Label>{cf.key}</Label>
                                    <Textarea value={cf.value} readOnly />
                                </div>
                            );
                        })}
                    </CardContent>
                    <CardFooter>
                        {auth.roles.includes("admin") &&
                            certificate.approval_status == "pending" && (
                                <div className=" flex gap-4">
                                    <Link
                                        href={route(
                                            "certificates.action",
                                            certificate.id
                                        )}
                                        method="post"
                                        data={{ status: "approved" }}
                                    >
                                        <Button>Approve</Button>
                                    </Link>
                                    <Link
                                        href={route(
                                            "certificates.action",
                                            certificate.id
                                        )}
                                        method="post"
                                        data={{ status: "rejected" }}
                                    >
                                        <Button variant={"destructive"}>
                                            Reject
                                        </Button>
                                    </Link>
                                </div>
                            )}
                    </CardFooter>
                </Card>

                {auth.roles.includes("admin") && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Certificate PDF</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <iframe
                                className="w-full min-h-[600px] border rounded"
                                src={route(
                                    "certificates.pdf",
                                    certificate.id
                                )}
                                title="Certificate PDF"
                            />
                        </CardContent>
                    </Card>
                )}
            </div>
        </Authenticated>
    );
};

export default Show;
