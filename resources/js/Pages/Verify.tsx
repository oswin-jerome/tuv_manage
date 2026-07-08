import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Certificate } from "@/types";
import { Head } from "@inertiajs/react";
import moment from "moment";

export default function Verify({
    certificate,
    error,
}: {
    certificate: Certificate | null;
    error: string | null;
}) {
    return (
        <>
            <Head title="Certificate Verification" />
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="w-full max-w-lg">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">TUV Experts</h1>
                        <p className="text-gray-500 text-sm">Certificate Verification</p>
                    </div>

                    {error && (
                        <Card className="border-red-200">
                            <CardContent className="pt-6 text-center text-red-600">
                                {error}
                            </CardContent>
                        </Card>
                    )}

                    {certificate && (
                        <Card>
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">Certificate Details</CardTitle>
                                    <Badge className="bg-green-100 text-green-700 border-0">
                                        Verified ✓
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="divide-y">
                                    <Row label="Certificate Holder" value={certificate.certifier_name} />
                                    <Row label="Company" value={certificate.company?.name} />
                                    <Row
                                        label="Certificate Type"
                                        value={
                                            certificate.certificate_type?.layout === "file_based"
                                                ? certificate.certificate_name
                                                : certificate.certificate_type?.name
                                        }
                                    />
                                    <Row label="Reference Number" value={certificate.ref_no} />
                                    {certificate.job_order_number && (
                                        <Row label="Job Order #" value={certificate.job_order_number} />
                                    )}
                                    <Row
                                        label="Issue Date"
                                        value={certificate.issuedAt ? moment(certificate.issuedAt).format("D MMM YYYY") : "-"}
                                    />
                                    <Row
                                        label="Expiry Date"
                                        value={certificate.expireAt ? moment(certificate.expireAt).format("D MMM YYYY") : "Not Applicable"}
                                    />
                                    <Row label="Witnessed By" value={certificate.witness} />
                                    <Row label="Project" value={certificate.project} />

                                    {/* Custom fields (non-rich-text, non-empty) */}
                                    {certificate.custom_fields
                                        ?.filter((cf) => cf.type !== "custom" && cf.value && cf.value.trim() !== "")
                                        .map((cf) => (
                                            <Row
                                                key={cf.id}
                                                label={cf.label?.startsWith("QR_")
                                                    ? cf.label.replace(/^QR_/, "").replace(/_/g, " ")
                                                    : cf.label}
                                                value={cf.value ?? ""}
                                            />
                                        ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </>
    );
}

function Row({ label, value }: { label: string; value?: string | null }) {
    if (!value) return null;
    return (
        <div className="flex justify-between py-2 text-sm">
            <span className="text-gray-500 font-medium">{label}</span>
            <span className="text-gray-800 text-right max-w-[60%]">{value}</span>
        </div>
    );
}
