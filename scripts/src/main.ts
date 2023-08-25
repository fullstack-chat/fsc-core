import { config } from 'dotenv'
config()

import FaunaService from "./FaunaService";
import { getDb } from './db';
import { sql } from 'drizzle-orm';
import { users } from 'db';

(async () => {
  const rowKey = 'xpdata'

  // FaunaDB Implementation
  let indexName = "idxByKey"

  // Grab data from fauna
  let _faunaService = new FaunaService(process.env.FAUNA_SECRET);
  let record = await _faunaService.getRecordByIndex(indexName, rowKey);
  let data = record.document

  let db = getDb()

  for(const k of Object.keys(data)) {
    let user = data[k]
    let userId = k

    await db.execute(sql`insert into user_xp
      ( user_id, last_applied_time, current_xp, multiplier, pentalty_count )
        VALUES (${BigInt(userId)}, ${user.lastXpAppliedTimestamp}, ${user.currentXp}, ${user.multiplier}, ${user.penaltyCount})
      ON DUPLICATE KEY UPDATE
        last_applied_time = ${user.lastXpAppliedTimestamp}, 
        current_xp = ${user.currentXp}, 
        multiplier = ${user.multiplier}, 
        pentalty_count = ${user.penaltyCount};`);

    await db.insert(users).values({
      id: BigInt(userId),
      username: user.username,
    });
  }
})();