import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Certificate } from "@/types";
import { usePDF } from "react-to-pdf";

const Show = ({ certificate }: { certificate: Certificate }) => {
    const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

    return (
        <Authenticated>
            {/* <PDFViewer className="w-full h-screen">
                <MyDocument />
            </PDFViewer> */}
            <Card>
                <CardHeader>
                    <CardTitle>
                        {certificate.certifier_name} - {certificate.ref_no}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <iframe
                        className="w-full min-h-[600px]"
                        src={route("certificates.pdf", certificate.id)}
                    ></iframe>
                </CardContent>
            </Card>
        </Authenticated>
    );
};

export default Show;
