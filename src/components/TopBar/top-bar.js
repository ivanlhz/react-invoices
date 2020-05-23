import React, { Component } from 'react';
import PropTypes from 'prop-types';
import blobStream from 'blob-stream';
import { saveAs } from 'file-saver';
import PDFDocument from 'pdfkit';
import './styles.scss';
import { Refresh } from '@material-ui/icons';


function TopBar ({ title, recoverIsVisible, getDocument, recoverData }) {
  function handleCreatePdf(e) {
    e.preventDefault();
    let doc = new PDFDocument({ margin: 10 });
    doc = getDocument(doc);
    const stream = doc.pipe(blobStream());
    stream.on('finish', () => {
      const blob = stream.toBlob('application/pdf');
      saveAs(blob, 'invoice');
    });
  };

  function recoverButton() {
    return (
      <button type="button" onClick={recoverData}>
        <Refresh />
      </button>);
  }
  return (
    <div className="header-bar">
      <h1>
        {title}
      </h1>
      <div className="header-bar-right">
        <ul>
          <li>
            { recoverIsVisible && recoverButton() }
          </li>
          <li>
            <button type="button" onClick={handleCreatePdf}>
              Generar
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

TopBar.propTypes = {
  title: PropTypes.string.isRequired,
  getDocument: PropTypes.func.isRequired,
  recoverData: PropTypes.func.isRequired,
  recoverIsVisible: PropTypes.bool.isRequired,
};


export default TopBar;
