import React, { Component } from 'react';
import PropTypes from 'prop-types';
import blobStream from 'blob-stream';
import { saveAs } from 'file-saver';
import './styles.scss';


class TopBar extends Component {
  handleCreatePdf = (e) => {
    e.preventDefault();
    const { getDocument } = this.props;
    import('pdfkit'/* webpackChunkName: pdfkit */).then((pdfkit) => {
      const PDFDocument = pdfkit.default;
      let doc = new PDFDocument({ margin: 10 });
      doc = getDocument(doc);
      const stream = doc.pipe(blobStream());
      stream.on('finish', () => {
        const blob = stream.toBlob('application/pdf');
        saveAs(blob, 'invoice');
      });
    });
  };

  render = () => {
    const { title } = this.props;
    return (
      <div className="header-bar">
        <h1>
          {title}
        </h1>
        <div className="header-bar-right">
          <ul>
            <li>
              <buton onClick={this.handleCreatePdf}>
                Generar
              </buton>
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
};


export default TopBar;
