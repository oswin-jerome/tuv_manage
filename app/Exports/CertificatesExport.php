<?php

namespace App\Exports;

use App\Models\Certificate;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class CertificatesExport implements FromArray, WithHeadings
{
    protected $certificates;

    public function __construct($certificates)
    {
        $this->certificates = $certificates;
    }
    /**
     * @return \Illuminate\Support\Collection
     */
    public function array(): array
    {
        $data = [];
        foreach ($this->certificates as $certificate) {
            /** @var Certificate */
            $c = $certificate;
            array_push($data, [
                "Ref #" => $certificate->ref_no,
                "Name" => $certificate->certifier_name,
                "Company" => $c->company->name,
                "Certificate Type" => $c->certificateType->name,
                "Approval Status" => $c->approval_status,
                "Issued Date" => $c->issuedAt->format("D M Y"),
                "Expire Date" =>  $c->expireAt == null ? "" : $c->expireAt->format("D M Y"),
            ]);
        }
        return $data;
    }


    public function headings(): array
    {
        return [
            "Ref #",
            "Name",
            "Company",
            "Certificate Type",
            "Approval Status",
            "Issued Date",
            "Expire Date",
        ];
    }
}
