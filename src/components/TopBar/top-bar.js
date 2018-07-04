import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import blobStream from 'blob-stream';
import PDFDocument from 'pdfkit';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class TopBar extends Component {
  state = {
    pdfUrl: '',
  };

  classes = this.props.classes;
  title = this.props.title;
  getDocument = this.props.getDocument;

  handleCreatePdf = () => {
    let doc = new PDFDocument({ margin: 10 });
    doc = this.getDocument(doc);
    const stream = doc.pipe(blobStream());

    stream.on('finish', () => {
      const blob = stream.toBlob('application/pdf');
      if (this.state.pdfUrl.length > 0) window.URL.revokeObjectURL(this.state.pdfUrl);
      const docUrl = window.URL.createObjectURL(blob);
      this.setState({ pdfUrl: docUrl });
    });
  };

  downLoadLink = () => {
    if (this.state.pdfUrl) {
      return (
        <Button href={this.state.pdfUrl} download="generado.pdf">
          Download
        </Button>
      );
    }
  };

  render = () => (
    <div className={this.classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" className={this.classes.flex}>
            {this.title}
          </Typography>
          <Button color="inherit" onClick={this.handleCreatePdf}>
            Crear PDF
          </Button>
          {this.downLoadLink()}
        </Toolbar>
      </AppBar>
    </div>
  );
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopBar);
