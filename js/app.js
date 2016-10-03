window.Instagram = {
	config: {},
	BASE_URL : "https://api.instagram.com/v1",
	init: function(opt) {
		opt = opt || {};
		this.config.access_token = opt.access_token;
		this.config.client_id = opt.client_id;
	},

	// popular: function(callback){
	// 	var endpoint = this.BASE_URL + '/media/popular?client_id=' + this.config.client_id;
	// 	this.httpsGet(endpoint,callback);
	// },										depreciated

	tagsByName: function(name,callback){
		// https://api.instagram.com/v1/tags/{tag-name}?access_token=ACCESS-TOKEN
		// https://api.instagram.com/v1/tags/{tag-name}/media/recent?access_token=ACCESS-TOKEN
		// https://api.instagram.com/v1/tags/search?q=snowy&access_token=ACCESS-TOKEN
		var endpoint = this.BASE_URL + '/tags/search?q='+ name + '&access_token=' + this.config.access_token;
		this.httpsGet(endpoint,callback);
	},	

	location_media_search: function(name,callback){
		//https://api.instagram.com/v1/media/search?lat=48.858844&lng=2.294351&access_token=ACCESS-TOKEN   22°19'20.1"N 87°18'28.3
		var endpoint = this.BASE_URL + '/media/search?' + 'lat='+ name.lat + '&lng='+ name.longi + '&access_token=' + this.config.access_token;
		this.httpsGet(endpoint,callback);
	},
	// tag_likes: function(name,callback){
	// 	//https://api.instagram.com/v1/media/{media-id}/likes?access_token=ACCESS-TOKEN
	// 	var endpoint = this.BASE_URL + '/media/'+ name + '/likes?access_token=' + this.config.access_token;
	// 	this.httpsGet(endpoint,callback);
	// },															NOT WORKING

	// get_user_info: function(name,callback){
	// 	//https://api.instagram.com/v1/users/{user-id}/?access_token=ACCESS-TOKEN
	// 	var endpoint = this.BASE_URL + '/users/'+ name + '/?access_token=' + this.config.access_token;
	// 	this.httpsGet(endpoint,callback);
	// }, 															NOT WORKING

	httpsGet : function(url , callback){
		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'jsonp',
			success: function(response){
				if (typeof callback === 'function') callback (response);
			}
		});
	},
};

Instagram.init(
{
	access_token : '1964679894.829ec1c.5dd655d6382b4ec79b8ae99fb9c0eea5',
	client_id : '829ec1c96b2c47c7948d20d59e5c12a9'
})

$( document ).ready(function(){

	// var $instagram = $( '#instagram' );
 //    for ( var i = 0; i < response.data.length; i++ ) {
 //        imageUrl = response.data[i].images.low_resolution.url;
	// 	$instagram.append( '<img src="' + imageUrl + '" />' );
	// }

	// Instagram.tagsByName('batman',function(response){
	// 	var $instagram = $('#instagram');
	// });
// });

 $( '#form' ).on('submit', function( e ) {
        e.preventDefault();

        var tagName = $( '#search' ).val();
        Instagram.tagsByName(tagName, function( response ) {
            var $instagram = $( '#instagram' );
                $instagram.html('');

            for ( var i = 0; i < response.data.length; i++ ) {
                imageUrl = response.data[i].images.low_resolution.url;
                $instagram.append( '<img src="' + imageUrl + '" />' );
            }
        });

    });

});
