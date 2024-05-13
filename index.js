const app = require('express')();
const ExcelJS = require('exceljs');
const { v4: uuidv4 } = require('uuid');

async function readExcel() {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile('Eskitech.xlsx');
    const worksheet = workbook.getWorksheet(1);
    let rows = [];
    const titles = worksheet.getRow(1).values;
    worksheet.eachRow(row => {
        if (row.number === 1) return;
        let rowObject = {};
        row.eachCell((cell, colNumber) => {
            rowObject['id'] = uuidv4();
            rowObject[titles[colNumber]] = cell.value;
        });
        rows.push(rowObject);
    });
    return rows;
}

app.get('/products', async (req, res) => {
    try {
        const products = await readExcel();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ error: 'Något gick fel. Kunde inte hämta datan: ' + error.message });
    }
});

app.get('/products/:productName', async (req, res) => {
    try {
        const products = await readExcel();
        const product = products.find(p => p.produkt === req.params.productName);
        if (product) {
            res.json(product);
        }
        else {
            res.status(404).json({ error: 'Produkten hittades inte' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Något gick fel. Kunde inte hämta datan: ' + error.message });
    }
});

app.listen(
    8080,
    () => console.log('Server is running on http://localhost:8080')
)

