eerstePloegleider = new Meteor.Collection(null);

Template.waterstand.toonStand = function() {
	var Waterstand = new Meteor.Collection(null); // de uiteindelijke stand is een lokale collectie!

	var tussenr = Ploegen.find({});
	tussenr.forEach(function(item) {
		var punten = item.tegoed;
		item.renners.forEach(function(rennernaam) {
			punten += Uci.findOne({rider: rennernaam.rider}).points;
		});

		var newItem = {
			Ploegleider: item.naam,
			mail: item.mail,
			points: punten
		}
		if (item.renners.length > 0) {
			Waterstand.insert(newItem);
		}
	});
	var lijst = [];
	var rank = 1;
	var bekeken = 1;
	var oldpoints = 0;
	Waterstand.find({}, {sort: {points: -1, Ploegleider: 1}}).forEach(function(item) {
		//console.log(item.points);
		if (bekeken == 1) {
			// dit is de leider ...
			eerstePloegleider.insert({naam:item.Ploegleider});
		}
		if (item.points < oldpoints) {
			item.rank = bekeken;
		} else if (bekeken == 1) {
			item.rank = bekeken;
		} else {
			item.rank = "";
		}
		bekeken += 1;
		oldpoints = item.points;
		lijst.push(item);
	})
	return lijst;
}

Template.waterstand.geselecteerdePloegleider = function() {
	d = eerstePloegleider.findOne();
	if (typeof(d) === "object") {
		return d.naam;
	} else {
		return "";
	}
}

Template.waterstand.geselecteerdePloeg = function() {
	d = eerstePloegleider.findOne();
	if (typeof(d) === "object") {
		pl = d.naam;
		Renners = [];
		Ploegen.findOne({naam:pl}).renners.forEach(function(item) {
			Renners.push(item.rider);
		})
		ploeglijst = Uci.find({"rider": {$in: Renners}},{sort: {rank: 1, points: -1}}).fetch();
		return ploeglijst;
	} else {
		return [];
	}
}

Template.waterstand.geselecteerdeTransacties = function() {
	d = eerstePloegleider.findOne();
	if (typeof(d) === "object") {
		pl = d.naam;
		MijnUitvoer = [];
		Ploegen.findOne({naam:pl}).geschiedenis.forEach(function(item) {
			// console.log(item.datum);
			var m = item.datum.getMonth()+1;
			if (m.length == 1) { m = "0"+m; }
			item.datum = item.datum.getDate()+"/"+m+"/"+String(item.datum.getFullYear()).substr(2,2);
			MijnUitvoer.push(item);
		})
		return MijnUitvoer;
	} else {
		return [];
	}
}

Template.waterstand.under23 = function(dob) {
	if (parseInt(dob.substring(0,4)) > 1990) {
		return true;
	} else {
		return false;
	}
}

Template.waterstand.toLowerCase = function(string) {
	return string.toLowerCase();
}

Template.waterstand.riderDetails = function(naam, gewenstewaarde) {
	var details = Uci.findOne({'rider':naam});
	if (gewenstewaarde == undefined) {
		return details;
	} else if (gewenstewaarde === 'dob') {
		return details.dob;
	} else if (gewenstewaarde === 'rank') {
		return details.rank;
	} else if (gewenstewaarde === 'team') {
		return details.team;
	} else if (gewenstewaarde === 'points') {
		return details.points;
	}
}

Template.waterstand.events({
	'click tr.ploeglijer': function (event, template) {
		oudePL = eerstePloegleider.findOne()._id;
		s = eerstePloegleider.remove({_id: oudePL});
		// console.log(s);
		eerstePloegleider.insert({naam:this.Ploegleider});
		return true;
	}
});
