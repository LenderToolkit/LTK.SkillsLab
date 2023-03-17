using System;
using EllieMae.Encompass.Automation;
using EllieMae.Encompass.BusinessObjects.Loans;
using EllieMae.Encompass.BusinessObjects.Loans.Logging;
using EllieMae.Encompass.BusinessObjects.Users;
using EllieMae.Encompass.ComponentModel;

namespace EncompassPluginLab
{
    [Plugin]
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
            addConversationLogEntryOnLoanOpen();
        }

        // step 3) Update Plugin so that the plugin adds a conversation log entry on Loan Open notating the user that opened the loan.
        private void addConversationLogEntryOnLoanOpen()
        {
            var c = EncompassApplication.CurrentLoan.Log.Conversations.AddForUser(DateTime.Now, EncompassApplication.CurrentUser );
      
        }

        //step 4.) On a field change, if the field is CX.TESTFIELD and the value is not blank, Update CX.RESULT with "Found It.".On a field change, if the field is CX.TESTFIELD and the value is blank, Update CX.RESULT with "Done."

        private void Loan_FieldChange(object source, FieldChangeEventArgs e)
        {
            if (e.FieldID == "CX.TESTFIELD")
            {
                if (_loan.Fields["CX.TESTFIELD"].Value.ToString() != " ")
                    {
                        _loan.Fields["CX.RESULT"].Value = "Found It";
                     }
                
            }

            if (e.FieldID == "CX.TESTFIELD")
            {
               if( _loan.Fields["CX.TESTFIELD"].Value.ToString() == "")
                {
                    _loan.Fields["CX.RESULT"].Value = "Done";

                }

            }
        }
    }
}