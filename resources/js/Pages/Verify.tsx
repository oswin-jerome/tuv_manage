import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Certificate } from "@/types";
import { Head } from "@inertiajs/react";
import moment from "moment";
import {
    ShieldCheck,
    CheckCircle2,
    AlertTriangle,
    XCircle,
    FileCheck2,
    Mail,
    Globe,
} from "lucide-react";

export default function Verify({
    certificate,
    error,
}: {
    certificate: Certificate | null;
    error: string | null;
}) {
    const isExpired = certificate?.expireAt
        ? moment().isAfter(moment(certificate.expireAt), "day")
        : false;

    return (
        <>
            <Head title="Certificate Verification - Trust United Validation Experts" />

            <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col justify-between p-4 sm:p-6 lg:p-8">
                {/* Subtle Background Watermark */}
                <div
                    aria-hidden="true"
                    className="fixed inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0 opacity-[0.035]"
                >
                    <img
                        src="/logo.png"
                        alt=""
                        className="w-[85vw] max-w-2xl select-none transform -rotate-12"
                    />
                </div>

                {/* Main Content Area */}
                <div className="w-full max-w-lg mx-auto z-10 flex-1 flex flex-col justify-center">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <img
                            src="/logo.png"
                            alt="Trust United Validation Experts"
                            className="h-16 sm:h-20 mx-auto object-contain mb-3 drop-shadow-sm"
                        />
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                            Trust United Validation Experts
                        </h1>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide uppercase shadow-sm border border-blue-100">
                            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                            Official Certificate Verification
                        </div>
                    </div>

                    {/* Error Card */}
                    {error && (
                        <Card className="border-red-200 shadow-md bg-white/95 rounded-2xl mb-6">
                            <CardContent className="pt-6 pb-6 text-center text-red-600 flex flex-col items-center gap-2">
                                <XCircle className="w-8 h-8 text-red-500" />
                                <span className="font-semibold text-base">{error}</span>
                            </CardContent>
                        </Card>
                    )}

                    {/* Expired Warning Banner */}
                    {certificate && isExpired && (
                        <div className="mb-4 bg-amber-50/95 border border-amber-200 text-amber-900 px-4 py-3 rounded-xl text-xs sm:text-sm text-center font-medium shadow-sm flex items-center justify-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                            <span>
                                Warning: This certificate expired on{" "}
                                <strong className="font-semibold">
                                    {moment(certificate.expireAt).format("D MMM YYYY")}
                                </strong>
                                .
                            </span>
                        </div>
                    )}

                    {/* Certificate Details Card */}
                    {certificate && (
                        <Card
                            className={`border shadow-lg shadow-slate-200/60 backdrop-blur-sm bg-white/95 rounded-2xl overflow-hidden ${
                                isExpired ? "border-amber-200" : "border-slate-200"
                            }`}
                        >
                            <CardHeader className="bg-slate-50/80 border-b border-slate-100 py-3.5 px-5 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <FileCheck2 className="w-5 h-5 text-blue-600" />
                                        <CardTitle className="text-base sm:text-lg font-bold text-slate-800">
                                            Certificate Details
                                        </CardTitle>
                                    </div>
                                    {isExpired ? (
                                        <Badge className="bg-amber-100 text-amber-800 border border-amber-200 hover:bg-amber-100 px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1 shadow-sm">
                                            <XCircle className="w-3.5 h-3.5 text-amber-600" />
                                            Expired ✗
                                        </Badge>
                                    ) : (
                                        <Badge className="bg-emerald-100 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1 shadow-sm">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                            Verified ✓
                                        </Badge>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-slate-100">
                                    <Row
                                        label="Certificate Holder"
                                        value={certificate.certifier_name}
                                        highlight
                                    />
                                    <Row label="Company" value={certificate.company?.name} />
                                    <Row
                                        label="Certificate Type"
                                        value={
                                            certificate.certificate_type?.layout === "file_based"
                                                ? certificate.certificate_name
                                                : certificate.certificate_type?.name
                                        }
                                    />
                                    <Row
                                        label="Reference Number"
                                        value={certificate.ref_no}
                                        highlight
                                    />
                                    {certificate.job_order_number && (
                                        <Row
                                            label="Job Order #"
                                            value={certificate.job_order_number}
                                        />
                                    )}
                                    <Row
                                        label="Issue Date"
                                        value={
                                            certificate.issuedAt
                                                ? moment(certificate.issuedAt).format(
                                                      "D MMM YYYY"
                                                  )
                                                : "-"
                                        }
                                    />
                                    <Row
                                        label="Expiry Date"
                                        value={
                                            certificate.expireAt
                                                ? moment(certificate.expireAt).format(
                                                      "D MMM YYYY"
                                                  )
                                                : "Not Applicable"
                                        }
                                    />
                                    <Row label="Witnessed By" value={certificate.witness} />
                                    <Row label="Project" value={certificate.project} />

                                    {/* Custom fields (non-rich-text, non-empty) */}
                                    {certificate.custom_fields
                                        ?.filter(
                                            (cf) =>
                                                cf.type !== "custom" &&
                                                cf.value &&
                                                cf.value.trim() !== ""
                                        )
                                        .map((cf) => (
                                            <Row
                                                key={cf.id}
                                                label={
                                                    cf.label?.startsWith("QR_")
                                                        ? cf.label
                                                              .replace(/^QR_/, "")
                                                              .replace(/_/g, " ")
                                                        : cf.label
                                                }
                                                value={cf.value ?? ""}
                                            />
                                        ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Footer - Accreditations & Company Details */}
                    <div className="mt-8 pt-6 border-t border-slate-200/80 text-center">
                        <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-3">
                            Accreditations & International Standards
                        </p>
                        <div className="bg-white/90 border border-slate-200/80 rounded-xl p-3 shadow-sm inline-block w-full">
                            <img
                                src="/foot2.jpg"
                                alt="Accreditations - UKcert, IAF, UAF, LEEA Full Member, ISO 17020, ISO 17025"
                                className="w-full object-contain h-auto mx-auto max-h-14"
                            />
                        </div>
                        <div className="mt-4 space-y-1 text-xs text-slate-500">
                            <p className="font-semibold text-slate-700">
                                Trust United Validation Experts
                            </p>
                            <p className="text-slate-400">CR #: 1009060888</p>
                            <div className="flex items-center justify-center gap-3 pt-1 text-slate-500 flex-wrap">
                                <span className="flex items-center gap-1">
                                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                                    operations@tuv-experts.com
                                </span>
                                <span>•</span>
                                <a
                                    href="https://www.tuv-experts.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-1 text-blue-600 hover:underline font-medium"
                                >
                                    <Globe className="w-3.5 h-3.5" />
                                    www.tuv-experts.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function Row({
    label,
    value,
    highlight = false,
}: {
    label: string;
    value?: string | null;
    highlight?: boolean;
}) {
    if (!value) return null;
    return (
        <div className="flex items-start justify-between py-2.5 px-5 sm:px-6 hover:bg-slate-50/60 transition-colors text-xs sm:text-sm">
            <span className="text-slate-500 font-medium flex-shrink-0 mr-4">
                {label}
            </span>
            <span
                className={`text-right max-w-[65%] break-words ${
                    highlight
                        ? "font-bold text-blue-900"
                        : "font-semibold text-slate-800"
                }`}
            >
                {value}
            </span>
        </div>
    );
}
