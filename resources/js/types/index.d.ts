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
    layout: string;
    created_at: Date;
    updated_at: Date;
    custom_fields: CustomField[];
}

export interface Certificate {
    id: number;
    certifier_name: string;
    certificate_name: string;
    iqama: string;
    company_id: string;
    project: string;
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
    image?: Media;
    company: Company;
}

export interface CustomFieldValue {
    id: number;
    key: string;
    value: string;
    certificate_id: number;
    created_at: Date;
    updated_at: Date;
}

export interface CustomField {
    id?: number;
    label: string;
    key?: string;
    type: string;
    default_value: string;
    value?: string;
    certificate_type_id?: number;
    created_at?: Date;
    updated_at?: Date;
    custom_field_id: number;
}

export interface Media {
    id: number;
    model_type: string;
    model_id: number;
    uuid: string;
    collection_name: string;
    name: string;
    file_name: string;
    mime_type: string;
    disk: string;
    conversions_disk: string;
    size: number;
    manipulations: any[];
    custom_properties: any[];
    generated_conversions: any[];
    responsive_images: any[];
    order_column: number;
    created_at: Date;
    updated_at: Date;
    original_url: string;
    preview_url: string;
}

export interface Paginate<D> {
    current_page: number;
    data: D[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: null;
    path: string;
    per_page: number;
    prev_page_url: null;
    to: number;
    total: number;
}

export interface Link {
    url: null | string;
    label: string;
    active: boolean;
}

export interface Company {
    id: number;
    name: string;
    short_code: string;
    sequence: number;
    created_at: Date;
    updated_at: Date;
    certificates?: Certificate[];
}
