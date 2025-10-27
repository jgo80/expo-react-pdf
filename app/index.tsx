import { Document, DocumentProps, Page, pdf, Text } from "@react-pdf/renderer";
import { ReactElement } from "react";
import { Button, View } from "react-native";

if (typeof global.Buffer === "undefined") {
  global.Buffer = require("buffer").Buffer;
}

const document = (
  <Document>
    <Page>
      <Text>Hello World</Text>
    </Page>
  </Document>
);

const pdfToBuffer = async (document: ReactElement<DocumentProps>) => {
  const stream = await pdf(document).toBuffer();
  const chunks: Buffer[] = [];
  return new Promise<Buffer>((resolve, reject) => {
    stream.on("data", (chunk: Buffer) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
};

const Experimental = () => {
  const handler = async () => {
    const buffer = await pdfToBuffer(document);
    const base64 = buffer.toString("base64");
    const dataUrl = `data:application/pdf;base64,${base64}`;
    console.log("PDF Data URL:", dataUrl);
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Button title="Generate PDF" onPress={handler} />
    </View>
  );
};

export default Experimental;
