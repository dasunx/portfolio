/*
--------------------------------
Ajax Contact Form
--------------------------------
+ https://github.com/pinceladasdaweb/Ajax-Contact-Form
+ A Simple Ajax Contact Form developed in PHP with HTML5 Form validation.
+ Has a fallback in jQuery for browsers that do not support HTML5 form validation.
+ version 1.0.1
+ Copyright 2014 Pedro Rogerio
+ Licensed under the MIT license
+ https://github.com/pinceladasdaweb/Ajax-Contact-Form
*/

(function ($, window, document, undefined) {
	'use strict';

	var $form = $('#contact-form');

	$form.submit(function (e) {
		// remove the error class
		$('.form-group').removeClass('has-error');
		$('.help-block').remove();
		document.getElementById('submit-btn').innerHTML = 'Sending';
		// get the form data
		var body = {
			name: $('input[name="form-name"]').val(),
			email: $('input[name="form-email"]').val(),
			subject: 'website contact',
			message: $('textarea[name="form-message"]').val()
		};

		var settings = {
			url: 'https://nodemail-server.herokuapp.com/api/invitation/contact',
			method: 'POST',
			timeout: 0,
			headers: {
				'Content-Type': ['application/json']
			},
			data: JSON.stringify({
				name: `${body.name}`,
				email: `${body.email}`,
				subject: 'contact',
				message: `${body.message}`
			})
		};

		$.ajax(settings)
			.done(function (response) {
				console.log(response);
				if (response.code != 200) {
					$form.html(
						'<div class="alert alert-danger">' +
							response.msg +
							'</div>'
					);
				} else {
					$form.html(
						'<div class="alert alert-success">' +
							response.msg +
							'</div>'
					);
				}
			})
			.fail(function (data) {
				document.getElementById('submit-btn').innerHTML = 'Try again';
				$form.html(
					'<div class="alert alert-danger">' +
						`something went wrong. please try again` +
						'</div>'
				);
			});
		// process the form
		// $.ajax({
		// 	type: 'POST',
		// 	url: 'http://localhost:5001/api/invitation/contact',
		// 	data: JSON.stringify(body),
		// 	dataType: 'application/json',
		// 	encode: true
		// })
		// 	.done(function (data) {
		// 		console.log(data);
		// 		// handle errors
		// 		if (!data.success) {
		// 			if (data.errors.name) {
		// 				$('#name-field').addClass('has-error');
		// 				$('#name-field')
		// 					.find('.col-lg-10')
		// 					.append(
		// 						'<span class="help-block">' +
		// 							data.errors.name +
		// 							'</span>'
		// 					);
		// 			}

		// 			if (data.errors.email) {
		// 				$('#email-field').addClass('has-error');
		// 				$('#email-field')
		// 					.find('.col-lg-10')
		// 					.append(
		// 						'<span class="help-block">' +
		// 							data.errors.email +
		// 							'</span>'
		// 					);
		// 			}

		// 			if (data.errors.subject) {
		// 				$('#subject-field').addClass('has-error');
		// 				$('#subject-field')
		// 					.find('.col-lg-10')
		// 					.append(
		// 						'<span class="help-block">' +
		// 							data.errors.subject +
		// 							'</span>'
		// 					);
		// 			}

		// 			if (data.errors.message) {
		// 				$('#message-field').addClass('has-error');
		// 				$('#message-field')
		// 					.find('.col-lg-10')
		// 					.append(
		// 						'<span class="help-block">' +
		// 							data.errors.message +
		// 							'</span>'
		// 					);
		// 			}
		// 		} else {
		// 			// display success message
		// 			$form.html(
		// 				'<div class="alert alert-success">' +
		// 					data.message +
		// 					'</div>'
		// 			);
		// 		}
		// 	})
		// 	.fail(function (data) {
		// 		// for debug
		// 		console.log(data);
		// 	});

		e.preventDefault();
	});
})(jQuery, window, document);
