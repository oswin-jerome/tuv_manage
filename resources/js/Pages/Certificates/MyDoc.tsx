import {
    Document,
    Image,
    Page,
    StyleSheet,
    Text,
    View,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#fff",
    },
    section: {
        margin: 10,
        padding: 10,
    },
});

// Create Document Component
export const MyDocument = () => (
    <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
            <View
                style={[
                    styles.section,
                    {
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    },
                ]}
            >
                <Image src={"/logo.png"} style={{ width: 100 }} />
                <View>
                    <Text style={{ fontSize: 48, fontWeight: "bold" }}>
                        Operator
                    </Text>
                </View>
            </View>
            <View></View>
        </Page>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Section #1</Text>
            </View>
        </Page>
    </Document>
);
