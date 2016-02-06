Template.games.helpers({
  games: function () {
    return Games.find()
  },
  isCreatingGame: function() {
    return Session.get('isCreatingGame')
  },
  teams: function  () {
    return Teams.find()
  }
});

Template.games.events({
  'click a.create': function (event, tpl) {
    event.preventDefault()
    Session.set('isCreatingGame', true)
  },
  'click a.cancel': function (event, tpl) {
    event.preventDefault();
    Session.set('isCreatingGame', false)
  },
  'submit form.form-create': function (event, tpl) {
    event.preventDefault();

    var teamOne = Teams.findOne(event.target.teamOne.value)
    var teamTwo = Teams.findOne(event.target.teamTwo.value)


    Meteor.call('gamesInsert', teamOne._id, teamTwo._id, function(error, response){

      if (error) {
        alert(error.reason);
        Session.set('isCreatingGame', true)
        Tracker.afterFlush(function(){
          tpl.$("select[name=teamOne]").val(teamOne._Id);
          tpl.$("select[name=teamTwo]").val(teamTwo._Id);
        })
      };
    })

    // var game = {
    //   compleated: false,
    //   createdAt: new Date,
    //   ownerId: Meteor.userId(),
    //   teams: [
    //     {
    //       name: teamOne.name,
    //      _id: teamOne._id,
    //       score: 0
    //     },
    //     {
    //       name: teamTwo.name,
    //      _id: teamTwo._id,
    //       score: 0
    //     }
    //   ]
    // }

    // var gameId = Games.insert(game)

    // // Add this game to both teams gameIds
    // Teams.update({_id: teamOne._id}, {$addToSet: { gameIds: gameId}});
    // Teams.update({_id: teamTwo._id}, {$addToSet: { gameIds: gameId}});

    Session.set("isCreatingGame", false)
  }
});
