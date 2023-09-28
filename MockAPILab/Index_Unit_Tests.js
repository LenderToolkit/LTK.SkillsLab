const request = require('supertest');
const express = require('express');
const app = require('./index');

describe('Index Routes', () => {
  // 1. Return a welcome message
  it('should return a welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('✨ 👋🌏 ✨');
  });
  // 2. Return a ping response
  it('should return a ping response', async () => {
    const res = await request(app).get('/ping');
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('🏓');
  });
  // 3. Get all loans (initially empty)
  it('should return an empty list of loans', async () => {
    const res = await request(app).get('/loans');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });
  // 4. Add a new loan
  it('should add a new loan', async () => {
    const loan = { loanId: 1, amount: 1000 };
    const res = await request(app).post('/loans').send(loan);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(loan);
  });
  // 5. Get all loans after adding one
  it('should return a list of loans after adding one', async () => {
    const res = await request(app).get('/loans');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
    expect(res.body[0].loanId).toEqual(1);
  });
  // 6. Get a specific loan by its ID
  it('should retrieve a specific loan by its ID', async () => {
    const res = await request(app).get('/loans/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body.loanId).toEqual(1);
    expect(res.body.amount).toEqual(1000);
  });
  // 7. Fail to get a loan with an invalid ID
  it('should fail to retrieve a loan with an invalid ID', async () => {
    const res = await request(app).get('/loans/999');
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual('Loan not found');
  });
  // 8. Update borrower information for a specific loan
  it('should update borrower information for a specific loan', async () => {
    const borrowerUpdate = { name: 'John Updated' };
    const res = await request(app).patch('/loans/1/borrowers/1').send(borrowerUpdate);
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('John Updated');
  });
  // 9. Fail to update borrower information with invalid loan ID
  it('should fail to update borrower information with invalid loan ID', async () => {
    const borrowerUpdate = { name: 'John Updated' };
    const res = await request(app).patch('/loans/999/borrowers/1').send(borrowerUpdate);
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual('Loan or borrower not found');
  });
  // 10. Delete a borrower from a specific loan
  it('should delete a borrower from a specific loan', async () => {
    const res = await request(app).delete('/loans/1/borrowers/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Borrower deleted');
  });
  // 11. Fail to delete a borrower with invalid loan ID
  it('should fail to delete a borrower with invalid loan ID', async () => {
    const res = await request(app).delete('/loans/999/borrowers/1');
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual('Loan or borrower not found');
  });
  // 12. Delete a specific loan
  it('should delete a specific loan', async () => {
    const res = await request(app).delete('/loans/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Loan deleted');
  });
  // 13. Fail to delete a loan with invalid ID
  it('should fail to delete a loan with invalid ID', async () => {
    const res = await request(app).delete('/loans/999');
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual('Loan not found');
  });
  // 14. Handle the mocked sample route
  it('should handle the mocked sample route', async () => {
    const res = await request(app).get('/mocked-route');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('Mocked Route Response');
  });
  // 15. Handle the mocked LTK route
  it('should handle the mocked ltk route', async () => {
    const res = await request(app).get('/mocked-ltk-route');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('Mocked LTK Route Response');
  });
  // 16. Fail to add a loan without 
  it('should fail to add a loan without loanId', async () => {
    const loan = { amount: 1000 };
    const res = await request(app).post('/loans').send(loan);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Invalid loan data');
  });
  // 17. Add a borrower to a specific loan
  it('should add a borrower to a specific loan', async () => {
    const borrower = { pairId: 1, name: 'John Doe' };
    const res = await request(app).patch('/loans/1/borrowers/1').send(borrower);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(borrower);
  });
  // 18. Get a borrower from a specific loan
  it('should get a borrower from a specific loan', async () => {
    const res = await request(app).get('/loans/1/borrowers/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('John Doe');
  });
  // 19. Fail to get a borrower with invalid pair ID
  it('should fail to get a borrower with invalid pair ID', async () => {
    const res = await request(app).get('/loans/1/borrowers/999');
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual('Loan or borrower not found');
  });
  // 20. Fail to update borrower information with invalid pair ID
  it('should fail to update borrower information with invalid pair ID', async () => {
    const borrower = { name: 'Jane Doe' };
    const res = await request(app).patch('/loans/1/borrowers/999').send(borrower);
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual('Loan or borrower not found');
  });
