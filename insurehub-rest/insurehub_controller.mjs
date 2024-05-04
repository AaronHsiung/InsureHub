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
// Defines a POST route handler for the '/policies' endpoint
app.post('/policies', (req, res) => {
    // Destructures the request body to extract policy details
    const { policyNumber, policyProvider, policyType, startDate, endDate, premium, paymentDate } = req.body;

    // Validation
    if (typeof policyNumber !== 'string' || policyNumber.length === 0) {
        res.status(400).json({ Error: 'Policy number is invalid or missing' });
        return
    }
  
    if (typeof policyProvider !== 'string' || policyProvider.length === 0) {
        res.status(400).json({ Error: 'Policy provider is invalid or missing' });
        return
    }
  
    if (typeof policyType !== 'string' || policyType.length === 0) {
        res.status(400).json({ Error: 'Policy type is invalid or missing' });
        return
    }
  
    if (!isDateValid(startDate)) {
        res.status(400).json({ Error: 'Start date is invalid' });
        return
    }

    if (!isDateValid(endDate)) {
        res.status(400).json({ Error: 'End date is invalid' });
        return
    }
  
    if (premium <= 0) {
        res.status(400).json({ Error: 'Premium must be greater than zero' });
        return
    }
  
    if (!isDateValid(paymentDate)) {
        res.status(400).json({ Error: 'Payment date is invalid' });
        return
    }    

    // Calls a method to create a policy record in the database
    policies.createPolicy(
        req.body.policyNumber, 
        req.body.policyProvider, 
        req.body.policyType, 
        req.body.startDate, 
        req.body.endDate, 
        req.body.premium, 
        req.body.paymentDate
        )
        .then(policy => {
            // Sends a success response with the newly created policy
            res.status(201).json(policy);
        })
        .catch(error => {
            // Logs the error for debugging
            console.error(error);
            // In case of an error, send back status code 400 in case of an error
            res.status(400).json({ Error: "Invalid request" });
        });
});

/**
* @param {string} date
* Return true if the date format is MM-DD-YYYY where MM and DD are 2 digit integers, and YYYY is a 4 digit integer.
*/
function isDateValid(date) {
    // Test using a regular expression. 
    const format = /^\d\d-\d\d-\d\d\d\d$/;
    return format.test(date);
}

/**
 * Retrive the policy corresponding to the ID provided in the URL.
 */
// Defines a GET route handler for fetching a policy by its ID using the '/policies/:_id' endpoint
app.get('/policies/:_id', (req, res) => {
    // Extracts the policy ID from the URL parameters
    const policyNumber = req.params._id;
    // Calls a method to find a policy by its ID
    policies.findPolicyById(policyNumber)
        .then(policy => {
            // Checks if a policy was found
            if (policy !== null) {
                // Responds with the found policy
                res.json(policy);
            } else {
                // If no policy was found, responds with a 404 Not Found status
                res.status(404).json({ Error: 'Not found' })
            }
        })
        .catch(error => {
            // Handles any errors that occur during the process
            res.status(400).json({ Error: "Request failed" });
        })
});

/**
 * Retrieve policies. 
 * If the query parameters are included, then only the policies for that parameters are returned.
 * Otherwise, all policies are returned.
 */
app.get('/policies', (req, res) => {
    // Initialize an empty filter object
    let filter = {};
    // Validation
    if(req.query.policyNumber !== undefined){
        filter = { policyNumber: req.query.policyNumber };
    }
    
    if(req.query.policyProvider !== undefined){
        filter = { policyProvider: req.query.policyProvider };
    }
    
    if(req.query.policyType !== undefined){
        filter = { policyType: req.query.policyType };
    }
    
    if(req.query.startDate !== undefined){
        filter = { startDate: req.query.startDate };
    }
    
    if(req.query.endDate !== undefined){
        filter = { endDate: req.query.endDate };
    }    
    
    if(req.query.premium !== undefined){
        filter = { premium: req.query.premium };
    }
    
    if(req.query.paymentDate !== undefined){
        filter = { paymentDate: req.query.paymentDate };
    }
    // Call a function to find policies based on the filter
    policies.findPolicy(filter, '', 0)
        .then(policies => {
            // If successful, send the list of policies back to the client
            res.send(policies);
        })
        .catch(error => {
            // Log and handle any errors that occur during the process
            console.error(error);
            res.send({ Error: 'Request failed' });
        });
});

/**
 * Update the policy whose id is provided in the path parameter and set.
 * its policyNumber, policyProvider, policyType, startDate, endDate, premium and paymentDate to the values provided in the body.
 */
app.put('/policies/:_id', (req, res) => {
    // Extracts policy details from the request body
    const { policyNumber, policyProvider, policyType, startDate, endDate, premium, paymentDate } = req.body;

    // Validation
    if (typeof policyNumber !== 'string' || policyNumber.length === 0) {
        res.status(400).json({ Error: 'Policy number is invalid or missing' });
        return
    }
  
    if (typeof policyProvider !== 'string' || policyProvider.length === 0) {
        res.status(400).json({ Error: 'Policy provider is invalid or missing' });
        return
    }  

    if (typeof policyType !== 'string' || policyType.length === 0) {
        res.status(400).json({ Error: 'Policy type is invalid or missing' });
        return
    }
  
    if (!isDateValid(startDate)) {
        res.status(400).json({ Error: 'Start date is invalid' });
        return
    }

    if (!isDateValid(endDate)) {
        res.status(400).json({ Error: 'End date is invalid' });
        return
    }

    if (isNaN(premium) || premium <= 0) {
        res.status(400).json({ Error: 'Premium must be greater than zero' });
        return
    }
    
    if (!isDateValid(paymentDate)) {
        res.status(400).json({ Error: 'Payment date is invalid' });
        return
    }

    // Calls a method to replace an existing policy with the given ID and new details
    policies.replacePolicy(
        req.params._id, 
        req.body.policyNumber, 
        req.body.policyProvider, 
        req.body.policyType, 
        req.body.startDate, 
        req.body.endDate, 
        req.body.premium, 
        req.body.paymentDate
        )
        .then(numUpdated => {
            // Checks if exactly one policy was updated
            if (numUpdated === 1) {
                // Sends a response with the updated policy details
                res.json({ 
                    _id: req.params._id, 
                    policyNumber: req.body.policyNumber, 
                    policyProvider: req.body.policyProvider, 
                    policyType: req.body.policyType, 
                    startDate: req.body.startDate, 
                    endDate: req.body.endDate, 
                    premium: req.body.premium, 
                    paymentDate: req.body.paymentDate 
                })
            } else {
                // If no policy was updated, sends a 404 Not Found status
                res.status(404).json({ Error: 'Not found' });
            }
        })
        .catch(error => {
            // Logs and handles any errors that occur during the process
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});

/**
 * Delete the policy whose id is provided in the query parameters
 */
app.delete('/policies/:_id', (req, res) => {
    // Calls a method to delete a policy by its ID, passed from the URL parameters
    policies.deleteById(req.params._id)
        .then(deletedCount => {
            // Check the number of records deleted
            if (deletedCount === 1) {
                // If one record was deleted, send a 204 No Content status to indicate successful deletion
                res.status(204).send();
            } else {
                // If no records were deleted, send a 404 Not Found status
                res.status(404).json({ Error: 'Not found' });
            }
        })
        .catch(error => {
            // Log any errors that occur during the delete operation
            console.error(error);
            // Send a general error response
            res.send({ error: 'Request failed' });
        });
});

// Starting the Express server
app.listen(PORT, () => {
    // Log a message to the console when the server starts, indicating the port it's listening on
    console.log(`Server listening on port ${PORT}...`);
});