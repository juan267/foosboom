Games = new Mongo.Collection('games')

Games.allow({
  insert: function (userId, doc) {
    return (userId && doc.ownerId === userId);
  },
  update: function (userId, doc, fields, modifier) {
    return doc.ownerId === userId;
  },
  remove: function (userId, doc) {
    return doc.ownerId === userId;
  },
  fetch: ['ownerId']
});


Meteor.methods({
  gamesInsert: function (teamOneId, teamTwoId) {

    // check(Meteor.userId(), String);
    // check(teamOneId, String);
    // check(teamTwoId, String);
    var teamOne = Teams.findOne(teamOneId)
    var teamTwo = Teams.findOne(teamTwoId)

    if (!teamOne || !teamTwo) {
      throw new Meteor.Error("invalid-parameters", "One of the teams doesn't exist in the database");
    };

    var teamOneData = {
      _id: teamOne._id,
      name: teamOne.name,
      score: 0
    };

    var teamTwoData = {
      _id: teamTwo._id,
      name: teamTwo.name,
      score: 0
    };

    var game = {
      ownerId: Meteor.userId(),
      createdAt: new Date(),
      teams: [teamOneData, teamTwoData],
      completed: false
    }

    var gameId = Games.insert(game);

    Teams.update({_id: teamOneData._id}, {$addToSet: { gameIds: gameId}});
    Teams.update({_id: teamTwoData._id}, {$addToSet: { gameIds: gameId}});

    return gameId;
  }
});
