/******************
	Dan's jQuery mobile guide:
	
	- On jQuery mobile, we use $(document).bind('pageinit') and not $(document).ready()
	- When switching pages on scripts, we use : $.mobile.changePage("dashboard.html", { transition: "fade" }); see docs for references
	- Since jQuery mobile uses HTML5 features, we can use localStorage method where we can save sessions

*******************/
		
		
		
		/* 
			The inbox page!
		*/
		function get_inbox(token){
			$.ajax({
				data: {'token': token},
				type: 'get',
				dataType: 'json',
				url: 'http://dev.gearfish.com/api/inbox',
				success: function(response){
					console.log(response)
				}
			});
		}
		
		$(document).bind('pageinit',function(event,data){
			/* check if token exists */
			
			check_token();
			
			$('#form-login').submit(function(e){

				var status = login();
				if(status){
					return false;
				}
				else{
					return true;
				}
				
			});
			
			$('.ui-alert-close').click(function(){
				hide_error();
			});
			$('#logout').click(function(){
				logout();
			});
			
		});
		
		/* 
			the login page!
		*/
		function login(){
			
			var username = $('#username').val();
			var password = $('#password').val();
				
			var login_data = {
				'username' : username,
				'password' : password,
				'subdomain': 'razer'
			}
				
			$.ajax({
				url: 'http://dev.gearfish.com/api/login',
				data: login_data,
				type: 'POST',
				dataType: 'json',
				success: function(response){
					console.log(response);
					if(response.error == 'invalid'){
						$('.ui-alert').slideDown();
						$('.ui-alert-subtitle').html(response.msg);
					}else{
						$('#token').val(response.token);
						localStorage.setItem('token',response.token);
						$.mobile.changePage("dashboard.html", {
							transition: "fade"
						});
					}
				},
				error: function(e){
					display_error(e);
				}
			});
							
			return true;
		}
		
		function logout(){
			$.ajax({
				url: 'http://dev.gearfish.com/api/logout',
				type: 'POST',
				dataType: 'json',
				success: function(response){
					console.log(response);
					clear_token();
					$.mobile.changePage("index.html", {
							transition: "fade"
						});
				},
				error: function(e){
					display_error(e);
				}
			});
		}
		
		function hide_error(){
			$('.ui-alert').slideUp('fast');
		}
		
		function display_error(mes){
			
		}
		
		function get_token(){
			var value = localStorage.getItem('token');
			console.log(value);
		}
		
		function clear_token(){
			localStorage.removeItem('token');
			console.log('Token Is Cleared');
		}
		
		function check_token(){
			if(localStorage.getItem('token') === null){
				$.mobile.changePage("index.html", {
					transition: "fade"
				});
			}
		}
		
		