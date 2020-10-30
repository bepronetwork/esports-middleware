import { DatabaseSingleton } from "../core/mongo";
import mongoose from 'mongoose';
let db = DatabaseSingleton.getConnectMain();

class ComplianceFileSchema{};

ComplianceFileSchema.prototype.name = 'ComplianceFile';

ComplianceFileSchema.prototype.schema = {
    link : { type: String, required : true},
    date : { type: Date, required : true},
    app  : { type : mongoose.Schema.Types.ObjectId, ref: 'App', required : true },
}

ComplianceFileSchema.prototype.model = db.model(ComplianceFileSchema.prototype.name, new db.Schema(ComplianceFileSchema.prototype.schema));


export {
    ComplianceFileSchema
}
