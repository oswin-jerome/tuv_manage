<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth as FacadesAuth;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Certificate extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia, SoftDeletes;
    protected $appends = array('isExpired', "editable", "canDelete");


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
    public function QrCustomFields()
    {
        return $this->hasMany(CertificateCustomField::class)->where("label", "like", "QR_%")->select("label", "value", "certificate_id");
    }

    public function getIsExpiredAttribute()
    {
        if ($this->expireAt == null) {
            return false;
        }

        return Carbon::parse($this->expireAt)->isBefore(Carbon::now());
    }

    public function getCanDeleteAttribute()
    {
        /** @var User */
        $user = FacadesAuth::user();
        if ($user == null) {
            return false;
        }
        $isAdmin = $user->hasRole("admin");
        if ($isAdmin) {
            return true;
        }

        if ($this->creator_id == $user->id && $this->approval_status == "pending") {
            return true;
        }


        return false;
    }

    public function getEditableAttribute()
    {
        /** @var User */
        $user = FacadesAuth::user();
        if ($user == null) {
            return false;
        }
        $isAdmin = $user->hasRole("admin");

        if ($this->creator_id != $user->id && !$isAdmin) {
            return "Certificate don't belong to you";
        }

        if ($this->approval_status != "pending" && Carbon::parse($this->issuedAt)->diffInDays(Carbon::now()) > 15) {

            return "Certificate is already approved/rejected";
        }

        if ($this->approval_status != "pending" && !$isAdmin) {
            return "Only Admin can edit certificates after approving";
        }
        return "ALLOWED";
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this
            ->addMediaConversion('thumb')
            ->fit(Fit::Crop, 350, 300)
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
