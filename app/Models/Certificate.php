<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    use HasFactory;
    protected $appends = array('isExpired');


    protected $guarded = [];

    public function certificateType()
    {
        return $this->belongsTo(CertificateType::class);
    }

    public function customFields()
    {
        return $this->hasMany(CertificateCustomField::class);
    }

    public function getIsExpiredAttribute()
    {
        return Carbon::parse($this->expireAt)->isBefore(Carbon::now());
    }
}
