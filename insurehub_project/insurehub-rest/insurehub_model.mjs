import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);


// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 * @param {String} policyNumber     The policy number of the policy.
 * @param {String} policyProvider     The policy provider of the polict. Only values allowed are kgs and lbs.
 * @param {String} policyType   The policy type of the policy.
 * @param {String} startDate     The start date of the policy. Specified as MM-DD-YY, e.g., 07-30-21.
 * @param {String} endDate     The end date of the policy. Specified as MM-DD-YY, e.g., 07-30-21.
 * @param {Number} premium     The premium of the policy was performed. 
 * @param {String} paymentDate     The payment date of the policy. Specified as MM-DD-YY, e.g., 07-30-21.
 */
const policySchema = mongoose.Schema({
    policyNumber: { type: String, required: true },
    policyProvider: { type: String, required: true },    
    policyType: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },    
    premium: { type: Number, required: true },
    paymentDate: { type: String, required: true }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Policy = mongoose.model("Policy", policySchema);

/**
 * Create an policy
 * @param {String} policyNumber
 * @param {String} policyProvider
 * @param {String} policyType
 * @param {String} startDate
 * @param {String} endDate
 * @param {Number} premium
 * @param {String} paymentDate
 * @returns A promise. Resolves to the JSON object for the document created by calling save.
 */
const createPolicy = async (
    policyNumber, 
    policyProvider, 
    policyType, 
    startDate, 
    endDate, 
    premium, 
    paymentDate
    ) => {
    // Call the constructor to create an instance of the model class Policy
    const policy = new Policy({ 
        policyNumber: policyNumber, 
        policyProvider: policyProvider, 
        policyType: policyType, 
        startDate: startDate, 
        endDate: endDate, 
        premium: premium, 
        paymentDate: paymentDate 
    });
    // Call save to persist this object as a document in MongoDB
    return policy.save();
}

/**
 * Retrive policies based on the filter, projection and limit parameters.
 * @param {Object} filter - The filter criteria to apply when searching for policies.
 * @param {String} projection - The specific fields to include or exclude in the result.
 * @param {Number} limit - The maximum number of policies to retrieve.
 * @returns A Promise that resolves to the array of retrieved policy documents.
 */
const findPolicy = async (filter, projection, limit) => {
    // Creating a query using the Policy model. This query will be used to search the database.
    // .find(filter): Filters the policies according to the provided filter object.
    const query = Policy.find(filter)
        // .select(projection): Selects which fields to include or exclude in the results.
        .select(projection)
        // .limit(limit): Limits the number of policies returned by the query.
        .limit(limit)
    // Executes the query and returns the Promise.
    // This Promise, when resolved, will contain the array of policies matching the criteria.    
    return query.exec();
}

/**
 * Find the policy with the given ID value.
 * @param {String} _id - The unique identifier of the policy to be retrieved.
 * @returns A Promise that resolves to the policy document if found, or null if not found.
 */
const findPolicyById = async (_id) => {
    // Creating a query using the Policy model to find a policy by its ID.
    // .findById(_id): This method is used to search for a single document by its unique identifier (_id).
    const query = Policy.findById(_id);
    // Executes the query and returns the Promise.
    // This Promise, when resolved, will contain the policy that matches the given ID.
    // If no policy is found with that ID, the Promise resolves to null.
    return query.exec();
}

/**
 * Replace the policyNumber, policyProvider, policyType, startDate, endDate, premium, paymentDate properties of the policy with the id value provided.
 * @param {String} _id - The unique identifier of the policy to be updated.
 * @param {String} policyNumber - The new policy number.
 * @param {String} policyProvider - The new policy provider.
 * @param {String} policyType - The new policy type.
 * @param {String} startDate - The new start date of the policy.
 * @param {String} endDate - The new end date of the policy.
 * @param {String} paymentDate - The new payment date of the policy.
 * @param {Number} premium - The new premium amount.
 * @returns A promise. Resolves to the number of documents modified.
 */
const replacePolicy = async (
    _id, policyNumber, 
    policyProvider, 
    policyType, 
    startDate, 
    endDate, 
    premium, 
    paymentDate
    ) => {
    // Performs the update operation using the Policy model's replaceOne method.
    // replaceOne({ _id: _id}, { ... }): Replaces the document that matches the given _id with the new values provided.
    const result = await Policy.replaceOne({ _id: _id}, {
        policyNumber: policyNumber, 
        policyProvider: policyProvider, 
        policyType: policyType, 
        startDate: startDate, 
        endDate: endDate, 
        premium: premium, 
        paymentDate: paymentDate 
    });
    // Returns the number of documents that were modified as a result of this operation.
    // If a policy with the given ID was found and updated, this number should be 1.
    // If no policy was found with that ID, this number will be 0.
    return result.modifiedCount;
}

/**
 * Delete the policy with provided id value.
 * @param {String} _id
 * @returns A promise. Resolves to the count of deleted documents.
 */
const deleteById = async (_id) => {
    // Performs the delete operation using the Policy model's deleteOne method.
    // deleteOne({ _id: _id }): Deletes the document that matches the given _id.
    const result = await Policy.deleteOne({ _id: _id});

    // Returns the number of documents that were deleted as a result of this operation.
    // If a policy with the given ID was found and deleted, this number should be 1.
    // If no policy was found with that ID, this number will be 0.
    return result.deletedCount;
}

// Exporting the functions to make them available for import in other parts of the application.
export {createPolicy, findPolicy, findPolicyById, replacePolicy, deleteById};
