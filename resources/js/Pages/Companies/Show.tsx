import InputError from "@/components/InputError";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Company } from "@/types";
import { useForm } from "@inertiajs/react";
import { FormEvent, useRef } from "react";
import { toast } from "sonner";

const CreateCertificateType = ({ company }: { company: Company }) => {
    const editor = useRef(null);
    const { data, setData, errors, put, reset } = useForm({
        name: company.name,
        short_code: company.short_code,
        sequence: company.sequence.toString(),
    });

    const handle = (e: FormEvent) => {
        e.preventDefault();

        put(route("companies.update", company.id), {
            onSuccess: () => {
                toast.info("Updated");
                // reset();
            },
        });
    };

    return (
        <Authenticated>
            <div className="space-y-4">
                <Card className="max-w-xl">
                    <CardHeader>
                        <CardTitle>Company</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={handle}>
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
                                <small className="text-muted-foreground">
                                    Changing it will not update old certificates
                                </small>
                                <InputError message={errors.short_code} />
                            </div>
                            <div>
                                <Label>Next Sequence</Label>
                                <Input
                                    value={data.sequence}
                                    onChange={(e) =>
                                        setData("sequence", e.target.value)
                                    }
                                />
                                <InputError message={errors.sequence} />
                            </div>
                            <div>
                                <Button>Update</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </Authenticated>
    );
};

export default CreateCertificateType;
