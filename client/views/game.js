Template.game.helpers({
  // isEditingGame: function () {
  //   return Session.get('isEditingGame') === this._id
  // }
});


Template.game.events({
  'click a.edit': function (event, tpl) {
    event.preventDefault()
    Session.set('isEditingGame', this._id)
  },
  'click a.finish': function (event, tpl) {
    event.preventDefault()
    Games.update(this._id, {$set: {completed: true}})
    // Session.set("isEditingGame", false)
  },
  'click a.delete': function (event, tpl) {
    event.preventDefault()
    var gameId = this._id
    var teamIdOne = this.teams[0]._id
    var teamIdTwow = this.teams[1]._id
    Games.remove(gameId, function(error) {
      if (!error) {
        Teams.update(teamIdOne, {$pull: {gameIds: gameId}})
        Teams.update(teamIdTwo, {$pull: {gameIds: gameId}})
      };
    })
  },
  'click a.score': function (event, tpl) {
    event.preventDefault()
    var index = "teams."+event.target.dataset.index+".score"
    var inc = Number(event.target.dataset.inc)
    var update = {}
    update.$inc = {}
    update.$inc[index] = inc
    // console.log(update)
    Games.update(this._id, update)
  }
  // 'click a.minus-teamOne': function (event, tpl) {
  //   event.preventDefault()
  //   Games.update(this._id, {$inc: {"teams.0.score": -1}})
  // }
});


660246550751
