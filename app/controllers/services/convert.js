const ExcelJS = require('exceljs');

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
  }
}

module.exports = convert
