import React, { Component } from 'react';
import PropTypes from 'prop-types';
import blobStream from 'blob-stream';
import PDFDocument from 'pdfkit';
import { saveAs } from 'file-saver';
import './styles.scss';


class TopBar extends Component {

  handleCreatePdf = (e) => {
    e.preventDefault();
    let doc = new PDFDocument({ margin: 10 });
    doc = this.props.getDocument(doc);
    const stream = doc.pipe(blobStream());

    stream.on('finish', () => {
      const blob = stream.toBlob('application/pdf');
      saveAs(blob, `invoice`);
    });
  };

  render = () => {
  const {title} = this.props;
  return (<div className="header-bar">
        <h1>{title}</h1>
        <div className="header-bar-right">
          <ul>
            <li>
              <a href="#" onClick={this.handleCreatePdf}>
                Generar Orden de Trabajo
              </a>
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
