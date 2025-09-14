
/* 
 * PDFViewer component
 * 
 * Shows the document pdf in an iframe
 * Parameter is the file url
 * 
 */
export default function PDFViewer({ fileUrl }) {
  return (
    // Iframe object
    // src is the fileUrl
    // title is "PDF" for pdf documents
    // width sets the iframe to take up 100% of the container
    // height forces the iframe to 1100px, the size of the pdf document (from trial and error)
    // style sets a solid border with color hex #ccc
    <iframe
      src={fileUrl}
      title="PDF"
      width="100%"
      height="1100px"
      style={{ border: "1px solid #ccc" }}
    />
  );
}