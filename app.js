
/*SEARCH PAGE ITUNES API*/ 
//create a controller named iTunesController
//ensure the controller gets the view's scopeand the http service
var iTunesController = function($scope, $http) {
	//define the search function called by the form
 $scope.searchiTunes = function(artist){
		//use the jsonp callback function from the $http service, this will get around any limmitations for cross-domain scripting
		$http.jsonp('http://itunes.apple.com/search', {
			params: {
			'callback': 'JSON_CALLBACK',
			'term': artist
			}
			//returns a promise, when returned then perform an action
		}).then(onSearchComplete, onError)
	}
	//Get the data out of the response when search succeeds
	var onSearchComplete = function (response) {
		//Grab the data element from the search response
		$scope.data = response.data
		//store the songs into a separate variable so we can loop through them
		$scope.songs = response.data.results
	}
	//if there is an error, store that for viewing
	var onError = function(reason){
		$scope.error=reason;
	}
}

/*VOUCHERS PAGE FORM CONFIRMATION*/
	//Create array for amount:
	let vouchers = [];
	//Grab each amount on the checkboxes and set them to variables
	let five= document.getElementById('five');
	let ten = document.getElementById('ten');
	let fifteen = document.getElementById('fifteen');
/*when the user clicks submit, call the function*/ 
document.getElementById('submit-form').addEventListener('click', function(){
	confirmpurchase();
});
/*function: grabs the users input and displays it back on a message in the div element*/ 
function confirmpurchase(){
	/*grab the first name*/ 
	let firstName= document.getElementById('firstName').value;
	/*grab the email address*/
	let email= document.getElementById('email').value;
	/*if the user checks either five, ten or fifteen checkboxes, push the amount to the array*/ 
		if(five.checked == true){
		vouchers.push(5);
	}
		if(ten.checked == true){
		vouchers.push(10);
	}
		if(fifteen.checked == true){
		vouchers.push(15);
	}
	/*sum the contents of the array and assign it to a variable*/ 
	const totalprice = vouchers.reduce(function(a, b){
        return a + b;
    }, 0);
	/*grab the div and change the html content to display a message to the user confirming the payment process, email address, name for personalisation of the message and the amount they bought*/ 
	document.getElementById('amount-confirmation').innerHTML=`Thanks, ${firstName}. Your purchase amounts to £ ${totalprice}. A confirmation e-mail with the payment instructions has been sent to: ${email}`;
	/*reset the input of the form once submitted*/ 
	document.getElementById('form').reset();
}








