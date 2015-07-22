Meteor.startup(function() {

  Template.adminUserList.helpers({

    users() {
      return Meteor.users.find();
    },

    createdBy() {
      if (!!this.createdBy) {
        return this.createdBy.email;
      }
    },

    email() {
      return this.emails[0].address;
    },

    website() {
      return Websites.findOne({
        userId: this._id
      });
    }
    
  });

  Template.adminUserList.events({

    'submit #admin-create-user-form': function(e) {

      e.preventDefault();
      let email = $(e.target).find('#user-email').val();
      let password = $(e.target).find('#user-password').val();
      let domain = $(e.target).find('#user-domain').val();
      console.log(email, password, domain);

      if (email != '' && password != '' && domain !='') {
        Meteor.call('adminCreateUserAndWebsite', email, password, domain, function(err, result) {
          if (!err) {
            $(e.target).find('#user-email').val('');
            $(e.target).find('#user-domain').val('');
          }
        

        });
      }

    },

  });

});