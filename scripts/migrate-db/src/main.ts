import { config } from 'dotenv'
config()

import FaunaService from "./FaunaService";
import { getDb } from './db';
import { sql } from 'drizzle-orm';
import { users, userXp } from './schema';
import XpRecord from './xp_record';

(async () => {
  const rowKey = 'xpdata'

  // FaunaDB Implementation
  let indexName = "idxByKey"

  // Grab data from fauna
  let _faunaService = new FaunaService(process.env.FAUNA_SECRET);
  // let record = await _faunaService.getRecordByIndex(indexName, rowKey);
  // let data = record.document

  let db = getDb()

  // for(const k of Object.keys(data)) {
  //   let user = data[k]
  //   let userId = k

  //   await db.execute(sql`insert into user_xp
  //     ( user_id, last_applied_time, current_xp, multiplier, pentalty_count )
  //       VALUES (${BigInt(userId)}, ${user.lastXpAppliedTimestamp}, ${user.currentXp}, ${user.multiplier}, ${user.penaltyCount})
  //     ON DUPLICATE KEY UPDATE
  //       last_applied_time = ${user.lastXpAppliedTimestamp},
  //       current_xp = ${user.currentXp},
  //       multiplier = ${user.multiplier},
  //       pentalty_count = ${user.penaltyCount};`);

  //   await db.insert(users).values({
  //     id: BigInt(userId),
  //     username: user.username,
  //   });
  // }

  let u = await db.query.users.findMany()
  let xp = await db.query.userXp.findMany()

  for(const user of u) {
    let xpData = xp.find(x => x.user_id === user.id)
    if(xpData) {
      let rec = new XpRecord({
        userId: user.id.toString(),
        lastAppliedTimestamp: xpData.last_applied_time ? xpData.last_applied_time : 0,
        currentXp: xpData.current_xp ? xpData.current_xp : 0,
        multiplier: xpData.multiplier ? xpData.multiplier : 1,
        penaltyCount: xpData.pentalty_count ? xpData.pentalty_count : 0,
        username: user.username ? user.username : ''
      })
      console.log(`inserting record for ${user.username}`)
      // await _faunaService.createRecord('user_xp', rec)
      await _faunaService.createRecord('users', {
        userId: user.id.toString(),
        username: user.username,
        tagline: user.tagline,
        img_url: user.img_url,
        website_url: user.website_url,
        twitter_url: user.twitter_url,
        facebook_url: user.facebook_url,
        instagram_url: user.instagram_url,
        twitch_url: user.twitch_url,
        threads_url: user.threads_url,
        is_public: user.is_public
      })
    }
  }
})();