<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CertificateType extends Model
{
    use HasFactory;
    protected $fillable = [
        "name",
        "customFields",
        "layout"
    ];

    protected $casts = [
        "customFields" => "json"
    ];

    public function customFields()
    {
        return $this->hasMany(CustomField::class, "certificate_type_id", "id");
    }
}
