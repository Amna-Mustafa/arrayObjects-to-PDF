const express = require('express')
const app = express()
const port = 5000
const path = require('path');
const fs = require('fs');
const htmlToPDF = require('html-pdf-node');
const { jsPDF } = require('jspdf');
require('jspdf-autotable');
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/gen-pdf', (req, res) => {
    try {
        //console.log('data', Array.isArray(req.body.table));
        let tableData = req.body.table.map(row => {
            return Object.values(row)
        });

        //console.log('table data', tableData);
        const doc = new jsPDF()
        doc.autoTable({
            head: [['Name', 'Age', 'Birthday']],
            body: tableData
        });
        let fileName = 'table-' + Date.now() + '.pdf';
        doc.save(fileName);

        return res.download(fileName);
    } catch (error) {

    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))