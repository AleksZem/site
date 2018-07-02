$(document).ready(function(){
	$(".hidden").fadeIn(750);
});

jQuery(function ($, undefined) {
	$('#footer').terminal(function (command) {
		if (command !== '') {
			if(command.toLowerCase().indexOf("sudo")>=0){
				this.echo("Come on you goofball, you know this isn't a unix shell");
				return;
			}
			if(command === 'help'){
				this.echo("Okay I lied, I haven't built in any functionality at all at this point");
				return;
			}
			try {
				var result = window.eval(command);
				if (result !== undefined) {
					this.echo(new String(result));
				}
			} catch (e) {
				this.error(new String(e) + ', if you need help just try yelling for a while');
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