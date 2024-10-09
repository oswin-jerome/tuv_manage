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
import { Certificate, CertificateType, CustomField } from "@/types";
import { useForm } from "@inertiajs/react";
import JoditEditor from "jodit-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { toast } from "sonner";

const CreateCertificateType = ({
    certificateTypes,
    certificate,
}: {
    certificateTypes: CertificateType[];
    certificate: Certificate;
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
        company: string;
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
        company: certificate.company,
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
                        <div>
                            <Label>Company</Label>
                            <Input
                                value={data.company}
                                onChange={(e) =>
                                    setData("company", e.target.value)
                                }
                            />
                            <InputError message={errors.company} />
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
                            <Label>Ref #</Label>
                            <Input
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
                                                key={val + "input"}
                                                value={
                                                    val.value ??
                                                    val.default_value
                                                }
                                                onChange={(e) => {
                                                    val.default_value =
                                                        e.target.value;
                                                }}
                                            />
                                        )}
                                        {val.type == "custom" && (
                                            <JoditEditor
                                                className="prose max-w-full list-disc prose-h1:m-0 prose-p:m-0"
                                                ref={editor}
                                                config={{
                                                    inline: true,
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
                                disabled={processing}
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
