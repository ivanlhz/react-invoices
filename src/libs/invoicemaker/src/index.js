const LVMH_TYPE = 'lvmh';
const MGI_TYPE = 'mgi';

class InvoiceMaker {
  constructor(doc) {
    this._doc = doc;
  }

  rectWidth = 570;
  separatorX = 380;
  morinfoWidth = 400;
  footerContentX = 200;
  footerContentWidth = 200;

  getDoc = () => this._doc;

  calculatePositions = formType => {
    if (formType === 2) {
      this.rectWidth -= 100;
      this.separatorX -= 100;
      this.morinfoWidth -= 100;
      this.footerContentX += 200;
      this.footerContentWidth -= 10;
    }
  };

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

  pdfSetItems = (items, shipping, formModel) => {
    this.calculatePositions(formModel);
    let footerContentX = this.footerContentX;
    console.log(`EN ITEMS ${footerContentX}`);
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

    this._doc.text(parseFloat(importe).toFixed(2), footerContentX + 85, 625, {
      width: 95,
      align: 'right',
    });
    this._doc.text(parseFloat(shipping).toFixed(2), footerContentX + 85, 637, {
      width: 95,
      align: 'right',
    });
    this._doc.text(parseFloat(igic).toFixed(2), footerContentX + 85, 649, {
      width: 95,
      align: 'right',
    });
    this._doc.text(parseFloat(total).toFixed(2), footerContentX + 85, 672, {
      width: 95,
      align: 'right',
    });
  };

  pdfSetDocumentBody = params => {
    //this.calculatePositions(params.formModel);
    let rectWidth = this.rectWidth;
    let separatorX = this.separatorX;
    let morinfoWidth = this.morinfoWidth;
    let footerContentX = this.footerContentX;
    let footerContentWidth = this.footerContentWidth;
    console.log(`EN BODY ${footerContentX}`);

    this._doc.fontSize(10).text(`Nº Orden: ${params.numOrden}`, 490, 20);
    this._doc.fontSize(11).text('Cliente', 25, 207);
    this._doc.text(`:  ${params.customer.toLocaleUpperCase()}`, 100, 207, {
      width: 240,
    });
    this._doc.text('Dirección', 25, 236);
    if (params.formModel === 1) {
      this._doc.text(`:  TLF-${params.tlfno}`, 100, 236);
      this._doc.text(`:  DNI ${params.dni.toLocaleUpperCase()}`, 100, 248);
    } else {
      this._doc.text(`:  ${params.tlfno}`, 100, 236);
      this._doc.text(`:  ${params.dni.toLocaleUpperCase()}`, 100, 248);
    }
    this._doc.text('Plaza', 25, 262);
    this._doc.text(`:  ${params.location.toLocaleUpperCase()}`, 100, 262, {
      width: 240,
    });
    console.log(rectWidth);
    this._doc.rect(20, 200, rectWidth, 75); // Client data box
    this._doc.polygon([separatorX, 200], [separatorX, 275]); //Separator

    this._doc.text('Fecha de entrada', separatorX + 5, 207);
    this._doc.text(`:  ${params.entryDate}`, separatorX + 105, 207);
    this._doc.text('Presupuesto', separatorX + 5, 222);
    this._doc.text(`:  ${params.budget}`, separatorX + 105, 222);
    this._doc.text('Modelo', separatorX + 5, 236);
    this._doc.text(`:  ${params.model}`, separatorX + 105, 236);
    this._doc.text('Nº Caja', separatorX + 5, 248);
    this._doc.text(`:  ${params.box}`, separatorX + 105, 248);
    this._doc.text('Nº Control', separatorX + 5, 262);
    this._doc.text(`:  ${params.control}`, separatorX + 105, 262);

    if (params.formModel === 1) {
      this._doc.rect(20, 290, 570, 25); //Title
      this._doc.fontSize(12).text('DETALLE DE REPARACION - FORNITURA EMPLEADA', 23, 297);
    } else {
      this._doc.rect(20, 290, 470, 25); //Title
      this._doc.fontSize(12).text('DETALLE DE REPARACION - FORNITURA EMPLEADA', 23, 297);
      this._doc.rect(500, 290, 90, 25); //IMPORTE
      this._doc.fontSize(12).text('IMPORTES', 503, 297, { width: 90, align: 'center' });
      this._doc.fontSize(11).text(params.nconsecionario, 20, 637, { width: 100, align: 'center' });
      this._doc.rect(180, 620, 200, 25); // impRecPubl
      this._doc.fontSize(10).text('Imp. Rec. Público:', 185, 627, { width: 100, align: 'left' });
      this._doc.fontSize(10).text(params.impRecPubl, 185, 627, { width: 100, align: 'left' });
    }

    this._doc.polygon([20, 620], [590, 620]); // Footer Separator
    this._doc.fontSize(11).text('Nº Rep. Consecionario', 20, 625, { width: 195, align: 'left' });
    this._doc.polygon(
      [footerContentX, 620],
      [footerContentX, 690],
      [footerContentX + footerContentWidth, 690],
      [footerContentX + footerContentWidth, 620],
    ); //Footer content
    this._doc.text('Importe', footerContentX + 5, 625);
    this._doc.text('Gastos de envio', footerContentX + 5, 637);
    this._doc.text('I.G.I.C 7%', footerContentX + 5, 649);
    this._doc.moveDown();
    this._doc.text('TOTAL FACTURA');

    this._doc.rect(20, 700, morinfoWidth, 70); //Observaciones
    this._doc.text('Observaciones:', 23, 705);
    this._doc.text(params.moreInfo, 23, 717, { width: 390, align: 'justify' });

    this._doc.rect(morinfoWidth + 40, 700, 150, 35); //Fecha de entrega
    this._doc.text('Fecha de entrega', morinfoWidth + 43, 703, {
      width: 140,
      align: 'center',
    });
    this._doc.text(params.deliveryDate, morinfoWidth + 43, 717, {
      width: 140,
      align: 'center',
    });
    this._doc.stroke();
    this._doc.end();
  };
}

export { MGI_TYPE, LVMH_TYPE, InvoiceMaker };
