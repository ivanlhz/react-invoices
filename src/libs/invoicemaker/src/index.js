const LVMH_TYPE = 'lvmh';
const MGI_TYPE = 'mgi';

class InvoiceMaker {
  constructor(doc) {
    this._doc = doc;
  }

  getDoc = () => this._doc;

  pdfSetRjTictacInfo = () => {
    this._doc.fontSize(8).text('42.026.779-Y', 20, 90, { width: 195, align: 'center' });
    this._doc.text('C/SAN CLEMENTE, 8', 20, 105, {
      width: 195,
      align: 'center',
    });
    this._doc.text('38003 - SANTA CRUZ DE TENERIFE', 20, 120, {
      width: 195,
      align: 'center',
    });
    this._doc.text('922-24.23.85', 20, 135, { width: 195, align: 'center' });
    this._doc.text('Santa Cruz de Tenerife', 20, 150, {
      width: 195,
      align: 'center',
    });
    this._doc.text('Tenerife', 20, 165, { width: 195, align: 'center' });
  };

  pdfSetCompanyHeader = headerType => {
    if (headerType === LVMH_TYPE) {
      this._doc.fontSize(10);
      this._doc.text('LVMH RELOJERIA Y JOYERIA ESPAÑA', 20, 20, {
        width: 195,
        align: 'center',
      });
      this._doc.fontSize(8);
      this._doc.text('Servicio Técnico Oficial de Canarias', 20, 35, {
        width: 195,
        align: 'center',
      });
      this._doc.text('TAG-HEUER - ZENITH', 20, 50, {
        width: 195,
        align: 'center',
      });
      this._doc.text('CRISTIAN DIOR', 20, 65, { width: 195, align: 'center' });
    } else {
      this._doc.fontSize(12).text('MGI Luxury Group S.A', 20, 20, { width: 195, align: 'center' });
      this._doc.fontSize(10).text('EBEL', 20, 35, { width: 195, align: 'center' });
      this._doc.fontSize(6).text('Servicio Técnico Oficial Canarias', 20, 50, {
        width: 195,
        align: 'center',
      });
    }
  };
  pdfSetItems = (items, shipping) => {
    let line = 0;
    let importe = 0;
    //this._doc.font('Courier', 10);
    this._doc.fontSize(10);
    items.forEach(item => {
      if (item.amount > 0) {
        const amount = parseFloat(item.amount)
          .toFixed(2)
          .toString();
        this._doc.fontSize(12).text(amount, 23, 320 + line * 15);
        this._doc.text(item.name.toLocaleUpperCase(), 123, 320 + line * 15);
        this._doc.text(parseFloat(item.price.toString()).toFixed(2), 463, 320 + line * 15, {
          width: 100,
          align: 'right',
        });
        line += 1;
        importe += item.amount * item.price;
      }
    });
    let subtotal = parseFloat(importe) + parseFloat(shipping);
    let igic = parseFloat(importe) * 0.07;
    let total = igic + subtotal;

    this._doc.text(parseFloat(importe).toFixed(2), 300, 625, {
      width: 95,
      align: 'right',
    });
    this._doc.text(parseFloat(shipping).toFixed(2), 300, 637, {
      width: 95,
      align: 'right',
    });
    this._doc.text(parseFloat(igic).toFixed(2), 300, 649, {
      width: 95,
      align: 'right',
    });
    this._doc.text(parseFloat(total).toFixed(2), 300, 672, {
      width: 95,
      align: 'right',
    });
  };
  pdfSetDocumentBody = params => {
    this._doc.fontSize(10).text(`Nº Orden: ${params.numOrden}`, 490, 20);
    this._doc.rect(20, 200, 570, 75); // Client data box
    this._doc.fontSize(11).text('Cliente', 25, 207);
    this._doc.text(`:  ${params.customer.toLocaleUpperCase()}`, 100, 207, {
      width: 240,
    });
    this._doc.text('Dirección', 25, 236);
    this._doc.text(`:  TLF-${params.tlfno}`, 100, 236);
    this._doc.text(`:  DNI ${params.dni.toLocaleUpperCase()}`, 100, 248);
    this._doc.text('Plaza', 25, 262);
    this._doc.text(`:  ${params.location.toLocaleUpperCase()}`, 100, 262, {
      width: 240,
    });

    this._doc.polygon([380, 200], [380, 275]); //Separator
    this._doc.text('Fecha de entrada', 385, 207);
    this._doc.text(`:  ${params.entryDate}`, 500, 207);
    this._doc.text('Presupuesto', 385, 222);
    this._doc.text(`:  ${params.budget}`, 500, 222);
    this._doc.text('Modelo', 385, 236);
    this._doc.text(`:  ${params.model}`, 500, 236);
    this._doc.text('Nº Caja', 385, 248);
    this._doc.text(`:  ${params.box}`, 500, 248);
    this._doc.text('Nº Control', 385, 262);
    this._doc.text(`:  ${params.control}`, 500, 262);

    this._doc.rect(20, 290, 570, 25); //Title
    this._doc.fontSize(12).text('DETALLE DE REPARACION - FORNITURA EMPLEADA', 23, 297);

    this._doc.polygon([20, 620], [590, 620]); // Footer Separator
    this._doc.fontSize(11).text('Nº Rep. Consecionario', 20, 625, { width: 195, align: 'left' });
    this._doc.polygon([200, 620], [200, 690], [400, 690], [400, 620]); //Footer content
    this._doc.text('Importe', 205, 625);
    this._doc.text('Gastos de envio', 205, 637);
    this._doc.text('I.G.I.C 7%', 205, 649);
    this._doc.moveDown();
    this._doc.text('TOTAL FACTURA');

    this._doc.rect(20, 700, 400, 70); //Observaciones
    this._doc.text('Observaciones:', 23, 705);
    this._doc.text(params.moreInfo, 23, 717, { width: 390, align: 'justify' });

    this._doc.rect(440, 700, 150, 35); //Fecha de entrega
    this._doc.text('Fecha de entrega', 443, 703, {
      width: 140,
      align: 'center',
    });
    this._doc.text(params.deliveryDate, 443, 717, {
      width: 140,
      align: 'center',
    });
    this._doc.stroke();
    this._doc.end();
  };
}

export { MGI_TYPE, LVMH_TYPE, InvoiceMaker };
