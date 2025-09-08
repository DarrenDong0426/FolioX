export default function PDFViewer({ fileUrl }) {
  return (
    <iframe
      src={fileUrl}
      title="PDF"
      width="100%"
      height="600px"
      style={{ border: "1px solid #ccc" }}
    />
  );
}