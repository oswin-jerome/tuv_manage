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
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const CreateCertificateType = () => {
    const { post, data, setData, processing, errors, reset } = useForm<{
        name: string;
        layout: string;
    }>({
        name: "",
        layout: "",
    });

    const [text, setText] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route("certificate-types.store"), {
            onSuccess: () => {
                toast.success("Certificate Type Created");
                reset();
            },
        });
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
                        <div>
                            <Label>Layout</Label>
                            <Select
                                value={data.layout}
                                defaultValue={data.layout}
                                onValueChange={(v) => setData("layout", v)}
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
                                    <SelectItem value="card">Card</SelectItem>
                                </SelectContent>
                            </Select>

                            <InputError message={errors.layout} />
                        </div>

                        <div>
                            <Button
                                isLoading={processing}
                                disabled={processing}
                            >
                                Create
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </Authenticated>
    );
};

export default CreateCertificateType;
