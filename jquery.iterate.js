"use strict";

(function( $ )
{
	$.fn.iterate = function(callback, options)
	{
		return jQuery.iterate( this, callback, options);
	};

	$.fn.iterate.defaults = {
		time    : 0,
		start   : function(total){},
		each    : function(index, total){},
		complete: function(){}
	};

	$.extend({
		iterate : function(obj, callback, options)
		{

			let settings = $.extend( {}, $.fn.iterate.defaults, options);
			let func = settings.time == 0 ? setTimeoutInstant : setTimeout;

			let iter = {};
			iter.deferred = $.Deferred();
			iter.keys = Object.keys(obj);
			iter.value;
			iter.length = obj.length || iter.keys.length;
			iter.index = 0;
			iter.stopIterating = function() {
				iter.index = iter.length
			};

			settings.start(iter.length);
			let iterator = function() {
				if(iter.index < iter.length) {
					let tmp = window.stopIterating;
					window.stopIterating = iter.stopIterating;
					iter.value = callback.call( obj[ iter.keys[iter.index] ], iter.keys[iter.index], obj[ iter.keys[iter.index] ], iter.length );
					window.stopIterating = tmp;
					settings.each((iter.index+1), iter.length);
					if ( iter.value === false ) {
						iter.deferred.fail();
						return obj;
					}
					iter.index++;
					func(iterator, settings.time);
				}
				else {
					settings.complete();
					iter.deferred.resolve();
					return obj;
				}
			};
			func(iterator, settings.time);
			return iter.deferred;

		}
	});
})( jQuery );

(function() {
	var timeouts = [];
	var messageName = "instant-timeout-message";

	function setTimeoutInstant(fn, time) {
		timeouts.push(fn);
		window.postMessage(messageName, "*");
	}

	function handle(event) {
		var src  = event.source || event.srcElement || event.originalEvent.source;
		var data = event.data   || event.originalEvent.data;

		if (src == window && data == messageName) {
			event.stopPropagation();
			if (timeouts.length > 0) {
				var fn = timeouts.shift();
				fn();
			}
		}
	}

	window.addEventListener("message", handle, true);

	// Add the one thing we want added to the window object.
	window.setTimeoutInstant = setTimeoutInstant;
})();
