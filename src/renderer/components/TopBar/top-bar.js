import React, { Component } from 'react';
import PropTypes from 'prop-types';
import blobStream from 'blob-stream';
import { saveAs } from 'file-saver';
import PDFDocument from 'pdfkit';
import './styles.scss';
import { Refresh } from '@material-ui/icons';


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
      <li>
        <button type="button" onClick={recoverData}>
          <Refresh />
        </button>
      </li>
    );
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
            { recoverIsVisible ? this.recoverButton() : undefined }
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
