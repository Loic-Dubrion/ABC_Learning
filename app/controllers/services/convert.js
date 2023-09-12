const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');
const ExcelJS = require('exceljs');
const handlebars = require('handlebars');
const puppeteer = require('puppeteer');


const convert = {
  async jsonToExcel(data) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    const headers = ["sequence_id", "sequence_name", ...Object.keys(data[0].sessions[0])];
    worksheet.addRow(headers);

    for (let sequence of data) {
        for (let session of sequence.sessions) {
            const row = [
                sequence.sequence_id,
                sequence.sequence_name,
                ...Object.values(session)
            ];
            worksheet.addRow(row);
        }
    }

    const stream = new require('stream').PassThrough();
    await workbook.xlsx.write(stream);

    return stream;
  },

  async jsonToPdf(data) {
    // 1. Convertir le JSON en HTML avec Handlebars
    const templatePath = path.join(__dirname, 'template.hbs');
    const templateHtml = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateHtml);
    const html = template(data);

    // 2. Convertir l'HTML en PDF avec Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html, {
        waitUntil: 'networkidle0'
    });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true
  });

  await browser.close();

  const pdfStream = new Readable();
  pdfStream.push(pdfBuffer);
  pdfStream.push(null); // indique la fin du flux

  return pdfStream
  }
}

module.exports = convert
