Teams.attachSchema(new SimpleSchema({
  name: {
    type: String
  },

  ownerId: {
    type: String
  },

  gameIds: {
    type: [String],
    optional: true
  }
}));
