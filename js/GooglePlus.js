var apiKey = 'AIzaSyD6waxLgpwHd0QXrExGwBMigr-01mQ4Lr4';
var googlePlusUrl = 'https://www.googleapis.com/plus/v1/people/107744372254752109523/activities/public?&key=' + apiKey + '&fields=items(title,published,updated,url,actor,verb,object)&callback=define';
define([googlePlusUrl], function(GooglePlus) {
	return GooglePlus;
});