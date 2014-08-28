Accounts.config({
	forbidClientAccountCreation: true
});

Meteor.publish("uci", function () {
	c = Uci.find({}, {sort: {rank: 1, name: 1}});
	console.log(c.count());
	return c;
});

Meteor.publish("ploegen", function () {
	return Ploegen.find();
});
