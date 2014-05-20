jQuery( window ).load(function() { 
	/* Search Function!!!!! */
	/* Set the Search Path to the URL for the Profile View */
	var SearchPath = '/search-realtors';
	jQuery( "#submit-search" ).click(function() {
  		if (jQuery("#searchType").val() === "city") {
			window.location = SearchPath+'/'+jQuery('#search-term').val()+'/all/all';
		} else if (jQuery("#searchType").val() === "state") {
			window.location = SearchPath+'/all/'+jQuery('#search-term').val()+'/all';
		} else if (jQuery("#searchType").val() === "zip") {
			window.location = SearchPath+'/all/all/'+jQuery('#search-term').val();
		}
	});

	
	/* Code for Registration Page */
	if (jQuery("#user-register-form") !== undefined) {

		/* Setup Zip Code Auto-pop */
		jQuery(".form-item-field-business-address-und-0-locality").hide();
		jQuery(".form-item-field-business-address-und-0-administrative-area").hide();

	
		function is_int(value){ 
  			if ((parseFloat(value) == parseInt(value)) && !isNaN(value)) {
   	   		return true;
  			} else { 
   	   		return false;
  			} 
		}

		jQuery("#edit-field-business-address-und-0-postal-code").keyup(function() {
  			var el = jQuery(this);

			if ((el.val().length == 5) && (is_int(el.val()))) {
   			
   		 		jQuery.ajax({
  					url: "http://zip.elevenbasetwo.com",
  					cache: false,
  					dataType: "json",
  					type: "GET",
  					data: "zip=" + el.val(),
  					success: function(result, success) {

	    				jQuery(".form-item-field-business-address-und-0-locality").slideDown(); /* Show the fields */
   		 				jQuery(".form-item-field-business-address-und-0-administrative-area").slideDown();

    					jQuery("#edit-field-business-address-und-0-locality").val(result.city); /* Fill the data */
    					jQuery("#edit-field-business-address-und-0-administrative-area").val(result.state);

    					jQuery(".zip-error").hide(); /* In case they failed once before */

  					},
  					error: function(result, success) {

    					jQuery(".form-item-field-business-address-und-0-postal-code").append('<p class="zip-error">You entered an invalid zip code.</p>'); /* Throw Error*/

  					}

				});
 
  			}

		});
		
		/* Set-up Progress Bar */
		jQuery('#user-register-form').prepend('<div class="progress-wrap"><progress max="100" value="0" id="progress"></progress><div class="progress-message" id="progress-message">The form, it wants you.</div></div>');
		jQuery("#user-register-form input").keyup(function() {
  			
  			$("#myFormId").validity(function() {

			});
  			
			var numValid = 0;
			jQuery("#user-register-form input").each(function() {
   			 	if (this.validity.valid) {
   			 		numValid++;
	   	 		}
			});

			var progress = jQuery("#progress"),
   	 		progressMessage = jQuery("#progress-message");

			if (numValid == 0) {
   		 		progress.attr("value", "0");
			    progressMessage.text("The form, it wants you.");
			}
			if (numValid == 1) {
   		 		progress.attr("value", "20");
   		 		progressMessage.text("There you go, great start!");
			}
			if (numValid == 2) {
    			progress.attr("value", "40");
    			progressMessage.text("Nothing can stop you now.");
			}
			if (numValid == 3) {
    			progress.attr("value", "60");
    			progressMessage.text("You're basically a hero, right?");
			}
			if (numValid == 4) {
    			progress.attr("value", "80");
    			progressMessage.text("They are going to write songs about you.");
			}
			if (numValid == 5) {
    			progress.attr("value", "95");
    			progressMessage.text("SO CLOSE. PRESS THE THING.");
			}
  
		});
	}
});
