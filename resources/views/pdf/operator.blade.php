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
    </style>
</head>

<body>
    <div style="padding: 2em">
        <img src="{{ public_path('logo.png') }}"
            style="position: absolute; top: 0;
		bottom: 0;left:0; opacity: 0.05; height: 100%; right:0; width: 100%; object-fit: cover"
            alt="">
        <table style="width: 100%">
            <tr>
                <td>
                    <img src="{{ public_path('logo.png') }}" style="width: 200px" alt="">
                </td>
                <td style="text-align: center;font-size: 2.3em">
                    <h1 style="text-align: center;font-size: 1em;color:#E9071C">
                        {{ $certificate->certificate_name }}</h1>
                    <h2 style="margin-top: 10px;color:#064463">Ref # : {{ $certificate->ref_no }}</h2>
                </td>
                <td>
                    <img src="https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        style="position: absolute;right: 2em;border: 4px solid #064463;" height="150px" width="130px"
                        alt="">
                </td>
            </tr>
        </table>
        <table style="width: 100%; margin-top: 82px; font-size: 2em">
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
                    <p>{{ $certificate->expireAt }}</p>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px;"></td>
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
                    <h3>Expires At</h3>
                    <p>{{ $certificate->expireAt }}</p>
                </td>


            </tr>
            <tr>
                <td style="padding: 20px;"></td>
            </tr>
            <tr>
                <td class="ctd">
                    <h3>Company</h3>
                    <p>{{ $certificate->company }}</p>
                </td>
            </tr>
        </table>
        <table style="width: 100%;margin-top: 20px">
            <tr>
                <td>
                    <p style="font-size: 1.3em;color: #064463">operations@tuv-experts.com</p>
                    <p style="font-size: 1.3em;color: #064463">www-tuv-experts.com</p>
                </td>
                <td>
                    <img src="foot.png" width="400px" alt="">
                </td>
            </tr>
        </table>
    </div>
    <div class="page-break"> </div>
    <div style="padding: 2em">
        <img src="{{ public_path('logo.png') }}"
            style="position: absolute; top: 0;
		bottom: 0;left:0; opacity: 0.05; height: 100%; right:0; width: 100%; object-fit: cover"
            alt="">
        <img src="{{ public_path('logo.png') }}" style="width: 200px; position: absolute; top:2em; left:2em"
            alt="">
        <img src="{{ public_path('qr.png') }}" style="width: 200px; position: absolute; top:2em; right:2em"
            alt="">

        <table style="width: 60%; margin-top: 120px">
            <tr>
                <td class="ctd">
                    <h3>Certification</h3>
                    <p>{{ $certificate->certificate_name }}</p>
                </td>
            </tr>
            <tr>
                <td style="padding: 10px;"></td>
            </tr>
            {{-- @foreach ($certificate->customFields as $item)
                @if (!str_contains($item->key, 'custom'))
                    <tr>
                        <td class="ctd">
                            <h3>{{ $item->key }}</h3>
                            <p>{{ $item->value }}</p>
                        </td>
                    </tr>
                @endif
            @endforeach --}}

        </table>
        <table style="width: 100%">
            <tr>
                <td>
                    <table style="width: 100%">
                        @foreach ($certificate->customFields as $key => $item)
                            @if (!str_contains($item->key, 'custom') && $key % 2 == 0)
                                <tr>
                                    <td class="ctd" style="padding: 10px 0px">
                                        <h3>{{ $item->key }}</h3>
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
                            @if (!str_contains($item->key, 'custom') && $key % 2 != 0)
                                <tr>
                                    <td class="ctd" style="padding: 10px 0px">
                                        <h3>{{ $item->key }}</h3>
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
            @if (str_contains($item->key, 'custom'))
                <p style="margin-top: 30px; color:#064463">{{ $item->value }}</p>
            @endif
        @endforeach
        <p style="margin-top: 30px; color:#064463">The person is Certified for the job mentioned above, to verity this
            card Through E-Mails: operations@tuv-experts.com;</p>


    </div>

</body>

</html>
