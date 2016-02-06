Meteor.startup(function() {
  var dummyUserEmail = 'test@test.com'

  if (Meteor.users.find({"emails.address": dummyUserEmail}).count() === 0) {
    // create a test user
    var ownerId = Accounts.createUser({
      email: dummyUserEmail,
      password: "hola1234",
    })
  }
  if (Teams.find().count() === 0) {
    [
      {name: "Barcelona",
       gameIds: [],
       ownerId: ownerId
      },
      {name: "Juan Teams",
       gameIds: [],
       ownerId: ownerId
      },
      {name: "Real Madrid",
       gameIds: [],
       ownerId: ownerId
      }
    ].forEach(function(team) {
      Teams.insert(team)
    });
  }

  var team1 = Teams.find().fetch()[0]
  var team2 = Teams.find().fetch()[1]
  if (Games.find().count() === 0) {
    var game = {
      compleated: false,
      createdAt: new Date(),
      teams: [
        {name: team1.name, _id: team1._id, score: 0},
        {name: team2.name, _id: team2._id, score: 0}
      ],
      ownerId: ownerId,
    }
    var gameId = Games.insert(game)
  }

  Teams.update({_id: team1._id}, {$addToSet: { gameIds: gameId}});
  Teams.update({_id: team2._id}, {$addToSet: { gameIds: gameId}});
});
