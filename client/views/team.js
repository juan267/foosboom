Template.team.helpers({
  isEditingTeam: function() {
    return Session.get('isEditingTeam') === this._id
  }
})


Template.team.events({
   'click a.remove': function(event, tpl) {
     event.preventDefault()

     Teams.remove(this._id)
     // var team = Teams.findOne({_id: this._id})
     // if (team) {
     //   Teams.remove(team._id)
     // }
   },
   'click a.edit': function(event, tpl) {
      event.preventDefault()
      Session.set("isEditingTeam", this._id)
   },
   'click a.cancel': function(event, tpl) {
      event.preventDefault()
      Session.set("isEditingTeam", false)
   },
   'submit form.form-edit': function(event, tpl) {
      event.preventDefault()
      var teamId = this._id
      var teamName = event.target.name.value
      var team = this

      Meteor.call('teamEdit', team._id, teamName, function(error, response) {
        if (error) {
          alert(error)
          Session.set('isEditingTeam', teamId)
          Tracker.afterFlush(function() {
            event.target.name.value = teamName
          })
        } else {
          console.log(response)
        }
      })
     Session.set("isEditingTeam", false)
   }
});
