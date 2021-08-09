//Command added by @dmdboi

const { getTimezoneOffset } = require('date-fns-tz')
const {  addHours } = require("date-fns")

const helpText = `
  Command: timezone
  Description: The 'xp' command can be used to fetch the users current Xp.
  Aliases: tz
  Subcommands: EST, MST, CET, PST, AEDT, CST
  Examples:
    - Input: !w tz EST
      Output: Your time: 13:50, Walter Time: 15:50, UTC: 19:50
`

module.exports = {
  command: 'timezone',
  isEnabled: false,
  helpText,
  aliases: ["tz"],
  fn: async msg => {
    let userTZ = msg.content.split(" ")[2]
    let userTZtoIANA = await convertTimezone(userTZ)

    //Get the offset from server location - guessing server is EST so -4
    let serverOffset = new Date().getTimezoneOffset()

    //Offset from User's Time from server Time
    let offsetMilli = getTimezoneOffset(userTZtoIANA, new Date())

    //Convert User's Offset from Milliseconds to Hours
    let userOffset = convertMS(offsetMilli)

    //Time of UTC 00:00
    let utcTime = addHours(new Date(), serverOffset)
    let userTime = addHours(utcTime, userOffset)

    let embed =     {
      color: 5814783,
      fields: [
        {
          name: "Your Time",
          value: userTime.toTimeString().split(" ")[0],
          inline: true
        },
        {
          name: "Walter Time",
          value: new Date().toTimeString().split(" ")[0],
          inline: true
        },
        {
          name: "UTC 00:00",
          value: utcTime.toTimeString().split(" ")[0],
          inline: true
        }
      ]
    }
    msg.channel.send({ embed: embed })

  }
}

function convertMS( milliseconds ) {
  let seconds = Math.floor(milliseconds / 1000);
  let minute = Math.floor(seconds / 60);
  let hour = Math.floor(minute / 60);
  return hour
}

//Why is time so difficult in JS?
function convertTimezone(timezone) {
  let object = timezones.find(item => item.tz == timezone)
  return object.IANA
}

//As most of our users are America/Europe based 
//I added those timezones first. As we grow, I'll add more to support them
const timezones = [
  {
    IANA: "America/New_York",
    tz: "EST",
  },
  {
    IANA: "Europe/paris",
    tz: "CET",
  },
  {
    IANA: "America/Los_Angeles",
    tz: "PST",
  },
  {
    IANA: "America/Chicago",
    tz: "CST"
  },
  {
    IANA: "America/Phoenix",
    tz: "MST"
  },
  {
    IANA: "Australia/Sydney",
    tz: "AEDT",
  },
]
