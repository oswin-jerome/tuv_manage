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
            font-size: 26px;
        }

        #table2 {
            width: 100%;
            border-collapse: collapse;
        }

        #table2 td,
        #table2 th {
            border: 2px solid black;
            padding: 12px;
            text-align: left;
        }

        #table3 td,
        #table3 th {
            /* border: 1px solid black; */
            padding: 12px;
            text-align: left;
        }
    </style>
</head>

<body>
    <div style="padding:1em;">
        <table style="width:100%">
            <tbody>
                <tr>
                    <td>
                        <img src="logo.png" style="width: 200px" alt="">
                    </td>
                    <td>
                        <h1 style="text-align: right">{{ $certificate->certificateType->name }}</h1>
                    </td>

                </tr>
            </tbody>
        </table>
        <br><br>
        <table id="table2">
            <tbody>
                <tr>
                    <th>Name</th>
                    <td>{{ $certificate->certifier_name }}</td>
                    <td rowspan="5" colspan="2">
                        <img src="https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            style="object-fit: s;" height="200px" width="100%" alt="">
                    </td>
                </tr>
                <tr>
                    <th>Iqama</th>
                    <td>{{ $certificate->iqama }}</td>
                </tr>
                <tr>
                    <th>Company</th>
                    <td>{{ $certificate->company }}</td>
                </tr>
                <tr>
                    <th>Ref # / Job No.</th>
                    <td>{{ $certificate->ref_no }}</td>
                </tr>
                <tr>
                    <th>Witnessed By</th>
                    <td>{{ $certificate->witness }}</td>

                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th>Issued Date</th>
                    <td>{{ $certificate->issuedAt }}</td>
                    <th>Expire Date</th>
                    <td>{{ $certificate->expireAt }}</td>
                </tr>
            </tfoot>
        </table>
        <br>
        <table style="width: 100%">
            <tbody>
                <tr>
                    <td>
                        <p>operations@tuv-experts.com</p>
                        <p>www-tuv-experts.com</p>
                    </td>
                    <td>
                        <img src="foot.png" width="400px" alt="">
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
    <div class="page-break"> </div>
    <div style="padding:1em">
        <table style="width: 100%">
            <tr>
                <td>
                    <table id="table3" style="width: 100%">
                        <tbody>
                            <tr>
                                <th>Ref / Job No.</th>
                                <td>{{ $certificate->ref_no }}</td>
                            </tr>
                            <tr>
                                <th>Certification</th>
                                <td>{{ $certificate->certificateType->name }}</td>
                            </tr>
                            @foreach ($certificate->customFields as $item)
                                <tr>
                                    <th>{{ $item->key }}</th>
                                    <td>{{ $item->value }}</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>

                </td>
                <td>
                    <div>
                        <img src={{ 'http://api.qrserver.com/v1/create-qr-code/?size=500x500&data=' . $certificate->ref_no }}
                            width="200px" alt="">
                    </div>
                </td>
            </tr>
        </table>
        <br>
        <br>
        <p>The person is Certified for the job mentioned above, to verity this card Through
            E-Mails: operations@tuv-experts.com;</p>
        <br>
        <table style="width: 100%">
            <tr>
                <td><img src="logo.png" width="200px" alt=""></td>
                <td>
                    <p>TEL+966-565463773 & 0565461187</p>
                    <p>Email: operations@tuv-experts.com</p>
                    <p>Web : www-tuv-experts.com</p>
                </td>
            </tr>
        </table>
    </div>
</body>

</html>
