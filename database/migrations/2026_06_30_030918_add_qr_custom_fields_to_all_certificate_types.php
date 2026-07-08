<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $typeIds = DB::table('certificate_types')->pluck('id');

        $qrFields = [
            ['label' => 'QR_Equipment_Description', 'type' => 'text', 'default_value' => ''],
            ['label' => 'QR_Serial_Number',         'type' => 'text', 'default_value' => ''],
            ['label' => 'QR_Asset_Number',           'type' => 'text', 'default_value' => ''],
            ['label' => 'QR_Capacity_SWL',           'type' => 'text', 'default_value' => ''],
            ['label' => 'QR_Inspection_Standard',    'type' => 'text', 'default_value' => ''],
            ['label' => 'QR_Inspection_Date',        'type' => 'date', 'default_value' => ''],
            ['label' => 'QR_Next_Due_Date',          'type' => 'date', 'default_value' => ''],
        ];

        $now = now();
        $rows = [];

        foreach ($typeIds as $typeId) {
            foreach ($qrFields as $field) {
                $exists = DB::table('custom_fields')
                    ->where('certificate_type_id', $typeId)
                    ->where('label', $field['label'])
                    ->exists();

                if (!$exists) {
                    $rows[] = [
                        'label'               => $field['label'],
                        'type'                => $field['type'],
                        'default_value'       => $field['default_value'],
                        'certificate_type_id' => $typeId,
                        'created_at'          => $now,
                        'updated_at'          => $now,
                    ];
                }
            }
        }

        if (!empty($rows)) {
            DB::table('custom_fields')->insert($rows);
        }
    }

    public function down(): void
    {
        DB::table('custom_fields')->where('label', 'like', 'QR_%')->delete();
    }
};
