"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const FaunaService_1 = __importDefault(require("./FaunaService"));
const db_1 = require("./db");
const drizzle_orm_1 = require("drizzle-orm");
const db_2 = require("db");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const rowKey = 'xpdata';
    // FaunaDB Implementation
    let indexName = "idxByKey";
    // Grab data from fauna
    let _faunaService = new FaunaService_1.default(process.env.FAUNA_SECRET);
    let record = yield _faunaService.getRecordByIndex(indexName, rowKey);
    let data = record.document;
    let db = (0, db_1.getDb)();
    for (const k of Object.keys(data)) {
        let user = data[k];
        let userId = k;
        yield db.execute((0, drizzle_orm_1.sql) `insert into user_xp
      ( user_id, last_applied_time, current_xp, multiplier, pentalty_count )
        VALUES (${BigInt(userId)}, ${user.lastXpAppliedTimestamp}, ${user.currentXp}, ${user.multiplier}, ${user.penaltyCount})
      ON DUPLICATE KEY UPDATE
        last_applied_time = ${user.lastXpAppliedTimestamp}, 
        current_xp = ${user.currentXp}, 
        multiplier = ${user.multiplier}, 
        pentalty_count = ${user.penaltyCount};`);
        yield db.insert(db_2.users).values({
            id: BigInt(userId),
            username: user.username,
        });
    }
}))();
