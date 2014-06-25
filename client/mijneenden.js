mijnploeg = function() {
    if (Meteor.user() != null) { // m.a.w. de gebruiker is ingelogd
        MijnPloeg = Ploegen.findOne({mail: Meteor.user().emails[0].address});
        if (MijnPloeg === undefined && typeof(Ploegen) === "object") {
            Ploegen.insert({
                mail: Meteor.user().emails[0].address,
                naam: Meteor.user().username,
                tegoed: 750,
                renners: [],
                geschiedenis: [{type: 'startgeld', rider: "", points: 750, datum: new Date()}]
            });
            MijnPloeg = Ploegen.findOne({mail: Meteor.user().emails[0].address});
        }
        return MijnPloeg;
    } else {
        return false;
    }
}

Template.mijneenden.under23 = function(dob) {
    if (parseInt(dob.substring(0,4)) > 1990) {
        return true;
    } else {
        return false;
    }
}

Template.mijneenden.toLowerCase = function(string) {
    return string.toLowerCase();
}

Template.mijneenden.toonRenners = function () {
    MijnPloeg = mijnploeg();
    if (typeof(MijnPloeg) === "object") {
        bedragtebesteden = MijnPloeg.tegoed;
        var br = [];
        MijnPloeg.renners.forEach(function(item) {
            br.push(item.rider);
        });
        return Uci.find({points: {$lt: (bedragtebesteden+1)}, rider: { $nin: br} },{sort: {rank: 1}});
    } else {
        return false;
    }
    // return Uci.find();
};

Template.mijneenden.riderDetails = function(naam, gewenstewaarde) {
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

Template.mijneenden.mijntotaal = function() {
    MijnPloeg = mijnploeg();
    if (typeof(MijnPloeg) === "object") {
        var totaalpunten = Template.mijneenden.opdebank();
        MijnPloeg.renners.forEach(function(item) {
            rijdermetDetails = Template.mijneenden.riderDetails(item.rider);
            totaalpunten += rijdermetDetails.points;
        });
        return totaalpunten;
    } else {
        return 0;
    }
}

Template.mijneenden.opdebank = function() {
    MijnPloeg = mijnploeg();
    return MijnPloeg.tegoed;
}

Template.mijneenden.toLowerCase = function(string) {
    return string.toLowerCase();
}

Template.mijneenden.toonMijnRenners = function() {
    MijnPloeg = mijnploeg();
    if (typeof(MijnPloeg) === "object") {
        MijnUitvoer = [];
        Renners = [];
        MijnPloeg.renners.forEach(function(item) {
            Renners.push(item.rider);
        })
        MijnUitvoer = Uci.find({"rider": {$in: Renners}},{sort: {rank: 1, points: -1}}).fetch();
        /*
        MijnPloeg.renners.forEach(function(item) {
            MijnUitvoer.push(Template.mijneenden.riderDetails(item.rider));
        })
        */
        return MijnUitvoer;
    } else {
        return [];
    }
}

Template.mijneenden.toonMijnTransacties = function() {
    MijnPloeg = mijnploeg();
    if (typeof(MijnPloeg) === "object") {
        MijnUitvoer = [];
        MijnPloeg.geschiedenis.forEach(function(item) {
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

Template.mijneenden.events({
    'dblclick .rennerselectable': function (event, template) {
        MijnPloeg = mijnploeg();
        var aantal = MijnPloeg.renners.length;
        if (aantal > 9) {
            alert("Je ploeg kan maar 10 rijders hebben.");
            return false;
        }
        if (MijnPloeg.tegoed < this.points) {
            alert("Je kunt deze renner niet betalen.");
            return false;
        }
        var hasGerman = false;
        var hasUnder23 = false;
        MijnPloeg.renners.forEach(function(item) {
            if(item.nationality === "GER") {
                hasGerman = true;
            }
            if (parseInt(item.dob.substring(0,4)) > 1990) {
                hasUnder23 = true;
            }
        });
        if (aantal > 7 && !hasGerman && this.nationality !== "GER") {
            alert("Je moet minimaal 1 Duitser in je ploeg selecteren.");
            return false;
        }
        if (aantal > 8 && !hasUnder23 && parseInt(this.dob.substring(0,4)) < 1991) {
            alert("Je moet minimaal 1 renner onder de 23 in je ploeg selecteren.");
            return false;
        }
        var w = Template.mijneenden.Iswedstrijddag();
        if (w !== false) {
            alert("Vandaag is "+w+" en kan er dus niet gekocht worden.");
            return false;
        }
        // controleren of deze renner eerder is verkocht - maar niet vandaag ....
        var eerdertransactie = Ploegen.findOne({mail: Meteor.user().emails[0].address, "geschiedenis.type": 'verkoop', "geschiedenis.rider": this.rider});
        if (eerdertransactie !== undefined) {
            // de betreffende transactie vinden ...
            var et = {};
            var zw = this.rider;
            eerdertransactie.geschiedenis.forEach(function(item){
                 if (item.type === 'verkoop' && item.rider === zw) {
                    et = item;
                    return;
                }
            });
            var m = et.datum.getMonth()+1;
            verkoopdatum = et.datum.getDate()+"/"+m+"/"+String(et.datum.getFullYear()).substr(2,2);

            if (ds !== verkoopdatum) {
                alert("Je hebt deze renner eerder verkocht op "+verkoopdatum+" en kunt hem niet opnieuw kopen");
                return false;
            } else {
                console.log(ds +"==="+ verkoopdatum);
            }
        }
        Ploegen.update({_id: MijnPloeg._id},{
            $push: {
                renners: {rider: this.rider, nationality: this.nationality, dob: this.dob},
                geschiedenis: {type: 'aankoop', rider: this.rider, points: (-1 * this.points), datum: new Date()}
            },
            $inc: { tegoed: (-1*this.points)}
        });
     },
    'dblclick .verkoop': function (event, template) {
        // controleren of vandaag geen wedstrijd dag is ...
        var w = Template.mijneenden.Iswedstrijddag();
        if (w !== false) {
            alert("Vandaag is "+w+" en kan er dus niet verkocht worden.");
            return false;
        }
        if (confirm('Weet je zeker dat je '+this.rider+' wilt verkopen?')) {
            Ploegen.update({_id: MijnPloeg._id},{
            $pull: {
                renners: {rider: this.rider, nationality: this.nationality, dob: this.dob}
            },
            $push: {
                geschiedenis: {type: 'verkoop', rider: this.rider, points: this.points, datum: new Date()}
            },
            $inc: { tegoed: this.points}
        });
        }
    }
});

Template.mijneenden.Iswedstrijddag = function() {
    // controleren of vandaag geen wedstrijd dag is ...
    var vandaagwedstrijddag = false;
    var d = new Date();
    var dm = d.getMonth()+1;
    ds = d.getDate()+"/"+dm+"/"+String(d.getFullYear()).substr(2,2);
    var dituur = d.getHours();
    wedstrijden.forEach(function(wedstrijddag){
        //if (ds == wedstrijddag.datum && dituur > 10 && dituur < 21) {
        if (ds == wedstrijddag.datum) {
            vandaagwedstrijddag = wedstrijddag.wedstrijd;
        }
    });
    return vandaagwedstrijddag;
}
