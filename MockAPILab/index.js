const express = require('express');
const app = express();
const port = 3000;
const isLocal = true;

app.get('/', (req, res) => {
    res.json({
		message: "✨ 👋🌏 ✨",
		stage: process.env.NODE_ENV,
	});
});

app.get("/ping", (req, res) => {
	res.json({
		message: "🏓",
	});
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

const logger = require('./logger');
const express = require('express');
const app = express();
// Import the routes
const sampleRoutes = require('./routes/samples/index');
const ltkRoutes = require('./routes/ltk/index');
// Use the routes in the app
app.use('/samples', sampleRoutes);
app.use('/ltk', ltkRoutes);
// In-memory storage for loans
let loans = [];
// Functions to handle loan operations
const getAllLoans = () => loans;
const addLoan = (loan) => {
    loans.push(loan);
    logger.info('Loan added: ' + JSON.stringify(loan));
    return loan;
};
const getLoanById = (loanId) => loans.find(l => l.loanId === loanId);
const updateBorrower = (loanId, pairId, data) => {
    const loan = getLoanById(loanId);
    if (!loan) return null;
    const borrower = loan.borrowers.find(b => b.pairId === pairId);
    if (!borrower) return null;
    Object.assign(borrower, data);
    logger.info('Borrower updated: ' + JSON.stringify(borrower));
    return borrower;
};
const deleteBorrower = (loanId, pairId) => {
    const loan = getLoanById(loanId);
    if (!loan) return false;
    const borrowerIndex = loan.borrowers.findIndex(b => b.pairId === pairId);
    if (borrowerIndex === -1) return false;
    loan.borrowers.splice(borrowerIndex, 1);
    logger.info('Borrower deleted with pairId: ' + pairId);
    return true;
};
const deleteLoan = (loanId) => {
    const loanIndex = loans.findIndex(l => l.loanId === loanId);
    if (loanIndex === -1) return false;
    loans.splice(loanIndex, 1);
    logger.info('Loan deleted with loanId: ' + loanId);
    return true;
};


// CRUD operations for the loan objects
// 2. GET METHOD That Gets All Loan Objects
app.get('/loans', (req, res) => {
    logger.info('Fetching all loans');
    res.json(getAllLoans());
});
app.post('/loans', (req, res) => {
    if (!req.body || !req.body.loanId) {
        logger.warn('Invalid loan data provided');
        return res.status(400).json({ message: 'Invalid loan data' });
    }
    res.json(addLoan(req.body));
});
// 3. GET METHOD That Gets One Loan Object Based on LoanId
app.get('/loans/:loanId', (req, res) => {
    const loan = getLoanById(parseInt(req.params.loanId));
    if (!loan) {
        logger.warn('Loan not found with loanId: ' + req.params.loanId);
        return res.status(404).json({ message: 'Loan not found' });
    }
    res.json(loan);
});
// 4. PATCH METHOD That Updates Borrower Info
app.patch('/loans/:loanId/borrowers/:pairId', (req, res) => {
    const borrower = updateBorrower(parseInt(req.params.loanId), parseInt(req.params.pairId), req.body);
    if (!borrower) {
        logger.warn('Loan or borrower not found for loanId: ' + req.params.loanId + ' and pairId: ' + req.params.pairId);
        return res.status(404).json({ message: 'Loan or borrower not found' });
    }
    res.json(borrower);
});
// 5. DELETE METHOD That Deletes a Borrower
app.delete('/loans/:loanId/borrowers/:pairId', (req, res) => {
    const success = deleteBorrower(parseInt(req.params.loanId), parseInt(req.params.pairId));
    if (!success) {
        logger.warn('Loan or borrower not found for loanId: ' + req.params.loanId + ' and pairId: ' + req.params.pairId);
        return res.status(404).json({ message: 'Loan or borrower not found' });
    }
    res.json({ message: 'Borrower deleted' });
});
// 6. DELETE METHOD That Deletes a Loan Object
app.delete('/loans/:loanId', (req, res) => {
    const success = deleteLoan(parseInt(req.params.loanId));
    if (!success) {
        logger.warn('Loan not found with loanId: ' + req.params.loanId);
        return res.status(404).json({ message: 'Loan not found' });
    }
    res.json({ message: 'Loan deleted' });
});


// Centralized error handling middleware
app.use((err, req, res, next) => {
    logger.error('Internal Server Error: ' + err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});


const logger = require('./logger');
const express = require('express');
const app = express();
// Import the routes
const sampleRoutes = require('./routes/samples/index');
const ltkRoutes = require('./routes/ltk/index');
// Use the routes in the app
app.use('/samples', sampleRoutes);
app.use('/ltk', ltkRoutes);
// In-memory storage for loans
let loans = [];
// Functions to handle loan operations
const getAllLoans = () => loans;
const addLoan = (loan) => {
    loans.push(loan);
    logger.info('Loan added: ' + JSON.stringify(loan));
    return loan;
};
const getLoanById = (loanId) => loans.find(l => l.loanId === loanId);
const updateBorrower = (loanId, pairId, data) => {
    const loan = getLoanById(loanId);
    if (!loan) return null;
    const borrower = loan.borrowers.find(b => b.pairId === pairId);
    if (!borrower) return null;
    Object.assign(borrower, data);
    logger.info('Borrower updated: ' + JSON.stringify(borrower));
    return borrower;
};
const deleteBorrower = (loanId, pairId) => {
    const loan = getLoanById(loanId);
    if (!loan) return false;
    const borrowerIndex = loan.borrowers.findIndex(b => b.pairId === pairId);
    if (borrowerIndex === -1) return false;
    loan.borrowers.splice(borrowerIndex, 1);
    logger.info('Borrower deleted with pairId: ' + pairId);
    return true;
};
const deleteLoan = (loanId) => {
    const loanIndex = loans.findIndex(l => l.loanId === loanId);
    if (loanIndex === -1) return false;
    loans.splice(loanIndex, 1);
    logger.info('Loan deleted with loanId: ' + loanId);
    return true;
};


// CRUD operations for the loan objects
// 2. GET METHOD That Gets All Loan Objects
app.get('/loans', (req, res) => {
    logger.info('Fetching all loans');
    res.json(getAllLoans());
});
app.post('/loans', (req, res) => {
    if (!req.body || !req.body.loanId) {
        logger.warn('Invalid loan data provided');
        return res.status(400).json({ message: 'Invalid loan data' });
    }
    res.json(addLoan(req.body));
});
// 3. GET METHOD That Gets One Loan Object Based on LoanId
app.get('/loans/:loanId', (req, res) => {
    const loan = getLoanById(parseInt(req.params.loanId));
    if (!loan) {
        logger.warn('Loan not found with loanId: ' + req.params.loanId);
        return res.status(404).json({ message: 'Loan not found' });
    }
    res.json(loan);
});
// 4. PATCH METHOD That Updates Borrower Info
app.patch('/loans/:loanId/borrowers/:pairId', (req, res) => {
    const borrower = updateBorrower(parseInt(req.params.loanId), parseInt(req.params.pairId), req.body);
    if (!borrower) {
        logger.warn('Loan or borrower not found for loanId: ' + req.params.loanId + ' and pairId: ' + req.params.pairId);
        return res.status(404).json({ message: 'Loan or borrower not found' });
    }
    res.json(borrower);
});
// 5. DELETE METHOD That Deletes a Borrower
app.delete('/loans/:loanId/borrowers/:pairId', (req, res) => {
    const success = deleteBorrower(parseInt(req.params.loanId), parseInt(req.params.pairId));
    if (!success) {
        logger.warn('Loan or borrower not found for loanId: ' + req.params.loanId + ' and pairId: ' + req.params.pairId);
        return res.status(404).json({ message: 'Loan or borrower not found' });
    }
    res.json({ message: 'Borrower deleted' });
});
// 6. DELETE METHOD That Deletes a Loan Object
app.delete('/loans/:loanId', (req, res) => {
    const success = deleteLoan(parseInt(req.params.loanId));
    if (!success) {
        logger.warn('Loan not found with loanId: ' + req.params.loanId);
        return res.status(404).json({ message: 'Loan not found' });
    }
    res.json({ message: 'Loan deleted' });
});


// Centralized error handling middleware
app.use((err, req, res, next) => {
    logger.error('Internal Server Error: ' + err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});


const logger = require('./logger');
const express = require('express');
const app = express();
// Import the routes
const sampleRoutes = require('./routes/samples/index');
const ltkRoutes = require('./routes/ltk/index');
// Use the routes in the app
app.use('/samples', sampleRoutes);
app.use('/ltk', ltkRoutes);
// In-memory storage for loans
let loans = [];
// Functions to handle loan operations
const getAllLoans = () => loans;
const addLoan = (loan) => {
    loans.push(loan);
    logger.info('Loan added: ' + JSON.stringify(loan));
    return loan;
};
const getLoanById = (loanId) => loans.find(l => l.loanId === loanId);
const updateBorrower = (loanId, pairId, data) => {
    const loan = getLoanById(loanId);
    if (!loan) return null;
    const borrower = loan.borrowers.find(b => b.pairId === pairId);
    if (!borrower) return null;
    Object.assign(borrower, data);
    logger.info('Borrower updated: ' + JSON.stringify(borrower));
    return borrower;
};
const deleteBorrower = (loanId, pairId) => {
    const loan = getLoanById(loanId);
    if (!loan) return false;
    const borrowerIndex = loan.borrowers.findIndex(b => b.pairId === pairId);
    if (borrowerIndex === -1) return false;
    loan.borrowers.splice(borrowerIndex, 1);
    logger.info('Borrower deleted with pairId: ' + pairId);
    return true;
};
const deleteLoan = (loanId) => {
    const loanIndex = loans.findIndex(l => l.loanId === loanId);
    if (loanIndex === -1) return false;
    loans.splice(loanIndex, 1);
    logger.info('Loan deleted with loanId: ' + loanId);
    return true;
};


// CRUD operations for the loan objects
// 2. GET METHOD That Gets All Loan Objects
app.get('/loans', (req, res) => {
    logger.info('Fetching all loans');
    res.json(getAllLoans());
});
app.post('/loans', (req, res) => {
    if (!req.body || !req.body.loanId) {
        logger.warn('Invalid loan data provided');
        return res.status(400).json({ message: 'Invalid loan data' });
    }
    res.json(addLoan(req.body));
});
// 3. GET METHOD That Gets One Loan Object Based on LoanId
app.get('/loans/:loanId', (req, res) => {
    const loan = getLoanById(parseInt(req.params.loanId));
    if (!loan) {
        logger.warn('Loan not found with loanId: ' + req.params.loanId);
        return res.status(404).json({ message: 'Loan not found' });
    }
    res.json(loan);
});
// 4. PATCH METHOD That Updates Borrower Info
app.patch('/loans/:loanId/borrowers/:pairId', (req, res) => {
    const borrower = updateBorrower(parseInt(req.params.loanId), parseInt(req.params.pairId), req.body);
    if (!borrower) {
        logger.warn('Loan or borrower not found for loanId: ' + req.params.loanId + ' and pairId: ' + req.params.pairId);
        return res.status(404).json({ message: 'Loan or borrower not found' });
    }
    res.json(borrower);
});
// 5. DELETE METHOD That Deletes a Borrower
app.delete('/loans/:loanId/borrowers/:pairId', (req, res) => {
    const success = deleteBorrower(parseInt(req.params.loanId), parseInt(req.params.pairId));
    if (!success) {
        logger.warn('Loan or borrower not found for loanId: ' + req.params.loanId + ' and pairId: ' + req.params.pairId);
        return res.status(404).json({ message: 'Loan or borrower not found' });
    }
    res.json({ message: 'Borrower deleted' });
});
// 6. DELETE METHOD That Deletes a Loan Object
app.delete('/loans/:loanId', (req, res) => {
    const success = deleteLoan(parseInt(req.params.loanId));
    if (!success) {
        logger.warn('Loan not found with loanId: ' + req.params.loanId);
        return res.status(404).json({ message: 'Loan not found' });
    }
    res.json({ message: 'Loan deleted' });
});


// Centralized error handling middleware
app.use((err, req, res, next) => {
    logger.error('Internal Server Error: ' + err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});


const logger = require('./logger');
const express = require('express');
const app = express();
// Import the routes
const sampleRoutes = require('./routes/samples/index');
const ltkRoutes = require('./routes/ltk/index');
// Use the routes in the app
app.use('/samples', sampleRoutes);
app.use('/ltk', ltkRoutes);
// In-memory storage for loans
let loans = [];
// Functions to handle loan operations
const getAllLoans = () => loans;
const addLoan = (loan) => {
    loans.push(loan);
    logger.info('Loan added: ' + JSON.stringify(loan));
    return loan;
};
const getLoanById = (loanId) => loans.find(l => l.loanId === loanId);
const updateBorrower = (loanId, pairId, data) => {
    const loan = getLoanById(loanId);
    if (!loan) return null;
    const borrower = loan.borrowers.find(b => b.pairId === pairId);
    if (!borrower) return null;
    Object.assign(borrower, data);
    logger.info('Borrower updated: ' + JSON.stringify(borrower));
    return borrower;
};
const deleteBorrower = (loanId, pairId) => {
    const loan = getLoanById(loanId);
    if (!loan) return false;
    const borrowerIndex = loan.borrowers.findIndex(b => b.pairId === pairId);
    if (borrowerIndex === -1) return false;
    loan.borrowers.splice(borrowerIndex, 1);
    logger.info('Borrower deleted with pairId: ' + pairId);
    return true;
};
const deleteLoan = (loanId) => {
    const loanIndex = loans.findIndex(l => l.loanId === loanId);
    if (loanIndex === -1) return false;
    loans.splice(loanIndex, 1);
    logger.info('Loan deleted with loanId: ' + loanId);
    return true;
};


// CRUD operations for the loan objects
// 2. GET METHOD That Gets All Loan Objects
app.get('/loans', (req, res) => {
    logger.info('Fetching all loans');
    res.json(getAllLoans());
});
app.post('/loans', (req, res) => {
    if (!req.body || !req.body.loanId) {
        logger.warn('Invalid loan data provided');
        return res.status(400).json({ message: 'Invalid loan data' });
    }
    res.json(addLoan(req.body));
});
// 3. GET METHOD That Gets One Loan Object Based on LoanId
app.get('/loans/:loanId', (req, res) => {
    const loan = getLoanById(parseInt(req.params.loanId));
    if (!loan) {
        logger.warn('Loan not found with loanId: ' + req.params.loanId);
        return res.status(404).json({ message: 'Loan not found' });
    }
    res.json(loan);
});
// 4. PATCH METHOD That Updates Borrower Info
app.patch('/loans/:loanId/borrowers/:pairId', (req, res) => {
    const borrower = updateBorrower(parseInt(req.params.loanId), parseInt(req.params.pairId), req.body);
    if (!borrower) {
        logger.warn('Loan or borrower not found for loanId: ' + req.params.loanId + ' and pairId: ' + req.params.pairId);
        return res.status(404).json({ message: 'Loan or borrower not found' });
    }
    res.json(borrower);
});
// 5. DELETE METHOD That Deletes a Borrower
app.delete('/loans/:loanId/borrowers/:pairId', (req, res) => {
    const success = deleteBorrower(parseInt(req.params.loanId), parseInt(req.params.pairId));
    if (!success) {
        logger.warn('Loan or borrower not found for loanId: ' + req.params.loanId + ' and pairId: ' + req.params.pairId);
        return res.status(404).json({ message: 'Loan or borrower not found' });
    }
    res.json({ message: 'Borrower deleted' });
});
// 6. DELETE METHOD That Deletes a Loan Object
app.delete('/loans/:loanId', (req, res) => {
    const success = deleteLoan(parseInt(req.params.loanId));
    if (!success) {
        logger.warn('Loan not found with loanId: ' + req.params.loanId);
        return res.status(404).json({ message: 'Loan not found' });
    }
    res.json({ message: 'Loan deleted' });
});


// Centralized error handling middleware
app.use((err, req, res, next) => {
    logger.error('Internal Server Error: ' + err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

