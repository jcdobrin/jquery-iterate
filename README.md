# jquery-iterate

# Overview

This plugin provides a iterate function similar to jQuery .each however
this function is async and does not lock the javascript main thread. 
This allows for updating the page while the loop is running and prevents
unresponsive script errors from larger loops.

# Getting Started

Before you begin, make sure you have a copy of jQuery 1.3 or 
greater installed on your system/website.

   <script type="text/javascript" src="jquery-1.3.1.js"></script>

## Add Your Script Tags

   <script type="text/javascript" src="jquery.iterate.js"></script>

# Usage and API

.iterate works almost identical with .each except that .iterate is async so code will continute to execute after the loop. To make up for this .iterate returns a deferred as well as uses callbacks. so you can replace a .each with a .iterate but any code that needs to execute after the loop completes will need to be put in a callback or use the deferred returned by iterate. Also note that .iterate is slower than .each, so unless you really want the ability to run code while running a loop or you somehow managed to create a loop that gives a unresponsive script error your probably just use .each instead.

###simple example to change .each to .iterate
change

...
$obj.each(callback)
...
 
 to
 
...
$obj.iterate(callback).always(function() {
...
});

however you should probably refactor code to properly use defer.


## Methods

### `jQuery.iterate(object, callback, options)`
### `$object.iterate(callback, options)`
* `$object` - jQuery iteratable object
* `object` - Iteratable object/array
* `callback` - function to be called on each element in array
* `options` - array of options for iterate. See below for array
* * `time`:int (default:0) - amount of time between each loop callback. Note that time 0 is much faster than setting a larger time, so you should only change time if your writing code the loops slowly for demonstrative purposes.
* * `start`:callback (default: function(total){}) - function called at start of loop. Is passed the total number of items used in loop
* * `each`:callback (default: function(index, total){}) - function called after each loop callback, passed the index of the loop and total. Useful for separating webpage GUI manipulation from loop callback
* * `complete`:callback (default: function(){}) - function called after looping is completed, useful for cleanup code.

* `@return` - function returns a $.Deferred() that will fail if a loop callback fails and resolves once looping is completed. 

# License and Copyright

The source code for the site is licensed under the MIT license, which you can find in the MIT-LICENSE.txt file.
