"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const faunadb = __importStar(require("faunadb"));
const q = faunadb.query;
class FaunaService {
    constructor(faunaSecret) {
        this.serverClient = new faunadb.Client({ secret: faunaSecret });
    }
    createRecord(collectionName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let record = yield this.serverClient.query(q.Create(q.Collection(collectionName), { data }));
            let recordData = record.data;
            recordData.id = record.ref.id;
            return recordData;
        });
    }
    getRecordByIndex(indexName, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let record = yield this.serverClient.query(q.Get(q.Match(q.Index(indexName), value)));
                let recordData = record.data;
                recordData.id = record.ref.id;
                return recordData;
            }
            catch (err) {
                console.error('FaunaService.getRecordByIndex:', err.toString());
            }
        });
    }
    deleteRecord(collectionName, recordId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.serverClient.query(q.Delete(q.Ref(q.Collection(collectionName), recordId)));
        });
    }
    updateRecord(collectionName, recordId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let updated = yield this.serverClient.query(q.Update(q.Ref(q.Collection(collectionName), recordId), {
                    data: updates
                }));
                let recordData = updated.data;
                recordData.id = updated.ref.id;
                return recordData;
            }
            catch (err) {
                console.error('FaunaService.updateRecord:', err.toString());
            }
        });
    }
}
exports.default = FaunaService;
