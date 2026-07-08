<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CertificateResource extends JsonResource
{
    public static $wrap = "";
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);
        $data['custom_fields'] = $this->customFields;
        $data['pdf_file'] = $this->getFirstMedia('pdf_file');
        $imageMedia = $this->getFirstMedia('image');
        $data['image'] = $imageMedia ? array_merge($imageMedia->toArray(), [
            'original_url' => route('certificates.image', $this->id),
        ]) : null;
        return $data;
    }
}
