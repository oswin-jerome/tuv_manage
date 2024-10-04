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
            "customFields" => json_encode(["Authorized to operate: ", "custom_text"])
        ]);
        $certType2 =  CertificateType::create([
            "name" => "Work At Height",
            "customFields" => json_encode(["letter"])
        ]);
    }
}
