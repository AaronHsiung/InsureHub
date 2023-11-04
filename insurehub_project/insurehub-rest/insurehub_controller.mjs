import 'dotenv/config';
import * as policies from './insurehub_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

/**
 * Create a new policy with the policy number, policy provider, policy type, 
 * start date, end date, payment date and premium provided in the body.
 */
app.post('/policies', (req, res) => {
    const { policyNumber, policyProvider, policyType, startDate, endDate, premium, paymentDate } = req.body;

    // Validation
    if (typeof policyNumber !== 'string' || policyNumber.length === 0) {
        res.status(400).json({ Error: 'Invalid request' });
        return
    }
  
    if (typeof policyProvider !== 'string' || policyProvider.length === 0) {
        res.status(400).json({ Error: 'Invalid request' });
        return
    }
  
    if (typeof policyType !== 'string' || policyType.length === 0) {
        res.status(400).json({ Error: 'Invalid request' });
        return
    }
  
    if (!isDateValid(startDate)) {
        res.status(400).json({ Error: 'Invalid request' });
        return
    }

    if (!isDateValid(endDate)) {
        res.status(400).json({ Error: 'Invalid request' });
        return
    }
  
    if (premium <= 0) {
        res.status(400).json({ Error: 'Invalid request' });
        return
    }
  
    if (!isDateValid(paymentDate)) {
        res.status(400).json({ Error: 'Invalid request' });
        return
    }    

    policies.createPolicy(req.body.policyNumber, req.body.policyProvider, req.body.policyType, req.body.startDate, req.body.endDate, req.body.premium, req.body.paymentDate)
        .then(policy => {
            res.status(201).json(policy);
        })
        .catch(error => {
            console.error(error);
            // In case of an error, send back status code 400 in case of an error.
            // A better approach will be to examine the error and send an error status code corresponding to the error.
            res.status(400).json({ Error: "Invalid request" });
        });
});

/**
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    // const format = /^\d\d-\d\d-\d\d$/;
    const format = /^\d\d-\d\d-\d\d\d\d$/;
    return format.test(date);
}

/**
 * Retrive the policy corresponding to the ID provided in the URL.
 */
app.get('/policies/:_id', (req, res) => {
    const policyNumber = req.params._id;
    policies.findPolicyById(policyNumber)
        .then(policy => {
            if (policy !== null) {
                res.json(policy);
            } else {
                res.status(404).json({ Error: 'Not found' })
            }
        })
        .catch(error => {
            res.status(400).json({ Error: "Request failed" });
        })
});

/**
 * Retrieve policies. 
 * If the query parameters are included, then only the policies for that parameters are returned.
 * Otherwise, all policies are returned.
 */
app.get('/policies', (req, res) => {
    let filter = {};
    // Is there a query parameter named policyNumber? If so add a filter based on its value.
    if(req.query.policyNumber !== undefined){
        filter = { policyNumber: req.query.policyNumber };
    }
    // Is there a query parameter named policyProvider? If so add a filter based on its value.
    if(req.query.policyProvider !== undefined){
        filter = { policyProvider: req.query.policyProvider };
    }
    // Is there a query parameter named policyType? If so add a filter based on its value.
    if(req.query.policyType !== undefined){
        filter = { policyType: req.query.policyType };
    }
    // Is there a query parameter named startDate? If so add a filter based on its value.
    if(req.query.startDate !== undefined){
        filter = { startDate: req.query.startDate };
    }
    // Is there a query parameter named endDate? If so add a filter based on its value.
    if(req.query.endDate !== undefined){
        filter = { endDate: req.query.endDate };
    }    
    // Is there a query parameter named premium? If so add a filter based on its value.
    if(req.query.premium !== undefined){
        filter = { premium: req.query.premium };
    }
    // Is there a query parameter named paymentDate? If so add a filter based on its value.
    if(req.query.paymentDate !== undefined){
        filter = { paymentDate: req.query.paymentDate };
    }
    policies.findPolicy(filter, '', 0)
        .then(policies => {
            res.send(policies);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request failed' });
        });
});

/**
 * Update the policy whose id is provided in the path parameter and set.
 * its policyNumber, policyProvider, policyType, startDate, endDate, premium and paymentDate to the values provided in the body.
 */
app.put('/policies/:_id', (req, res) => {
    const { policyNumber, policyProvider, policyType, startDate, endDate, premium, paymentDate } = req.body;

    // Validation
    if (typeof policyNumber !== 'string' || policyNumber.length === 0) {
        res.status(400).json({ Error: 'Invalid request' });
        return
    }
  
    if (typeof policyProvider !== 'string' || policyProvider.length === 0) {
        res.status(400).json({ Error: 'Invalid request' });
        return
    }  

    if (typeof policyType !== 'string' || policyType.length === 0) {
        res.status(400).json({ Error: 'Invalid request' });
        return
    }
  
    if (!isDateValid(startDate)) {
        res.status(400).json({ Error: 'Invalid request' });
        return
    }

    if (!isDateValid(endDate)) {
        res.status(400).json({ Error: 'Invalid request' });
        return
    }

    if (isNaN(premium) || premium <= 0) {
        res.status(400).json({ Error: 'Invalid request' });
        return
    }
    
    if (!isDateValid(paymentDate)) {
        res.status(400).json({ Error: 'Invalid request' });
        return
    }

    policies.replacePolicy(req.params._id, req.body.policyNumber, req.body.policyProvider, req.body.policyType, req.body.startDate, req.body.endDate, req.body.premium, req.body.paymentDate)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.json({ _id: req.params._id, policyNumber: req.body.policyNumber, policyProvider: req.body.policyProvider, policyType: req.body.policyType, startDate: req.body.startDate, endDate: req.body.endDate, premium: req.body.premium, paymentDate: req.body.paymentDate })
            } else {
                res.status(404).json({ Error: 'Not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});

/**
 * Delete the policy whose id is provided in the query parameters
 */
app.delete('/policies/:_id', (req, res) => {
    policies.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});