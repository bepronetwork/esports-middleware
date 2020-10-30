import Logic from "./logic";
import {AppRepository} from "../repos/app";
import GoogleStorageSingleton from './third-parties/googleStorage';
import {nameCurrentDate} from './utils/string';
import { CurrencySchema } from "../schemas/currency";
import { fromPeriodicityToDates } from "./utils/date_settings";
import { ComplianceFileSchema } from "../schemas/complianceFile";
class App extends Logic {

    constructor(queue) {
        super(queue);
    }

    async registerPopularNumber() {
        return new Promise(async (resolve)=>{
            await this.buildLogicRegisterPerSkip(async (app)=>{
                try {
                    const result = await AppRepository.popularNumber(app._id);
                    await AppRepository.insertPopularNumber(app._id, result);
                }catch(err){
                    console.log(err);
                }
            }, "registerPopularNumber");
            resolve(true);
        });
    }

    async registerLastBet() {
        return new Promise(async (resolve)=>{
            await this.buildLogicRegisterPerSkip(async (app)=>{
                try {
                    const result = await AppRepository.lastsBets(app._id.toString());
                    await AppRepository.insertLastsBets(app._id.toString(), result);

                    for(let game of app.games){
                        const resultGame = await AppRepository.lastsBets(app._id.toString(), game._id.toString());
                        await AppRepository.insertLastsBets(app._id.toString(), resultGame, game);
                    }
                } catch(err) {
                    console.log(err);
                }
            }, "registerLastBet");
            resolve(true);
        });
    }
    async registerBiggestBetWinner() {
        return new Promise(async (resolve)=>{
            await this.buildLogicRegisterPerSkip(async (app)=>{
                try {
                    const result = await AppRepository.biggestBetWinners(app._id, null);
                    await AppRepository.insertBiggestBetWinners(app._id, result);
                    for(let game of app.games){
                        const resultGame = await AppRepository.biggestBetWinners(app._id.toString(), game._id.toString());
                        await AppRepository.insertBiggestBetWinners(app._id.toString(), resultGame, game);
                    }
                } catch(err) {
                    console.log(err);
                }
            }, "registerBiggestBetWinner");
            resolve(true);
        });
    }

    async registerBiggestUserWinner() {
        return new Promise(async (resolve)=>{
            await this.buildLogicRegisterPerSkip(async (app)=>{
                try {
                    const result = await AppRepository.biggestBetUserWinners(app._id);
                    await AppRepository.insertBiggestBetUserWinners(app._id, result);
                } catch(err) {
                    console.log(err);
                }
            }, "registerBiggestUserWinner");
            resolve(true);
        });
    }

    async generateBalance() {
        return new Promise(async (resolve)=>{
            await this.buildLogicRegisterPerSkip(async (app)=>{
                const balanceArray = (await AppRepository.getBalance(app._id));

                let separatedByUser = {};

                for(let balance of balanceArray) {
                    if(separatedByUser[balance.id]==undefined || separatedByUser[balance.id]==null) {
                        separatedByUser[balance.id] = `${balance.balance} ${balance.ticker == undefined ? 'eth' : balance.ticker}`;
                    }else{
                        separatedByUser[balance.id] += `; ${balance.balance} ${balance.ticker == undefined ? 'eth' : balance.ticker}`;
                    }
                }

                const result = (Object.keys(separatedByUser)).map(i => [`${i}`, `${separatedByUser[i]}`]);

                if(result.length > 0) {
                    const link = await GoogleStorageSingleton.uploadFile({bucketName : 'balances-clients', file : result, name : `${app.name}-${nameCurrentDate()}-balances`});
                    await ComplianceFileSchema.prototype.model({link, date: (new Date()), app: app._id}).save();
                    console.log(link);
                }
            }, "generateBalance");
            resolve(true);
        });
    }

    async registerUserStats() {
        return new Promise(async (resolve)=>{
            await this.buildLogicRegisterPerSkip(async (app)=>{
                let currencies = await CurrencySchema.prototype.model.find();
                let periods = [
                    "daily",
                    "weekly"
                ];
                for(let currency of currencies) {
                    for(let period of periods) {
                        const result = await AppRepository.userStats(app._id, currency._id, fromPeriodicityToDates({periodicity: period}) );
                        await AppRepository.insertUserStats(app._id, new String(currency._id).toString(), period, result);
                    }
                }
                resolve(true);
            }, "registerUserStats");
        });
    }

    async registerGameStats() {
        return new Promise(async (resolve)=>{
            await this.buildLogicRegisterPerSkip(async (app)=>{
                let currencies = await CurrencySchema.prototype.model.find();
                let periods = [
                    "daily",
                    "weekly"
                ];
                for(let currency of currencies) {
                    for(let period of periods) {
                        const result = await AppRepository.gameStats(app._id, currency._id, fromPeriodicityToDates({periodicity: period}) );
                        await AppRepository.insertGameStats(app._id, new String(currency._id).toString(), period, result);
                    }
                }
                resolve(true);
            }, "registerGameStats");
        });
    }

}

const AppLogic = new App({
    'registerBiggestBetWinner'    : false,
    'registerBiggestUserWinner'   : false,
    'registerLastBet'             : false,
    'registerPopularNumber'       : false,
    'generateBalance'             : false,
    'registerUserStats'           : false,
    'registerGameStats'           : false
});

export {
    AppLogic
}