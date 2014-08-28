Uci = new Meteor.Collection("uci");
Ploegen = new Meteor.Collection("ploegen");

Ploegen.allow({
    insert: function (userId, ploeg) {
        return (Meteor.user().emails[0].address === ploeg.mail); // alleen eigen record kan worden toegevoegd ....
    },
    update: function (userId, ploeg, fields, modifier) {
        return (Meteor.user().emails[0].address === ploeg.mail); // alleen eigen record kan worden gewijzigd
    },
    remove: function (userId, ploeg) {
        return false; //je kunt geen ploeg verwijderen
    }
});

var NonEmptyString = Match.Where(function (x) {
    check(x, String);
    return x.length !== 0;
});

Meteor.methods({

});
