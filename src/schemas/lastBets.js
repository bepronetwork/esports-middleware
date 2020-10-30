import mongoose from 'mongoose';
import { DatabaseSingleton } from "../core/mongo";
let db = DatabaseSingleton.getConnectRedis();

class LastBetsSchema{};

LastBetsSchema.prototype.name = 'LastBets';


LastBetsSchema.prototype.schema = {
    app         : { type : mongoose.Schema.Types.ObjectId, ref: 'App', required : true },
    timestamp   : { type : Date, required : true},
    game        : { type : mongoose.Schema.Types.ObjectId, ref: 'Game', required : true },
    lastBets    : [{
        bet         : {
            _id       : { type : String, required: true},
            betAmount : { type : Number, required: true},
            winAmount : { type : Number, required: true},
            isWon     : { type : Boolean, required : true},
            timestamp : { type : Date, required : true},
        },
        currency    : {
            _id       : { type: String, required: true},
            ticker    : { type: String, required: true},
            name      : { type: String, required: true},
            image     : { type: String, required: true},
        },
        user        : {
            _id       : { type : String, required: true},
            username  : { type : String, required: true},
        },
        game        : {
            _id       : { type : String, required: true},
            name      : { type: String, required: true},
            metaName  : { type: String, required: true},
            image_url : { type: String, required: true},
        }
    }],
}

LastBetsSchema.prototype.model = db.model(LastBetsSchema.prototype.name, new db.Schema(LastBetsSchema.prototype.schema));

export {
    LastBetsSchema
}
