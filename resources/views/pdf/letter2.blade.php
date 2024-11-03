@inject('provider', 'App\Http\Services\RenderService')

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>PDF - {{ $certificate->ref_no }}</title>
    <style>
        * {

            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
        }

        p {
            font-size: 14px;
        }

        @page {
            margin: 100px 25px;
        }

        body {
            font-family: sans-serif;
            margin: 0.2cm 0;
            margin-bottom: 2.2cm;
            margin-top: 86px;
            text-align: justify;
        }


        #header,
        #footer {
            position: fixed;
            left: 0;
            right: 0;
            color: #aaa;
            font-size: 0.9em;
        }

        #header {
            top: 0;
            border-bottom: 0.1pt solid #aaa;
        }

        #footer {
            bottom: 0;
            border-top: 0.1pt solid #aaa;
        }

        #header table,
        #footer table {
            width: 100%;
            border-collapse: collapse;
            border: none;
        }

        #header td,
        #footer td {
            padding: 0;
            width: 50%;
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
            /* padding: 4px; */
        }

        .prose {
            /* General settings */
            color: #374151;
            /* max-width: 65ch; */
        }

        .prose h1 {
            font-size: 2.25rem;
            line-height: 1.2;
            margin-top: 0;
            margin-bottom: 1rem;
            font-weight: 800;
        }

        .prose h2 {
            font-size: 1.875rem;
            line-height: 1.3;
            margin-top: 2rem;
            margin-bottom: 1rem;
            font-weight: 700;
        }

        .prose h3 {
            font-size: 1.5rem;
            line-height: 1.4;
            margin-top: 1.5rem;
            margin-bottom: 1rem;
            font-weight: 600;
        }

        .prose h4 {
            font-size: 1.25rem;
            line-height: 1.5;
            margin-top: 1.25rem;
            margin-bottom: 0.75rem;
            font-weight: 600;
        }

        .prose p {
            margin-top: 1.25rem;
            margin-bottom: 1.25rem;
            line-height: 1.75;
        }

        .prose a {
            color: #3b82f6;
            text-decoration: underline;
            font-weight: 500;
        }

        .prose a:hover {
            color: #1d4ed8;
        }

        .prose blockquote {
            font-style: italic;
            color: #6b7280;
            border-left: 0.25rem solid #d1d5db;
            padding-left: 1rem;
            margin-top: 1.5rem;
            margin-bottom: 1.5rem;
        }

        .prose ul,
        .prose ol {
            margin-top: 1.25rem;
            margin-bottom: 1.25rem;
            padding-left: 1.25rem;
        }

        .prose li {
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
            line-height: 1.75;
        }

        .prose ol {
            list-style-type: decimal;
        }

        .prose ul {
            list-style-type: disc;
        }

        .prose code {
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
            background-color: #f3f4f6;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
        }

        .prose pre {
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
            background-color: #1f2937;
            color: #f3f4f6;
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
        }

        .prose img {
            margin-top: 2rem;
            margin-bottom: 2rem;
            border-radius: 0.375rem;
        }

        .prose table {
            width: 100%;
            /* margin-top: 1.25rem;
            margin-bottom: 1.25rem; */
            border-collapse: collapse;
        }

        .prose th {
            /* border-bottom: 2px solid #d1d5db; */
            padding: 6px;
            /* text-align: left;
            font-weight: 600; */
        }

        .prose td {
            padding: 6px;
        }

        .prose hr {
            border-top: 1px solid #e5e7eb;
            margin-top: 2rem;
            margin-bottom: 2rem;
        }

        table {
            /* page-break-before: always;
            page-break-after: always; */
            /* page-break-inside: auto; */
        }
    </style>
    <!-- Scripts -->
</head>

<body class="" style="padding: 2em">
    <img src="{{ public_path('logo.png') }}"
        style="position: fixed; opacity: 0.05; top:50%;right:50% ; transform: translate(50%,-50%)" alt="">

    {{-- QR AND IMAGE --}}
    <div style="width: 215px; top:5px; right:0em; position: absolute;">
        <table>
            <tr>
                @if ($certificate->image)
                    <td style="width: 80px"><img style="width: 80px;border: 4px solid #064463;margin-right:8px;"
                            src="{{ $certificate->image }}" alt="">
                    </td>
                @else
                    <td style="width: 80px;"></td>
                @endif
                <td><img style="width: 80px" src="data:image/png;base64, {!! $qr !!}" alt="">
                    <p style="margin-top: 4px; text-align: center">Scan to verify</p>
                </td>
            </tr>
        </table>
    </div>
    {{-- HEader --}}
    <div style="position: fixed;left:0;right:0;top:0; height: 120px; padding: 10px 1em; ">
        <table style="width: 100%;">
            <thead>
                <tr>
                    <td style="width: 50%; padding:20px">
                        <img src="{{ public_path('logo.png') }}" width="120px" class="h-16" alt="">
                    </td>
                </tr>
            </thead>
        </table>
        <hr style="margin-top: 00px; color:#e9071ece" />
    </div>
    {{-- Footer --}}
    <div style="position:fixed;bottom:0.8em;left:1em;right:1em;padding-top: 4px; font-size: 12px">
        <hr style="margin-bottom: 10px; color:#e9071ece" />

        <table style="width: 100%;">
            <tbody>
                <tr>
                    <td style="width: 50%">
                        <div class="text-sm">
                            <h1 style="margin-bottom: 8px;color:#064463"><span>TUV</span> Experts</h1>
                            <p style="font-size: 12px">CR #: 1009060888</p>
                            <p style="font-size: 12px">Email: operations@tuv-experts.com | info@tuv-experts.com </p>
                            <p style="font-size: 12px">Web : www.tuv-experts.com</p>
                        </div>
                    </td>
                    <td style="width: 50%">
                        <img style=" margin:auto;position: relative;width: 100%;" src="{{ public_path('foot2.jpg') }}"
                            class="h-12" alt="">
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div style="">
        @foreach ($certificate->customFields as $item)
            @if ($item->type == 'custom')
                <div class="customTable prose">{!! $provider::formatStringCertificate($item->value, $certificate) !!}</div>
            @endif
        @endforeach
    </div>

</body>

</html>
