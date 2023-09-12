import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import "./Userdash.css"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
 // Replace with your Cloudinary PDF URL
const cloudinaryPdfUrl = 'https://res.cloudinary.com/your-cloud-name/image/upload/your-pdf-file.pdf';

function DisplayPdf(url) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {setPageNumber(1)}, [url])

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="w-11/12 max-w-6xl m-auto p-4 bg-gray-300 relative pdfDiv">
      <Document
      file={url}
      onLoadSuccess={onDocumentLoadSuccess}
      className="pdf h-pdf overflow-scroll flex"
      >
        <Page pageNumber={pageNumber} width={document.querySelector(".pdfDiv")?.clientWidth * 0.9 ?? 100} />
      </Document>

      <div className='flex justify-between z-20'>
        <button disabled={pageNumber <= 1} onClick={() => setPageNumber(pageNumber - 1)} className='pdfbtn hover:cursor-pointer border-2 bg-black hover:opacity-80 active:opacity-100 text-white text-lg my-4 py-3 px-5'>Prev Page</button>
        <button disabled={pageNumber >= numPages} onClick={() => setPageNumber(pageNumber + 1)} className='pdfbtn hover:cursor-pointer border-2 bg-black hover:opacity-80 active:opacity-100 text-white text-lg my-4 py-3 px-5'>Next Page</button>
      </div>
    </div>
  );
}

export default DisplayPdf;
