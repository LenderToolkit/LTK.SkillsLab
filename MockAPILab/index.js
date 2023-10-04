const express = require('express');
const app = express();
const port = 8082;
const isLocal = true;
const loanObjects = require('./loanObjects.json');
const router = express.Router();
const fs = require('fs');
const dataPath = './loanObjects.json';

app.use(express.json())
router.use(express.json());

const loanData = []
const saveLoanData = (loanData) => {
//	fs.writeFileSync(dataPath, JSON.stringify(loanData));
    loanData.push(loanData)
}

const getLoanData = () => {
    return loanData
}
app.get('/', (req, res) => {
    const loanData = getLoanData();

    res.json(loanData);
});

app.get("/ping", (req, res) => {
    res.json({
        message: "🏓",
    });
});

const isValidLoan = (loan) => {
    return typeof loan === "object" && loan !== null && loan.borrowers.length >= 0;
}
app.post("/addLoan", (req, res) => {
    console.log({reqBody: req.body,})
    const existingLoans = getLoanData();
    const newLoanId = Math.floor(100000 + Math.random() * 900000)
    req.body.id = newLoanId;
    existingLoans[newLoanId] = req.body

    saveLoanData(existingLoans);
    res.send({success: true, msg: 'account added successfully'})

});
if (isLocal) {
    //local host
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    });
} else {
    //for lambda export
    module.exports = app;
}
