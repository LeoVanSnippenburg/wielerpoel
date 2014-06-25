Template.uci.toonRenners = function () {
    return Uci.find({points: {$gt: 0}}, {sort: {rank: 1}});
};

Template.uci.under23 = function(dob) {
    if (dob && parseInt(dob.substring(0,4)) > 1990) {
        return true;
    } else {
        return false;
    }
}

Template.uci.toLowerCase = function(string) {
    if (string) {
        return string.toLowerCase();
    } else {
        return "";
    }
}
