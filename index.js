$(document).ready(function(){
	$(".hidden").fadeIn(750);
});

jQuery(function ($, undefined) {
	$('#footer').terminal(function (command) {
		if (command !== '') {
			switch(command.toLowerCase()){
				case 'help':
					//var self = this;
					helpOutput(this);
					break;
				case 'whoami':
					whoamiOutput(this);
					break;
				case 'aleks':
					generalInformationOutput(this);
					break;
				case 'aleks -g': case 'aleks --github':
					githubOutput(this);
					break;
				case 'aleks -e': case 'aleks --email':
					emailOutput(this);
					break;
				default :
					if (command.toLowerCase().indexOf("sudo") >= 0) {
						this.echo("Come on you goofball, you know this isn't a unix shell");
					} else {
						try {
							var result = window.eval(command);
							if (result !== undefined) {
								this.echo(new String(result));
							}
						} catch (e) {
							this.error(new String(e) + ', if you need help just try yelling for a while');
						}
					}
					break;
			}
		} else {
			this.echo('');
		}
	}, {
			greetings: 'Type \'help\' for more instructions',
			name: 'JS_Trash',
			height: 200,
			prompt: 'root@PoorOpSec> '
		});
});

function helpOutput(context){
	context.echo("**************************************************");
	context.echo("List of custom commands");
	context.echo("help - gets you here so I guess you know this one");
	context.echo("whoami -  returns my name");
	context.echo("aleks [-e | --email | -g | --github] info");
	context.echo("Any valid js expression - it'll do the thing");
	context.echo("**************************************************");
};

function whoamiOutput(context){
	context.echo("•?((¯°·._.• αℓεкs zεмℓүαηsкιү •._.·°¯))؟•");
};

function emailOutput(context){
	context.echo("email:\nalekszemlyanskiy@gmail.com\nalekszem@uw.edu");
};

function githubOutput(context){
	context.echo("github:\nhttps://github.com/Paroxy")
};

function generalInformationOutput(context){
	var tech = ['C, C#, C++, Java, Python, Swift,', 'SQL, Postgresql, HTML, CSS, Javascript, jQuery,', 'ASP.NET, Node JS, Express, WPF, WinForms,', 'XML, JSON, Git, MatLab, FES, LabView, SolidWorks, AutoCAD,', 'ASPEN, Epicor, Salesforce, Microsoft Office suite(Word, Excel, Visio, Powerpoint, etc.) Windows, Linux, MacOS'];
	context.echo("Aleks Zemlyanskiy\nemail: alekszemlyanskiy@gmail.com\nlinkedin: https://www.linkedin.com/in/alekszem\ngithub: https://github.com/Paroxy");
	context.echo("Technologies I've at least googled:");
	for(var i = 0; i < tech.length; i++) context.echo(tech[i]);
};