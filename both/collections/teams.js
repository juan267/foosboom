Teams = new Mongo.Collection('teams')

Teams.allow({
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
  teamEdit: function (teamId, teamName) {

    var team = Teams.findOne(teamId)
    if (team) {
      Teams.update(teamId, {$set: {name: teamName}}, function(error){
        if (!error) {
          var games = Games.find({_id: {$in: team.gameIds}})
          games.fetch().forEach(function(game){
            game.teams.map(function(team) {
              if (team._id == teamId) {
                team.name = teamName;
              }
              Games.update(game._id, {$set: {teams: game.teams}})
            })
          })
        }
      })
    } else {
      throw new Meteor.error("Team-does-not-exits", "this team doesent exist in the database")
    }
  }
});


