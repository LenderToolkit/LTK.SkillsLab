# Welcome to Lender Tool Kits Node.js & Express skills test

This skills test is designed to allow candidates to showcase your development skills with Node.Js.

* Google can be used to lookup helpful information as needed.
* Do not worry if you cannot fully complete the test within the allotted time, the purpose of the test is to allow us to determine skills and to get an insight into how you go about solving the problem.
* Please submit a live recording of the exercise.

## Prerequisites

Please ensure that you have the following tools installed.

* Visual Studio Code / or IDE of your choice
* Node 16+

## Instructions

step 1.) clone this github repository. This repository contains a very basic REST api, using Express.

step 2.) Fix any errors that prevent the project from being built and run. Fix any Encompass problems in the code that may cause issues.

step 3.) Using the loan object schema below, and a data storage method of your choosing, create an API with basic CRUD operations

* example loan object
{
	loanId: int,
	borrowers: [
		{
			pairId: int
			firstName: 'string',
			lastName: 'string',
			phone: 'string',

		},
	]
}

step 4.) create a GET method that gets all loan objects

step 5.) create a GET method that gets one loan object based on loanId

step 6.) create a POST method that adds a new loan object with an array of borrowers

step 7.) create a PATCH method that updates borrower information based on loanId and pairId

step 8.) create a PATCH or DELETE method that deletes a borrower based on loanId and pairId

step 9.) create a DELETE method that deletes a loan object based on loanId

Bonus points will be awarded for:
* code organization
* Best Practice development skills
* Working Unit Tests