Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Meteor.Router.add({
	'/tips': 'tips',
	'/waterstand': 'waterstand',
	'/mijneenden': 'mijneenden',
	'/uci': 'uci',
	'/': 'home',
	'*': 'home'
});

Meteor.subscribe("uci");
Meteor.subscribe("ploegen");

Meteor.startup(function () {

});

function hideAddressBar() {
	if(!window.location.hash) {
		if(document.height <= window.outerHeight + 10)  {
			document.body.style.height = (window.outerHeight + 50) +'px';
			setTimeout( function(){ window.scrollTo(0, 1); }, 50 );
		} else {
			setTimeout( function(){ window.scrollTo(0, 1); }, 0 );
		}
	}
}

if (Meteor.isClient) {
	window.addEventListener("load", hideAddressBar );
	window.addEventListener("orientationchange", hideAddressBar );
}

if (Meteor.isServer) {
	// process.env.MAIL_URL="smtp://support%40editoo.nl:pass@smtp.gmail.com:465/";
}

wedstrijden = [{datum: "27/4/14", wedstrijd: "Luik-Bastenaken-Luik"},
{datum: "29/4/14", wedstrijd: "Ronde van Romandi&euml;"},
{datum: "30/4/14", wedstrijd: "Ronde van Romandi&euml;"},
{datum: "1/5/14", wedstrijd: "Ronde van Romandi&euml;"},
{datum: "2/5/14", wedstrijd: "Ronde van Romandi&euml;"},
{datum: "3/5/14", wedstrijd: "Ronde van Romandi&euml;"},
{datum: "4/5/14", wedstrijd: "Ronde van Romandi&euml;"},
{datum: "9/5/14", wedstrijd: "Ronde van Itali&euml;"},
{datum: "10/5/14", wedstrijd: "Ronde van Itali&euml;"},
{datum: "11/5/14", wedstrijd: "Ronde van Itali&euml;"},
{datum: "12/5/14", wedstrijd: "Ronde van Itali&euml;"},
{datum: "13/5/14", wedstrijd: "Ronde van Itali&euml;"},
{datum: "14/5/14", wedstrijd: "Ronde van Itali&euml;"},
{datum: "15/5/14", wedstrijd: "Ronde van Itali&euml;"},
{datum: "16/5/14", wedstrijd: "Ronde van Itali&euml;"},
{datum: "17/5/14", wedstrijd: "Ronde van Itali&euml;"},
{datum: "18/5/14", wedstrijd: "Ronde van Itali&euml;"},
{datum: "19/5/14", wedstrijd: "Ronde van Itali&euml;"},
{datum: "20/5/14", wedstrijd: "Ronde van Itali&euml;"},
{datum: "21/5/14", wedstrijd: "Ronde van Itali&euml;"},
{datum: "22/5/14", wedstrijd: "Ronde van Itali&euml;"},
{datum: "23/5/14", wedstrijd: "Ronde van Itali&euml;"},
{datum: "24/5/14", wedstrijd: "Ronde van Itali&euml;"},
{datum: "25/5/14", wedstrijd: "Ronde van Itali&euml;"},
{datum: "26/5/14", wedstrijd: "Ronde van Itali&euml;"},
{datum: "27/5/14", wedstrijd: "Ronde van Itali&euml;"},
{datum: "28/5/14", wedstrijd: "Ronde van Itali&euml;"},
{datum: "29/5/14", wedstrijd: "Ronde van Itali&euml;"},
{datum: "30/5/14", wedstrijd: "Ronde van Itali&euml;"},
{datum: "31/5/14", wedstrijd: "Ronde van Itali&euml;"},
{datum: "1/6/14", wedstrijd: "Ronde van Itali&euml;"},
{datum: "8/6/14", wedstrijd: "Crit&eacute;rium du Dauphin&eacute;"},
{datum: "9/6/14", wedstrijd: "Crit&eacute;rium du Dauphin&eacute;"},
{datum: "10/6/14", wedstrijd: "Crit&eacute;rium du Dauphin&eacute;"},
{datum: "11/6/14", wedstrijd: "Crit&eacute;rium du Dauphin&eacute;"},
{datum: "12/6/14", wedstrijd: "Crit&eacute;rium du Dauphin&eacute;"},
{datum: "13/6/14", wedstrijd: "Crit&eacute;rium du Dauphin&eacute;"},
{datum: "14/6/14", wedstrijd: "Crit&eacute;rium du Dauphin&eacute;/Ronde van Zwitserland"},
{datum: "15/6/14", wedstrijd: "Crit&eacute;rium du Dauphin&eacute;/Ronde van Zwitserland"},
{datum: "16/6/14", wedstrijd: "Ronde van Zwitserland"},
{datum: "17/6/14", wedstrijd: "Ronde van Zwitserland"},
{datum: "18/6/14", wedstrijd: "Ronde van Zwitserland"},
{datum: "19/6/14", wedstrijd: "Ronde van Zwitserland"},
{datum: "20/6/14", wedstrijd: "Ronde van Zwitserland"},
{datum: "21/6/14", wedstrijd: "Ronde van Zwitserland"},
{datum: "22/6/14", wedstrijd: "Ronde van Zwitserland"},
{datum: "5/7/14", wedstrijd: "Ronde van Frankrijk"},
{datum: "6/7/14", wedstrijd: "Ronde van Frankrijk"},
{datum: "7/7/14", wedstrijd: "Ronde van Frankrijk"},
{datum: "8/7/14", wedstrijd: "Ronde van Frankrijk"},
{datum: "9/7/14", wedstrijd: "Ronde van Frankrijk"},
{datum: "10/7/14", wedstrijd: "Ronde van Frankrijk"},
{datum: "11/7/14", wedstrijd: "Ronde van Frankrijk"},
{datum: "12/7/14", wedstrijd: "Ronde van Frankrijk"},
{datum: "13/7/14", wedstrijd: "Ronde van Frankrijk"},
{datum: "14/7/14", wedstrijd: "Ronde van Frankrijk"},
{datum: "15/7/14", wedstrijd: "Ronde van Frankrijk"},
{datum: "16/7/14", wedstrijd: "Ronde van Frankrijk"},
{datum: "17/7/14", wedstrijd: "Ronde van Frankrijk"},
{datum: "18/7/14", wedstrijd: "Ronde van Frankrijk"},
{datum: "19/7/14", wedstrijd: "Ronde van Frankrijk"},
{datum: "20/7/14", wedstrijd: "Ronde van Frankrijk"},
{datum: "21/7/14", wedstrijd: "Ronde van Frankrijk"},
{datum: "22/7/14", wedstrijd: "Ronde van Frankrijk"},
{datum: "23/7/14", wedstrijd: "Ronde van Frankrijk"},
{datum: "24/7/14", wedstrijd: "Ronde van Frankrijk"},
{datum: "25/7/14", wedstrijd: "Ronde van Frankrijk"},
{datum: "26/7/14", wedstrijd: "Ronde van Frankrijk"},
{datum: "27/7/14", wedstrijd: "Ronde van Frankrijk"},
{datum: "2/8/14", wedstrijd: "Cl&aacute;sica San Sebasti&aacute;n"},
{datum: "3/8/14", wedstrijd: "Ronde van Polen"},
{datum: "4/8/14", wedstrijd: "Ronde van Polen"},
{datum: "5/8/14", wedstrijd: "Ronde van Polen"},
{datum: "6/8/14", wedstrijd: "Ronde van Polen"},
{datum: "7/8/14", wedstrijd: "Ronde van Polen"},
{datum: "8/8/14", wedstrijd: "Ronde van Polen"},
{datum: "9/8/14", wedstrijd: "Ronde van Polen"},
{datum: "11/8/14", wedstrijd: "Eneco Tour (NL/B)"},
{datum: "12/8/14", wedstrijd: "Eneco Tour (NL/B)"},
{datum: "13/8/14", wedstrijd: "Eneco Tour (NL/B)"},
{datum: "14/8/14", wedstrijd: "Eneco Tour (NL/B)"},
{datum: "15/8/14", wedstrijd: "Eneco Tour (NL/B)"},
{datum: "16/8/14", wedstrijd: "Eneco Tour (NL/B)"},
{datum: "17/8/14", wedstrijd: "Eneco Tour (NL/B)"},
{datum: "23/8/14", wedstrijd: "Ronde van Spanje"},
{datum: "24/8/14", wedstrijd: "Ronde van Spanje / Vattenfall Cyclassics"},
{datum: "25/8/14", wedstrijd: "Ronde van Spanje"},
{datum: "26/8/14", wedstrijd: "Ronde van Spanje"},
{datum: "27/8/14", wedstrijd: "Ronde van Spanje"},
{datum: "28/8/14", wedstrijd: "Ronde van Spanje"},
{datum: "29/8/14", wedstrijd: "Ronde van Spanje"},
{datum: "30/8/14", wedstrijd: "Ronde van Spanje"},
{datum: "31/8/14", wedstrijd: "Ronde van Spanje / GP Ouest-France Plouay"},
{datum: "1/9/14", wedstrijd: "Ronde van Spanje"},
{datum: "2/9/14", wedstrijd: "Ronde van Spanje"},
{datum: "3/9/14", wedstrijd: "Ronde van Spanje"},
{datum: "4/9/14", wedstrijd: "Ronde van Spanje"},
{datum: "5/9/14", wedstrijd: "Ronde van Spanje"},
{datum: "6/9/14", wedstrijd: "Ronde van Spanje"},
{datum: "7/9/14", wedstrijd: "Ronde van Spanje"},
{datum: "8/9/14", wedstrijd: "Ronde van Spanje"},
{datum: "9/9/14", wedstrijd: "Ronde van Spanje"},
{datum: "10/9/14", wedstrijd: "Ronde van Spanje"},
{datum: "11/9/14", wedstrijd: "Ronde van Spanje"},
{datum: "12/9/14", wedstrijd: "Ronde van Spanje / GP van Quebec"},
{datum: "13/9/14", wedstrijd: "Ronde van Spanje"},
{datum: "14/9/14", wedstrijd: "Ronde van Spanje / GP van Montreal"},
{datum: "21/9/14", wedstrijd: "UCI Ploegentijdrit"},
{datum: "2/10/14", wedstrijd: "Ronde van Lombardije"}];
