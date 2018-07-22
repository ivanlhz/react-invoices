import { TYPE_RESELLER, TYPE_PVP } from '../../../constats/form-types';

const LVMH_TYPE = 'lvmh';
const MGI_TYPE = 'mgi';

class InvoiceMaker {
  constructor(doc) {
    this.document = doc;
    this.rectWidth = 570;
    this.separatorX = 380;
    this.morinfoWidth = 400;
    this.footerContentX = 200;
    this.footerContentWidth = 200;
  }

  getDoc = () => this.document;

  calculatePositions = (formType) => {
    if (formType.indexOf(TYPE_RESELLER) !== -1) {
      this.rectWidth -= 100;
      this.separatorX -= 100;
      this.morinfoWidth -= 100;
      this.footerContentX += 200;
      this.footerContentWidth -= 10;
    }
  };

  pdfSetRjTictacInfo = () => {
    this.document.fontSize(8).text('42.026.779-Y', 20, 90, { width: 195, align: 'center' });
    this.document.text('C/SAN CLEMENTE, 8', 20, 105, {
      width: 195,
      align: 'center',
    });
    this.document.text('38003 - SANTA CRUZ DE TENERIFE', 20, 120, {
      width: 195,
      align: 'center',
    });
    this.document.text('922-24.23.85', 20, 135, { width: 195, align: 'center' });
    this.document.text('Santa Cruz de Tenerife', 20, 150, {
      width: 195,
      align: 'center',
    });
    this.document.text('Tenerife', 20, 165, { width: 195, align: 'center' });
  };

  pdfSetCompanyHeader = (headerType) => {
    if (headerType === LVMH_TYPE) {
      this.document.fontSize(10);
      this.document.text('LVMH RELOJERIA Y JOYERIA ESPAÑA', 20, 20, {
        width: 195,
        align: 'center',
      });
      this.document.fontSize(8);
      this.document.text('Servicio Técnico Oficial de Canarias', 20, 35, {
        width: 195,
        align: 'center',
      });
      this.document.text('TAG-HEUER - ZENITH', 20, 50, {
        width: 195,
        align: 'center',
      });
      this.document.text('CRISTIAN DIOR', 20, 65, { width: 195, align: 'center' });
    } else {
      this.document.fontSize(12).text('MGI Luxury Group S.A', 20, 20, { width: 195, align: 'center' });
      this.document.fontSize(10).text('EBEL', 20, 35, { width: 195, align: 'center' });
      this.document.fontSize(6).text('Servicio Técnico Oficial Canarias', 20, 50, {
        width: 195,
        align: 'center',
      });
    }
  };

  pdfSetItems = (items, shipping, formModel) => {
    this.calculatePositions(formModel);
    const footerxPotition = this.footerContentX;
    let line = 0;
    let importe = 0;
    this.document.fontSize(10);
    items.forEach((item) => {
      if (item.amount > 0) {
        const amount = parseFloat(item.amount)
          .toFixed(2)
          .toString();
        this.document.fontSize(12).text(amount, 23, 320 + line * 15);
        this.document.text(item.name.toLocaleUpperCase(), 123, 320 + line * 15);
        this.document.text(parseFloat(item.price.toString()).toFixed(2), 463, 320 + line * 15, {
          width: 100,
          align: 'right',
        });
        line += 1;
        importe += item.amount * item.price;
      }
    });
    const subtotal = parseFloat(importe) + parseFloat(shipping);
    const igic = parseFloat(importe) * 0.07;
    const total = igic + subtotal;

    this.document.text(parseFloat(importe).toFixed(2), footerxPotition + 85, 625, {
      width: 95,
      align: 'right',
    });
    this.document.text(parseFloat(shipping).toFixed(2), footerxPotition + 85, 637, {
      width: 95,
      align: 'right',
    });
    this.document.text(parseFloat(igic).toFixed(2), footerxPotition + 85, 649, {
      width: 95,
      align: 'right',
    });
    this.document.text(parseFloat(total).toFixed(2), footerxPotition + 85, 672, {
      width: 95,
      align: 'right',
    });
  };

  pdfSetDocumentBody = (params) => {
    const width = this.rectWidth;
    const separator = this.separatorX;
    const morinfoW = this.morinfoWidth;
    const footerX = this.footerContentX;
    const footerW = this.footerContentWidth;

    this.document.fontSize(10).text(`Nº Orden: ${params.numOrden}`, 490, 20);
    this.document.fontSize(11).text('Cliente', 25, 207);
    this.document.text(`:  ${params.customer.toLocaleUpperCase()}`, 100, 207, {
      width: 240,
    });
    this.document.text('Dirección', 25, 236);
    if (params.formModel === 1) {
      this.document.text(`:  TLF-${params.tlfno}`, 100, 236);
      this.document.text(`:  DNI ${params.dni.toLocaleUpperCase()}`, 100, 248);
    } else {
      this.document.text(`:  ${params.tlfno}`, 100, 236);
      this.document.text(`:  ${params.dni.toLocaleUpperCase()}`, 100, 248);
    }
    this.document.text('Plaza', 25, 262);
    this.document.text(`:  ${params.location.toLocaleUpperCase()}`, 100, 262, {
      width: 240,
    });

    this.document.rect(20, 200, width / 2, 75); // Client data box
    this.document.rect(width / 2 + 20, 200, width / 2, 75); // Client data box
    this.document.text('Fecha de entrada', separator + 5, 207);
    this.document.text(`:  ${params.entryDate}`, separator + 105, 207);
    this.document.text('Presupuesto', separator + 5, 222);
    this.document.text(`:  ${params.budget}`, separator + 105, 222);
    this.document.text('Modelo', separator + 5, 236);
    this.document.text(`:  ${params.model}`, separator + 105, 236);
    this.document.text('Nº Caja', separator + 5, 248);
    this.document.text(`:  ${params.box}`, separator + 105, 248);
    this.document.text('Nº Control', separator + 5, 262);
    this.document.text(`:  ${params.control}`, separator + 105, 262);

    if (params.formType.indexOf(TYPE_PVP) !== -1) {
      this.document.rect(20, 290, 570, 25); // Title
      this.document.fontSize(12).text('DETALLE DE REPARACION - FORNITURA EMPLEADA', 23, 297);
      this.document.polygon(
        [footerX, 620],
        [footerX, 690],
        [footerX + footerW, 690],
        [footerX + footerW, 620],
        [20, 620],
        [590, 620],
      );
    } else {
      this.document.rect(20, 290, 470, 25); // Title
      this.document.fontSize(12).text('DETALLE DE REPARACION - FORNITURA EMPLEADA', 23, 297);
      this.document.rect(500, 290, 90, 25); // IMPORTE
      this.document.fontSize(12).text('IMPORTES', 503, 297, { width: 90, align: 'center' });
      this.document.fontSize(11).text(params.nconsecionario, 20, 637, { width: 100, align: 'center' });
      this.document.rect(180, 620, 200, 25); // impRecPubl
      this.document.fontSize(10).text('Imp. Rec. Público:', 185, 627, { width: 100, align: 'left' });
      this.document.fontSize(10).text(params.impRecPubl, 270, 627, { width: 100, align: 'left' });
      this.document.polygon(
        [footerX, 620],
        [footerX, 690],
        [footerX + footerW, 690],
        [footerX + footerW, 620],
        [20, 620],
        [590, 620],
      );
    }

    // Footer Separator
    this.document.fontSize(11).text('Nº Rep. Consecionario', 20, 625, { width: 195, align: 'left' });
    // Footer content
    this.document.text('Importe', footerX + 5, 625);
    this.document.text('Gastos de envio', footerX + 5, 637);
    this.document.text('I.G.I.C 7%', footerX + 5, 649);
    this.document.moveDown();
    this.document.text('TOTAL FACTURA');

    this.document.rect(20, 700, morinfoW, 70); // Observaciones
    this.document.text('Observaciones:', 23, 705);
    this.document.text(params.moreInfo, 23, 717, { width: 390, align: 'justify' });

    this.document.rect(morinfoW + 40, 700, 150, 35); // Fecha de entrega
    this.document.text('Fecha de entrega', morinfoW + 43, 703, {
      width: 140,
      align: 'center',
    });
    this.document.text(params.deliveryDate, morinfoW + 43, 717, {
      width: 140,
      align: 'center',
    });
    this.document.stroke();
    this.document.end();
  };
}

export { MGI_TYPE, LVMH_TYPE, InvoiceMaker };
