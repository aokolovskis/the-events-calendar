jQuery( document ).ready( function ( $ ) {


	if ( AttendeesPointer ) {
		options = $.extend( AttendeesPointer.options, {
			close:function () {
				$.post( ajaxurl, {
					pointer:AttendeesPointer.pointer_id,
					action :'dismiss-wp-pointer'
				} );
			}
		} );

		$( AttendeesPointer.target ).pointer( options ).pointer( 'open' );
	}

	$( '#filter_attendee' ).on( 'keyup paste', function () {

		var search = jQuery( this ).val().toLowerCase();

		$( 'td.column-security' ).each( function ( i, e ) {
			var attendeeobj = jQuery( e );
			var attendee = attendeeobj.text().toLowerCase();
			var orderid = attendeeobj.prev( 'td' ).prev( 'td' ).prev( 'td' ).prev( 'td' ).children( 'a' ).text();
			var ticketid = attendeeobj.prev( 'td' ).text();

			if ( attendee.indexOf( search ) === 0 || orderid.indexOf( search ) === 0 || ticketid.indexOf( search ) === 0 ) {
				attendeeobj.parent( 'tr' ).show();
			} else {
				attendeeobj.parent( 'tr' ).hide();
			}
		} );

	} );


	$( '.tickets_checkin' ).click( function ( e ) {

		var obj = jQuery( this );

		var params = {
			action  :'tribe-ticket-checkin-' + obj.attr( 'data-provider' ),
			provider:obj.attr( 'data-provider' ),
			order_ID:obj.attr( 'data-attendee-id' )
		};

		$.post(
				ajaxurl,
				params,
				function ( response ) {
					if ( response.success ) {
						obj.parent( 'td' ).parent( 'tr' ).addClass( 'tickets_checked' );

						$( '#total_checkedin' ).text( parseInt( $( '#total_checkedin' ).text() ) + 1 );
					}
				},
				'json'
		);

		e.preventDefault();
	} );


	$( '.tickets_uncheckin' ).click( function ( e ) {

		var obj = jQuery( this );

		var params = {
			action  :'tribe-ticket-uncheckin-' + obj.attr( 'data-provider' ),
			provider:obj.attr( 'data-provider' ),
			order_ID:obj.attr( 'data-attendee-id' )
		};

		$.post(
				ajaxurl,
				params,
				function ( response ) {
					if ( response.success ) {
						obj.parent( 'span' ).parent( 'td' ).parent( 'tr' ).removeClass( 'tickets_checked' );
						$( '#total_checkedin' ).text( parseInt( $( '#total_checkedin' ).text() ) - 1 );
					}
				},
				'json'
		);

		e.preventDefault();
	} );

} );