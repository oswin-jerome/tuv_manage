@inject('provider', 'App\Http\Services\RenderService')
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Certificate</title>
    <style>
        .page-break {
            page-break-after: always;
        }

        * {
            margin: 0;
            padding: 0;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 18px;
        }

        #table2 {
            width: 100%;
            border-collapse: collapse;
        }

        #table2 td,
        #table2 th {
            border: 2px solid rgb(151, 151, 151);
            padding: 10px;
            text-align: left;
        }

        #table3 td,
        #table3 th {
            /* border: 1px solid black; */
            padding: 10px;
            text-align: left;
        }

        .ctd h3 {
            color: #000;
            font-size: 1.7em;
        }

        .ctd p {
            color: #000;
            font-size: 2em;
        }

        .customTable {
            width: 100%;
        }

        .customTable table {
            width: 100%;
        }

        .customTable table td,
        .customTable table th {
            border: 2px solid #000;
            padding: 6px;
        }
    </style>
</head>

<body>

    <div style="padding: 2em">
        <img src="{{ public_path('logo.png') }}"
            style="position: fixed; top: 50%;
	 opacity: 0.2; right:50%; width: 60%; transform: translate(50%,-50%); object-fit: cover"
            alt="">
        <table style="width: 100%">
            <tr>
                <td style="width: 30%">
                    <img src="{{ public_path('logo.png') }}" style="width: 250px" alt="">
                </td>
                <td style="text-align: center;font-size: 2.3em">
                    <h1 style="text-align: center;font-size: 1em;color:#000">
                        {{ $certificate->certificate_name }}</h1>
                    <h2 style="margin-top: 10px;color:#000; font-size: 0.7em">Ref # : {{ $certificate->ref_no }}</h2>
                </td>
                <td>
                    <img src="{{ $certificate->image }}"
                        style="position: absolute;right: 1em;top:1em;border: 4px solid #000; object-fit: cover;"
                        height="200px" alt="">

                </td>
            </tr>
        </table>
        <table style="width: 100%; margin-top: 52px; font-size: 2em">
            <tr>
                <td class="ctd">
                    <h3>Name</h3>
                    <p>{{ $certificate->certifier_name }}</p>
                </td>
                <td class="ctd">
                    <h3>Iqama</h3>
                    <p>{{ $certificate->iqama }}</p>
                </td>
                <td class="ctd">
                    <h3>Valid Till</h3>
                    @if ($certificate->expireAt != null)
                        <p>{{ $certificate->expireAt->format('d / m / Y') }}</p>
                    @else
                        <p>Not Applicable</p>
                    @endif
                </td>
            </tr>
            <tr>
                <td style="padding: 16px;"></td>
            </tr>
            <tr>
                <td class="ctd">
                    <h3>Witnessed By</h3>
                    <p>{{ $certificate->witness }}</p>
                </td>
                <td class="ctd">
                    <h3>Project</h3>
                    <p>{{ $certificate->project }}</p>
                </td>
                <td class="ctd">
                    <h3>Issued At</h3>
                    <p>{{ $certificate->issuedAt->format('d / m / Y') }}</p>
                </td>


            </tr>
            <tr>
                <td style="padding: 16px;"></td>
            </tr>
            <tr>

                <td class="ctd">
                    <h3>Company</h3>
                    <p>{{ $certificate->company->name }}</p>
                </td>
            </tr>
        </table>
        <table
            style="position: absolute; bottom: 1em; left: 2em; right: 2em;width: 100%; transform: translate(0%,-100%)">
            <tr>
                <td style="width: 30%">
                    <p style="font-size: 1.2em;margin-bottom:2px; color: #000">operations@tuv-experts.com</p>
                    <p style="font-size: 1.2em;margin-bottom:2px; color: #000">www.tuv-experts.com</p>
                    {{-- <p style="font-size: 1em;margin-bottom:2px; color: #000">+966-565463773 | +966-565461187</p> --}}
                </td>
                <td>
                    <img style="height:100px" src="data:image/png;base64, {!! $qr !!}" alt="">
                    <p style="text-align: center; font-size: 16px">Scan to verify</p>
                </td>
                <td style="width: 60%">
                    <img src="foot2.jpg" style="" width="89%" alt="">
                </td>
            </tr>
        </table>
    </div>
    <div class="page-break"> </div>
    <div style="padding: 1em 2em;padding-bottom: 1em;">
        <img src="{{ public_path('logo.png') }}"
            style="position: fixed; top: 50%;
	 opacity: 0.2; right:50%; width: 60%; transform: translate(50%,-50%); object-fit: cover"
            alt="">

        <table style="width: 100%; margin-top: 0px;">
            <tr>
                <td>
                    <table style="width: 100%;">
                        @foreach ($certificate->customFields as $key => $item)
                            @if ($item->type != 'custom' && $key % 2 != 0)
                                <tr>
                                    <td class="ctd" style="padding: 0px 0px; text-align: left">
                                        <h3>{{ $item->label }}</h3>
                                        <p>{{ $item->value }}</p>
                                    </td>
                                </tr>
                            @endif
                        @endforeach
                    </table>
                </td>
                <td>
                    <table style="width: 100%">
                        @foreach ($certificate->customFields as $key => $item)
                            @if ($item->type != 'custom' && $key % 2 == 0)
                                <tr>
                                    <td class="ctd" style="padding: 0px 0px">
                                        <h3>{{ $item->label }}</h3>
                                        <p>{{ $item->value }}</p>
                                    </td>
                                </tr>
                            @endif
                        @endforeach
                    </table>
                </td>
            </tr>
        </table>
        @foreach ($certificate->customFields as $item)
            @if ($item->type == 'custom')
                <div class="customTable" style="margin-top: 15px; color:#000">{!! $provider::formatStringCertificate($item->value, $certificate) !!}</div>
            @endif
        @endforeach



    </div>

</body>

</html>
