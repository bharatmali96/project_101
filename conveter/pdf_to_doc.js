const { PDFDocument } = require('pdf-lib');
const officegen = require('officegen');
const fs = require('fs');
const pdfParse = require('pdf-parse');

// Function to convert PDF buffer to Office document
async function convertBufferToOffice(inputBuffer, outputFilePath) {
  const pdfData = await pdfParse(inputBuffer);
  const pdfText = pdfData.text;

  const docx = officegen('docx');

  const paragraphOpts = {
    font_face: 'Arial',
    font_size: 12,
    align: 'left',
    space_before: 10,
    space_after: 10,
  };

  const pObj = docx.createP(paragraphOpts);
  pObj.addText(pdfText);

  const outputStream = fs.createWriteStream(outputFilePath);
  docx.generate(outputStream);
}

module.exports = convertBufferToOffice;
// // Example usage
// const inputBuffer = fs.readFileSync('input.pdf');
// const outputFilePath = 'output.docx';

// convertBufferToOffice(inputBuffer, outputFilePath);

