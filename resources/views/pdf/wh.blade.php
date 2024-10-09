<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Doc</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    {{-- <script src="https://cdn.tailwindcss.com"></script> --}}
    <style>
        * {
            /* font-size: 20px; */
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
        }

        .page-break {
            page-break-after: always;
        }

        .customTable {
            width: 100%;
        }

        .customTable table {
            width: 100%;
        }

        .customTable table td,
        .customTable table th {
            border: 1px solid #064463;
            padding: 4px;
        }
    </style>
    <!-- Scripts -->
</head>

<body class="" style="padding: 2em">
    <table style="width: 100%">
        <thead>
            <tr>
                <td>
                    <img src="{{ public_path('logo.png') }}" width="150px" class="h-16" alt="">
                </td>
                <td>
                    <img src="{{ public_path('qr.png') }}" style="width: 100px; position: absolute; top:2em; right:2em"
                        alt="">
                </td>
            </tr>
        </thead>
    </table>
    <p style="margin-top: 40px; text-align: center; font-weight: bold">Certificate No. {{ $certificate->ref_no }}</p>
    <br>
    <p>Presented to,</p>
    <p style="font-weight: 700">{{ $certificate->certifier_name }}</p>
    <br>
    @foreach ($certificate->customFields as $item)
        @if ($item->type == 'custom')
            <div class="customTable">{!! $item->value !!}</div>
        @endif
    @endforeach
    <div style="position:fixed;bottom:1em;left:1em;right:1em">
        <table style="width: 100%;">
            <tbody>
                <tr>
                    <td>
                        <div class="text-sm" style="">
                            <p>TEL+966-565463773 & 0565461187</p>
                            <p>Email: operations@tuv-experts.com</p>
                            <p>Web : www-tuv-experts.com</p>
                        </div>
                    </td>
                    <td style="">
                        <img src="{{ public_path('logo.png') }}" width="150px" class="h-12" alt="">
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>

</html>
