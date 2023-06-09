const path = require('path');
const fs = require('fs').promises;
const fss = require('fs');

const docxTopdf = require('../conveter/docx_to_pdf');

const conTopdfView = (req, res) => {
    res.render('./convertor/uploadConTopdf');
}

const mergepdfView = (req, res) => {
    res.render('./convertor/mergePdf');
}

const pdf2DocsView = (req, res) => {
    res.render('./convertor/uploadPdfTodoc');
}



// coveting wordTopdf
const conTopdf = async (req, res) => {
    const file = req.file.buffer;
    const ext = 'pdf'
    try {
        const pdffile = await docxTopdf(file, ext);
        req.session.filename = Date.now() + "pdffile.pdf"

        const outputPath = path.join(__dirname, `../resources/${req.session.filename}`);
        await fs.writeFile(outputPath, pdffile);

        res.render("./convertor/download")

    } catch (error) {
        console.log(error)
    }
}


// merge pdf files
const merge = require('../conveter/mergePdf2')

const mergepdf = async (req, res) => {
    const files = req.files;

    try {
        const mergefile = await merge(files);
        req.session.filename = Date.now() + "merge.pdf"

        const outputPath = path.join(__dirname, `../resources/${req.session.filename}`);
        await fs.writeFile(outputPath, mergefile);
        res.render("./convertor/download")

    } catch (error) {
        console.log(error)
    }
}

// pdf to word document
const pdfToDocs = require('../conveter/pdf_to_doc');
const { error } = require('console');
const pdf2Docs = async (req, res) => {
    const file = req.file.buffer;
    try {
        req.session.filename = Date.now() + "word.docx";
        const outputPath = path.join(__dirname, `../resources/${req.session.filename}`);

        await pdfToDocs(file, outputPath);
        res.render("./convertor/download");

    } catch (error) {
        console.log(error)
    }

}


// download result
const download = async (req, res) => {

    const filename = req.session.filename;
    const filepath = path.join(__dirname, `../resources/${filename}`)

    if (filename) {
        fss.stat(filepath, (err, stats) => {
            if (err) {
                res.redirect('/');
            } else {

                var stream = fss.createReadStream(filepath);
                if (path.extname(filename) == ".docx") {
                    // Set the appropriate headers for the Word file
                    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
                    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
                }
                stream.pipe(res)
                stream.on("end", async function () {
                    stream.destroy(); // makesure stream closed, not close if download aborted.
                    console.log('file conveted')
                    await deleteFile(filename);
                });
            }
        });

    }
    else {
        res.redirect('/')
    }

}

// deletFile after download
const deleteFile = async (filename) => {
    try {
        await fs.unlink(path.join(__dirname, `../resources/${filename}`));
        console.log('filedeleted');
        return;

    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    conTopdf,
    conTopdfView,
    download,
    mergepdfView,
    mergepdf,
    pdf2Docs,
    pdf2DocsView
}