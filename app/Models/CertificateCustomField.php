<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CertificateCustomField extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function customField()
    {
        return $this->belongsTo(CustomField::class);
    }
}
