import React, { useState, useEffect } from "react";
import PDFViewer from "./PDFViewer";

const styles = {
  outer: {
    display: "flex",
    textAlign: "center",
    width: "55%",
    margin: "0 auto",
  },
  inputDiv: {
    padding: "10px",
    margin: "10px",
  },
};

export default function ReadingPane(props) {
  function doNothing() {
    //
  }

  const { pdf } = props;

  return (
    <>
      <div style={styles.outer}>
        <div style={styles.inputDiv}>
          <form>
            <label>Feedback</label>
            <textarea name="feedback" rows="20" cols="20" />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <PDFViewer pdf={pdf} />
      </div>
    </>
  );
}
