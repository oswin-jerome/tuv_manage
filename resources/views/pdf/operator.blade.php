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
            color: #064463;
            font-size: 1.3em;
        }

        .ctd p {
            color: #064463;
            font-size: 1.5em;
        }

        .customTable {
            width: 100%;
        }

        .customTable table {
            width: 100%;
        }

        .customTable table td,
        .customTable table th {
            border: 2px solid #064463;
            padding: 6px;
        }
    </style>
</head>

<body>

    <div style="padding: 2em">
        <img src="{{ public_path('logo.png') }}"
            style="position: fixed; top: 50%;
	 opacity: 0.1; right:50%; width: 60%; transform: translate(50%,-50%); object-fit: cover"
            alt="">
        <table style="width: 100%">
            <tr>
                <td style="width: 30%">
                    <img src="{{ public_path('logo.png') }}" style="width: 200px" alt="">
                </td>
                <td style="text-align: center;font-size: 2.3em">
                    <h1 style="text-align: center;font-size: 1em;color:#E9071C">
                        {{ $certificate->certificate_name }}</h1>
                    <h2 style="margin-top: 10px;color:#064463">Ref # : {{ $certificate->ref_no }}</h2>
                </td>
                <td>
                    <img src="{{ $certificate->image }}"
                        style="position: absolute;right: 2em;border: 4px solid #064463; object-fit: cover"
                        height="150px" width="130px" alt="">
                </td>
            </tr>
        </table>
        <table style="width: 100%; margin-top: 62px; font-size: 2em">
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
                <td style="width: 40%">
                    <p style="font-size: 1em;margin-bottom:2px; color: #064463">operations@tuv-experts.com</p>
                    <p style="font-size: 1em;margin-bottom:2px; color: #064463">www.tuv-experts.com</p>
                    {{-- <p style="font-size: 1em;margin-bottom:2px; color: #064463">+966-565463773 | +966-565461187</p> --}}

                </td>
                <td style="width: 40%">
                    <img src="foot2.jpg" width="89%" alt="">
                </td>
            </tr>
        </table>
    </div>
    <div class="page-break"> </div>
    <div style="padding: 2em">
        <img src="{{ public_path('logo.png') }}"
            style="position: fixed; top: 50%;
	 opacity: 0.1; right:50%; width: 60%; transform: translate(50%,-50%); object-fit: cover"
            alt="">
        <img src="{{ public_path('logo.png') }}" style="width: 200px; position: absolute; top:2em; left:2em"
            alt="">
        <div style="width: 130px; position: absolute; top:2em; right:2em">
            <img style="width: 100%" src="data:image/png;base64, {!! $qr !!}" alt="">
            <p style="margin-top: 4px; text-align: center">Scan to verify</p>
        </div>

        <table style="width: 100%; margin-top: 120px">
            <tr>
                <td>
                    <table style="width: 100%">
                        @foreach ($certificate->customFields as $key => $item)
                            @if ($item->type != 'custom' && $key % 2 == 0)
                                <tr>
                                    <td class="ctd" style="padding: 10px 0px">
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
                            @if ($item->type != 'custom' && $key % 2 != 0)
                                <tr>
                                    <td class="ctd" style="padding: 10px 0px">
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
                <div class="customTable" style="margin-top: 30px; color:#064463">{!! $provider::formatStringCertificate($item->value, $certificate) !!}</div>
            @endif
        @endforeach



    </div>

</body>

</html>
