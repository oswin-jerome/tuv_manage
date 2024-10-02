import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Role } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    phone: z
        .string()
        .min(10, { message: "Phone number must be at least 10 digits." }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters." }),
    roles: z
        .array(z.string())
        .min(1, { message: "Please select at least one role." }),
});

export default function AddUser({ roles }: { roles: Role[] }) {
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            roles: [],
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);

        router.post(route("users.store"), values, {
            onSuccess: () => {
                alert("Success");
            },
            onError: (errors) => {
                Object.keys(errors).forEach((keu) => {
                    console.log(errors.phone);
                    form.setError(keu, { message: errors[keu] });
                });
            },
        });

        // form.reset();
        setSelectedRoles([]);
    }

    return (
        <Authenticated>
            <div className="container mx-auto">
                <Card className="">
                    <CardHeader>
                        <CardTitle>Add New User</CardTitle>
                        <CardDescription>
                            Enter the details of the new user below.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="gap-4 grid grid-cols-1"
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="John Doe"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="john@example.com"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="tel"
                                                        placeholder="123-456-7890"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="********"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="roles"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>Roles</FormLabel>
                                            <FormDescription>
                                                Select the roles for this user.
                                            </FormDescription>
                                            <div className="grid grid-cols-2 gap-2 mt-2">
                                                {roles.map((role) => (
                                                    <FormField
                                                        key={role.name}
                                                        control={form.control}
                                                        name="roles"
                                                        render={({ field }) => {
                                                            return (
                                                                <FormItem
                                                                    key={
                                                                        role.name
                                                                    }
                                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                                >
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={field.value?.includes(
                                                                                role.name
                                                                            )}
                                                                            onCheckedChange={(
                                                                                checked
                                                                            ) => {
                                                                                return checked
                                                                                    ? field.onChange(
                                                                                          [
                                                                                              ...field.value,
                                                                                              role.name,
                                                                                          ]
                                                                                      )
                                                                                    : field.onChange(
                                                                                          field.value?.filter(
                                                                                              (
                                                                                                  value
                                                                                              ) =>
                                                                                                  value !==
                                                                                                  role.name
                                                                                          )
                                                                                      );
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal">
                                                                        {
                                                                            role.name
                                                                        }
                                                                    </FormLabel>
                                                                </FormItem>
                                                            );
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div>
                                    <Button type="submit" className="mt-6">
                                        Add User
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </Authenticated>
    );
}
