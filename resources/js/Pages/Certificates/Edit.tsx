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
import { router, useForm } from "@inertiajs/react";
import JoditEditor from "jodit-react";
import moment from "moment";
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
        ref_no: string;
        witness: string;
        issuedAt: string;
        expireAt: string;
        certificate_type_id: string;
        customFields: CustomField[];
        image: File | null | undefined;
        _method: "PUT";
    }>({
        certifier_name: certificate.certifier_name,
        certificate_name: certificate.certificate_name,
        iqama: certificate.iqama,
        company_id: certificate.company_id.toString(),
        project: certificate.project,
        ref_no: certificate.ref_no,
        witness: certificate.witness,
        issuedAt: certificate.issuedAt.toString(),
        expireAt: certificate.expireAt?.toString() ?? "",
        certificate_type_id: certificate.certificate_type_id.toString(),
        customFields: [],
        image: null,
        _method: "PUT",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(data);
        transform((data) => ({
            ...data,
            // customFields: cType?.custom_fields,
            _method: "PUT",
        }));
        post(route("certificates.update", certificate.id), {
            onSuccess: (e) => {
                toast.warning("Updated!!!");
                // reset();
                router.reload();
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
                                value={moment(data.issuedAt).format("Y-MM-DD")}
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
                                value={moment(data.expireAt).format("Y-MM-DD")}
                                onChange={(e) =>
                                    setData("expireAt", e.target.value)
                                }
                            />
                            <InputError message={errors.expireAt} />
                        </div>

                        <div className="font-semibold md:col-span-2 mt-10">
                            Custom fields
                        </div>

                        {data?.customFields &&
                            data?.customFields.map((val) => {
                                return (
                                    <div
                                        key={val.id}
                                        className={cn({
                                            "md:col-span-2":
                                                val.type == "custom",
                                        })}
                                    >
                                        <div className="flex justify-between items-center mb-1">
                                            <Label>{val.label}</Label>
                                            <Button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    console.log(
                                                        data.certificate_type_id,
                                                        val.custom_field_id
                                                    );
                                                    router.put(
                                                        route(
                                                            "customFields.update",
                                                            [
                                                                data.certificate_type_id,
                                                                val.custom_field_id,
                                                            ]
                                                        ),
                                                        {
                                                            default_value:
                                                                val.value,
                                                        },
                                                        {
                                                            onSuccess: () => {
                                                                toast.info(
                                                                    "Updated"
                                                                );
                                                            },
                                                            onError: (e) => {
                                                                console.log(e);
                                                                toast.error(
                                                                    e.error
                                                                );
                                                            },
                                                        }
                                                    );
                                                }}
                                                size={"sm"}
                                                variant={"link"}
                                            >
                                                Set as default
                                            </Button>
                                        </div>

                                        <div className="prose max-w-full list-disc">
                                            {val.type == "text" && (
                                                <Textarea
                                                    key={val + "input"}
                                                    defaultValue={
                                                        val.value ??
                                                        val.default_value
                                                    }
                                                    onChange={(e) => {
                                                        val.value =
                                                            e.target.value;
                                                    }}
                                                />
                                            )}
                                            {val.type == "custom" && (
                                                <JoditEditor
                                                    className="prose max-w-full list-disc"
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
                                                    onChange={(
                                                        newContent
                                                    ) => {}}
                                                />
                                            )}
                                            <InputError
                                                message={errors.customFields}
                                            />
                                        </div>
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
                            <br />
                        </div>
                    </form>
                    <a
                        target="__blank"
                        href={route("certificates.pdf", certificate.id)}
                    >
                        <Button>Preview PDF</Button>
                    </a>
                </CardContent>
            </Card>
        </Authenticated>
    );
};

export default CreateCertificateType;
