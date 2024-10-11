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
import { useForm } from "@inertiajs/react";
import JoditEditor from "jodit-react";
import { FormEvent, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { toast } from "sonner";

const CreateCertificateType = ({
    certificateTypes,
    companies,
}: {
    certificateTypes: CertificateType[];
    companies: Company[];
}) => {
    const [cType, setCType] = useState<CertificateType | undefined>();
    const editor = useRef(null);

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
        certificate_type_id: string;
        customFields: CustomField[] | undefined;
        image: File | null | undefined;
    }>({
        certifier_name: "",
        certificate_name: "",
        iqama: "",
        company_id: "",
        project: "",
        witness: "",
        issuedAt: "",
        expireAt: "",
        certificate_type_id: "",
        customFields: [],
        image: null,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(data);
        transform((data) => ({
            ...data,
            customFields: cType?.custom_fields,
        }));
        post(route("certificates.store"), {
            onSuccess: () => {
                toast.success("Certificate Added");
                reset();
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
                            <Label>Photo</Label>
                            <Input
                                type="file"
                                onChange={(e) =>
                                    setData("image", e.target.files?.item(0))
                                }
                            />
                            <InputError message={errors.image} />
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

                            <Select
                                required
                                value={data.company_id}
                                onValueChange={(val) => {
                                    setData("company_id", val);
                                }}
                            >
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Select a country" />
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

                        <div className="font-semibold col-span-2 mt-10">
                            Custom fields
                        </div>
                        {cType?.custom_fields &&
                            cType?.custom_fields.map((val) => {
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
                                                required
                                                key={val + "input"}
                                                value={val.default_value}
                                                onChange={(e) => {
                                                    val.default_value =
                                                        e.target.value;
                                                }}
                                            />
                                        )}
                                        {val.type == "custom" && (
                                            <JoditEditor
                                                className="prose max-w-full"
                                                ref={editor}
                                                value={val.default_value}
                                                onBlur={(newContent) => {
                                                    val.default_value =
                                                        newContent;
                                                    console.log(
                                                        cType.custom_fields
                                                    );
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
                            <Button disabled={processing}>Create</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </Authenticated>
    );
};

export default CreateCertificateType;
