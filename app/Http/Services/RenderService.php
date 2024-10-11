<?php

namespace App\Http\Services;

use App\Models\Certificate;

class RenderService
{

	public static function formatStringCertificate($string, Certificate $certificate)
	{

		$string = str_replace("{{REF_NO}}", $certificate->ref_no, $string);
		$string = str_replace("{{NAME}}", $certificate->certifier_name, $string);
		$string = str_replace("{{EXPIRE_AT}}", $certificate->expireAt, $string);
		$string = str_replace("{{ISSUED_AT}}", $certificate->issuedAt, $string);

		return $string;
	}
}