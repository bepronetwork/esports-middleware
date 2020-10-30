import mongoose from 'mongoose';
import { DatabaseSingleton } from "../core/mongo";
let db = DatabaseSingleton.getConnectRedis();

class BiggestBetWinnerSchema{};

BiggestBetWinnerSchema.prototype.name = 'BiggestBetWinner';

BiggestBetWinnerSchema.prototype.schema = {
    app         : { type : mongoose.Schema.Types.ObjectId, ref: 'App', required : true },
    timestamp   : { type : Date, required : true},
    game        : { type : mongoose.Schema.Types.ObjectId, ref: 'Game', required : true },
    biggestBetWinner: [{
        bet         : {
            _id       : { type : mongoose.Schema.Types.ObjectId, required: true},
            betAmount : { type : Number, required: true},
            winAmount : { type : Number, required: true},
            isWon     : { type : Boolean, required : true},
            timestamp : { type : Date, required : true},
        },
        currency    : {
            _id       : { type : mongoose.Schema.Types.ObjectId, required: true},
            ticker    : { type: String, required: true},
            name      : { type: String, required: true},
            image     : { type: String, required: true},
        },
        user        : {
            _id       : { type : mongoose.Schema.Types.ObjectId, required: true},
            username  : { type : String, required: true},
        },
        game        : {
            _id       : { type : mongoose.Schema.Types.ObjectId, required: true},
            name      : { type: String, required: true},
            metaName  : { type: String, required: true},
            image_url : { type: String, required: true},
        },
    }],
}


BiggestBetWinnerSchema.prototype.model = db.model(BiggestBetWinnerSchema.prototype.name, new db.Schema(BiggestBetWinnerSchema.prototype.schema));
export {
    BiggestBetWinnerSchema
}
