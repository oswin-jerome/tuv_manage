<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Doc</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        * {
            font-size: 20px;
        }

        .page-break {
            page-break-after: always;
        }
    </style>
    <!-- Scripts -->
</head>

<body class="font-sans antialiased">
    <div class="p-8 h-screen flex flex-col ">
        <div class="flex justify-between items-center">
            <img src="{{ public_path('logo.png') }}" class="h-28" alt="">
            <h1 class="font-bold text-4xl"> {{ $certificate->certificateType->name }}</h1>
        </div>
        <table class="mt-8 border-collapse border-2 border-slate-800 w-full ">
            <tbody>
                <tr>
                    <th class="border-2 border-slate-800 p-2 text-left">Name</th>
                    <td class="border-2 border-slate-800 p-2">{{ $certificate->certifier_name }}</td>
                    <td colspan="2" rowspan="5" class="">
                        <div class="flex justify-center items-center">

                            <img src="https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                class="w-44" alt="">
                        </div>
                    </td>
                </tr>
                <tr>
                    <th class="border-2 border-slate-800 p-2 text-left">Iqama</th>
                    <td class="border-2 border-slate-800 p-2">{{ $certificate->iqama }}</td>
                </tr>
                <tr>
                    <th class="border-2 border-slate-800 p-2 text-left">Company</th>
                    <td class="border-2 border-slate-800 p-2">{{ $certificate->company }}</td>
                </tr>
                <tr>
                    <th class="border-2 border-slate-800 p-2 text-left">Ref # / Job No.</th>
                    <td class="border-2 border-slate-800 p-2">{{ $certificate->ref_no }}</td>
                </tr>
                <tr>
                    <th class="border-2 border-slate-800 p-2 text-left">Witnessed By</th>
                    <td class="border-2 border-slate-800 p-2">{{ $certificate->witness }}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th class="border-2 border-slate-800 p-2 text-left">Issued Date</th>
                    <td class="border-2 border-slate-800 p-2 text-left">{{ $certificate->issuedAt }}</td>
                    <th class="border-2 border-slate-800 p-2 text-left">Expire Date</th>
                    <td class="border-2 border-slate-800 p-2 text-left">{{ $certificate->expireAt }}</td>
                </tr>
            </tfoot>
        </table>
        <div class="flex-1"></div>
        <div class="grid grid-cols-2 ">
            <div>
                <p>operations@tuv-experts.com</p>
                <p>www-tuv-experts.com</p>
            </div>
            <img src="{{ public_path('foot.png') }}" width="400px" alt="">

        </div>
    </div>
    <div class="page-break"></div>
    <div class="p-8 h-screen flex flex-col ">
        <section class="grid grid-cols-[2fr,1fr] gap-10">
            <table class="w-full">
                <tbody>
                    <tr>
                        <th class="text-left">Ref #</th>
                        <td class="text-left">{{ $certificate->ref_no }}</td>
                    </tr>
                    <tr>
                        <th class="text-left">Certification</th>
                        <td class="text-left">{{ $certificate->certificateType->name }}</td>
                    </tr>
                    @foreach ($certificate->customFields as $item)
                        <tr>
                            <th class="text-left">{{ $item->key }}</th>
                            <td class="text-left">{{ $item->value }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
            <img src={{ 'http://api.qrserver.com/v1/create-qr-code/?size=500x500&data=' . $certificate->ref_no }}
                width="200px" alt="" />
        </section>
        <div class="flex-1"></div>
        <p>The person is Certified for the job mentioned above, to verity this card Through
            E-Mails: operations@tuv-experts.com;</p>
        <br>
        <div class="flex justify-between">
            <div>
                <img src="{{ public_path('logo.png') }}" class="h-28" alt="">

            </div>
            <div>
                <p>TEL+966-565463773 & 0565461187</p>
                <p>Email: operations@tuv-experts.com</p>
                <p>Web : www-tuv-experts.com</p>
            </div>
        </div>
    </div>
</body>

</html>
