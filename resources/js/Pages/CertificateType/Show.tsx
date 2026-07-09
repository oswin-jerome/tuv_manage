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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { CertificateType, CustomField } from "@/types";
import { router, useForm } from "@inertiajs/react";
import JoditEditor from "jodit-react";
import { Trash2Icon } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { toast } from "sonner";

const CreateCertificateType = ({
    certificateType,
}: {
    certificateType: CertificateType;
}) => {
    const editor = useRef(null);
    const { data, setData, errors, post, reset } = useForm<CustomField & { show_on_qr: boolean }>({
        label: "",
        type: "",
        default_value: "",
        show_on_qr: false,
    } as any);
    const [customField, setCustomField] = useState<CustomField>();
    const {
        data: certData,
        setData: setCert,
        put,
        errors: certErrors,
    } = useForm<CertificateType>({
        name: certificateType.name,
        layout: certificateType.layout,
        id: certificateType.id,
        created_at: certificateType.created_at,
        updated_at: certificateType.updated_at,
        custom_fields: certificateType.custom_fields,
    });

    const handleCustomFieldAdd = (e: FormEvent) => {
        e.preventDefault();
        const submitData = { ...data };
        if ((submitData as any).show_on_qr && !submitData.label.startsWith("QR_")) {
            submitData.label = "QR_" + submitData.label;
        }
        post(route("customFields.store", certificateType.id), {
            data: submitData,
            onSuccess: () => {
                toast.success("Custom Field Added");
                reset();
            },
        });
    };

    return (
        <Authenticated>
            <div className="space-y-4">
                <Card className="max-w-xl">
                    <CardHeader>
                        <CardTitle>Certificate Type</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                put(
                                    route(
                                        "certificate-types.update",
                                        certificateType.id
                                    ),
                                    {
                                        onSuccess: () => {
                                            toast.info("Updated");
                                        },
                                    }
                                );
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <Label>Name</Label>
                                <Input
                                    defaultValue={certData.name}
                                    onChange={(e) => {
                                        setCert("name", e.target.value);
                                    }}
                                />
                                <InputError message={certErrors.name} />
                            </div>
                            <div>
                                <Label>Layout</Label>
                                <Select
                                    defaultValue={certificateType.layout}
                                    onValueChange={(c) => {
                                        setCert("layout", c);
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a layout" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="letter">
                                            Letter
                                        </SelectItem>
                                        <SelectItem value="letter_WAH">
                                            WAH Letter
                                        </SelectItem>
                                        <SelectItem value="card">
                                            Card
                                        </SelectItem>
                                        <SelectItem value="card_noback">
                                            Card No Back
                                        </SelectItem>
                                        <SelectItem value="file_based">
                                            File Based (PDF Upload)
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={certErrors.layout} />
                            </div>
                            <div>
                                <Button size={"sm"}>Update</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Custom Fields</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Label</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Default Value</TableHead>
                                    <TableHead>QR</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {certificateType.custom_fields.map((cf) => {
                                    return (
                                        <TableRow>
                                            <TableCell>{cf.label}</TableCell>
                                            <TableCell>{cf.type}</TableCell>
                                            <TableCell>
                                                {cf.type == "custom"
                                                    ? "custom"
                                                    : cf.default_value}
                                            </TableCell>
                                            <TableCell>
                                                {cf.label.startsWith("QR_") && (
                                                    <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">QR</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    size={"sm"}
                                                    variant={"ghost"}
                                                    onClick={() => {
                                                        const res =
                                                            confirm(
                                                                "Are you sure?"
                                                            );
                                                        if (!res) {
                                                            return;
                                                        }
                                                        router.delete(
                                                            route(
                                                                "customFields.destroy",
                                                                [
                                                                    cf.certificate_type_id,
                                                                    cf.id,
                                                                ]
                                                            ),
                                                            {
                                                                onSuccess:
                                                                    () => {
                                                                        toast.warning(
                                                                            "Deleted"
                                                                        );
                                                                    },
                                                            }
                                                        );
                                                    }}
                                                >
                                                    <Trash2Icon className="size-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Add Custom Fields</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={handleCustomFieldAdd}
                            className="grid grid-cols-2 gap-4"
                        >
                            <div>
                                <Label>Label</Label>
                                <Input
                                    value={data.label}
                                    onChange={(e) => {
                                        setData("label", e.target.value);
                                    }}
                                />
                                <InputError message={errors.label} />
                            </div>
                            <div>
                                <Label>Type</Label>
                                <Select
                                    value={data.type}
                                    defaultValue={data.type}
                                    onValueChange={(val) => {
                                        setData("type", val);
                                    }}
                                >
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Select a type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="text">
                                            Text
                                        </SelectItem>
                                        <SelectItem value="date">
                                            Date
                                        </SelectItem>
                                        <SelectItem value="custom">
                                            Custom (Rich Text)
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.type} />
                            </div>
                            <div className="col-span-2">
                                <Label>Default Value</Label>
                                {data.type == "text" && (
                                    <Input
                                        defaultValue={data.default_value}
                                        value={data.default_value}
                                        onChange={(e) => {
                                            setData("default_value", e.target.value);
                                        }}
                                    />
                                )}
                                {data.type == "date" && (
                                    <Input
                                        type="date"
                                        defaultValue={data.default_value}
                                        value={data.default_value}
                                        onChange={(e) => {
                                            setData("default_value", e.target.value);
                                        }}
                                    />
                                )}
                                {data.type == "custom" && (
                                    <JoditEditor
                                        className="prose max-w-full"
                                        ref={editor}
                                        value={data.default_value}
                                        onBlur={(newContent) => {
                                            setData(
                                                "default_value",
                                                newContent
                                            );
                                        }}
                                        config={{
                                            style: {
                                                fontSize: "12px",
                                            },
                                        }}
                                        onChange={(newContent) => {}}
                                    />
                                )}
                                <InputError message={errors.default_value} />
                            </div>

                            <div className="col-span-2 flex items-center gap-2">
                                <Checkbox
                                    id="show_on_qr"
                                    checked={(data as any).show_on_qr}
                                    onCheckedChange={(checked) =>
                                        setData("show_on_qr" as any, !!checked)
                                    }
                                />
                                <Label htmlFor="show_on_qr" className="cursor-pointer">
                                    Show on QR verification page
                                </Label>
                            </div>
                            <div>
                                <Button>Add</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </Authenticated>
    );
};

export default CreateCertificateType;
