export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    roles: Role[];
    phone: string;
    created_at: Date;
    updated_at: Date;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
        roles: string[];
    };
};

export interface Role {
    id: number;
    name: string;
    guard_name: string;
    created_at: Date;
    updated_at: Date;
}

export interface CertificateType {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    customFields: string;
}

export interface Certificate {
    id: number;
    certifier_name: string;
    iqama: string;
    company: string;
    ref_no: string;
    witness: string;
    issuedAt: Date;
    expireAt: Date;
    certificate_type_id: number;
    created_at: Date;
    updated_at: Date;
    certificate_type: CertificateType;
    isExpired: boolean;
    custom_fields: CustomField[];
    approval_status: "pending" | "approved" | "rejected";
}

export interface CustomField {
    id: number;
    key: string;
    value: string;
    certificate_id: number;
    created_at: Date;
    updated_at: Date;
}
