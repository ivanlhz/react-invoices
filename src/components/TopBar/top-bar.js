import React, { Component } from 'react';
import PropTypes from 'prop-types';
import blobStream from 'blob-stream';
import { saveAs } from 'file-saver';
import PDFDocument from 'pdfkit';
import './styles.scss';


class TopBar extends Component {
  handleCreatePdf = (e) => {
    e.preventDefault();
    const { getDocument } = this.props;
    let doc = new PDFDocument({ margin: 10 });
    doc = getDocument(doc);
    const stream = doc.pipe(blobStream());
    stream.on('finish', () => {
      const blob = stream.toBlob('application/pdf');
      saveAs(blob, 'invoice');
    });
  };

  recoverButton = () => {
    const { recoverData } = this.props;
    return (
      <button type="button" onClick={recoverData}>
        Recuperar
      </button>);
  }

  render = () => {
    const { title, recoverIsVisible } = this.props;
    return (
      <div className="header-bar">
        <h1>
          {title}
        </h1>
        <div className="header-bar-right">
          <ul>
            <li>
              { recoverIsVisible ? this.recoverButton() : undefined }
            </li>
            <li>
              <button type="button" onClick={this.handleCreatePdf}>
                Generar
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

TopBar.propTypes = {
  title: PropTypes.string.isRequired,
  getDocument: PropTypes.func.isRequired,
  recoverData: PropTypes.func.isRequired,
  recoverIsVisible: PropTypes.bool.isRequired,
};


export default TopBar;
