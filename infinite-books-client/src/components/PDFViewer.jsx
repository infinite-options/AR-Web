import React, { useState, useEffect } from "react";
import "./PDFViewer.css";

import { Document, Page } from "react-pdf";

// styles for the pdf elements and buttons are in PDFViewer.css
const styles = {
  outer: {
    textAlign: "center",
    display: "inline-block",
    marginTop: 35,
  },
  buttonGroup: {
    margin: 10,
  },
};

export default function PDFViewer(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const { pdf } = props;

  return (
    <>
      <div style={styles.outer}>
        <Document
          file={pdf}
          options={{ workerSrc: "./pdf.worker.js" }}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <div style={styles.buttonGroup}>
          <button
            style={styles.button}
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
            Previous
          </button>
          <button
            style={styles.button}
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
            Next
          </button>
          <p style={{ marginTop: 5, fontSize: 9 }}>
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </p>
        </div>
      </div>
    </>
  );
}
