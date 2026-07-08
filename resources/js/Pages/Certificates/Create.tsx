import InputError from "@/components/InputError";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { cn } from "@/lib/utils";
import { CertificateType, Company, CustomField } from "@/types";
import { router, useForm } from "@inertiajs/react";
import JoditEditor from "jodit-react";
import { FormEvent, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { toast } from "sonner";

interface JobOrderOption { id: number; job_order_code: string; }

const CreateCertificateType = ({
    certificateTypes,
    companies,
    jobOrders,
}: {
    certificateTypes: CertificateType[];
    companies: Company[];
    jobOrders: JobOrderOption[];
}) => {
    const [cType, setCType] = useState<CertificateType | undefined>();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const editor = useRef(null);
    const [companyQuery, setCompanyQuery] = useState("");
    const [showCompanyList, setShowCompanyList] = useState(false);
    const [jobOrderQuery, setJobOrderQuery] = useState("");
    const [showJobOrderList, setShowJobOrderList] = useState(false);

    const {
        post,
        data,
        setData,
        processing,
        errors,
        reset,
        hasErrors,
        transform,
    } = useForm<{
        certifier_name: string;
        certificate_name: string;
        iqama: string;
        company_id: string;
        project: string;
        witness: string;
        issuedAt: string;
        expireAt: string;
        job_order_number: string;
        certificate_type_id: string;
        customFields: CustomField[] | undefined;
        image: File | null | undefined;
        pdf_file: File | null | undefined;
    }>({
        certifier_name: "",
        certificate_name: "",
        iqama: "",
        company_id: "",
        project: "Not Applicable",
        witness: "",
        issuedAt: "",
        expireAt: "",
        job_order_number: "",
        certificate_type_id: "",
        customFields: [],
        image: null,
        pdf_file: null,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        transform((data) => ({
            ...data,
            customFields: cType?.custom_fields,
        }));
        post(route("certificates.store"), {
            onSuccess: (w) => {
                reset();
                toast.success("Certificate Added");
                setTimeout(() => {
                    router.get(route("certificates.index"));
                }, 3000);
            },
            onError: (e) => {
                toast.error(e[Object.keys(e)[0]]);
            },
        });
    };

    return (
        <Authenticated>
            <Card className="">
                <CardHeader>
                    <CardTitle>Create Certificate Type</CardTitle>
                </CardHeader>
                <CardContent>
                    {hasErrors && <p>Oops</p>}

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        <div>
                            <Label>Certificate Type</Label>
                            <Select
                                required
                                value={data.certificate_type_id}
                                onValueChange={(val) => {
                                    setData("certificate_type_id", val);
                                    setCType(
                                        certificateTypes.find(
                                            (c) => c.id == parseInt(val)
                                        )
                                    );
                                }}
                            >
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Select a type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {certificateTypes?.map(
                                        (certificateType) => {
                                            return (
                                                <SelectItem
                                                    value={certificateType.id.toString()}
                                                >
                                                    {certificateType.name}
                                                </SelectItem>
                                            );
                                        }
                                    )}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.certificate_type_id} />
                        </div>
                        <div>
                            <Label>Certifier / Equipment Name</Label>
                            <Input
                                value={data.certifier_name}
                                onChange={(e) =>
                                    setData("certifier_name", e.target.value)
                                }
                            />
                            <InputError message={errors.certifier_name} />
                        </div>
                        {cType?.layout !== "file_based" && (
                            <div>
                                <Label>Photo</Label>
                                {imagePreview && (
                                    <div className="mb-2">
                                        <img
                                            src={imagePreview}
                                            alt="Photo preview"
                                            className="h-24 w-24 object-cover rounded border border-blue-400"
                                        />
                                        <p className="text-xs text-blue-500 mt-1">Photo selected</p>
                                    </div>
                                )}
                                <Input
                                    type="file"
                                    accept="image/jpeg,image/png,image/jpg"
                                    onChange={(e) => {
                                        const file = e.target.files?.item(0);
                                        setData("image", file);
                                        if (file) {
                                            setImagePreview(URL.createObjectURL(file));
                                        } else {
                                            setImagePreview(null);
                                        }
                                    }}
                                />
                                <InputError message={errors.image} />
                            </div>
                        )}
                        {cType?.layout === "file_based" && (
                            <div>
                                <Label>Certificate PDF</Label>
                                <Input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) =>
                                        setData("pdf_file", e.target.files?.item(0))
                                    }
                                />
                                <InputError message={errors.pdf_file} />
                            </div>
                        )}
                        <div>
                            <Label>Certificate Name</Label>
                            <Input
                                value={data.certificate_name}
                                onChange={(e) =>
                                    setData("certificate_name", e.target.value)
                                }
                            />
                            <InputError message={errors.certificate_name} />
                        </div>
                        <div>
                            <Label>Iqama</Label>
                            <Input
                                value={data.iqama}
                                onChange={(e) =>
                                    setData("iqama", e.target.value)
                                }
                            />
                            <InputError message={errors.iqama} />
                        </div>
                        {/* Company searchable */}
                        <div className="relative">
                            <Label>Company *</Label>
                            <Input
                                placeholder="Search company..."
                                value={companyQuery}
                                onFocus={() => setShowCompanyList(true)}
                                onBlur={() => setTimeout(() => setShowCompanyList(false), 150)}
                                onChange={(e) => {
                                    setCompanyQuery(e.target.value);
                                    setData("company_id", "");
                                    setShowCompanyList(true);
                                }}
                            />
                            {showCompanyList && (
                                <div className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-md border bg-white shadow-lg">
                                    {companies.filter(c => c.name.toLowerCase().includes(companyQuery.toLowerCase())).map(c => (
                                        <button type="button" key={c.id}
                                            className="w-full px-3 py-2 text-left text-sm hover:bg-blue-50"
                                            onMouseDown={() => {
                                                setData("company_id", c.id.toString());
                                                setCompanyQuery(c.name);
                                                setShowCompanyList(false);
                                            }}>
                                            {c.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <InputError message={errors.company_id} />
                        </div>

                        {/* Job Order searchable */}
                        <div className="relative">
                            <Label>Job Order #</Label>
                            <Input
                                placeholder="Search job order..."
                                value={jobOrderQuery}
                                onFocus={() => setShowJobOrderList(true)}
                                onBlur={() => setTimeout(() => setShowJobOrderList(false), 150)}
                                onChange={(e) => {
                                    setJobOrderQuery(e.target.value);
                                    setData("job_order_number", e.target.value);
                                    setShowJobOrderList(true);
                                }}
                            />
                            {showJobOrderList && (
                                <div className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-md border bg-white shadow-lg">
                                    <button type="button"
                                        className="w-full px-3 py-2 text-left text-sm hover:bg-blue-50 text-gray-400"
                                        onMouseDown={() => { setData("job_order_number", ""); setJobOrderQuery(""); setShowJobOrderList(false); }}>
                                        — None —
                                    </button>
                                    {jobOrders.filter(j => j.job_order_code.toLowerCase().includes(jobOrderQuery.toLowerCase())).map(j => (
                                        <button type="button" key={j.id}
                                            className="w-full px-3 py-2 text-left text-sm hover:bg-blue-50"
                                            onMouseDown={() => {
                                                setData("job_order_number", j.job_order_code);
                                                setJobOrderQuery(j.job_order_code);
                                                setShowJobOrderList(false);
                                            }}>
                                            {j.job_order_code}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <InputError message={errors.job_order_number} />
                        </div>
                        <div>
                            <Label>Project</Label>
                            <Input
                                value={data.project}
                                onChange={(e) =>
                                    setData("project", e.target.value)
                                }
                            />
                            <InputError message={errors.project} />
                        </div>
                        <div>
                            <Label>Witness</Label>
                            <Input
                                value={data.witness}
                                onChange={(e) =>
                                    setData("witness", e.target.value)
                                }
                            />
                            <InputError message={errors.witness} />
                        </div>
                        <div>
                            <Label>Issued At</Label>
                            <Input
                                type="date"
                                value={data.issuedAt}
                                onChange={(e) =>
                                    setData("issuedAt", e.target.value)
                                }
                            />
                            <InputError message={errors.issuedAt} />
                        </div>
                        <div>
                            <Label>Expires At</Label>
                            <Input
                                type="date"
                                value={data.expireAt}
                                onChange={(e) =>
                                    setData("expireAt", e.target.value)
                                }
                            />
                            <InputError message={errors.expireAt} />
                        </div>

                        <div className="font-semibold md:col-span-2 mt-10">
                            Custom fields
                        </div>
                        {cType?.custom_fields &&
                            cType?.custom_fields.map((val) => {
                                return (
                                    <div
                                        key={val.id}
                                        className={cn({
                                            "md:col-span-2": val.type == "custom",
                                        })}
                                    >
                                        {/* Editable label — all fields editable; QR_ prefix preserved internally */}
                                        <Input
                                            className="mb-1 text-xs font-semibold h-7 border-dashed border-gray-300 bg-gray-50 text-gray-700 focus:bg-white"
                                            defaultValue={val.label.startsWith("QR_")
                                                ? val.label.replace(/^QR_/, "").replace(/_/g, " ")
                                                : val.label}
                                            onChange={(e) => {
                                                val.label = val.label.startsWith("QR_")
                                                    ? "QR_" + e.target.value.replace(/ /g, "_")
                                                    : e.target.value;
                                            }}
                                        />
                                        {val.type == "text" && (
                                            <Input
                                                key={val + "input"}
                                                defaultValue={val.default_value}
                                                onChange={(e) => { val.default_value = e.target.value; }}
                                            />
                                        )}
                                        {val.type == "date" && (
                                            <Input
                                                type="date"
                                                key={val + "input"}
                                                defaultValue={val.default_value}
                                                onChange={(e) => { val.default_value = e.target.value; }}
                                            />
                                        )}
                                        {val.type == "custom" && (
                                            <JoditEditor
                                                config={{ style: { fontSize: "12px" } }}
                                                className="prose max-w-full"
                                                ref={editor}
                                                value={val.default_value}
                                                onBlur={(newContent) => { val.default_value = newContent; }}
                                                onChange={() => {}}
                                            />
                                        )}
                                        <InputError message={errors.customFields} />
                                    </div>
                                );
                            })}

                        <div className="md:col-span-2 pt-8">
                            <Button disabled={processing}>Create</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </Authenticated>
    );
};

export default CreateCertificateType;
