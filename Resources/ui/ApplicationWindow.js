function ApplicationWindow(){

	// DECLARE DEPENDENCIES
	var XHR  = require('lib/xhr');
	
	// Window
	var win = Ti.UI.createWindow({
		backgroundColor:'#EEE'
	})
	
	
	// Search Text Field
	var textSearchCity = Ti.UI.createTextField({
		height : 35,
		top : 60,
		left : 20,
		width : 280,
		hintText : 'Enter a City',
		keyboardType : Ti.UI.KEYBOARD_DEFAULT,
		returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	// Listen for return events.
	textSearchCity.addEventListener('return', function(e) {
			textSearchCity.blur();
			labelCity.color = '#0F0';
			labelCity.text = 'LOADING...';
			
			
			// Process xmlHTTPRequest 
			new XHR({
				 url: "http://www.google.com/ig/api?weather=" + textSearchCity.value, 
				 success: function(xml){ 
				 		  	processXML(xml) 
				 }
			});
	});
	win.add(textSearchCity);
	
	
	// Information Button
	var buttonInformation = Ti.UI.createButton({
			title:'Info',
			width:100,
			height:30,
			top:410
	})
	win.add(buttonInformation);
	
	buttonInformation.addEventListener('click',function(){
		
			var winInformation = Ti.UI.createWindow({
				url: 'window/information.js'
			})
			
			winInformation.open({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
		
	})
	
	
	
	// DECLARE VAR
	var currentCity;
	var currentCondition;
	var currentHumidity;
	var currentWind;
	var currentHumidityWind;
	var currentF;
	var currentC;
	var currentIcon;
	
	var forecastDay 	= 	[];
	var forecastIcon	=	[];
	var forecastLow		=	[];
	var forecastHigh	=	[];
	
	function searchWeather(city){

	}
	
	// Process XML Data
	function processXML(xml){
		
		// Catch Error!
		if(xml.getElementsByTagName('problem_cause').length > 0){
			
			labelCity.color = '#F00';
			labelCity.text = 'NOT FOUND!';
		}else{
			labelCity.color = '#000';
		}
		
		
		// Current Condition XML
		currentCity 		= 	xml.getElementsByTagName('city').item(0).getAttribute('data');
		currentCondition 	= 	xml.getElementsByTagName('condition').item(0).getAttribute('data');
		currentF 			= 	xml.getElementsByTagName("temp_f").item(0).getAttribute('data') + '°F';
		currentC 			= 	xml.getElementsByTagName("temp_c").item(0).getAttribute('data') + '°C';
		currentIcon 		= 	"http://google.com" + xml.getElementsByTagName("icon").item(0).getAttribute('data');
		currentHumidity 	= 	xml.getElementsByTagName('humidity').item(0).getAttribute('data');
		currentWind 		= 	xml.getElementsByTagName('wind_condition').item(0).getAttribute('data');
		currentHumidityWind	= 	currentHumidity + ' | ' + currentWind;
		
		// Weather Forecast XML
		var forecast_condition = xml.getElementsByTagName("forecast_conditions");
		for (var i=0; i < forecast_condition.length; i++) {
			
			forecastDay[i]		= 	xml.getElementsByTagName("day_of_week").item(i).getAttribute('data');
			forecastIcon[i]		= 	"http://google.com" + xml.getElementsByTagName("icon").item(i).getAttribute('data');
			forecastLow[i] 		= 	xml.getElementsByTagName("low").item(i).getAttribute('data') + '°';
			forecastHigh[i] 	= 	xml.getElementsByTagName("high").item(i).getAttribute('data') + '°';

		};
		
		// Update With the New Information
		labelCity.text 					= 	currentCity.toUpperCase();
		labelCurrentCondition.text 		= 	currentCondition;
		labelCurrentTemp.text 			= 	currentC + '/' + currentF;
		labelCurrentHumidityWind.text	= 	currentHumidityWind;
		imageCurrentIcon.image 			= 	currentIcon;
		
		for (var i=0; i < forecast_condition.length; i++) {
		 	labelForecastDay[i].text	=	forecastDay[i];
		 	labelForecastTemp[i].text	=	forecastLow[i] + ' | ' + forecastHigh[i];
		 	imageForecastIcon[i].image	=	forecastIcon[i];
		};

	}
	

	

// INITIALIZE INTERFACE	
	
	// Views
	var viewWrapper = Ti.UI.createView({
		width:300,
		height:250,
		top: 160
	})
	
	var viewContainerCurrentIcon = Ti.UI.createView({
		width:65,
		height:65,
		borderColor:'#DDD',
		top:30,
		left:10
	})
	
	var viewContainerCurrentInfo = Ti.UI.createView({
		width:205,
		height:65,
		top:30,
		left:85
	})
	
	// Image
	var imageForecastIcon;
	var imageCurrentIcon = Ti.UI.createImageView({
		image : currentIcon,
		width : 55,
		height : 55
	});
	
	var imageLogo = Ti.UI.createImageView()
		imageLogo.image = 'images/logo.png';
		imageLogo.width	= 100;
		imageLogo.height = 33;
		imageLogo.top = 10;
		imageLogo.left = 200;
		
		win.add(imageLogo);

	// Weather Forecast Loop
	var viewContainerForecastIcon = [];	
	var viewContainerForecast = [];
	
	var labelForecastDay = [];
	var labelForecastTemp = [];
	var imageForecastIcon = [];

	
	// Fill Up Weather Forecast Data
	for (var i=0; i < 4; i++) {
		
		// Sample Image Icon
		imageForecastIcon[i] = Ti.UI.createImageView({
			image : forecastIcon[i],
			width : 55,
			height : 55
		});
	
		
		viewContainerForecast[i] = Ti.UI.createView({
			height:90,
			width:71,
			top:140,
			left:10 + (i *70)
		})
		
		viewContainerForecastIcon[i] = Ti.UI.createView({
			width:65,
			height:65,
			borderColor:'#DDD'
		})
		
		labelForecastDay[i] = Ti.UI.createLabel({
			text: 'DAY',
			font: {fontSize:10,fontFamily:'HelveticaNeue'},
			top: 0,
			height: 10,
			textAlign: 'center'
		})
		
		labelForecastTemp[i]= Ti.UI.createLabel({
			text: '0° | 0°',
			font : {fontSize:12,fontFamily:'HelveticaNeue'},
			top: 80,
			height: 12,
			textAlign: 'center'
		})
		
		viewContainerForecastIcon[i].add(imageForecastIcon[i]);
		viewContainerForecast[i].add(labelForecastDay[i]);
		viewContainerForecast[i].add(labelForecastTemp[i]);
		viewContainerForecast[i].add(viewContainerForecastIcon[i]);
		viewWrapper.add(viewContainerForecast[i]);
	};


	// Labels
	var fontCity = {fontSize:26,fontFamily:'Helvetica-Bold'};
	var fontHeader = {fontSize:14,fontFamily:'HelveticaNeue'};
	var fontCurrentTemp = {fontSize:36, fontFamily:'Helvetica-Bold'};
	var fontCurrentCondition = {fontSize:16, fontFamily: 'HelveticaNeue'};
	var fontCurrentHumidityWind = {fontSize:12, fontFamily:'HelveticaNeue'};
	
	var labelCity = Ti.UI.createLabel({
		text: 'CITY',
		font: fontCity,
		top:115,
		left:20,
		width:300,
		height:26
	})
	
	var labelCurrentConditionHeader = Ti.UI.createLabel({
		color:'#282828',
		text: 'Current Condition',
		font: fontHeader,
		top:0,
		left:10,
		width:'auto',
		height:16
	})
	
	var labelWeatherForcastHeader = Ti.UI.createLabel({
		text:'Weather Forecast',
		font:fontHeader,
		top:110,
		left:10,
		width:'auto',
		height:16,
		shadowColor: '#FFF'
	})
	
	var labelCurrentTemp = Ti.UI.createLabel({
		text : 'C°/F°',
		font : fontCurrentTemp,
		height : 30,
		top:0
	});

	var labelCurrentCondition = Ti.UI.createLabel({
		text : 'Current Conditon',
		font : fontCurrentCondition,
		height : 16,
		top : 33
	})
	
	var labelCurrentHumidityWind = Ti.UI.createLabel({
		text : 'Humidity: | Wind:',
		font : fontCurrentHumidityWind,
		color : '#999',
		height : 12,
		top: 50
	})

		
	// Add to Parent Views
	viewContainerCurrentIcon.add(imageCurrentIcon);
	
	viewContainerCurrentInfo.add(labelCurrentHumidityWind);
	viewContainerCurrentInfo.add(labelCurrentCondition);
	viewContainerCurrentInfo.add(labelCurrentTemp);
	
	viewWrapper.add(labelWeatherForcastHeader);
	viewWrapper.add(labelCurrentConditionHeader);
	viewWrapper.add(viewContainerCurrentIcon);
	viewWrapper.add(viewContainerCurrentInfo);
	
	win.add(labelCity);
	win.add(viewWrapper);
	win.open();

	
	return this;
}
exports	= ApplicationWindow;


