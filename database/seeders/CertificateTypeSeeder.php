<?php

namespace Database\Seeders;

use App\Models\CertificateType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CertificateTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $certType =  CertificateType::create([
            "name" => "Operator",
            "layout" => "card"
        ]);

        $certType->customFields()->create([
            "label" => "Authorized to operate",
            "type" => "text",
            "default_value" => "Fork Lift"
        ]);

        $certType2 =  CertificateType::create([
            "name" => "Work At Height",
            "layout" => "card"

        ]);
    }
}
