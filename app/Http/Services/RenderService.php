<?php

namespace App\Http\Services;

use App\Models\Certificate;
use App\Models\CertificateCustomField;
use App\Models\CustomField;
use App\Models\User;

class RenderService
{

	public static function formatStringCertificate($string, Certificate $certificate)
	{

		$string = str_replace("{{REF_NO}}", $certificate->ref_no, $string);
		$string = str_replace("{{NAME}}", $certificate->certifier_name, $string);
		$string = str_replace("{{WITNESS}}", $certificate->witness, $string);
		$string = str_replace("{{IQAMA}}", $certificate->iqama, $string);
		$string = str_replace("{{COMPANY_NAME}}", $certificate->company->name, $string);
		if ($certificate->expireAt != null) {
			$string = str_replace("{{EXPIRE_AT}}", $certificate->expireAt->format('d / m / Y'), $string);
		} else {
			$string = str_replace("{{EXPIRE_AT}}", "Not Applicable", $string);
		}
		$string = str_replace("{{ISSUED_AT}}", $certificate->issuedAt->format('d / m / Y'), $string);

		foreach (
			$certificate->customFields as
			$cf
		) {
			/** @var CertificateCustomField */
			$certificateCustomField = $cf;
			$string = str_replace("{{CUSTOM_" . $certificateCustomField->label . "}}", $certificateCustomField->value, $string);
		}

		return $string;
	}
}
