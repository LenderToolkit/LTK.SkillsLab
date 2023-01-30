using System;
using EllieMae.Encompass.Automation;
using EllieMae.Encompass.BusinessObjects.Loans;

namespace EncompassPluginLab
{
    public class EncompassPlugin
    {
        private static Loan _loan;
        public EncompassPlugin()
        {
            EncompassApplication.LoanOpened += Application_LoanOpened;
        }

        private void Application_LoanOpened(object sender, EventArgs e)
        {
            _loan = EncompassApplication.CurrentLoan;
            _loan.FieldChange += Loan_FieldChange;
            DoStuff();
        }

        private void DoStuff()
        {
            Console.WriteLine("Stuff1");
            var c = EncompassApplication.CurrentLoan.Log.Conversations.Add(DateTime.Now);
            c.Company = "company name";
            
        }

        private void Loan_FieldChange(object source, FieldChangeEventArgs e)
        {
            if (e.FieldID == "CX.TESTFIELD")
            {
                _loan.Fields["CX.TESTFIELD"].Value = "";
                _loan.Fields["CX.RESULT"].Value = "Found It";
                
            }

            if (e.FieldID == "CX.RESULT")
            {
                _loan.Fields["CX.RESULT"].Value = "";
                _loan.Fields["CX.TESTFIELD"].Value = "Done";
            }
        }
    }
}