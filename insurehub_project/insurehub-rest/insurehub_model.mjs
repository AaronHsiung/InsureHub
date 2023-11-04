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
const createPolicy = async (policyNumber, policyProvider, policyType, startDate, endDate, premium, paymentDate) => {
    // Call the constructor to create an instance of the model class Policy
    const policy = new Policy({ policyNumber: policyNumber, policyProvider: policyProvider, policyType: policyType, startDate: startDate, endDate: endDate, premium: premium, paymentDate: paymentDate });
    // Call save to persist this object as a document in MongoDB
    return policy.save();
}

/**
 * Retrive policies based on the filter, projection and limit parameters.
 * @param {Object} filter
 * @param {String} projection
 * @param {Number} limit
 * @returns
 */
const findPolicy = async (filter, projection, limit) => {
    const query = Policy.find(filter)
        .select(projection)
        .limit(limit)
    return query.exec();
}

/**
 * Find the policy with the given ID value.
 * @param {String} _id
 * @returns
 */
const findPolicyById = async (_id) => {
    const query = Policy.findById(_id);
    return query.exec();
}

/**
 * Replace the policyNumber, policyProvider, policyType, startDate, endDate, premium, paymentDate properties of the policy with the id value provided.
 * @param {String} _id
 * @param {String} policyNumber
 * @param {String} policyProvider
 * @param {String} policyType
 * @param {String} startDate
 * @param {String} endDate
 * @param {String} paymentDate
 * @param {Number} premium
 * @returns A promise. Resolves to the number of documents modified.
 */
const replacePolicy = async (_id, policyNumber, policyProvider, policyType, startDate, endDate, premium, paymentDate) => {
    const result = await Policy.replaceOne({ _id: _id}, {policyNumber: policyNumber, policyProvider: policyProvider, policyType: policyType, startDate: startDate, endDate: endDate, premium: premium, paymentDate: paymentDate });
    return result.modifiedCount;
}

/**
 * Delete the policy with provided id value.
 * @param {String} _id
 * @returns A promise. Resolves to the count of deleted documents.
 */
const deleteById = async (_id) => {
    const result = await Policy.deleteOne({ _id: _id});
    return result.deletedCount;
}


export {createPolicy, findPolicy, findPolicyById, replacePolicy, deleteById};
