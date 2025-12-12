export default function PdfViewer({ pdfUrl }: { pdfUrl: string }) {
  return (
    <div>
      {pdfUrl && <iframe src={pdfUrl + '#toolbar=0'} width="100%" height="90vh" className="h-[90vh] w-full" />}
    </div>
  );
}