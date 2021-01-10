import React, { useState, useEffect } from "react";
import "./PDFViewer.css";
import { Document, Page } from "react-pdf";

// icons
import {
  FaAngleRight,
  FaAngleLeft,
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
} from "react-icons/fa";

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
  pageNumberInput: {
    width: 40,
    textAlign: "center",
    margin: 5,
    paddingTop: 5,
    height: 35,
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

    // sends numPages value down to ReaderDashboard
    props.pgNumCallback(pageNumber);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  function nextTenPages() {
    changePage(10);
  }

  function previousTenPages() {
    changePage(-10);
  }

  const handleChange = (e) => {
    const newPgNum = parseInt(e.target.value);
    setPageNumber(newPgNum);
    props.pgNumCallback(newPgNum);
  };

  useEffect(() => {
    // When the pageNumber changes, update the component and send the new value to readingpane.
    props.pgNumCallback(pageNumber);
  }, [pageNumber]);

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
          {/* Back 10 pages */}
          <button
            type="button"
            className="button-small"
            disabled={pageNumber <= 10}
            onClick={previousTenPages}
          >
            <FaAngleDoubleLeft size={20} />
          </button>
          {/* Back 1 page */}
          <button
            type="button"
            className="button-large"
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
            <FaAngleLeft size={20} />
          </button>
          <input
            style={styles.pageNumberInput}
            type="text"
            name="pageNumber"
            value={pageNumber}
            onChange={handleChange}
          />
          {/* Forward 1 page */}
          <button
            type="button"
            className="button-large"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
            <FaAngleRight size={20} />
          </button>
          {/* Forward 10 pages */}
          <button
            type="button"
            className="button-small"
            disabled={pageNumber > numPages - 10}
            onClick={nextTenPages}
          >
            <FaAngleDoubleRight size={20} />
          </button>
          <p style={{ marginTop: 5, fontSize: 9 }}>
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </p>
        </div>
      </div>
    </>
  );
}
