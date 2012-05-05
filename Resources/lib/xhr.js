function XHR(object){
	
	var xhr = Titanium.Network.createHTTPClient();	
	

	
	// On Load
	xhr.onload = function() {
		
		// Return XML Value
		object.success( this.responseXML );

	}
	xhr.onerror = function(e) {
        // Return error!
        alert('No Internet Connection!');

    }
    xhr.onreadystatechange = function() {
    	
    	
    }
    
    /* in milliseconds */
    xhr.timeout= 1000,  
   	
   	// Open Request
	xhr.open('GET', object.url);
   
	// Send Request
	xhr.send();	
	
}
exports = XHR;
