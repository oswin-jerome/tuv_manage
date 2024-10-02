import InputError from "@/components/InputError";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { router, useForm } from "@inertiajs/react";
import { Trash2Icon } from "lucide-react";
import { FormEvent, useState } from "react";

const CreateCertificateType = () => {
    const { post, data, setData, processing, errors, reset } = useForm<{
        name: string;
        customFields: string[];
    }>({
        name: "",
        customFields: [],
    });

    const [text, setText] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        router.post(
            route("certificate-types.store"),
            {
                ...data,
                customFields: JSON.stringify(data.customFields),
            },
            {
                onSuccess: () => {
                    alert("Added");
                    reset();
                },
            }
        );
    };

    return (
        <Authenticated>
            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle>Create Certificate Type</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label>Name</Label>
                            <Input
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            <InputError message={errors.name} />
                        </div>
                        <Table>
                            <TableCaption>Custom fields</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Field Name</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data?.customFields?.map((field) => {
                                    return (
                                        <TableRow>
                                            <TableCell>{field}</TableCell>
                                            <TableCell>
                                                <Button
                                                    size={"sm"}
                                                    variant={"ghost"}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setData(
                                                            "customFields",
                                                            data.customFields.filter(
                                                                (v) =>
                                                                    v != field
                                                            )
                                                        );
                                                    }}
                                                >
                                                    <Trash2Icon className="size-4 text-slate-500" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                        <div className="flex gap-2 items-center">
                            <Input
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setData("customFields", [
                                        ...data.customFields,
                                        text,
                                    ]);
                                    setText("");
                                }}
                                size={"sm"}
                            >
                                Add
                            </Button>
                        </div>
                        <div>
                            <Button disabled={processing}>Create</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </Authenticated>
    );
};

export default CreateCertificateType;
