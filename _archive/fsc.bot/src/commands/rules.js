const helpText = `
  Command: rules
  Description: A list of parody rules.
`;

module.exports = {
  command: "rules",
  isEnabled: true,
  helpText,
  shouldCleanup: false,
  fn: async msg => {
    const rules = [
        "Rule #3: do not take any kind of child care advice from Diamond."
    ];

    return msg.channel.send(rules[Math.floor(Math.random() * rules.length)]);
  },
};
