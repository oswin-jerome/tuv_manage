<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JobOrder extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    protected $appends = ['job_order_code'];

    public function getJobOrderCodeAttribute(): string
    {
        $shortCode = $this->company?->short_code ?? 'JOB';
        return $shortCode . '-' . (1000 + $this->id);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to_id');
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function certificates()
    {
        return $this->hasMany(Certificate::class);
    }
}
