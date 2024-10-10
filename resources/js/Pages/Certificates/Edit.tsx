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
import { Certificate, CertificateType, Company, CustomField } from "@/types";
import { useForm } from "@inertiajs/react";
import JoditEditor from "jodit-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { toast } from "sonner";

const CreateCertificateType = ({
    certificateTypes,
    certificate,
    companies,
}: {
    certificateTypes: CertificateType[];
    certificate: Certificate;
    companies: Company[];
}) => {
    const [cType, setCType] = useState<CertificateType | undefined>(
        certificateTypes.find((c) => c.id === certificate.certificate_type_id)
    );
    const editor = useRef(null);

    useEffect(() => {
        if (cType?.id === certificate.certificate_type_id) {
            setData("customFields", certificate.custom_fields);
        } else {
            setData("customFields", cType!.custom_fields);
        }
    }, [cType]);

    const {
        put,
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
        ref_no: string;
        witness: string;
        issuedAt: string;
        expireAt: string;
        certificate_type_id: string;
        customFields: CustomField[];
    }>({
        certifier_name: certificate.certifier_name,
        certificate_name: certificate.certificate_name,
        iqama: certificate.iqama,
        company_id: certificate.company_id.toString(),
        project: certificate.project,
        ref_no: certificate.ref_no,
        witness: certificate.witness,
        issuedAt: certificate.issuedAt.toString(),
        expireAt: certificate.expireAt.toString(),
        certificate_type_id: certificate.certificate_type_id.toString(),
        customFields: [],
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(data);
        transform((data) => ({
            ...data,
            // customFields: cType?.custom_fields,
        }));
        put(route("certificates.update", certificate.id), {
            onSuccess: () => {
                toast.warning("Updated!!!");
                // reset();
            },
            onError: (errs) => {
                if (errs["*"]) {
                    toast.error(errs["*"]);
                }
            },
        });
    };

    return (
        <Authenticated>
            <Card className="">
                <CardHeader>
                    <CardTitle>Edit Certificate Type</CardTitle>
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
                                disabled={
                                    certificate.approval_status != "pending"
                                }
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
                            <Label>Certifier Name</Label>
                            <Input
                                disabled={
                                    certificate.approval_status != "pending"
                                }
                                value={data.certifier_name}
                                onChange={(e) =>
                                    setData("certifier_name", e.target.value)
                                }
                            />
                            <InputError message={errors.certifier_name} />
                        </div>
                        <div>
                            <Label>Certificate Name</Label>
                            <Input
                                disabled={
                                    certificate.approval_status != "pending"
                                }
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
                                disabled={
                                    certificate.approval_status != "pending"
                                }
                                value={data.iqama}
                                onChange={(e) =>
                                    setData("iqama", e.target.value)
                                }
                            />
                            <InputError message={errors.iqama} />
                        </div>
                        <div>
                            <Label>Company</Label>
                            <Select
                                disabled={
                                    certificate.approval_status != "pending"
                                }
                                required
                                defaultValue={data.company_id}
                                onValueChange={(val) => {
                                    setData("company_id", val);
                                }}
                            >
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Select a type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {companies?.map((company) => {
                                        return (
                                            <SelectItem
                                                value={company.id.toString()}
                                            >
                                                {company.name}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.company_id} />
                        </div>
                        <div>
                            <Label>Project</Label>
                            <Input
                                disabled={
                                    certificate.approval_status != "pending"
                                }
                                value={data.project}
                                onChange={(e) =>
                                    setData("project", e.target.value)
                                }
                            />
                            <InputError message={errors.project} />
                        </div>
                        <div>
                            <Label>Ref #</Label>
                            <Input
                                disabled
                                value={data.ref_no}
                                onChange={(e) =>
                                    setData("ref_no", e.target.value)
                                }
                            />
                            <InputError message={errors.ref_no} />
                        </div>
                        <div>
                            <Label>Witness</Label>
                            <Input
                                disabled={
                                    certificate.approval_status != "pending"
                                }
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
                                disabled={
                                    certificate.approval_status != "pending"
                                }
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
                                disabled={
                                    certificate.approval_status != "pending"
                                }
                                type="date"
                                value={data.expireAt}
                                onChange={(e) =>
                                    setData("expireAt", e.target.value)
                                }
                            />
                            <InputError message={errors.expireAt} />
                        </div>

                        <div className="font-semibold col-span-2 mt-10">
                            Custom fields
                        </div>

                        {data?.customFields &&
                            data?.customFields.map((val) => {
                                return (
                                    <div
                                        key={val.id}
                                        className={cn({
                                            "col-span-2": val.type == "custom",
                                        })}
                                    >
                                        <Label>{val.label}</Label>
                                        {val.type == "text" && (
                                            <Textarea
                                                disabled={
                                                    certificate.approval_status !=
                                                    "pending"
                                                }
                                                key={val + "input"}
                                                defaultValue={
                                                    val.value ??
                                                    val.default_value
                                                }
                                                onChange={(e) => {
                                                    val.value = e.target.value;
                                                }}
                                            />
                                        )}
                                        {val.type == "custom" && (
                                            <JoditEditor
                                                className="prose max-w-full list-disc"
                                                ref={editor}
                                                config={{
                                                    inline: true,
                                                    disabled:
                                                        certificate.approval_status !=
                                                        "pending",
                                                }}
                                                value={
                                                    val.value ??
                                                    val.default_value
                                                }
                                                onBlur={(newContent) => {
                                                    val.value = newContent;
                                                }}
                                                onChange={(newContent) => {}}
                                            />
                                        )}
                                        <InputError
                                            message={errors.customFields}
                                        />
                                    </div>
                                );
                            })}

                        <div className="md:col-span-2 pt-8">
                            <Button
                                isLoading={processing}
                                disabled={
                                    certificate.approval_status != "pending" ||
                                    processing
                                }
                            >
                                Update
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </Authenticated>
    );
};

export default CreateCertificateType;
