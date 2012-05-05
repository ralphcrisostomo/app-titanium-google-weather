var winCurrent = Ti.UI.currentWindow;

winCurrent.backgroundColor = '#DDD';

// Create Image
var imageLogo = Ti.UI.createImageView()
	imageLogo.image = '../images/logoBig.png';
	imageLogo.top = 30;
	imageLogo.height = 83;
	imageLogo.width = 250;
	
	winCurrent.add(imageLogo);

// Create a Label.
var label = Ti.UI.createLabel({
	text:'Created by: \n Ralph Crisostomo \n 19.02.2012 \n\n Tools: \n  TITANIUM STUDIO \n  \n\n http://ralphcrisostomo.net \n rrecrisostomo@gmail.com',
	color : '#000',
	font : {fontSize: 16 },
	width : 'auto',
	textAlign : 'center',
	top: 60,
});

// Add to the parent view.
winCurrent.add(label);


	// Back Button
	var buttonBack = Ti.UI.createButton({
			title:'Back',
			width:100,
			height:30,
			top:410
	})
	winCurrent.add(buttonBack);
	
	buttonBack.addEventListener('click',function(){
			winCurrent.close({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});	
	})
