import InputError from "@/components/InputError";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const CreateCertificateType = () => {
    const { post, data, setData, processing, errors, reset } = useForm<{
        name: string;
        short_code: string;
        sequence: string;
    }>({
        name: "",
        short_code: "",
        sequence: "1",
    });

    const [text, setText] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route("companies.store"), {
            onSuccess: () => {
                toast.success("Company Created");
                reset();
            },
        });
    };

    return (
        <Authenticated>
            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle>Create Company</CardTitle>
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
                            <Label>Short Code</Label>
                            <Input
                                value={data.short_code}
                                onChange={(e) =>
                                    setData("short_code", e.target.value)
                                }
                            />
                            <InputError message={errors.short_code} />
                        </div>
                        <div>
                            <Label>Ref Sequence</Label>
                            <Input
                                value={data.sequence}
                                type="number"
                                onChange={(e) =>
                                    setData("sequence", e.target.value)
                                }
                            />
                            <InputError message={errors.sequence} />
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
