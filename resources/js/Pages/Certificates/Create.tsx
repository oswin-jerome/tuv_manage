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
import { CertificateType } from "@/types";
import { useForm } from "@inertiajs/react";
import { FormEvent, useState } from "react";

const CreateCertificateType = ({
    certificateTypes,
}: {
    certificateTypes: CertificateType[];
}) => {
    const [cType, setCType] = useState<CertificateType | undefined>();

    const {
        post,
        data,
        setData,
        processing,
        errors,
        reset,
        hasErrors,
        transform,
    } = useForm({
        certifier_name: "",
        certificate_name: "",
        iqama: "",
        company: "",
        project: "",
        ref_no: "",
        witness: "",
        issuedAt: "",
        expireAt: "",
        certificate_type_id: "",
        customFields: {},
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(data);
        transform((data) => ({
            ...data,
            customFields: JSON.stringify(data.customFields),
        }));
        post(route("certificates.store"), {
            onSuccess: () => {
                alert("Added");
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
                        {cType?.customFields &&
                            JSON.parse(cType?.customFields).map(
                                (val: string) => {
                                    return (
                                        <div key={val}>
                                            <Label>{val}</Label>
                                            <Textarea
                                                key={val + "input"}
                                                onChange={(e) => {
                                                    setData("customFields", {
                                                        ...data.customFields,
                                                        [val]: e.target.value,
                                                    });
                                                }}
                                            />
                                            <InputError
                                                message={errors.customFields}
                                            />
                                        </div>
                                    );
                                }
                            )}

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
