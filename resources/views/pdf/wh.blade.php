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

<body class="font-sans antialiased flex flex-col justify-between h-screen">
    <div class="p-8 flex flex-col flex-1 ">
        <div class="flex justify-between items-center">
            <img src="{{ public_path('logo.png') }}" width="100px" class="h-16" alt="">
        </div>
        <h1 class="font-bold mt-8">Certificate No.: {{ $certificate->ref_no }}</h1>
        <div class="mt-4">
            <p>Presented to,</p>
            <p class="font-semibold">{{ $certificate->certifier_name }}</p>
            <p class="mt-2 text-justify text-sm leading-loose">{{ $certificate->customFields()->first()->value }}</p>
        </div>
    </div>
    <div class="flex justify-between p-8">
        <div>
            <img src="{{ public_path('logo.png') }}" width="100px" class="h-12" alt="">

        </div>
        <div class="text-sm">
            <p>TEL+966-565463773 & 0565461187</p>
            <p>Email: operations@tuv-experts.com</p>
            <p>Web : www-tuv-experts.com</p>
        </div>
    </div>
</body>

</html>
