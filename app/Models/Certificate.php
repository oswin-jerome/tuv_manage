<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Certificate extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia, SoftDeletes;
    protected $appends = array('isExpired');


    protected $guarded = [];
    protected $casts = [
        "expireAt" => "date",
        "issuedAt" => "date"
    ];

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
        if ($this->expireAt == null) {
            return false;
        }

        return Carbon::parse($this->expireAt)->isBefore(Carbon::now());
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this
            ->addMediaConversion('thumb')
            ->fit(Fit::Crop, 270, 300)
            ->nonQueued();
    }

    public function registerMediaCollections(): void
    {
        $this
            ->addMediaCollection('image')
            ->useDisk("local")
            ->singleFile()
        ;
    }

    public function company()
    {
        return $this->belongsTo(Company::class, "company_id", "id");
    }
}
