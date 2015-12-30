(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./vendor/modernizr');

},{"./vendor/modernizr":2}],2:[function(require,module,exports){
/*!
 * modernizr v3.2.0
 * Build http://modernizr.com/download?-csstransforms-pointerevents-touchevents-setclasses-dontmin-cssclassprefix:has
 *
 * Copyright (c)
 *  Faruk Ates
 *  Paul Irish
 *  Alex Sexton
 *  Ryan Seddon
 *  Patrick Kettner
 *  Stu Cox
 *  Richard Herrera

 * MIT License
 */

/*
 * Modernizr tests which native CSS3 and HTML5 features are available in the
 * current UA and makes the results available to you in two ways: as properties on
 * a global `Modernizr` object, and as classes on the `<html>` element. This
 * information allows you to progressively enhance your pages with a granular level
 * of control over the experience.
*/

;(function(window, document, undefined){
  var classes = [];


  var tests = [];


  /**
   *
   * ModernizrProto is the constructor for Modernizr
   *
   * @class
   * @access public
   */

  var ModernizrProto = {
    // The current version, dummy
    _version: '3.2.0',

    // Any settings that don't work as separate modules
    // can go in here as configuration.
    _config: {
      'classPrefix': "has-",
      'enableClasses': true,
      'enableJSClass': true,
      'usePrefixes': true
    },

    // Queue of tests
    _q: [],

    // Stub these for people who are listening
    on: function(test, cb) {
      // I don't really think people should do this, but we can
      // safe guard it a bit.
      // -- NOTE:: this gets WAY overridden in src/addTest for actual async tests.
      // This is in case people listen to synchronous tests. I would leave it out,
      // but the code to *disallow* sync tests in the real version of this
      // function is actually larger than this.
      var self = this;
      setTimeout(function() {
        cb(self[test]);
      }, 0);
    },

    addTest: function(name, fn, options) {
      tests.push({name: name, fn: fn, options: options});
    },

    addAsyncTest: function(fn) {
      tests.push({name: null, fn: fn});
    }
  };



  // Fake some of Object.create so we can force non test results to be non "own" properties.
  var Modernizr = function() {};
  Modernizr.prototype = ModernizrProto;

  // Leak modernizr globally when you `require` it rather than force it here.
  // Overwrite name so constructor name is nicer :D
  Modernizr = new Modernizr();



  /**
   * is returns a boolean if the typeof an obj is exactly type.
   *
   * @access private
   * @function is
   * @param {*} obj - A thing we want to check the type of
   * @param {string} type - A string to compare the typeof against
   * @returns {boolean}
   */

  function is(obj, type) {
    return typeof obj === type;
  }
  ;

  /**
   * Run through all tests and detect their support in the current UA.
   *
   * @access private
   */

  function testRunner() {
    var featureNames;
    var feature;
    var aliasIdx;
    var result;
    var nameIdx;
    var featureName;
    var featureNameSplit;

    for (var featureIdx in tests) {
      if (tests.hasOwnProperty(featureIdx)) {
        featureNames = [];
        feature = tests[featureIdx];
        // run the test, throw the return value into the Modernizr,
        // then based on that boolean, define an appropriate className
        // and push it into an array of classes we'll join later.
        //
        // If there is no name, it's an 'async' test that is run,
        // but not directly added to the object. That should
        // be done with a post-run addTest call.
        if (feature.name) {
          featureNames.push(feature.name.toLowerCase());

          if (feature.options && feature.options.aliases && feature.options.aliases.length) {
            // Add all the aliases into the names list
            for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {
              featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
            }
          }
        }

        // Run the test, or use the raw value if it's not a function
        result = is(feature.fn, 'function') ? feature.fn() : feature.fn;


        // Set each of the names on the Modernizr object
        for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
          featureName = featureNames[nameIdx];
          // Support dot properties as sub tests. We don't do checking to make sure
          // that the implied parent tests have been added. You must call them in
          // order (either in the test, or make the parent test a dependency).
          //
          // Cap it to TWO to make the logic simple and because who needs that kind of subtesting
          // hashtag famous last words
          featureNameSplit = featureName.split('.');

          if (featureNameSplit.length === 1) {
            Modernizr[featureNameSplit[0]] = result;
          } else {
            // cast to a Boolean, if not one already
            /* jshint -W053 */
            if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
              Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
            }

            Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;
          }

          classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));
        }
      }
    }
  }
  ;

  /**
   * docElement is a convenience wrapper to grab the root element of the document
   *
   * @access private
   * @returns {HTMLElement|SVGElement} The root element of the document
   */

  var docElement = document.documentElement;


  /**
   * A convenience helper to check if the document we are running in is an SVG document
   *
   * @access private
   * @returns {boolean}
   */

  var isSVG = docElement.nodeName.toLowerCase() === 'svg';


  /**
   * setClasses takes an array of class names and adds them to the root element
   *
   * @access private
   * @function setClasses
   * @param {string[]} classes - Array of class names
   */

  // Pass in an and array of class names, e.g.:
  //  ['no-webp', 'borderradius', ...]
  function setClasses(classes) {
    var className = docElement.className;
    var classPrefix = Modernizr._config.classPrefix || '';

    if (isSVG) {
      className = className.baseVal;
    }

    // Change `no-js` to `js` (independently of the `enableClasses` option)
    // Handle classPrefix on this too
    if (Modernizr._config.enableJSClass) {
      var reJS = new RegExp('(^|\\s)' + classPrefix + 'no-js(\\s|$)');
      className = className.replace(reJS, '$1' + classPrefix + 'js$2');
    }

    if (Modernizr._config.enableClasses) {
      // Add the new classes
      className += ' ' + classPrefix + classes.join(' ' + classPrefix);
      isSVG ? docElement.className.baseVal = className : docElement.className = className;
    }

  }

  ;

  /**
   * List of property values to set for css tests. See ticket #21
   * http://git.io/vUGl4
   *
   * @memberof Modernizr
   * @name Modernizr._prefixes
   * @optionName Modernizr._prefixes
   * @optionProp prefixes
   * @access public
   * @example
   *
   * Modernizr._prefixes is the internal list of prefixes that we test against
   * inside of things like [prefixed](#modernizr-prefixed) and [prefixedCSS](#-code-modernizr-prefixedcss). It is simply
   * an array of kebab-case vendor prefixes you can use within your code.
   *
   * Some common use cases include
   *
   * Generating all possible prefixed version of a CSS property
   * ```js
   * var rule = Modernizr._prefixes.join('transform: rotate(20deg); ');
   *
   * rule === 'transform: rotate(20deg); webkit-transform: rotate(20deg); moz-transform: rotate(20deg); o-transform: rotate(20deg); ms-transform: rotate(20deg);'
   * ```
   *
   * Generating all possible prefixed version of a CSS value
   * ```js
   * rule = 'display:' +  Modernizr._prefixes.join('flex; display:') + 'flex';
   *
   * rule === 'display:flex; display:-webkit-flex; display:-moz-flex; display:-o-flex; display:-ms-flex; display:flex'
   * ```
   */

  var prefixes = (ModernizrProto._config.usePrefixes ? ' -webkit- -moz- -o- -ms- '.split(' ') : []);

  // expose these for the plugin API. Look in the source for how to join() them against your input
  ModernizrProto._prefixes = prefixes;



  /**
   * If the browsers follow the spec, then they would expose vendor-specific style as:
   *   elem.style.WebkitBorderRadius
   * instead of something like the following, which would be technically incorrect:
   *   elem.style.webkitBorderRadius

   * Webkit ghosts their properties in lowercase but Opera & Moz do not.
   * Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
   *   erik.eae.net/archives/2008/03/10/21.48.10/

   * More here: github.com/Modernizr/Modernizr/issues/issue/21
   *
   * @access private
   * @returns {string} The string representing the vendor-specific style properties
   */

  var omPrefixes = 'Moz O ms Webkit';


  /**
   * List of JavaScript DOM values used for tests
   *
   * @memberof Modernizr
   * @name Modernizr._domPrefixes
   * @optionName Modernizr._domPrefixes
   * @optionProp domPrefixes
   * @access public
   * @example
   *
   * Modernizr._domPrefixes is exactly the same as [_prefixes](#modernizr-_prefixes), but rather
   * than kebab-case properties, all properties are their Capitalized variant
   *
   * ```js
   * Modernizr._domPrefixes === [ "Moz", "O", "ms", "Webkit" ];
   * ```
   */

  var domPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(' ') : []);
  ModernizrProto._domPrefixes = domPrefixes;


  /**
   * createElement is a convenience wrapper around document.createElement. Since we
   * use createElement all over the place, this allows for (slightly) smaller code
   * as well as abstracting away issues with creating elements in contexts other than
   * HTML documents (e.g. SVG documents).
   *
   * @access private
   * @function createElement
   * @returns {HTMLElement|SVGElement} An HTML or SVG element
   */

  function createElement() {
    if (typeof document.createElement !== 'function') {
      // This is the case in IE7, where the type of createElement is "object".
      // For this reason, we cannot call apply() as Object is not a Function.
      return document.createElement(arguments[0]);
    } else if (isSVG) {
      return document.createElementNS.call(document, 'http://www.w3.org/2000/svg', arguments[0]);
    } else {
      return document.createElement.apply(document, arguments);
    }
  }

  ;

  /**
   * Modernizr.hasEvent() detects support for a given event
   *
   * @memberof Modernizr
   * @name Modernizr.hasEvent
   * @optionName Modernizr.hasEvent()
   * @optionProp hasEvent
   * @access public
   * @function hasEvent
   * @param  {string|*} eventName - the name of an event to test for (e.g. "resize")
   * @param  {Element|string} [element=HTMLDivElement] - is the element|document|window|tagName to test on
   * @returns {boolean}
   * @example
   *  `Modernizr.hasEvent` lets you determine if the browser supports a supplied event.
   *  By default, it does this detection on a div element
   *
   * ```js
   *  hasEvent('blur') // true;
   * ```
   *
   * However, you are able to give an object as a second argument to hasEvent to
   * detect an event on something other than a div.
   *
   * ```js
   *  hasEvent('devicelight', window) // true;
   * ```
   *
   */

  var hasEvent = (function() {

    // Detect whether event support can be detected via `in`. Test on a DOM element
    // using the "blur" event b/c it should always exist. bit.ly/event-detection
    var needsFallback = !('onblur' in document.documentElement);

    function inner(eventName, element) {

      var isSupported;
      if (!eventName) { return false; }
      if (!element || typeof element === 'string') {
        element = createElement(element || 'div');
      }

      // Testing via the `in` operator is sufficient for modern browsers and IE.
      // When using `setAttribute`, IE skips "unload", WebKit skips "unload" and
      // "resize", whereas `in` "catches" those.
      eventName = 'on' + eventName;
      isSupported = eventName in element;

      // Fallback technique for old Firefox - bit.ly/event-detection
      if (!isSupported && needsFallback) {
        if (!element.setAttribute) {
          // Switch to generic element if it lacks `setAttribute`.
          // It could be the `document`, `window`, or something else.
          element = createElement('div');
        }

        element.setAttribute(eventName, '');
        isSupported = typeof element[eventName] === 'function';

        if (element[eventName] !== undefined) {
          // If property was created, "remove it" by setting value to `undefined`.
          element[eventName] = undefined;
        }
        element.removeAttribute(eventName);
      }

      return isSupported;
    }
    return inner;
  })();


  ModernizrProto.hasEvent = hasEvent;

/*!
{
  "name": "DOM Pointer Events API",
  "property": "pointerevents",
  "tags": ["input"],
  "authors": ["Stu Cox"],
  "notes": [
    {
      "name": "W3C spec",
      "href": "http://www.w3.org/TR/pointerevents/"
    }
  ],
  "warnings": ["This property name now refers to W3C DOM PointerEvents: https://github.com/Modernizr/Modernizr/issues/548#issuecomment-12812099"],
  "polyfills": ["handjs"]
}
!*/
/* DOC
Detects support for the DOM Pointer Events API, which provides a unified event interface for pointing input devices, as implemented in IE10+.
*/

  // **Test name hijacked!**
  // Now refers to W3C DOM PointerEvents spec rather than the CSS pointer-events property.
  Modernizr.addTest('pointerevents', function() {
    // Cannot use `.prefixed()` for events, so test each prefix
    var bool = false,
    i = domPrefixes.length;

    // Don't forget un-prefixed...
    bool = Modernizr.hasEvent('pointerdown');

    while (i-- && !bool) {
      if (hasEvent(domPrefixes[i] + 'pointerdown')) {
        bool = true;
      }
    }
    return bool;
  });


  /**
   * getBody returns the body of a document, or an element that can stand in for
   * the body if a real body does not exist
   *
   * @access private
   * @function getBody
   * @returns {HTMLElement|SVGElement} Returns the real body of a document, or an
   * artificially created element that stands in for the body
   */

  function getBody() {
    // After page load injecting a fake body doesn't work so check if body exists
    var body = document.body;

    if (!body) {
      // Can't use the real body create a fake one.
      body = createElement(isSVG ? 'svg' : 'body');
      body.fake = true;
    }

    return body;
  }

  ;

  /**
   * injectElementWithStyles injects an element with style element and some CSS rules
   *
   * @access private
   * @function injectElementWithStyles
   * @param {string} rule - String representing a css rule
   * @param {function} callback - A function that is used to test the injected element
   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
   * @returns {boolean}
   */

  function injectElementWithStyles(rule, callback, nodes, testnames) {
    var mod = 'modernizr';
    var style;
    var ret;
    var node;
    var docOverflow;
    var div = createElement('div');
    var body = getBody();

    if (parseInt(nodes, 10)) {
      // In order not to give false positives we create a node for each test
      // This also allows the method to scale for unspecified uses
      while (nodes--) {
        node = createElement('div');
        node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
        div.appendChild(node);
      }
    }

    style = createElement('style');
    style.type = 'text/css';
    style.id = 's' + mod;

    // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
    // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
    (!body.fake ? div : body).appendChild(style);
    body.appendChild(div);

    if (style.styleSheet) {
      style.styleSheet.cssText = rule;
    } else {
      style.appendChild(document.createTextNode(rule));
    }
    div.id = mod;

    if (body.fake) {
      //avoid crashing IE8, if background image is used
      body.style.background = '';
      //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
      body.style.overflow = 'hidden';
      docOverflow = docElement.style.overflow;
      docElement.style.overflow = 'hidden';
      docElement.appendChild(body);
    }

    ret = callback(div, rule);
    // If this is done after page load we don't want to remove the body so check if body exists
    if (body.fake) {
      body.parentNode.removeChild(body);
      docElement.style.overflow = docOverflow;
      // Trigger layout so kinetic scrolling isn't disabled in iOS6+
      docElement.offsetHeight;
    } else {
      div.parentNode.removeChild(div);
    }

    return !!ret;

  }

  ;

  /**
   * testStyles injects an element with style element and some CSS rules
   *
   * @memberof Modernizr
   * @name Modernizr.testStyles
   * @optionName Modernizr.testStyles()
   * @optionProp testStyles
   * @access public
   * @function testStyles
   * @param {string} rule - String representing a css rule
   * @param {function} callback - A function that is used to test the injected element
   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
   * @returns {boolean}
   * @example
   *
   * `Modernizr.testStyles` takes a CSS rule and injects it onto the current page
   * along with (possibly multiple) DOM elements. This lets you check for features
   * that can not be detected by simply checking the [IDL](https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/Interface_development_guide/IDL_interface_rules).
   *
   * ```js
   * Modernizr.testStyles('#modernizr { width: 9px; color: papayawhip; }', function(elem, rule) {
   *   // elem is the first DOM node in the page (by default #modernizr)
   *   // rule is the first argument you supplied - the CSS rule in string form
   *
   *   addTest('widthworks', elem.style.width === '9px')
   * });
   * ```
   *
   * If your test requires multiple nodes, you can include a third argument
   * indicating how many additional div elements to include on the page. The
   * additional nodes are injected as children of the `elem` that is returned as
   * the first argument to the callback.
   *
   * ```js
   * Modernizr.testStyles('#modernizr {width: 1px}; #modernizr2 {width: 2px}', function(elem) {
   *   document.getElementById('modernizr').style.width === '1px'; // true
   *   document.getElementById('modernizr2').style.width === '2px'; // true
   *   elem.firstChild === document.getElementById('modernizr2'); // true
   * }, 1);
   * ```
   *
   * By default, all of the additional elements have an ID of `modernizr[n]`, where
   * `n` is its index (e.g. the first additional, second overall is `#modernizr2`,
   * the second additional is `#modernizr3`, etc.).
   * If you want to have more meaningful IDs for your function, you can provide
   * them as the fourth argument, as an array of strings
   *
   * ```js
   * Modernizr.testStyles('#foo {width: 10px}; #bar {height: 20px}', function(elem) {
   *   elem.firstChild === document.getElementById('foo'); // true
   *   elem.lastChild === document.getElementById('bar'); // true
   * }, 2, ['foo', 'bar']);
   * ```
   *
   */

  var testStyles = ModernizrProto.testStyles = injectElementWithStyles;

/*!
{
  "name": "Touch Events",
  "property": "touchevents",
  "caniuse" : "touch",
  "tags": ["media", "attribute"],
  "notes": [{
    "name": "Touch Events spec",
    "href": "http://www.w3.org/TR/2013/WD-touch-events-20130124/"
  }],
  "warnings": [
    "Indicates if the browser supports the Touch Events spec, and does not necessarily reflect a touchscreen device"
  ],
  "knownBugs": [
    "False-positive on some configurations of Nokia N900",
    "False-positive on some BlackBerry 6.0 builds – https://github.com/Modernizr/Modernizr/issues/372#issuecomment-3112695"
  ]
}
!*/
/* DOC
Indicates if the browser supports the W3C Touch Events API.

This *does not* necessarily reflect a touchscreen device:

* Older touchscreen devices only emulate mouse events
* Modern IE touch devices implement the Pointer Events API instead: use `Modernizr.pointerevents` to detect support for that
* Some browsers & OS setups may enable touch APIs when no touchscreen is connected
* Future browsers may implement other event models for touch interactions

See this article: [You Can't Detect A Touchscreen](http://www.stucox.com/blog/you-cant-detect-a-touchscreen/).

It's recommended to bind both mouse and touch/pointer events simultaneously – see [this HTML5 Rocks tutorial](http://www.html5rocks.com/en/mobile/touchandmouse/).

This test will also return `true` for Firefox 4 Multitouch support.
*/

  // Chrome (desktop) used to lie about its support on this, but that has since been rectified: http://crbug.com/36415
  Modernizr.addTest('touchevents', function() {
    var bool;
    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
      bool = true;
    } else {
      var query = ['@media (', prefixes.join('touch-enabled),('), 'heartz', ')', '{#modernizr{top:9px;position:absolute}}'].join('');
      testStyles(query, function(node) {
        bool = node.offsetTop === 9;
      });
    }
    return bool;
  });


  var cssomPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.split(' ') : []);
  ModernizrProto._cssomPrefixes = cssomPrefixes;



  /**
   * contains checks to see if a string contains another string
   *
   * @access private
   * @function contains
   * @param {string} str - The string we want to check for substrings
   * @param {string} substr - The substring we want to search the first string for
   * @returns {boolean}
   */

  function contains(str, substr) {
    return !!~('' + str).indexOf(substr);
  }

  ;

  /**
   * cssToDOM takes a kebab-case string and converts it to camelCase
   * e.g. box-sizing -> boxSizing
   *
   * @access private
   * @function cssToDOM
   * @param {string} name - String name of kebab-case prop we want to convert
   * @returns {string} The camelCase version of the supplied name
   */

  function cssToDOM(name) {
    return name.replace(/([a-z])-([a-z])/g, function(str, m1, m2) {
      return m1 + m2.toUpperCase();
    }).replace(/^-/, '');
  }
  ;

  /**
   * fnBind is a super small [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) polyfill.
   *
   * @access private
   * @function fnBind
   * @param {function} fn - a function you want to change `this` reference to
   * @param {object} that - the `this` you want to call the function with
   * @returns {function} The wrapped version of the supplied function
   */

  function fnBind(fn, that) {
    return function() {
      return fn.apply(that, arguments);
    };
  }

  ;

  /**
   * testDOMProps is a generic DOM property test; if a browser supports
   *   a certain property, it won't return undefined for it.
   *
   * @access private
   * @function testDOMProps
   * @param {array.<string>} props - An array of properties to test for
   * @param {object} obj - An object or Element you want to use to test the parameters again
   * @param {boolean|object} elem - An Element to bind the property lookup again. Use `false` to prevent the check
   */
  function testDOMProps(props, obj, elem) {
    var item;

    for (var i in props) {
      if (props[i] in obj) {

        // return the property name as a string
        if (elem === false) {
          return props[i];
        }

        item = obj[props[i]];

        // let's bind a function
        if (is(item, 'function')) {
          // bind to obj unless overriden
          return fnBind(item, elem || obj);
        }

        // return the unbound function or obj or value
        return item;
      }
    }
    return false;
  }

  ;

  /**
   * Create our "modernizr" element that we do most feature tests on.
   *
   * @access private
   */

  var modElem = {
    elem: createElement('modernizr')
  };

  // Clean up this element
  Modernizr._q.push(function() {
    delete modElem.elem;
  });



  var mStyle = {
    style: modElem.elem.style
  };

  // kill ref for gc, must happen before mod.elem is removed, so we unshift on to
  // the front of the queue.
  Modernizr._q.unshift(function() {
    delete mStyle.style;
  });



  /**
   * domToCSS takes a camelCase string and converts it to kebab-case
   * e.g. boxSizing -> box-sizing
   *
   * @access private
   * @function domToCSS
   * @param {string} name - String name of camelCase prop we want to convert
   * @returns {string} The kebab-case version of the supplied name
   */

  function domToCSS(name) {
    return name.replace(/([A-Z])/g, function(str, m1) {
      return '-' + m1.toLowerCase();
    }).replace(/^ms-/, '-ms-');
  }
  ;

  /**
   * nativeTestProps allows for us to use native feature detection functionality if available.
   * some prefixed form, or false, in the case of an unsupported rule
   *
   * @access private
   * @function nativeTestProps
   * @param {array} props - An array of property names
   * @param {string} value - A string representing the value we want to check via @supports
   * @returns {boolean|undefined} A boolean when @supports exists, undefined otherwise
   */

  // Accepts a list of property names and a single value
  // Returns `undefined` if native detection not available
  function nativeTestProps(props, value) {
    var i = props.length;
    // Start with the JS API: http://www.w3.org/TR/css3-conditional/#the-css-interface
    if ('CSS' in window && 'supports' in window.CSS) {
      // Try every prefixed variant of the property
      while (i--) {
        if (window.CSS.supports(domToCSS(props[i]), value)) {
          return true;
        }
      }
      return false;
    }
    // Otherwise fall back to at-rule (for Opera 12.x)
    else if ('CSSSupportsRule' in window) {
      // Build a condition string for every prefixed variant
      var conditionText = [];
      while (i--) {
        conditionText.push('(' + domToCSS(props[i]) + ':' + value + ')');
      }
      conditionText = conditionText.join(' or ');
      return injectElementWithStyles('@supports (' + conditionText + ') { #modernizr { position: absolute; } }', function(node) {
        return getComputedStyle(node, null).position == 'absolute';
      });
    }
    return undefined;
  }
  ;

  // testProps is a generic CSS / DOM property test.

  // In testing support for a given CSS property, it's legit to test:
  //    `elem.style[styleName] !== undefined`
  // If the property is supported it will return an empty string,
  // if unsupported it will return undefined.

  // We'll take advantage of this quick test and skip setting a style
  // on our modernizr element, but instead just testing undefined vs
  // empty string.

  // Property names can be provided in either camelCase or kebab-case.

  function testProps(props, prefixed, value, skipValueTest) {
    skipValueTest = is(skipValueTest, 'undefined') ? false : skipValueTest;

    // Try native detect first
    if (!is(value, 'undefined')) {
      var result = nativeTestProps(props, value);
      if (!is(result, 'undefined')) {
        return result;
      }
    }

    // Otherwise do it properly
    var afterInit, i, propsLength, prop, before;

    // If we don't have a style element, that means we're running async or after
    // the core tests, so we'll need to create our own elements to use

    // inside of an SVG element, in certain browsers, the `style` element is only
    // defined for valid tags. Therefore, if `modernizr` does not have one, we
    // fall back to a less used element and hope for the best.
    var elems = ['modernizr', 'tspan'];
    while (!mStyle.style) {
      afterInit = true;
      mStyle.modElem = createElement(elems.shift());
      mStyle.style = mStyle.modElem.style;
    }

    // Delete the objects if we created them.
    function cleanElems() {
      if (afterInit) {
        delete mStyle.style;
        delete mStyle.modElem;
      }
    }

    propsLength = props.length;
    for (i = 0; i < propsLength; i++) {
      prop = props[i];
      before = mStyle.style[prop];

      if (contains(prop, '-')) {
        prop = cssToDOM(prop);
      }

      if (mStyle.style[prop] !== undefined) {

        // If value to test has been passed in, do a set-and-check test.
        // 0 (integer) is a valid property value, so check that `value` isn't
        // undefined, rather than just checking it's truthy.
        if (!skipValueTest && !is(value, 'undefined')) {

          // Needs a try catch block because of old IE. This is slow, but will
          // be avoided in most cases because `skipValueTest` will be used.
          try {
            mStyle.style[prop] = value;
          } catch (e) {}

          // If the property value has changed, we assume the value used is
          // supported. If `value` is empty string, it'll fail here (because
          // it hasn't changed), which matches how browsers have implemented
          // CSS.supports()
          if (mStyle.style[prop] != before) {
            cleanElems();
            return prefixed == 'pfx' ? prop : true;
          }
        }
        // Otherwise just return true, or the property name if this is a
        // `prefixed()` call
        else {
          cleanElems();
          return prefixed == 'pfx' ? prop : true;
        }
      }
    }
    cleanElems();
    return false;
  }

  ;

  /**
   * testPropsAll tests a list of DOM properties we want to check against.
   * We specify literally ALL possible (known and/or likely) properties on
   * the element including the non-vendor prefixed one, for forward-
   * compatibility.
   *
   * @access private
   * @function testPropsAll
   * @param {string} prop - A string of the property to test for
   * @param {string|object} [prefixed] - An object to check the prefixed properties on. Use a string to skip
   * @param {HTMLElement|SVGElement} [elem] - An element used to test the property and value against
   * @param {string} [value] - A string of a css value
   * @param {boolean} [skipValueTest] - An boolean representing if you want to test if value sticks when set
   */
  function testPropsAll(prop, prefixed, elem, value, skipValueTest) {

    var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
    props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

    // did they call .prefixed('boxSizing') or are we just testing a prop?
    if (is(prefixed, 'string') || is(prefixed, 'undefined')) {
      return testProps(props, prefixed, value, skipValueTest);

      // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
    } else {
      props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
      return testDOMProps(props, prefixed, elem);
    }
  }

  // Modernizr.testAllProps() investigates whether a given style property,
  // or any of its vendor-prefixed variants, is recognized
  //
  // Note that the property names must be provided in the camelCase variant.
  // Modernizr.testAllProps('boxSizing')
  ModernizrProto.testAllProps = testPropsAll;



  /**
   * testAllProps determines whether a given CSS property is supported in the browser
   *
   * @memberof Modernizr
   * @name Modernizr.testAllProps
   * @optionName Modernizr.testAllProps()
   * @optionProp testAllProps
   * @access public
   * @function testAllProps
   * @param {string} prop - String naming the property to test (either camelCase or kebab-case)
   * @param {string} [value] - String of the value to test
   * @param {boolean} [skipValueTest=false] - Whether to skip testing that the value is supported when using non-native detection
   * @example
   *
   * testAllProps determines whether a given CSS property, in some prefixed form,
   * is supported by the browser.
   *
   * ```js
   * testAllProps('boxSizing')  // true
   * ```
   *
   * It can optionally be given a CSS value in string form to test if a property
   * value is valid
   *
   * ```js
   * testAllProps('display', 'block') // true
   * testAllProps('display', 'penguin') // false
   * ```
   *
   * A boolean can be passed as a third parameter to skip the value check when
   * native detection (@supports) isn't available.
   *
   * ```js
   * testAllProps('shapeOutside', 'content-box', true);
   * ```
   */

  function testAllProps(prop, value, skipValueTest) {
    return testPropsAll(prop, undefined, undefined, value, skipValueTest);
  }
  ModernizrProto.testAllProps = testAllProps;

/*!
{
  "name": "CSS Transforms",
  "property": "csstransforms",
  "caniuse": "transforms2d",
  "tags": ["css"]
}
!*/

  Modernizr.addTest('csstransforms', function() {
    // Android < 3.0 is buggy, so we sniff and blacklist
    // http://git.io/hHzL7w
    return navigator.userAgent.indexOf('Android 2.') === -1 &&
           testAllProps('transform', 'scale(1)', true);
  });


  // Run each test
  testRunner();

  // Remove the "no-js" class if it exists
  setClasses(classes);

  delete ModernizrProto.addTest;
  delete ModernizrProto.addAsyncTest;

  // Run the things that are supposed to run after the tests
  for (var i = 0; i < Modernizr._q.length; i++) {
    Modernizr._q[i]();
  }

  // Leak Modernizr namespace
  window.Modernizr = Modernizr;


;

})(window, document);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ3ZWIvYXBwL3RoZW1lcy93dHlzbC9hc3NldHMvamF2YXNjcmlwdHMvYXBwbGljYXRpb24uanMiLCJ3ZWIvYXBwL3RoZW1lcy93dHlzbC9hc3NldHMvamF2YXNjcmlwdHMvdmVuZG9yL21vZGVybml6ci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInJlcXVpcmUoJy4vdmVuZG9yL21vZGVybml6cicpO1xuIiwiLyohXG4gKiBtb2Rlcm5penIgdjMuMi4wXG4gKiBCdWlsZCBodHRwOi8vbW9kZXJuaXpyLmNvbS9kb3dubG9hZD8tY3NzdHJhbnNmb3Jtcy1wb2ludGVyZXZlbnRzLXRvdWNoZXZlbnRzLXNldGNsYXNzZXMtZG9udG1pbi1jc3NjbGFzc3ByZWZpeDpoYXNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpXG4gKiAgRmFydWsgQXRlc1xuICogIFBhdWwgSXJpc2hcbiAqICBBbGV4IFNleHRvblxuICogIFJ5YW4gU2VkZG9uXG4gKiAgUGF0cmljayBLZXR0bmVyXG4gKiAgU3R1IENveFxuICogIFJpY2hhcmQgSGVycmVyYVxuXG4gKiBNSVQgTGljZW5zZVxuICovXG5cbi8qXG4gKiBNb2Rlcm5penIgdGVzdHMgd2hpY2ggbmF0aXZlIENTUzMgYW5kIEhUTUw1IGZlYXR1cmVzIGFyZSBhdmFpbGFibGUgaW4gdGhlXG4gKiBjdXJyZW50IFVBIGFuZCBtYWtlcyB0aGUgcmVzdWx0cyBhdmFpbGFibGUgdG8geW91IGluIHR3byB3YXlzOiBhcyBwcm9wZXJ0aWVzIG9uXG4gKiBhIGdsb2JhbCBgTW9kZXJuaXpyYCBvYmplY3QsIGFuZCBhcyBjbGFzc2VzIG9uIHRoZSBgPGh0bWw+YCBlbGVtZW50LiBUaGlzXG4gKiBpbmZvcm1hdGlvbiBhbGxvd3MgeW91IHRvIHByb2dyZXNzaXZlbHkgZW5oYW5jZSB5b3VyIHBhZ2VzIHdpdGggYSBncmFudWxhciBsZXZlbFxuICogb2YgY29udHJvbCBvdmVyIHRoZSBleHBlcmllbmNlLlxuKi9cblxuOyhmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpe1xuICB2YXIgY2xhc3NlcyA9IFtdO1xuXG5cbiAgdmFyIHRlc3RzID0gW107XG5cblxuICAvKipcbiAgICpcbiAgICogTW9kZXJuaXpyUHJvdG8gaXMgdGhlIGNvbnN0cnVjdG9yIGZvciBNb2Rlcm5penJcbiAgICpcbiAgICogQGNsYXNzXG4gICAqIEBhY2Nlc3MgcHVibGljXG4gICAqL1xuXG4gIHZhciBNb2Rlcm5penJQcm90byA9IHtcbiAgICAvLyBUaGUgY3VycmVudCB2ZXJzaW9uLCBkdW1teVxuICAgIF92ZXJzaW9uOiAnMy4yLjAnLFxuXG4gICAgLy8gQW55IHNldHRpbmdzIHRoYXQgZG9uJ3Qgd29yayBhcyBzZXBhcmF0ZSBtb2R1bGVzXG4gICAgLy8gY2FuIGdvIGluIGhlcmUgYXMgY29uZmlndXJhdGlvbi5cbiAgICBfY29uZmlnOiB7XG4gICAgICAnY2xhc3NQcmVmaXgnOiBcImhhcy1cIixcbiAgICAgICdlbmFibGVDbGFzc2VzJzogdHJ1ZSxcbiAgICAgICdlbmFibGVKU0NsYXNzJzogdHJ1ZSxcbiAgICAgICd1c2VQcmVmaXhlcyc6IHRydWVcbiAgICB9LFxuXG4gICAgLy8gUXVldWUgb2YgdGVzdHNcbiAgICBfcTogW10sXG5cbiAgICAvLyBTdHViIHRoZXNlIGZvciBwZW9wbGUgd2hvIGFyZSBsaXN0ZW5pbmdcbiAgICBvbjogZnVuY3Rpb24odGVzdCwgY2IpIHtcbiAgICAgIC8vIEkgZG9uJ3QgcmVhbGx5IHRoaW5rIHBlb3BsZSBzaG91bGQgZG8gdGhpcywgYnV0IHdlIGNhblxuICAgICAgLy8gc2FmZSBndWFyZCBpdCBhIGJpdC5cbiAgICAgIC8vIC0tIE5PVEU6OiB0aGlzIGdldHMgV0FZIG92ZXJyaWRkZW4gaW4gc3JjL2FkZFRlc3QgZm9yIGFjdHVhbCBhc3luYyB0ZXN0cy5cbiAgICAgIC8vIFRoaXMgaXMgaW4gY2FzZSBwZW9wbGUgbGlzdGVuIHRvIHN5bmNocm9ub3VzIHRlc3RzLiBJIHdvdWxkIGxlYXZlIGl0IG91dCxcbiAgICAgIC8vIGJ1dCB0aGUgY29kZSB0byAqZGlzYWxsb3cqIHN5bmMgdGVzdHMgaW4gdGhlIHJlYWwgdmVyc2lvbiBvZiB0aGlzXG4gICAgICAvLyBmdW5jdGlvbiBpcyBhY3R1YWxseSBsYXJnZXIgdGhhbiB0aGlzLlxuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgY2Ioc2VsZlt0ZXN0XSk7XG4gICAgICB9LCAwKTtcbiAgICB9LFxuXG4gICAgYWRkVGVzdDogZnVuY3Rpb24obmFtZSwgZm4sIG9wdGlvbnMpIHtcbiAgICAgIHRlc3RzLnB1c2goe25hbWU6IG5hbWUsIGZuOiBmbiwgb3B0aW9uczogb3B0aW9uc30pO1xuICAgIH0sXG5cbiAgICBhZGRBc3luY1Rlc3Q6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICB0ZXN0cy5wdXNoKHtuYW1lOiBudWxsLCBmbjogZm59KTtcbiAgICB9XG4gIH07XG5cblxuXG4gIC8vIEZha2Ugc29tZSBvZiBPYmplY3QuY3JlYXRlIHNvIHdlIGNhbiBmb3JjZSBub24gdGVzdCByZXN1bHRzIHRvIGJlIG5vbiBcIm93blwiIHByb3BlcnRpZXMuXG4gIHZhciBNb2Rlcm5penIgPSBmdW5jdGlvbigpIHt9O1xuICBNb2Rlcm5penIucHJvdG90eXBlID0gTW9kZXJuaXpyUHJvdG87XG5cbiAgLy8gTGVhayBtb2Rlcm5penIgZ2xvYmFsbHkgd2hlbiB5b3UgYHJlcXVpcmVgIGl0IHJhdGhlciB0aGFuIGZvcmNlIGl0IGhlcmUuXG4gIC8vIE92ZXJ3cml0ZSBuYW1lIHNvIGNvbnN0cnVjdG9yIG5hbWUgaXMgbmljZXIgOkRcbiAgTW9kZXJuaXpyID0gbmV3IE1vZGVybml6cigpO1xuXG5cblxuICAvKipcbiAgICogaXMgcmV0dXJucyBhIGJvb2xlYW4gaWYgdGhlIHR5cGVvZiBhbiBvYmogaXMgZXhhY3RseSB0eXBlLlxuICAgKlxuICAgKiBAYWNjZXNzIHByaXZhdGVcbiAgICogQGZ1bmN0aW9uIGlzXG4gICAqIEBwYXJhbSB7Kn0gb2JqIC0gQSB0aGluZyB3ZSB3YW50IHRvIGNoZWNrIHRoZSB0eXBlIG9mXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gQSBzdHJpbmcgdG8gY29tcGFyZSB0aGUgdHlwZW9mIGFnYWluc3RcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGlzKG9iaiwgdHlwZSkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSB0eXBlO1xuICB9XG4gIDtcblxuICAvKipcbiAgICogUnVuIHRocm91Z2ggYWxsIHRlc3RzIGFuZCBkZXRlY3QgdGhlaXIgc3VwcG9ydCBpbiB0aGUgY3VycmVudCBVQS5cbiAgICpcbiAgICogQGFjY2VzcyBwcml2YXRlXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHRlc3RSdW5uZXIoKSB7XG4gICAgdmFyIGZlYXR1cmVOYW1lcztcbiAgICB2YXIgZmVhdHVyZTtcbiAgICB2YXIgYWxpYXNJZHg7XG4gICAgdmFyIHJlc3VsdDtcbiAgICB2YXIgbmFtZUlkeDtcbiAgICB2YXIgZmVhdHVyZU5hbWU7XG4gICAgdmFyIGZlYXR1cmVOYW1lU3BsaXQ7XG5cbiAgICBmb3IgKHZhciBmZWF0dXJlSWR4IGluIHRlc3RzKSB7XG4gICAgICBpZiAodGVzdHMuaGFzT3duUHJvcGVydHkoZmVhdHVyZUlkeCkpIHtcbiAgICAgICAgZmVhdHVyZU5hbWVzID0gW107XG4gICAgICAgIGZlYXR1cmUgPSB0ZXN0c1tmZWF0dXJlSWR4XTtcbiAgICAgICAgLy8gcnVuIHRoZSB0ZXN0LCB0aHJvdyB0aGUgcmV0dXJuIHZhbHVlIGludG8gdGhlIE1vZGVybml6cixcbiAgICAgICAgLy8gdGhlbiBiYXNlZCBvbiB0aGF0IGJvb2xlYW4sIGRlZmluZSBhbiBhcHByb3ByaWF0ZSBjbGFzc05hbWVcbiAgICAgICAgLy8gYW5kIHB1c2ggaXQgaW50byBhbiBhcnJheSBvZiBjbGFzc2VzIHdlJ2xsIGpvaW4gbGF0ZXIuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIElmIHRoZXJlIGlzIG5vIG5hbWUsIGl0J3MgYW4gJ2FzeW5jJyB0ZXN0IHRoYXQgaXMgcnVuLFxuICAgICAgICAvLyBidXQgbm90IGRpcmVjdGx5IGFkZGVkIHRvIHRoZSBvYmplY3QuIFRoYXQgc2hvdWxkXG4gICAgICAgIC8vIGJlIGRvbmUgd2l0aCBhIHBvc3QtcnVuIGFkZFRlc3QgY2FsbC5cbiAgICAgICAgaWYgKGZlYXR1cmUubmFtZSkge1xuICAgICAgICAgIGZlYXR1cmVOYW1lcy5wdXNoKGZlYXR1cmUubmFtZS50b0xvd2VyQ2FzZSgpKTtcblxuICAgICAgICAgIGlmIChmZWF0dXJlLm9wdGlvbnMgJiYgZmVhdHVyZS5vcHRpb25zLmFsaWFzZXMgJiYgZmVhdHVyZS5vcHRpb25zLmFsaWFzZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBBZGQgYWxsIHRoZSBhbGlhc2VzIGludG8gdGhlIG5hbWVzIGxpc3RcbiAgICAgICAgICAgIGZvciAoYWxpYXNJZHggPSAwOyBhbGlhc0lkeCA8IGZlYXR1cmUub3B0aW9ucy5hbGlhc2VzLmxlbmd0aDsgYWxpYXNJZHgrKykge1xuICAgICAgICAgICAgICBmZWF0dXJlTmFtZXMucHVzaChmZWF0dXJlLm9wdGlvbnMuYWxpYXNlc1thbGlhc0lkeF0udG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gUnVuIHRoZSB0ZXN0LCBvciB1c2UgdGhlIHJhdyB2YWx1ZSBpZiBpdCdzIG5vdCBhIGZ1bmN0aW9uXG4gICAgICAgIHJlc3VsdCA9IGlzKGZlYXR1cmUuZm4sICdmdW5jdGlvbicpID8gZmVhdHVyZS5mbigpIDogZmVhdHVyZS5mbjtcblxuXG4gICAgICAgIC8vIFNldCBlYWNoIG9mIHRoZSBuYW1lcyBvbiB0aGUgTW9kZXJuaXpyIG9iamVjdFxuICAgICAgICBmb3IgKG5hbWVJZHggPSAwOyBuYW1lSWR4IDwgZmVhdHVyZU5hbWVzLmxlbmd0aDsgbmFtZUlkeCsrKSB7XG4gICAgICAgICAgZmVhdHVyZU5hbWUgPSBmZWF0dXJlTmFtZXNbbmFtZUlkeF07XG4gICAgICAgICAgLy8gU3VwcG9ydCBkb3QgcHJvcGVydGllcyBhcyBzdWIgdGVzdHMuIFdlIGRvbid0IGRvIGNoZWNraW5nIHRvIG1ha2Ugc3VyZVxuICAgICAgICAgIC8vIHRoYXQgdGhlIGltcGxpZWQgcGFyZW50IHRlc3RzIGhhdmUgYmVlbiBhZGRlZC4gWW91IG11c3QgY2FsbCB0aGVtIGluXG4gICAgICAgICAgLy8gb3JkZXIgKGVpdGhlciBpbiB0aGUgdGVzdCwgb3IgbWFrZSB0aGUgcGFyZW50IHRlc3QgYSBkZXBlbmRlbmN5KS5cbiAgICAgICAgICAvL1xuICAgICAgICAgIC8vIENhcCBpdCB0byBUV08gdG8gbWFrZSB0aGUgbG9naWMgc2ltcGxlIGFuZCBiZWNhdXNlIHdobyBuZWVkcyB0aGF0IGtpbmQgb2Ygc3VidGVzdGluZ1xuICAgICAgICAgIC8vIGhhc2h0YWcgZmFtb3VzIGxhc3Qgd29yZHNcbiAgICAgICAgICBmZWF0dXJlTmFtZVNwbGl0ID0gZmVhdHVyZU5hbWUuc3BsaXQoJy4nKTtcblxuICAgICAgICAgIGlmIChmZWF0dXJlTmFtZVNwbGl0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgTW9kZXJuaXpyW2ZlYXR1cmVOYW1lU3BsaXRbMF1dID0gcmVzdWx0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBjYXN0IHRvIGEgQm9vbGVhbiwgaWYgbm90IG9uZSBhbHJlYWR5XG4gICAgICAgICAgICAvKiBqc2hpbnQgLVcwNTMgKi9cbiAgICAgICAgICAgIGlmIChNb2Rlcm5penJbZmVhdHVyZU5hbWVTcGxpdFswXV0gJiYgIShNb2Rlcm5penJbZmVhdHVyZU5hbWVTcGxpdFswXV0gaW5zdGFuY2VvZiBCb29sZWFuKSkge1xuICAgICAgICAgICAgICBNb2Rlcm5penJbZmVhdHVyZU5hbWVTcGxpdFswXV0gPSBuZXcgQm9vbGVhbihNb2Rlcm5penJbZmVhdHVyZU5hbWVTcGxpdFswXV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBNb2Rlcm5penJbZmVhdHVyZU5hbWVTcGxpdFswXV1bZmVhdHVyZU5hbWVTcGxpdFsxXV0gPSByZXN1bHQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY2xhc3Nlcy5wdXNoKChyZXN1bHQgPyAnJyA6ICduby0nKSArIGZlYXR1cmVOYW1lU3BsaXQuam9pbignLScpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICA7XG5cbiAgLyoqXG4gICAqIGRvY0VsZW1lbnQgaXMgYSBjb252ZW5pZW5jZSB3cmFwcGVyIHRvIGdyYWIgdGhlIHJvb3QgZWxlbWVudCBvZiB0aGUgZG9jdW1lbnRcbiAgICpcbiAgICogQGFjY2VzcyBwcml2YXRlXG4gICAqIEByZXR1cm5zIHtIVE1MRWxlbWVudHxTVkdFbGVtZW50fSBUaGUgcm9vdCBlbGVtZW50IG9mIHRoZSBkb2N1bWVudFxuICAgKi9cblxuICB2YXIgZG9jRWxlbWVudCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuXG4gIC8qKlxuICAgKiBBIGNvbnZlbmllbmNlIGhlbHBlciB0byBjaGVjayBpZiB0aGUgZG9jdW1lbnQgd2UgYXJlIHJ1bm5pbmcgaW4gaXMgYW4gU1ZHIGRvY3VtZW50XG4gICAqXG4gICAqIEBhY2Nlc3MgcHJpdmF0ZVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG5cbiAgdmFyIGlzU1ZHID0gZG9jRWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc3ZnJztcblxuXG4gIC8qKlxuICAgKiBzZXRDbGFzc2VzIHRha2VzIGFuIGFycmF5IG9mIGNsYXNzIG5hbWVzIGFuZCBhZGRzIHRoZW0gdG8gdGhlIHJvb3QgZWxlbWVudFxuICAgKlxuICAgKiBAYWNjZXNzIHByaXZhdGVcbiAgICogQGZ1bmN0aW9uIHNldENsYXNzZXNcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gY2xhc3NlcyAtIEFycmF5IG9mIGNsYXNzIG5hbWVzXG4gICAqL1xuXG4gIC8vIFBhc3MgaW4gYW4gYW5kIGFycmF5IG9mIGNsYXNzIG5hbWVzLCBlLmcuOlxuICAvLyAgWyduby13ZWJwJywgJ2JvcmRlcnJhZGl1cycsIC4uLl1cbiAgZnVuY3Rpb24gc2V0Q2xhc3NlcyhjbGFzc2VzKSB7XG4gICAgdmFyIGNsYXNzTmFtZSA9IGRvY0VsZW1lbnQuY2xhc3NOYW1lO1xuICAgIHZhciBjbGFzc1ByZWZpeCA9IE1vZGVybml6ci5fY29uZmlnLmNsYXNzUHJlZml4IHx8ICcnO1xuXG4gICAgaWYgKGlzU1ZHKSB7XG4gICAgICBjbGFzc05hbWUgPSBjbGFzc05hbWUuYmFzZVZhbDtcbiAgICB9XG5cbiAgICAvLyBDaGFuZ2UgYG5vLWpzYCB0byBganNgIChpbmRlcGVuZGVudGx5IG9mIHRoZSBgZW5hYmxlQ2xhc3Nlc2Agb3B0aW9uKVxuICAgIC8vIEhhbmRsZSBjbGFzc1ByZWZpeCBvbiB0aGlzIHRvb1xuICAgIGlmIChNb2Rlcm5penIuX2NvbmZpZy5lbmFibGVKU0NsYXNzKSB7XG4gICAgICB2YXIgcmVKUyA9IG5ldyBSZWdFeHAoJyhefFxcXFxzKScgKyBjbGFzc1ByZWZpeCArICduby1qcyhcXFxcc3wkKScpO1xuICAgICAgY2xhc3NOYW1lID0gY2xhc3NOYW1lLnJlcGxhY2UocmVKUywgJyQxJyArIGNsYXNzUHJlZml4ICsgJ2pzJDInKTtcbiAgICB9XG5cbiAgICBpZiAoTW9kZXJuaXpyLl9jb25maWcuZW5hYmxlQ2xhc3Nlcykge1xuICAgICAgLy8gQWRkIHRoZSBuZXcgY2xhc3Nlc1xuICAgICAgY2xhc3NOYW1lICs9ICcgJyArIGNsYXNzUHJlZml4ICsgY2xhc3Nlcy5qb2luKCcgJyArIGNsYXNzUHJlZml4KTtcbiAgICAgIGlzU1ZHID8gZG9jRWxlbWVudC5jbGFzc05hbWUuYmFzZVZhbCA9IGNsYXNzTmFtZSA6IGRvY0VsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICAgIH1cblxuICB9XG5cbiAgO1xuXG4gIC8qKlxuICAgKiBMaXN0IG9mIHByb3BlcnR5IHZhbHVlcyB0byBzZXQgZm9yIGNzcyB0ZXN0cy4gU2VlIHRpY2tldCAjMjFcbiAgICogaHR0cDovL2dpdC5pby92VUdsNFxuICAgKlxuICAgKiBAbWVtYmVyb2YgTW9kZXJuaXpyXG4gICAqIEBuYW1lIE1vZGVybml6ci5fcHJlZml4ZXNcbiAgICogQG9wdGlvbk5hbWUgTW9kZXJuaXpyLl9wcmVmaXhlc1xuICAgKiBAb3B0aW9uUHJvcCBwcmVmaXhlc1xuICAgKiBAYWNjZXNzIHB1YmxpY1xuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBNb2Rlcm5penIuX3ByZWZpeGVzIGlzIHRoZSBpbnRlcm5hbCBsaXN0IG9mIHByZWZpeGVzIHRoYXQgd2UgdGVzdCBhZ2FpbnN0XG4gICAqIGluc2lkZSBvZiB0aGluZ3MgbGlrZSBbcHJlZml4ZWRdKCNtb2Rlcm5penItcHJlZml4ZWQpIGFuZCBbcHJlZml4ZWRDU1NdKCMtY29kZS1tb2Rlcm5penItcHJlZml4ZWRjc3MpLiBJdCBpcyBzaW1wbHlcbiAgICogYW4gYXJyYXkgb2Yga2ViYWItY2FzZSB2ZW5kb3IgcHJlZml4ZXMgeW91IGNhbiB1c2Ugd2l0aGluIHlvdXIgY29kZS5cbiAgICpcbiAgICogU29tZSBjb21tb24gdXNlIGNhc2VzIGluY2x1ZGVcbiAgICpcbiAgICogR2VuZXJhdGluZyBhbGwgcG9zc2libGUgcHJlZml4ZWQgdmVyc2lvbiBvZiBhIENTUyBwcm9wZXJ0eVxuICAgKiBgYGBqc1xuICAgKiB2YXIgcnVsZSA9IE1vZGVybml6ci5fcHJlZml4ZXMuam9pbigndHJhbnNmb3JtOiByb3RhdGUoMjBkZWcpOyAnKTtcbiAgICpcbiAgICogcnVsZSA9PT0gJ3RyYW5zZm9ybTogcm90YXRlKDIwZGVnKTsgd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDIwZGVnKTsgbW96LXRyYW5zZm9ybTogcm90YXRlKDIwZGVnKTsgby10cmFuc2Zvcm06IHJvdGF0ZSgyMGRlZyk7IG1zLXRyYW5zZm9ybTogcm90YXRlKDIwZGVnKTsnXG4gICAqIGBgYFxuICAgKlxuICAgKiBHZW5lcmF0aW5nIGFsbCBwb3NzaWJsZSBwcmVmaXhlZCB2ZXJzaW9uIG9mIGEgQ1NTIHZhbHVlXG4gICAqIGBgYGpzXG4gICAqIHJ1bGUgPSAnZGlzcGxheTonICsgIE1vZGVybml6ci5fcHJlZml4ZXMuam9pbignZmxleDsgZGlzcGxheTonKSArICdmbGV4JztcbiAgICpcbiAgICogcnVsZSA9PT0gJ2Rpc3BsYXk6ZmxleDsgZGlzcGxheTotd2Via2l0LWZsZXg7IGRpc3BsYXk6LW1vei1mbGV4OyBkaXNwbGF5Oi1vLWZsZXg7IGRpc3BsYXk6LW1zLWZsZXg7IGRpc3BsYXk6ZmxleCdcbiAgICogYGBgXG4gICAqL1xuXG4gIHZhciBwcmVmaXhlcyA9IChNb2Rlcm5penJQcm90by5fY29uZmlnLnVzZVByZWZpeGVzID8gJyAtd2Via2l0LSAtbW96LSAtby0gLW1zLSAnLnNwbGl0KCcgJykgOiBbXSk7XG5cbiAgLy8gZXhwb3NlIHRoZXNlIGZvciB0aGUgcGx1Z2luIEFQSS4gTG9vayBpbiB0aGUgc291cmNlIGZvciBob3cgdG8gam9pbigpIHRoZW0gYWdhaW5zdCB5b3VyIGlucHV0XG4gIE1vZGVybml6clByb3RvLl9wcmVmaXhlcyA9IHByZWZpeGVzO1xuXG5cblxuICAvKipcbiAgICogSWYgdGhlIGJyb3dzZXJzIGZvbGxvdyB0aGUgc3BlYywgdGhlbiB0aGV5IHdvdWxkIGV4cG9zZSB2ZW5kb3Itc3BlY2lmaWMgc3R5bGUgYXM6XG4gICAqICAgZWxlbS5zdHlsZS5XZWJraXRCb3JkZXJSYWRpdXNcbiAgICogaW5zdGVhZCBvZiBzb21ldGhpbmcgbGlrZSB0aGUgZm9sbG93aW5nLCB3aGljaCB3b3VsZCBiZSB0ZWNobmljYWxseSBpbmNvcnJlY3Q6XG4gICAqICAgZWxlbS5zdHlsZS53ZWJraXRCb3JkZXJSYWRpdXNcblxuICAgKiBXZWJraXQgZ2hvc3RzIHRoZWlyIHByb3BlcnRpZXMgaW4gbG93ZXJjYXNlIGJ1dCBPcGVyYSAmIE1veiBkbyBub3QuXG4gICAqIE1pY3Jvc29mdCB1c2VzIGEgbG93ZXJjYXNlIGBtc2AgaW5zdGVhZCBvZiB0aGUgY29ycmVjdCBgTXNgIGluIElFOCtcbiAgICogICBlcmlrLmVhZS5uZXQvYXJjaGl2ZXMvMjAwOC8wMy8xMC8yMS40OC4xMC9cblxuICAgKiBNb3JlIGhlcmU6IGdpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9pc3N1ZXMvaXNzdWUvMjFcbiAgICpcbiAgICogQGFjY2VzcyBwcml2YXRlXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSB2ZW5kb3Itc3BlY2lmaWMgc3R5bGUgcHJvcGVydGllc1xuICAgKi9cblxuICB2YXIgb21QcmVmaXhlcyA9ICdNb3ogTyBtcyBXZWJraXQnO1xuXG5cbiAgLyoqXG4gICAqIExpc3Qgb2YgSmF2YVNjcmlwdCBET00gdmFsdWVzIHVzZWQgZm9yIHRlc3RzXG4gICAqXG4gICAqIEBtZW1iZXJvZiBNb2Rlcm5penJcbiAgICogQG5hbWUgTW9kZXJuaXpyLl9kb21QcmVmaXhlc1xuICAgKiBAb3B0aW9uTmFtZSBNb2Rlcm5penIuX2RvbVByZWZpeGVzXG4gICAqIEBvcHRpb25Qcm9wIGRvbVByZWZpeGVzXG4gICAqIEBhY2Nlc3MgcHVibGljXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIE1vZGVybml6ci5fZG9tUHJlZml4ZXMgaXMgZXhhY3RseSB0aGUgc2FtZSBhcyBbX3ByZWZpeGVzXSgjbW9kZXJuaXpyLV9wcmVmaXhlcyksIGJ1dCByYXRoZXJcbiAgICogdGhhbiBrZWJhYi1jYXNlIHByb3BlcnRpZXMsIGFsbCBwcm9wZXJ0aWVzIGFyZSB0aGVpciBDYXBpdGFsaXplZCB2YXJpYW50XG4gICAqXG4gICAqIGBgYGpzXG4gICAqIE1vZGVybml6ci5fZG9tUHJlZml4ZXMgPT09IFsgXCJNb3pcIiwgXCJPXCIsIFwibXNcIiwgXCJXZWJraXRcIiBdO1xuICAgKiBgYGBcbiAgICovXG5cbiAgdmFyIGRvbVByZWZpeGVzID0gKE1vZGVybml6clByb3RvLl9jb25maWcudXNlUHJlZml4ZXMgPyBvbVByZWZpeGVzLnRvTG93ZXJDYXNlKCkuc3BsaXQoJyAnKSA6IFtdKTtcbiAgTW9kZXJuaXpyUHJvdG8uX2RvbVByZWZpeGVzID0gZG9tUHJlZml4ZXM7XG5cblxuICAvKipcbiAgICogY3JlYXRlRWxlbWVudCBpcyBhIGNvbnZlbmllbmNlIHdyYXBwZXIgYXJvdW5kIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQuIFNpbmNlIHdlXG4gICAqIHVzZSBjcmVhdGVFbGVtZW50IGFsbCBvdmVyIHRoZSBwbGFjZSwgdGhpcyBhbGxvd3MgZm9yIChzbGlnaHRseSkgc21hbGxlciBjb2RlXG4gICAqIGFzIHdlbGwgYXMgYWJzdHJhY3RpbmcgYXdheSBpc3N1ZXMgd2l0aCBjcmVhdGluZyBlbGVtZW50cyBpbiBjb250ZXh0cyBvdGhlciB0aGFuXG4gICAqIEhUTUwgZG9jdW1lbnRzIChlLmcuIFNWRyBkb2N1bWVudHMpLlxuICAgKlxuICAgKiBAYWNjZXNzIHByaXZhdGVcbiAgICogQGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRcbiAgICogQHJldHVybnMge0hUTUxFbGVtZW50fFNWR0VsZW1lbnR9IEFuIEhUTUwgb3IgU1ZHIGVsZW1lbnRcbiAgICovXG5cbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCgpIHtcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIFRoaXMgaXMgdGhlIGNhc2UgaW4gSUU3LCB3aGVyZSB0aGUgdHlwZSBvZiBjcmVhdGVFbGVtZW50IGlzIFwib2JqZWN0XCIuXG4gICAgICAvLyBGb3IgdGhpcyByZWFzb24sIHdlIGNhbm5vdCBjYWxsIGFwcGx5KCkgYXMgT2JqZWN0IGlzIG5vdCBhIEZ1bmN0aW9uLlxuICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYXJndW1lbnRzWzBdKTtcbiAgICB9IGVsc2UgaWYgKGlzU1ZHKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TLmNhbGwoZG9jdW1lbnQsICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIGFyZ3VtZW50c1swXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50LmFwcGx5KGRvY3VtZW50LCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIDtcblxuICAvKipcbiAgICogTW9kZXJuaXpyLmhhc0V2ZW50KCkgZGV0ZWN0cyBzdXBwb3J0IGZvciBhIGdpdmVuIGV2ZW50XG4gICAqXG4gICAqIEBtZW1iZXJvZiBNb2Rlcm5penJcbiAgICogQG5hbWUgTW9kZXJuaXpyLmhhc0V2ZW50XG4gICAqIEBvcHRpb25OYW1lIE1vZGVybml6ci5oYXNFdmVudCgpXG4gICAqIEBvcHRpb25Qcm9wIGhhc0V2ZW50XG4gICAqIEBhY2Nlc3MgcHVibGljXG4gICAqIEBmdW5jdGlvbiBoYXNFdmVudFxuICAgKiBAcGFyYW0gIHtzdHJpbmd8Kn0gZXZlbnROYW1lIC0gdGhlIG5hbWUgb2YgYW4gZXZlbnQgdG8gdGVzdCBmb3IgKGUuZy4gXCJyZXNpemVcIilcbiAgICogQHBhcmFtICB7RWxlbWVudHxzdHJpbmd9IFtlbGVtZW50PUhUTUxEaXZFbGVtZW50XSAtIGlzIHRoZSBlbGVtZW50fGRvY3VtZW50fHdpbmRvd3x0YWdOYW1lIHRvIHRlc3Qgb25cbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqIEBleGFtcGxlXG4gICAqICBgTW9kZXJuaXpyLmhhc0V2ZW50YCBsZXRzIHlvdSBkZXRlcm1pbmUgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgYSBzdXBwbGllZCBldmVudC5cbiAgICogIEJ5IGRlZmF1bHQsIGl0IGRvZXMgdGhpcyBkZXRlY3Rpb24gb24gYSBkaXYgZWxlbWVudFxuICAgKlxuICAgKiBgYGBqc1xuICAgKiAgaGFzRXZlbnQoJ2JsdXInKSAvLyB0cnVlO1xuICAgKiBgYGBcbiAgICpcbiAgICogSG93ZXZlciwgeW91IGFyZSBhYmxlIHRvIGdpdmUgYW4gb2JqZWN0IGFzIGEgc2Vjb25kIGFyZ3VtZW50IHRvIGhhc0V2ZW50IHRvXG4gICAqIGRldGVjdCBhbiBldmVudCBvbiBzb21ldGhpbmcgb3RoZXIgdGhhbiBhIGRpdi5cbiAgICpcbiAgICogYGBganNcbiAgICogIGhhc0V2ZW50KCdkZXZpY2VsaWdodCcsIHdpbmRvdykgLy8gdHJ1ZTtcbiAgICogYGBgXG4gICAqXG4gICAqL1xuXG4gIHZhciBoYXNFdmVudCA9IChmdW5jdGlvbigpIHtcblxuICAgIC8vIERldGVjdCB3aGV0aGVyIGV2ZW50IHN1cHBvcnQgY2FuIGJlIGRldGVjdGVkIHZpYSBgaW5gLiBUZXN0IG9uIGEgRE9NIGVsZW1lbnRcbiAgICAvLyB1c2luZyB0aGUgXCJibHVyXCIgZXZlbnQgYi9jIGl0IHNob3VsZCBhbHdheXMgZXhpc3QuIGJpdC5seS9ldmVudC1kZXRlY3Rpb25cbiAgICB2YXIgbmVlZHNGYWxsYmFjayA9ICEoJ29uYmx1cicgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KTtcblxuICAgIGZ1bmN0aW9uIGlubmVyKGV2ZW50TmFtZSwgZWxlbWVudCkge1xuXG4gICAgICB2YXIgaXNTdXBwb3J0ZWQ7XG4gICAgICBpZiAoIWV2ZW50TmFtZSkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAgIGlmICghZWxlbWVudCB8fCB0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoZWxlbWVudCB8fCAnZGl2Jyk7XG4gICAgICB9XG5cbiAgICAgIC8vIFRlc3RpbmcgdmlhIHRoZSBgaW5gIG9wZXJhdG9yIGlzIHN1ZmZpY2llbnQgZm9yIG1vZGVybiBicm93c2VycyBhbmQgSUUuXG4gICAgICAvLyBXaGVuIHVzaW5nIGBzZXRBdHRyaWJ1dGVgLCBJRSBza2lwcyBcInVubG9hZFwiLCBXZWJLaXQgc2tpcHMgXCJ1bmxvYWRcIiBhbmRcbiAgICAgIC8vIFwicmVzaXplXCIsIHdoZXJlYXMgYGluYCBcImNhdGNoZXNcIiB0aG9zZS5cbiAgICAgIGV2ZW50TmFtZSA9ICdvbicgKyBldmVudE5hbWU7XG4gICAgICBpc1N1cHBvcnRlZCA9IGV2ZW50TmFtZSBpbiBlbGVtZW50O1xuXG4gICAgICAvLyBGYWxsYmFjayB0ZWNobmlxdWUgZm9yIG9sZCBGaXJlZm94IC0gYml0Lmx5L2V2ZW50LWRldGVjdGlvblxuICAgICAgaWYgKCFpc1N1cHBvcnRlZCAmJiBuZWVkc0ZhbGxiYWNrKSB7XG4gICAgICAgIGlmICghZWxlbWVudC5zZXRBdHRyaWJ1dGUpIHtcbiAgICAgICAgICAvLyBTd2l0Y2ggdG8gZ2VuZXJpYyBlbGVtZW50IGlmIGl0IGxhY2tzIGBzZXRBdHRyaWJ1dGVgLlxuICAgICAgICAgIC8vIEl0IGNvdWxkIGJlIHRoZSBgZG9jdW1lbnRgLCBgd2luZG93YCwgb3Igc29tZXRoaW5nIGVsc2UuXG4gICAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoZXZlbnROYW1lLCAnJyk7XG4gICAgICAgIGlzU3VwcG9ydGVkID0gdHlwZW9mIGVsZW1lbnRbZXZlbnROYW1lXSA9PT0gJ2Z1bmN0aW9uJztcblxuICAgICAgICBpZiAoZWxlbWVudFtldmVudE5hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvLyBJZiBwcm9wZXJ0eSB3YXMgY3JlYXRlZCwgXCJyZW1vdmUgaXRcIiBieSBzZXR0aW5nIHZhbHVlIHRvIGB1bmRlZmluZWRgLlxuICAgICAgICAgIGVsZW1lbnRbZXZlbnROYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShldmVudE5hbWUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaXNTdXBwb3J0ZWQ7XG4gICAgfVxuICAgIHJldHVybiBpbm5lcjtcbiAgfSkoKTtcblxuXG4gIE1vZGVybml6clByb3RvLmhhc0V2ZW50ID0gaGFzRXZlbnQ7XG5cbi8qIVxue1xuICBcIm5hbWVcIjogXCJET00gUG9pbnRlciBFdmVudHMgQVBJXCIsXG4gIFwicHJvcGVydHlcIjogXCJwb2ludGVyZXZlbnRzXCIsXG4gIFwidGFnc1wiOiBbXCJpbnB1dFwiXSxcbiAgXCJhdXRob3JzXCI6IFtcIlN0dSBDb3hcIl0sXG4gIFwibm90ZXNcIjogW1xuICAgIHtcbiAgICAgIFwibmFtZVwiOiBcIlczQyBzcGVjXCIsXG4gICAgICBcImhyZWZcIjogXCJodHRwOi8vd3d3LnczLm9yZy9UUi9wb2ludGVyZXZlbnRzL1wiXG4gICAgfVxuICBdLFxuICBcIndhcm5pbmdzXCI6IFtcIlRoaXMgcHJvcGVydHkgbmFtZSBub3cgcmVmZXJzIHRvIFczQyBET00gUG9pbnRlckV2ZW50czogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvaXNzdWVzLzU0OCNpc3N1ZWNvbW1lbnQtMTI4MTIwOTlcIl0sXG4gIFwicG9seWZpbGxzXCI6IFtcImhhbmRqc1wiXVxufVxuISovXG4vKiBET0NcbkRldGVjdHMgc3VwcG9ydCBmb3IgdGhlIERPTSBQb2ludGVyIEV2ZW50cyBBUEksIHdoaWNoIHByb3ZpZGVzIGEgdW5pZmllZCBldmVudCBpbnRlcmZhY2UgZm9yIHBvaW50aW5nIGlucHV0IGRldmljZXMsIGFzIGltcGxlbWVudGVkIGluIElFMTArLlxuKi9cblxuICAvLyAqKlRlc3QgbmFtZSBoaWphY2tlZCEqKlxuICAvLyBOb3cgcmVmZXJzIHRvIFczQyBET00gUG9pbnRlckV2ZW50cyBzcGVjIHJhdGhlciB0aGFuIHRoZSBDU1MgcG9pbnRlci1ldmVudHMgcHJvcGVydHkuXG4gIE1vZGVybml6ci5hZGRUZXN0KCdwb2ludGVyZXZlbnRzJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gQ2Fubm90IHVzZSBgLnByZWZpeGVkKClgIGZvciBldmVudHMsIHNvIHRlc3QgZWFjaCBwcmVmaXhcbiAgICB2YXIgYm9vbCA9IGZhbHNlLFxuICAgIGkgPSBkb21QcmVmaXhlcy5sZW5ndGg7XG5cbiAgICAvLyBEb24ndCBmb3JnZXQgdW4tcHJlZml4ZWQuLi5cbiAgICBib29sID0gTW9kZXJuaXpyLmhhc0V2ZW50KCdwb2ludGVyZG93bicpO1xuXG4gICAgd2hpbGUgKGktLSAmJiAhYm9vbCkge1xuICAgICAgaWYgKGhhc0V2ZW50KGRvbVByZWZpeGVzW2ldICsgJ3BvaW50ZXJkb3duJykpIHtcbiAgICAgICAgYm9vbCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBib29sO1xuICB9KTtcblxuXG4gIC8qKlxuICAgKiBnZXRCb2R5IHJldHVybnMgdGhlIGJvZHkgb2YgYSBkb2N1bWVudCwgb3IgYW4gZWxlbWVudCB0aGF0IGNhbiBzdGFuZCBpbiBmb3JcbiAgICogdGhlIGJvZHkgaWYgYSByZWFsIGJvZHkgZG9lcyBub3QgZXhpc3RcbiAgICpcbiAgICogQGFjY2VzcyBwcml2YXRlXG4gICAqIEBmdW5jdGlvbiBnZXRCb2R5XG4gICAqIEByZXR1cm5zIHtIVE1MRWxlbWVudHxTVkdFbGVtZW50fSBSZXR1cm5zIHRoZSByZWFsIGJvZHkgb2YgYSBkb2N1bWVudCwgb3IgYW5cbiAgICogYXJ0aWZpY2lhbGx5IGNyZWF0ZWQgZWxlbWVudCB0aGF0IHN0YW5kcyBpbiBmb3IgdGhlIGJvZHlcbiAgICovXG5cbiAgZnVuY3Rpb24gZ2V0Qm9keSgpIHtcbiAgICAvLyBBZnRlciBwYWdlIGxvYWQgaW5qZWN0aW5nIGEgZmFrZSBib2R5IGRvZXNuJ3Qgd29yayBzbyBjaGVjayBpZiBib2R5IGV4aXN0c1xuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuYm9keTtcblxuICAgIGlmICghYm9keSkge1xuICAgICAgLy8gQ2FuJ3QgdXNlIHRoZSByZWFsIGJvZHkgY3JlYXRlIGEgZmFrZSBvbmUuXG4gICAgICBib2R5ID0gY3JlYXRlRWxlbWVudChpc1NWRyA/ICdzdmcnIDogJ2JvZHknKTtcbiAgICAgIGJvZHkuZmFrZSA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvZHk7XG4gIH1cblxuICA7XG5cbiAgLyoqXG4gICAqIGluamVjdEVsZW1lbnRXaXRoU3R5bGVzIGluamVjdHMgYW4gZWxlbWVudCB3aXRoIHN0eWxlIGVsZW1lbnQgYW5kIHNvbWUgQ1NTIHJ1bGVzXG4gICAqXG4gICAqIEBhY2Nlc3MgcHJpdmF0ZVxuICAgKiBAZnVuY3Rpb24gaW5qZWN0RWxlbWVudFdpdGhTdHlsZXNcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJ1bGUgLSBTdHJpbmcgcmVwcmVzZW50aW5nIGEgY3NzIHJ1bGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBBIGZ1bmN0aW9uIHRoYXQgaXMgdXNlZCB0byB0ZXN0IHRoZSBpbmplY3RlZCBlbGVtZW50XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbm9kZXNdIC0gQW4gaW50ZWdlciByZXByZXNlbnRpbmcgdGhlIG51bWJlciBvZiBhZGRpdGlvbmFsIG5vZGVzIHlvdSB3YW50IGluamVjdGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IFt0ZXN0bmFtZXNdIC0gQW4gYXJyYXkgb2Ygc3RyaW5ncyB0aGF0IGFyZSB1c2VkIGFzIGlkcyBmb3IgdGhlIGFkZGl0aW9uYWwgbm9kZXNcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGluamVjdEVsZW1lbnRXaXRoU3R5bGVzKHJ1bGUsIGNhbGxiYWNrLCBub2RlcywgdGVzdG5hbWVzKSB7XG4gICAgdmFyIG1vZCA9ICdtb2Rlcm5penInO1xuICAgIHZhciBzdHlsZTtcbiAgICB2YXIgcmV0O1xuICAgIHZhciBub2RlO1xuICAgIHZhciBkb2NPdmVyZmxvdztcbiAgICB2YXIgZGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdmFyIGJvZHkgPSBnZXRCb2R5KCk7XG5cbiAgICBpZiAocGFyc2VJbnQobm9kZXMsIDEwKSkge1xuICAgICAgLy8gSW4gb3JkZXIgbm90IHRvIGdpdmUgZmFsc2UgcG9zaXRpdmVzIHdlIGNyZWF0ZSBhIG5vZGUgZm9yIGVhY2ggdGVzdFxuICAgICAgLy8gVGhpcyBhbHNvIGFsbG93cyB0aGUgbWV0aG9kIHRvIHNjYWxlIGZvciB1bnNwZWNpZmllZCB1c2VzXG4gICAgICB3aGlsZSAobm9kZXMtLSkge1xuICAgICAgICBub2RlID0gY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG5vZGUuaWQgPSB0ZXN0bmFtZXMgPyB0ZXN0bmFtZXNbbm9kZXNdIDogbW9kICsgKG5vZGVzICsgMSk7XG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzdHlsZSA9IGNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgc3R5bGUuaWQgPSAncycgKyBtb2Q7XG5cbiAgICAvLyBJRTYgd2lsbCBmYWxzZSBwb3NpdGl2ZSBvbiBzb21lIHRlc3RzIGR1ZSB0byB0aGUgc3R5bGUgZWxlbWVudCBpbnNpZGUgdGhlIHRlc3QgZGl2IHNvbWVob3cgaW50ZXJmZXJpbmcgb2Zmc2V0SGVpZ2h0LCBzbyBpbnNlcnQgaXQgaW50byBib2R5IG9yIGZha2Vib2R5LlxuICAgIC8vIE9wZXJhIHdpbGwgYWN0IGFsbCBxdWlya3kgd2hlbiBpbmplY3RpbmcgZWxlbWVudHMgaW4gZG9jdW1lbnRFbGVtZW50IHdoZW4gcGFnZSBpcyBzZXJ2ZWQgYXMgeG1sLCBuZWVkcyBmYWtlYm9keSB0b28uICMyNzBcbiAgICAoIWJvZHkuZmFrZSA/IGRpdiA6IGJvZHkpLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICBib2R5LmFwcGVuZENoaWxkKGRpdik7XG5cbiAgICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcnVsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocnVsZSkpO1xuICAgIH1cbiAgICBkaXYuaWQgPSBtb2Q7XG5cbiAgICBpZiAoYm9keS5mYWtlKSB7XG4gICAgICAvL2F2b2lkIGNyYXNoaW5nIElFOCwgaWYgYmFja2dyb3VuZCBpbWFnZSBpcyB1c2VkXG4gICAgICBib2R5LnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICAgIC8vU2FmYXJpIDUuMTMvNS4xLjQgT1NYIHN0b3BzIGxvYWRpbmcgaWYgOjotd2Via2l0LXNjcm9sbGJhciBpcyB1c2VkIGFuZCBzY3JvbGxiYXJzIGFyZSB2aXNpYmxlXG4gICAgICBib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICBkb2NPdmVyZmxvdyA9IGRvY0VsZW1lbnQuc3R5bGUub3ZlcmZsb3c7XG4gICAgICBkb2NFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICBkb2NFbGVtZW50LmFwcGVuZENoaWxkKGJvZHkpO1xuICAgIH1cblxuICAgIHJldCA9IGNhbGxiYWNrKGRpdiwgcnVsZSk7XG4gICAgLy8gSWYgdGhpcyBpcyBkb25lIGFmdGVyIHBhZ2UgbG9hZCB3ZSBkb24ndCB3YW50IHRvIHJlbW92ZSB0aGUgYm9keSBzbyBjaGVjayBpZiBib2R5IGV4aXN0c1xuICAgIGlmIChib2R5LmZha2UpIHtcbiAgICAgIGJvZHkucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChib2R5KTtcbiAgICAgIGRvY0VsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSBkb2NPdmVyZmxvdztcbiAgICAgIC8vIFRyaWdnZXIgbGF5b3V0IHNvIGtpbmV0aWMgc2Nyb2xsaW5nIGlzbid0IGRpc2FibGVkIGluIGlPUzYrXG4gICAgICBkb2NFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGl2LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZGl2KTtcbiAgICB9XG5cbiAgICByZXR1cm4gISFyZXQ7XG5cbiAgfVxuXG4gIDtcblxuICAvKipcbiAgICogdGVzdFN0eWxlcyBpbmplY3RzIGFuIGVsZW1lbnQgd2l0aCBzdHlsZSBlbGVtZW50IGFuZCBzb21lIENTUyBydWxlc1xuICAgKlxuICAgKiBAbWVtYmVyb2YgTW9kZXJuaXpyXG4gICAqIEBuYW1lIE1vZGVybml6ci50ZXN0U3R5bGVzXG4gICAqIEBvcHRpb25OYW1lIE1vZGVybml6ci50ZXN0U3R5bGVzKClcbiAgICogQG9wdGlvblByb3AgdGVzdFN0eWxlc1xuICAgKiBAYWNjZXNzIHB1YmxpY1xuICAgKiBAZnVuY3Rpb24gdGVzdFN0eWxlc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gcnVsZSAtIFN0cmluZyByZXByZXNlbnRpbmcgYSBjc3MgcnVsZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIEEgZnVuY3Rpb24gdGhhdCBpcyB1c2VkIHRvIHRlc3QgdGhlIGluamVjdGVkIGVsZW1lbnRcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtub2Rlc10gLSBBbiBpbnRlZ2VyIHJlcHJlc2VudGluZyB0aGUgbnVtYmVyIG9mIGFkZGl0aW9uYWwgbm9kZXMgeW91IHdhbnQgaW5qZWN0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gW3Rlc3RuYW1lc10gLSBBbiBhcnJheSBvZiBzdHJpbmdzIHRoYXQgYXJlIHVzZWQgYXMgaWRzIGZvciB0aGUgYWRkaXRpb25hbCBub2Rlc1xuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogYE1vZGVybml6ci50ZXN0U3R5bGVzYCB0YWtlcyBhIENTUyBydWxlIGFuZCBpbmplY3RzIGl0IG9udG8gdGhlIGN1cnJlbnQgcGFnZVxuICAgKiBhbG9uZyB3aXRoIChwb3NzaWJseSBtdWx0aXBsZSkgRE9NIGVsZW1lbnRzLiBUaGlzIGxldHMgeW91IGNoZWNrIGZvciBmZWF0dXJlc1xuICAgKiB0aGF0IGNhbiBub3QgYmUgZGV0ZWN0ZWQgYnkgc2ltcGx5IGNoZWNraW5nIHRoZSBbSURMXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL01vemlsbGEvRGV2ZWxvcGVyX2d1aWRlL0ludGVyZmFjZV9kZXZlbG9wbWVudF9ndWlkZS9JRExfaW50ZXJmYWNlX3J1bGVzKS5cbiAgICpcbiAgICogYGBganNcbiAgICogTW9kZXJuaXpyLnRlc3RTdHlsZXMoJyNtb2Rlcm5penIgeyB3aWR0aDogOXB4OyBjb2xvcjogcGFwYXlhd2hpcDsgfScsIGZ1bmN0aW9uKGVsZW0sIHJ1bGUpIHtcbiAgICogICAvLyBlbGVtIGlzIHRoZSBmaXJzdCBET00gbm9kZSBpbiB0aGUgcGFnZSAoYnkgZGVmYXVsdCAjbW9kZXJuaXpyKVxuICAgKiAgIC8vIHJ1bGUgaXMgdGhlIGZpcnN0IGFyZ3VtZW50IHlvdSBzdXBwbGllZCAtIHRoZSBDU1MgcnVsZSBpbiBzdHJpbmcgZm9ybVxuICAgKlxuICAgKiAgIGFkZFRlc3QoJ3dpZHRod29ya3MnLCBlbGVtLnN0eWxlLndpZHRoID09PSAnOXB4JylcbiAgICogfSk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBJZiB5b3VyIHRlc3QgcmVxdWlyZXMgbXVsdGlwbGUgbm9kZXMsIHlvdSBjYW4gaW5jbHVkZSBhIHRoaXJkIGFyZ3VtZW50XG4gICAqIGluZGljYXRpbmcgaG93IG1hbnkgYWRkaXRpb25hbCBkaXYgZWxlbWVudHMgdG8gaW5jbHVkZSBvbiB0aGUgcGFnZS4gVGhlXG4gICAqIGFkZGl0aW9uYWwgbm9kZXMgYXJlIGluamVjdGVkIGFzIGNoaWxkcmVuIG9mIHRoZSBgZWxlbWAgdGhhdCBpcyByZXR1cm5lZCBhc1xuICAgKiB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlIGNhbGxiYWNrLlxuICAgKlxuICAgKiBgYGBqc1xuICAgKiBNb2Rlcm5penIudGVzdFN0eWxlcygnI21vZGVybml6ciB7d2lkdGg6IDFweH07ICNtb2Rlcm5penIyIHt3aWR0aDogMnB4fScsIGZ1bmN0aW9uKGVsZW0pIHtcbiAgICogICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kZXJuaXpyJykuc3R5bGUud2lkdGggPT09ICcxcHgnOyAvLyB0cnVlXG4gICAqICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGVybml6cjInKS5zdHlsZS53aWR0aCA9PT0gJzJweCc7IC8vIHRydWVcbiAgICogICBlbGVtLmZpcnN0Q2hpbGQgPT09IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2Rlcm5penIyJyk7IC8vIHRydWVcbiAgICogfSwgMSk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBCeSBkZWZhdWx0LCBhbGwgb2YgdGhlIGFkZGl0aW9uYWwgZWxlbWVudHMgaGF2ZSBhbiBJRCBvZiBgbW9kZXJuaXpyW25dYCwgd2hlcmVcbiAgICogYG5gIGlzIGl0cyBpbmRleCAoZS5nLiB0aGUgZmlyc3QgYWRkaXRpb25hbCwgc2Vjb25kIG92ZXJhbGwgaXMgYCNtb2Rlcm5penIyYCxcbiAgICogdGhlIHNlY29uZCBhZGRpdGlvbmFsIGlzIGAjbW9kZXJuaXpyM2AsIGV0Yy4pLlxuICAgKiBJZiB5b3Ugd2FudCB0byBoYXZlIG1vcmUgbWVhbmluZ2Z1bCBJRHMgZm9yIHlvdXIgZnVuY3Rpb24sIHlvdSBjYW4gcHJvdmlkZVxuICAgKiB0aGVtIGFzIHRoZSBmb3VydGggYXJndW1lbnQsIGFzIGFuIGFycmF5IG9mIHN0cmluZ3NcbiAgICpcbiAgICogYGBganNcbiAgICogTW9kZXJuaXpyLnRlc3RTdHlsZXMoJyNmb28ge3dpZHRoOiAxMHB4fTsgI2JhciB7aGVpZ2h0OiAyMHB4fScsIGZ1bmN0aW9uKGVsZW0pIHtcbiAgICogICBlbGVtLmZpcnN0Q2hpbGQgPT09IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb28nKTsgLy8gdHJ1ZVxuICAgKiAgIGVsZW0ubGFzdENoaWxkID09PSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFyJyk7IC8vIHRydWVcbiAgICogfSwgMiwgWydmb28nLCAnYmFyJ10pO1xuICAgKiBgYGBcbiAgICpcbiAgICovXG5cbiAgdmFyIHRlc3RTdHlsZXMgPSBNb2Rlcm5penJQcm90by50ZXN0U3R5bGVzID0gaW5qZWN0RWxlbWVudFdpdGhTdHlsZXM7XG5cbi8qIVxue1xuICBcIm5hbWVcIjogXCJUb3VjaCBFdmVudHNcIixcbiAgXCJwcm9wZXJ0eVwiOiBcInRvdWNoZXZlbnRzXCIsXG4gIFwiY2FuaXVzZVwiIDogXCJ0b3VjaFwiLFxuICBcInRhZ3NcIjogW1wibWVkaWFcIiwgXCJhdHRyaWJ1dGVcIl0sXG4gIFwibm90ZXNcIjogW3tcbiAgICBcIm5hbWVcIjogXCJUb3VjaCBFdmVudHMgc3BlY1wiLFxuICAgIFwiaHJlZlwiOiBcImh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTMvV0QtdG91Y2gtZXZlbnRzLTIwMTMwMTI0L1wiXG4gIH1dLFxuICBcIndhcm5pbmdzXCI6IFtcbiAgICBcIkluZGljYXRlcyBpZiB0aGUgYnJvd3NlciBzdXBwb3J0cyB0aGUgVG91Y2ggRXZlbnRzIHNwZWMsIGFuZCBkb2VzIG5vdCBuZWNlc3NhcmlseSByZWZsZWN0IGEgdG91Y2hzY3JlZW4gZGV2aWNlXCJcbiAgXSxcbiAgXCJrbm93bkJ1Z3NcIjogW1xuICAgIFwiRmFsc2UtcG9zaXRpdmUgb24gc29tZSBjb25maWd1cmF0aW9ucyBvZiBOb2tpYSBOOTAwXCIsXG4gICAgXCJGYWxzZS1wb3NpdGl2ZSBvbiBzb21lIEJsYWNrQmVycnkgNi4wIGJ1aWxkcyDigJMgaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvaXNzdWVzLzM3MiNpc3N1ZWNvbW1lbnQtMzExMjY5NVwiXG4gIF1cbn1cbiEqL1xuLyogRE9DXG5JbmRpY2F0ZXMgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgdGhlIFczQyBUb3VjaCBFdmVudHMgQVBJLlxuXG5UaGlzICpkb2VzIG5vdCogbmVjZXNzYXJpbHkgcmVmbGVjdCBhIHRvdWNoc2NyZWVuIGRldmljZTpcblxuKiBPbGRlciB0b3VjaHNjcmVlbiBkZXZpY2VzIG9ubHkgZW11bGF0ZSBtb3VzZSBldmVudHNcbiogTW9kZXJuIElFIHRvdWNoIGRldmljZXMgaW1wbGVtZW50IHRoZSBQb2ludGVyIEV2ZW50cyBBUEkgaW5zdGVhZDogdXNlIGBNb2Rlcm5penIucG9pbnRlcmV2ZW50c2AgdG8gZGV0ZWN0IHN1cHBvcnQgZm9yIHRoYXRcbiogU29tZSBicm93c2VycyAmIE9TIHNldHVwcyBtYXkgZW5hYmxlIHRvdWNoIEFQSXMgd2hlbiBubyB0b3VjaHNjcmVlbiBpcyBjb25uZWN0ZWRcbiogRnV0dXJlIGJyb3dzZXJzIG1heSBpbXBsZW1lbnQgb3RoZXIgZXZlbnQgbW9kZWxzIGZvciB0b3VjaCBpbnRlcmFjdGlvbnNcblxuU2VlIHRoaXMgYXJ0aWNsZTogW1lvdSBDYW4ndCBEZXRlY3QgQSBUb3VjaHNjcmVlbl0oaHR0cDovL3d3dy5zdHVjb3guY29tL2Jsb2cveW91LWNhbnQtZGV0ZWN0LWEtdG91Y2hzY3JlZW4vKS5cblxuSXQncyByZWNvbW1lbmRlZCB0byBiaW5kIGJvdGggbW91c2UgYW5kIHRvdWNoL3BvaW50ZXIgZXZlbnRzIHNpbXVsdGFuZW91c2x5IOKAkyBzZWUgW3RoaXMgSFRNTDUgUm9ja3MgdHV0b3JpYWxdKGh0dHA6Ly93d3cuaHRtbDVyb2Nrcy5jb20vZW4vbW9iaWxlL3RvdWNoYW5kbW91c2UvKS5cblxuVGhpcyB0ZXN0IHdpbGwgYWxzbyByZXR1cm4gYHRydWVgIGZvciBGaXJlZm94IDQgTXVsdGl0b3VjaCBzdXBwb3J0LlxuKi9cblxuICAvLyBDaHJvbWUgKGRlc2t0b3ApIHVzZWQgdG8gbGllIGFib3V0IGl0cyBzdXBwb3J0IG9uIHRoaXMsIGJ1dCB0aGF0IGhhcyBzaW5jZSBiZWVuIHJlY3RpZmllZDogaHR0cDovL2NyYnVnLmNvbS8zNjQxNVxuICBNb2Rlcm5penIuYWRkVGVzdCgndG91Y2hldmVudHMnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgYm9vbDtcbiAgICBpZiAoKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykgfHwgd2luZG93LkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiBEb2N1bWVudFRvdWNoKSB7XG4gICAgICBib29sID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHF1ZXJ5ID0gWydAbWVkaWEgKCcsIHByZWZpeGVzLmpvaW4oJ3RvdWNoLWVuYWJsZWQpLCgnKSwgJ2hlYXJ0eicsICcpJywgJ3sjbW9kZXJuaXpye3RvcDo5cHg7cG9zaXRpb246YWJzb2x1dGV9fSddLmpvaW4oJycpO1xuICAgICAgdGVzdFN0eWxlcyhxdWVyeSwgZnVuY3Rpb24obm9kZSkge1xuICAgICAgICBib29sID0gbm9kZS5vZmZzZXRUb3AgPT09IDk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGJvb2w7XG4gIH0pO1xuXG5cbiAgdmFyIGNzc29tUHJlZml4ZXMgPSAoTW9kZXJuaXpyUHJvdG8uX2NvbmZpZy51c2VQcmVmaXhlcyA/IG9tUHJlZml4ZXMuc3BsaXQoJyAnKSA6IFtdKTtcbiAgTW9kZXJuaXpyUHJvdG8uX2Nzc29tUHJlZml4ZXMgPSBjc3NvbVByZWZpeGVzO1xuXG5cblxuICAvKipcbiAgICogY29udGFpbnMgY2hlY2tzIHRvIHNlZSBpZiBhIHN0cmluZyBjb250YWlucyBhbm90aGVyIHN0cmluZ1xuICAgKlxuICAgKiBAYWNjZXNzIHByaXZhdGVcbiAgICogQGZ1bmN0aW9uIGNvbnRhaW5zXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBUaGUgc3RyaW5nIHdlIHdhbnQgdG8gY2hlY2sgZm9yIHN1YnN0cmluZ3NcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN1YnN0ciAtIFRoZSBzdWJzdHJpbmcgd2Ugd2FudCB0byBzZWFyY2ggdGhlIGZpcnN0IHN0cmluZyBmb3JcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNvbnRhaW5zKHN0ciwgc3Vic3RyKSB7XG4gICAgcmV0dXJuICEhfignJyArIHN0cikuaW5kZXhPZihzdWJzdHIpO1xuICB9XG5cbiAgO1xuXG4gIC8qKlxuICAgKiBjc3NUb0RPTSB0YWtlcyBhIGtlYmFiLWNhc2Ugc3RyaW5nIGFuZCBjb252ZXJ0cyBpdCB0byBjYW1lbENhc2VcbiAgICogZS5nLiBib3gtc2l6aW5nIC0+IGJveFNpemluZ1xuICAgKlxuICAgKiBAYWNjZXNzIHByaXZhdGVcbiAgICogQGZ1bmN0aW9uIGNzc1RvRE9NXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gU3RyaW5nIG5hbWUgb2Yga2ViYWItY2FzZSBwcm9wIHdlIHdhbnQgdG8gY29udmVydFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY2FtZWxDYXNlIHZlcnNpb24gb2YgdGhlIHN1cHBsaWVkIG5hbWVcbiAgICovXG5cbiAgZnVuY3Rpb24gY3NzVG9ET00obmFtZSkge1xuICAgIHJldHVybiBuYW1lLnJlcGxhY2UoLyhbYS16XSktKFthLXpdKS9nLCBmdW5jdGlvbihzdHIsIG0xLCBtMikge1xuICAgICAgcmV0dXJuIG0xICsgbTIudG9VcHBlckNhc2UoKTtcbiAgICB9KS5yZXBsYWNlKC9eLS8sICcnKTtcbiAgfVxuICA7XG5cbiAgLyoqXG4gICAqIGZuQmluZCBpcyBhIHN1cGVyIHNtYWxsIFtiaW5kXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9GdW5jdGlvbi9iaW5kKSBwb2x5ZmlsbC5cbiAgICpcbiAgICogQGFjY2VzcyBwcml2YXRlXG4gICAqIEBmdW5jdGlvbiBmbkJpbmRcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZm4gLSBhIGZ1bmN0aW9uIHlvdSB3YW50IHRvIGNoYW5nZSBgdGhpc2AgcmVmZXJlbmNlIHRvXG4gICAqIEBwYXJhbSB7b2JqZWN0fSB0aGF0IC0gdGhlIGB0aGlzYCB5b3Ugd2FudCB0byBjYWxsIHRoZSBmdW5jdGlvbiB3aXRoXG4gICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gVGhlIHdyYXBwZWQgdmVyc2lvbiBvZiB0aGUgc3VwcGxpZWQgZnVuY3Rpb25cbiAgICovXG5cbiAgZnVuY3Rpb24gZm5CaW5kKGZuLCB0aGF0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxuXG4gIDtcblxuICAvKipcbiAgICogdGVzdERPTVByb3BzIGlzIGEgZ2VuZXJpYyBET00gcHJvcGVydHkgdGVzdDsgaWYgYSBicm93c2VyIHN1cHBvcnRzXG4gICAqICAgYSBjZXJ0YWluIHByb3BlcnR5LCBpdCB3b24ndCByZXR1cm4gdW5kZWZpbmVkIGZvciBpdC5cbiAgICpcbiAgICogQGFjY2VzcyBwcml2YXRlXG4gICAqIEBmdW5jdGlvbiB0ZXN0RE9NUHJvcHNcbiAgICogQHBhcmFtIHthcnJheS48c3RyaW5nPn0gcHJvcHMgLSBBbiBhcnJheSBvZiBwcm9wZXJ0aWVzIHRvIHRlc3QgZm9yXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvYmogLSBBbiBvYmplY3Qgb3IgRWxlbWVudCB5b3Ugd2FudCB0byB1c2UgdG8gdGVzdCB0aGUgcGFyYW1ldGVycyBhZ2FpblxuICAgKiBAcGFyYW0ge2Jvb2xlYW58b2JqZWN0fSBlbGVtIC0gQW4gRWxlbWVudCB0byBiaW5kIHRoZSBwcm9wZXJ0eSBsb29rdXAgYWdhaW4uIFVzZSBgZmFsc2VgIHRvIHByZXZlbnQgdGhlIGNoZWNrXG4gICAqL1xuICBmdW5jdGlvbiB0ZXN0RE9NUHJvcHMocHJvcHMsIG9iaiwgZWxlbSkge1xuICAgIHZhciBpdGVtO1xuXG4gICAgZm9yICh2YXIgaSBpbiBwcm9wcykge1xuICAgICAgaWYgKHByb3BzW2ldIGluIG9iaikge1xuXG4gICAgICAgIC8vIHJldHVybiB0aGUgcHJvcGVydHkgbmFtZSBhcyBhIHN0cmluZ1xuICAgICAgICBpZiAoZWxlbSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm4gcHJvcHNbaV07XG4gICAgICAgIH1cblxuICAgICAgICBpdGVtID0gb2JqW3Byb3BzW2ldXTtcblxuICAgICAgICAvLyBsZXQncyBiaW5kIGEgZnVuY3Rpb25cbiAgICAgICAgaWYgKGlzKGl0ZW0sICdmdW5jdGlvbicpKSB7XG4gICAgICAgICAgLy8gYmluZCB0byBvYmogdW5sZXNzIG92ZXJyaWRlblxuICAgICAgICAgIHJldHVybiBmbkJpbmQoaXRlbSwgZWxlbSB8fCBvYmopO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmV0dXJuIHRoZSB1bmJvdW5kIGZ1bmN0aW9uIG9yIG9iaiBvciB2YWx1ZVxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgb3VyIFwibW9kZXJuaXpyXCIgZWxlbWVudCB0aGF0IHdlIGRvIG1vc3QgZmVhdHVyZSB0ZXN0cyBvbi5cbiAgICpcbiAgICogQGFjY2VzcyBwcml2YXRlXG4gICAqL1xuXG4gIHZhciBtb2RFbGVtID0ge1xuICAgIGVsZW06IGNyZWF0ZUVsZW1lbnQoJ21vZGVybml6cicpXG4gIH07XG5cbiAgLy8gQ2xlYW4gdXAgdGhpcyBlbGVtZW50XG4gIE1vZGVybml6ci5fcS5wdXNoKGZ1bmN0aW9uKCkge1xuICAgIGRlbGV0ZSBtb2RFbGVtLmVsZW07XG4gIH0pO1xuXG5cblxuICB2YXIgbVN0eWxlID0ge1xuICAgIHN0eWxlOiBtb2RFbGVtLmVsZW0uc3R5bGVcbiAgfTtcblxuICAvLyBraWxsIHJlZiBmb3IgZ2MsIG11c3QgaGFwcGVuIGJlZm9yZSBtb2QuZWxlbSBpcyByZW1vdmVkLCBzbyB3ZSB1bnNoaWZ0IG9uIHRvXG4gIC8vIHRoZSBmcm9udCBvZiB0aGUgcXVldWUuXG4gIE1vZGVybml6ci5fcS51bnNoaWZ0KGZ1bmN0aW9uKCkge1xuICAgIGRlbGV0ZSBtU3R5bGUuc3R5bGU7XG4gIH0pO1xuXG5cblxuICAvKipcbiAgICogZG9tVG9DU1MgdGFrZXMgYSBjYW1lbENhc2Ugc3RyaW5nIGFuZCBjb252ZXJ0cyBpdCB0byBrZWJhYi1jYXNlXG4gICAqIGUuZy4gYm94U2l6aW5nIC0+IGJveC1zaXppbmdcbiAgICpcbiAgICogQGFjY2VzcyBwcml2YXRlXG4gICAqIEBmdW5jdGlvbiBkb21Ub0NTU1xuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFN0cmluZyBuYW1lIG9mIGNhbWVsQ2FzZSBwcm9wIHdlIHdhbnQgdG8gY29udmVydFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUga2ViYWItY2FzZSB2ZXJzaW9uIG9mIHRoZSBzdXBwbGllZCBuYW1lXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGRvbVRvQ1NTKG5hbWUpIHtcbiAgICByZXR1cm4gbmFtZS5yZXBsYWNlKC8oW0EtWl0pL2csIGZ1bmN0aW9uKHN0ciwgbTEpIHtcbiAgICAgIHJldHVybiAnLScgKyBtMS50b0xvd2VyQ2FzZSgpO1xuICAgIH0pLnJlcGxhY2UoL15tcy0vLCAnLW1zLScpO1xuICB9XG4gIDtcblxuICAvKipcbiAgICogbmF0aXZlVGVzdFByb3BzIGFsbG93cyBmb3IgdXMgdG8gdXNlIG5hdGl2ZSBmZWF0dXJlIGRldGVjdGlvbiBmdW5jdGlvbmFsaXR5IGlmIGF2YWlsYWJsZS5cbiAgICogc29tZSBwcmVmaXhlZCBmb3JtLCBvciBmYWxzZSwgaW4gdGhlIGNhc2Ugb2YgYW4gdW5zdXBwb3J0ZWQgcnVsZVxuICAgKlxuICAgKiBAYWNjZXNzIHByaXZhdGVcbiAgICogQGZ1bmN0aW9uIG5hdGl2ZVRlc3RQcm9wc1xuICAgKiBAcGFyYW0ge2FycmF5fSBwcm9wcyAtIEFuIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdmFsdWUgd2Ugd2FudCB0byBjaGVjayB2aWEgQHN1cHBvcnRzXG4gICAqIEByZXR1cm5zIHtib29sZWFufHVuZGVmaW5lZH0gQSBib29sZWFuIHdoZW4gQHN1cHBvcnRzIGV4aXN0cywgdW5kZWZpbmVkIG90aGVyd2lzZVxuICAgKi9cblxuICAvLyBBY2NlcHRzIGEgbGlzdCBvZiBwcm9wZXJ0eSBuYW1lcyBhbmQgYSBzaW5nbGUgdmFsdWVcbiAgLy8gUmV0dXJucyBgdW5kZWZpbmVkYCBpZiBuYXRpdmUgZGV0ZWN0aW9uIG5vdCBhdmFpbGFibGVcbiAgZnVuY3Rpb24gbmF0aXZlVGVzdFByb3BzKHByb3BzLCB2YWx1ZSkge1xuICAgIHZhciBpID0gcHJvcHMubGVuZ3RoO1xuICAgIC8vIFN0YXJ0IHdpdGggdGhlIEpTIEFQSTogaHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy1jb25kaXRpb25hbC8jdGhlLWNzcy1pbnRlcmZhY2VcbiAgICBpZiAoJ0NTUycgaW4gd2luZG93ICYmICdzdXBwb3J0cycgaW4gd2luZG93LkNTUykge1xuICAgICAgLy8gVHJ5IGV2ZXJ5IHByZWZpeGVkIHZhcmlhbnQgb2YgdGhlIHByb3BlcnR5XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGlmICh3aW5kb3cuQ1NTLnN1cHBvcnRzKGRvbVRvQ1NTKHByb3BzW2ldKSwgdmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gT3RoZXJ3aXNlIGZhbGwgYmFjayB0byBhdC1ydWxlIChmb3IgT3BlcmEgMTIueClcbiAgICBlbHNlIGlmICgnQ1NTU3VwcG9ydHNSdWxlJyBpbiB3aW5kb3cpIHtcbiAgICAgIC8vIEJ1aWxkIGEgY29uZGl0aW9uIHN0cmluZyBmb3IgZXZlcnkgcHJlZml4ZWQgdmFyaWFudFxuICAgICAgdmFyIGNvbmRpdGlvblRleHQgPSBbXTtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgY29uZGl0aW9uVGV4dC5wdXNoKCcoJyArIGRvbVRvQ1NTKHByb3BzW2ldKSArICc6JyArIHZhbHVlICsgJyknKTtcbiAgICAgIH1cbiAgICAgIGNvbmRpdGlvblRleHQgPSBjb25kaXRpb25UZXh0LmpvaW4oJyBvciAnKTtcbiAgICAgIHJldHVybiBpbmplY3RFbGVtZW50V2l0aFN0eWxlcygnQHN1cHBvcnRzICgnICsgY29uZGl0aW9uVGV4dCArICcpIHsgI21vZGVybml6ciB7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgfSB9JywgZnVuY3Rpb24obm9kZSkge1xuICAgICAgICByZXR1cm4gZ2V0Q29tcHV0ZWRTdHlsZShub2RlLCBudWxsKS5wb3NpdGlvbiA9PSAnYWJzb2x1dGUnO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgO1xuXG4gIC8vIHRlc3RQcm9wcyBpcyBhIGdlbmVyaWMgQ1NTIC8gRE9NIHByb3BlcnR5IHRlc3QuXG5cbiAgLy8gSW4gdGVzdGluZyBzdXBwb3J0IGZvciBhIGdpdmVuIENTUyBwcm9wZXJ0eSwgaXQncyBsZWdpdCB0byB0ZXN0OlxuICAvLyAgICBgZWxlbS5zdHlsZVtzdHlsZU5hbWVdICE9PSB1bmRlZmluZWRgXG4gIC8vIElmIHRoZSBwcm9wZXJ0eSBpcyBzdXBwb3J0ZWQgaXQgd2lsbCByZXR1cm4gYW4gZW1wdHkgc3RyaW5nLFxuICAvLyBpZiB1bnN1cHBvcnRlZCBpdCB3aWxsIHJldHVybiB1bmRlZmluZWQuXG5cbiAgLy8gV2UnbGwgdGFrZSBhZHZhbnRhZ2Ugb2YgdGhpcyBxdWljayB0ZXN0IGFuZCBza2lwIHNldHRpbmcgYSBzdHlsZVxuICAvLyBvbiBvdXIgbW9kZXJuaXpyIGVsZW1lbnQsIGJ1dCBpbnN0ZWFkIGp1c3QgdGVzdGluZyB1bmRlZmluZWQgdnNcbiAgLy8gZW1wdHkgc3RyaW5nLlxuXG4gIC8vIFByb3BlcnR5IG5hbWVzIGNhbiBiZSBwcm92aWRlZCBpbiBlaXRoZXIgY2FtZWxDYXNlIG9yIGtlYmFiLWNhc2UuXG5cbiAgZnVuY3Rpb24gdGVzdFByb3BzKHByb3BzLCBwcmVmaXhlZCwgdmFsdWUsIHNraXBWYWx1ZVRlc3QpIHtcbiAgICBza2lwVmFsdWVUZXN0ID0gaXMoc2tpcFZhbHVlVGVzdCwgJ3VuZGVmaW5lZCcpID8gZmFsc2UgOiBza2lwVmFsdWVUZXN0O1xuXG4gICAgLy8gVHJ5IG5hdGl2ZSBkZXRlY3QgZmlyc3RcbiAgICBpZiAoIWlzKHZhbHVlLCAndW5kZWZpbmVkJykpIHtcbiAgICAgIHZhciByZXN1bHQgPSBuYXRpdmVUZXN0UHJvcHMocHJvcHMsIHZhbHVlKTtcbiAgICAgIGlmICghaXMocmVzdWx0LCAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBPdGhlcndpc2UgZG8gaXQgcHJvcGVybHlcbiAgICB2YXIgYWZ0ZXJJbml0LCBpLCBwcm9wc0xlbmd0aCwgcHJvcCwgYmVmb3JlO1xuXG4gICAgLy8gSWYgd2UgZG9uJ3QgaGF2ZSBhIHN0eWxlIGVsZW1lbnQsIHRoYXQgbWVhbnMgd2UncmUgcnVubmluZyBhc3luYyBvciBhZnRlclxuICAgIC8vIHRoZSBjb3JlIHRlc3RzLCBzbyB3ZSdsbCBuZWVkIHRvIGNyZWF0ZSBvdXIgb3duIGVsZW1lbnRzIHRvIHVzZVxuXG4gICAgLy8gaW5zaWRlIG9mIGFuIFNWRyBlbGVtZW50LCBpbiBjZXJ0YWluIGJyb3dzZXJzLCB0aGUgYHN0eWxlYCBlbGVtZW50IGlzIG9ubHlcbiAgICAvLyBkZWZpbmVkIGZvciB2YWxpZCB0YWdzLiBUaGVyZWZvcmUsIGlmIGBtb2Rlcm5penJgIGRvZXMgbm90IGhhdmUgb25lLCB3ZVxuICAgIC8vIGZhbGwgYmFjayB0byBhIGxlc3MgdXNlZCBlbGVtZW50IGFuZCBob3BlIGZvciB0aGUgYmVzdC5cbiAgICB2YXIgZWxlbXMgPSBbJ21vZGVybml6cicsICd0c3BhbiddO1xuICAgIHdoaWxlICghbVN0eWxlLnN0eWxlKSB7XG4gICAgICBhZnRlckluaXQgPSB0cnVlO1xuICAgICAgbVN0eWxlLm1vZEVsZW0gPSBjcmVhdGVFbGVtZW50KGVsZW1zLnNoaWZ0KCkpO1xuICAgICAgbVN0eWxlLnN0eWxlID0gbVN0eWxlLm1vZEVsZW0uc3R5bGU7XG4gICAgfVxuXG4gICAgLy8gRGVsZXRlIHRoZSBvYmplY3RzIGlmIHdlIGNyZWF0ZWQgdGhlbS5cbiAgICBmdW5jdGlvbiBjbGVhbkVsZW1zKCkge1xuICAgICAgaWYgKGFmdGVySW5pdCkge1xuICAgICAgICBkZWxldGUgbVN0eWxlLnN0eWxlO1xuICAgICAgICBkZWxldGUgbVN0eWxlLm1vZEVsZW07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHJvcHNMZW5ndGggPSBwcm9wcy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IHByb3BzTGVuZ3RoOyBpKyspIHtcbiAgICAgIHByb3AgPSBwcm9wc1tpXTtcbiAgICAgIGJlZm9yZSA9IG1TdHlsZS5zdHlsZVtwcm9wXTtcblxuICAgICAgaWYgKGNvbnRhaW5zKHByb3AsICctJykpIHtcbiAgICAgICAgcHJvcCA9IGNzc1RvRE9NKHByb3ApO1xuICAgICAgfVxuXG4gICAgICBpZiAobVN0eWxlLnN0eWxlW3Byb3BdICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAvLyBJZiB2YWx1ZSB0byB0ZXN0IGhhcyBiZWVuIHBhc3NlZCBpbiwgZG8gYSBzZXQtYW5kLWNoZWNrIHRlc3QuXG4gICAgICAgIC8vIDAgKGludGVnZXIpIGlzIGEgdmFsaWQgcHJvcGVydHkgdmFsdWUsIHNvIGNoZWNrIHRoYXQgYHZhbHVlYCBpc24ndFxuICAgICAgICAvLyB1bmRlZmluZWQsIHJhdGhlciB0aGFuIGp1c3QgY2hlY2tpbmcgaXQncyB0cnV0aHkuXG4gICAgICAgIGlmICghc2tpcFZhbHVlVGVzdCAmJiAhaXModmFsdWUsICd1bmRlZmluZWQnKSkge1xuXG4gICAgICAgICAgLy8gTmVlZHMgYSB0cnkgY2F0Y2ggYmxvY2sgYmVjYXVzZSBvZiBvbGQgSUUuIFRoaXMgaXMgc2xvdywgYnV0IHdpbGxcbiAgICAgICAgICAvLyBiZSBhdm9pZGVkIGluIG1vc3QgY2FzZXMgYmVjYXVzZSBgc2tpcFZhbHVlVGVzdGAgd2lsbCBiZSB1c2VkLlxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBtU3R5bGUuc3R5bGVbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgICAgICAgLy8gSWYgdGhlIHByb3BlcnR5IHZhbHVlIGhhcyBjaGFuZ2VkLCB3ZSBhc3N1bWUgdGhlIHZhbHVlIHVzZWQgaXNcbiAgICAgICAgICAvLyBzdXBwb3J0ZWQuIElmIGB2YWx1ZWAgaXMgZW1wdHkgc3RyaW5nLCBpdCdsbCBmYWlsIGhlcmUgKGJlY2F1c2VcbiAgICAgICAgICAvLyBpdCBoYXNuJ3QgY2hhbmdlZCksIHdoaWNoIG1hdGNoZXMgaG93IGJyb3dzZXJzIGhhdmUgaW1wbGVtZW50ZWRcbiAgICAgICAgICAvLyBDU1Muc3VwcG9ydHMoKVxuICAgICAgICAgIGlmIChtU3R5bGUuc3R5bGVbcHJvcF0gIT0gYmVmb3JlKSB7XG4gICAgICAgICAgICBjbGVhbkVsZW1zKCk7XG4gICAgICAgICAgICByZXR1cm4gcHJlZml4ZWQgPT0gJ3BmeCcgPyBwcm9wIDogdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gT3RoZXJ3aXNlIGp1c3QgcmV0dXJuIHRydWUsIG9yIHRoZSBwcm9wZXJ0eSBuYW1lIGlmIHRoaXMgaXMgYVxuICAgICAgICAvLyBgcHJlZml4ZWQoKWAgY2FsbFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjbGVhbkVsZW1zKCk7XG4gICAgICAgICAgcmV0dXJuIHByZWZpeGVkID09ICdwZngnID8gcHJvcCA6IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY2xlYW5FbGVtcygpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIDtcblxuICAvKipcbiAgICogdGVzdFByb3BzQWxsIHRlc3RzIGEgbGlzdCBvZiBET00gcHJvcGVydGllcyB3ZSB3YW50IHRvIGNoZWNrIGFnYWluc3QuXG4gICAqIFdlIHNwZWNpZnkgbGl0ZXJhbGx5IEFMTCBwb3NzaWJsZSAoa25vd24gYW5kL29yIGxpa2VseSkgcHJvcGVydGllcyBvblxuICAgKiB0aGUgZWxlbWVudCBpbmNsdWRpbmcgdGhlIG5vbi12ZW5kb3IgcHJlZml4ZWQgb25lLCBmb3IgZm9yd2FyZC1cbiAgICogY29tcGF0aWJpbGl0eS5cbiAgICpcbiAgICogQGFjY2VzcyBwcml2YXRlXG4gICAqIEBmdW5jdGlvbiB0ZXN0UHJvcHNBbGxcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3AgLSBBIHN0cmluZyBvZiB0aGUgcHJvcGVydHkgdG8gdGVzdCBmb3JcbiAgICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSBbcHJlZml4ZWRdIC0gQW4gb2JqZWN0IHRvIGNoZWNrIHRoZSBwcmVmaXhlZCBwcm9wZXJ0aWVzIG9uLiBVc2UgYSBzdHJpbmcgdG8gc2tpcFxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fFNWR0VsZW1lbnR9IFtlbGVtXSAtIEFuIGVsZW1lbnQgdXNlZCB0byB0ZXN0IHRoZSBwcm9wZXJ0eSBhbmQgdmFsdWUgYWdhaW5zdFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3ZhbHVlXSAtIEEgc3RyaW5nIG9mIGEgY3NzIHZhbHVlXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3NraXBWYWx1ZVRlc3RdIC0gQW4gYm9vbGVhbiByZXByZXNlbnRpbmcgaWYgeW91IHdhbnQgdG8gdGVzdCBpZiB2YWx1ZSBzdGlja3Mgd2hlbiBzZXRcbiAgICovXG4gIGZ1bmN0aW9uIHRlc3RQcm9wc0FsbChwcm9wLCBwcmVmaXhlZCwgZWxlbSwgdmFsdWUsIHNraXBWYWx1ZVRlc3QpIHtcblxuICAgIHZhciB1Y1Byb3AgPSBwcm9wLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcHJvcC5zbGljZSgxKSxcbiAgICBwcm9wcyA9IChwcm9wICsgJyAnICsgY3Nzb21QcmVmaXhlcy5qb2luKHVjUHJvcCArICcgJykgKyB1Y1Byb3ApLnNwbGl0KCcgJyk7XG5cbiAgICAvLyBkaWQgdGhleSBjYWxsIC5wcmVmaXhlZCgnYm94U2l6aW5nJykgb3IgYXJlIHdlIGp1c3QgdGVzdGluZyBhIHByb3A/XG4gICAgaWYgKGlzKHByZWZpeGVkLCAnc3RyaW5nJykgfHwgaXMocHJlZml4ZWQsICd1bmRlZmluZWQnKSkge1xuICAgICAgcmV0dXJuIHRlc3RQcm9wcyhwcm9wcywgcHJlZml4ZWQsIHZhbHVlLCBza2lwVmFsdWVUZXN0KTtcblxuICAgICAgLy8gb3RoZXJ3aXNlLCB0aGV5IGNhbGxlZCAucHJlZml4ZWQoJ3JlcXVlc3RBbmltYXRpb25GcmFtZScsIHdpbmRvd1ssIGVsZW1dKVxuICAgIH0gZWxzZSB7XG4gICAgICBwcm9wcyA9IChwcm9wICsgJyAnICsgKGRvbVByZWZpeGVzKS5qb2luKHVjUHJvcCArICcgJykgKyB1Y1Byb3ApLnNwbGl0KCcgJyk7XG4gICAgICByZXR1cm4gdGVzdERPTVByb3BzKHByb3BzLCBwcmVmaXhlZCwgZWxlbSk7XG4gICAgfVxuICB9XG5cbiAgLy8gTW9kZXJuaXpyLnRlc3RBbGxQcm9wcygpIGludmVzdGlnYXRlcyB3aGV0aGVyIGEgZ2l2ZW4gc3R5bGUgcHJvcGVydHksXG4gIC8vIG9yIGFueSBvZiBpdHMgdmVuZG9yLXByZWZpeGVkIHZhcmlhbnRzLCBpcyByZWNvZ25pemVkXG4gIC8vXG4gIC8vIE5vdGUgdGhhdCB0aGUgcHJvcGVydHkgbmFtZXMgbXVzdCBiZSBwcm92aWRlZCBpbiB0aGUgY2FtZWxDYXNlIHZhcmlhbnQuXG4gIC8vIE1vZGVybml6ci50ZXN0QWxsUHJvcHMoJ2JveFNpemluZycpXG4gIE1vZGVybml6clByb3RvLnRlc3RBbGxQcm9wcyA9IHRlc3RQcm9wc0FsbDtcblxuXG5cbiAgLyoqXG4gICAqIHRlc3RBbGxQcm9wcyBkZXRlcm1pbmVzIHdoZXRoZXIgYSBnaXZlbiBDU1MgcHJvcGVydHkgaXMgc3VwcG9ydGVkIGluIHRoZSBicm93c2VyXG4gICAqXG4gICAqIEBtZW1iZXJvZiBNb2Rlcm5penJcbiAgICogQG5hbWUgTW9kZXJuaXpyLnRlc3RBbGxQcm9wc1xuICAgKiBAb3B0aW9uTmFtZSBNb2Rlcm5penIudGVzdEFsbFByb3BzKClcbiAgICogQG9wdGlvblByb3AgdGVzdEFsbFByb3BzXG4gICAqIEBhY2Nlc3MgcHVibGljXG4gICAqIEBmdW5jdGlvbiB0ZXN0QWxsUHJvcHNcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3AgLSBTdHJpbmcgbmFtaW5nIHRoZSBwcm9wZXJ0eSB0byB0ZXN0IChlaXRoZXIgY2FtZWxDYXNlIG9yIGtlYmFiLWNhc2UpXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbdmFsdWVdIC0gU3RyaW5nIG9mIHRoZSB2YWx1ZSB0byB0ZXN0XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3NraXBWYWx1ZVRlc3Q9ZmFsc2VdIC0gV2hldGhlciB0byBza2lwIHRlc3RpbmcgdGhhdCB0aGUgdmFsdWUgaXMgc3VwcG9ydGVkIHdoZW4gdXNpbmcgbm9uLW5hdGl2ZSBkZXRlY3Rpb25cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogdGVzdEFsbFByb3BzIGRldGVybWluZXMgd2hldGhlciBhIGdpdmVuIENTUyBwcm9wZXJ0eSwgaW4gc29tZSBwcmVmaXhlZCBmb3JtLFxuICAgKiBpcyBzdXBwb3J0ZWQgYnkgdGhlIGJyb3dzZXIuXG4gICAqXG4gICAqIGBgYGpzXG4gICAqIHRlc3RBbGxQcm9wcygnYm94U2l6aW5nJykgIC8vIHRydWVcbiAgICogYGBgXG4gICAqXG4gICAqIEl0IGNhbiBvcHRpb25hbGx5IGJlIGdpdmVuIGEgQ1NTIHZhbHVlIGluIHN0cmluZyBmb3JtIHRvIHRlc3QgaWYgYSBwcm9wZXJ0eVxuICAgKiB2YWx1ZSBpcyB2YWxpZFxuICAgKlxuICAgKiBgYGBqc1xuICAgKiB0ZXN0QWxsUHJvcHMoJ2Rpc3BsYXknLCAnYmxvY2snKSAvLyB0cnVlXG4gICAqIHRlc3RBbGxQcm9wcygnZGlzcGxheScsICdwZW5ndWluJykgLy8gZmFsc2VcbiAgICogYGBgXG4gICAqXG4gICAqIEEgYm9vbGVhbiBjYW4gYmUgcGFzc2VkIGFzIGEgdGhpcmQgcGFyYW1ldGVyIHRvIHNraXAgdGhlIHZhbHVlIGNoZWNrIHdoZW5cbiAgICogbmF0aXZlIGRldGVjdGlvbiAoQHN1cHBvcnRzKSBpc24ndCBhdmFpbGFibGUuXG4gICAqXG4gICAqIGBgYGpzXG4gICAqIHRlc3RBbGxQcm9wcygnc2hhcGVPdXRzaWRlJywgJ2NvbnRlbnQtYm94JywgdHJ1ZSk7XG4gICAqIGBgYFxuICAgKi9cblxuICBmdW5jdGlvbiB0ZXN0QWxsUHJvcHMocHJvcCwgdmFsdWUsIHNraXBWYWx1ZVRlc3QpIHtcbiAgICByZXR1cm4gdGVzdFByb3BzQWxsKHByb3AsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB2YWx1ZSwgc2tpcFZhbHVlVGVzdCk7XG4gIH1cbiAgTW9kZXJuaXpyUHJvdG8udGVzdEFsbFByb3BzID0gdGVzdEFsbFByb3BzO1xuXG4vKiFcbntcbiAgXCJuYW1lXCI6IFwiQ1NTIFRyYW5zZm9ybXNcIixcbiAgXCJwcm9wZXJ0eVwiOiBcImNzc3RyYW5zZm9ybXNcIixcbiAgXCJjYW5pdXNlXCI6IFwidHJhbnNmb3JtczJkXCIsXG4gIFwidGFnc1wiOiBbXCJjc3NcIl1cbn1cbiEqL1xuXG4gIE1vZGVybml6ci5hZGRUZXN0KCdjc3N0cmFuc2Zvcm1zJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gQW5kcm9pZCA8IDMuMCBpcyBidWdneSwgc28gd2Ugc25pZmYgYW5kIGJsYWNrbGlzdFxuICAgIC8vIGh0dHA6Ly9naXQuaW8vaEh6TDd3XG4gICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQW5kcm9pZCAyLicpID09PSAtMSAmJlxuICAgICAgICAgICB0ZXN0QWxsUHJvcHMoJ3RyYW5zZm9ybScsICdzY2FsZSgxKScsIHRydWUpO1xuICB9KTtcblxuXG4gIC8vIFJ1biBlYWNoIHRlc3RcbiAgdGVzdFJ1bm5lcigpO1xuXG4gIC8vIFJlbW92ZSB0aGUgXCJuby1qc1wiIGNsYXNzIGlmIGl0IGV4aXN0c1xuICBzZXRDbGFzc2VzKGNsYXNzZXMpO1xuXG4gIGRlbGV0ZSBNb2Rlcm5penJQcm90by5hZGRUZXN0O1xuICBkZWxldGUgTW9kZXJuaXpyUHJvdG8uYWRkQXN5bmNUZXN0O1xuXG4gIC8vIFJ1biB0aGUgdGhpbmdzIHRoYXQgYXJlIHN1cHBvc2VkIHRvIHJ1biBhZnRlciB0aGUgdGVzdHNcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBNb2Rlcm5penIuX3EubGVuZ3RoOyBpKyspIHtcbiAgICBNb2Rlcm5penIuX3FbaV0oKTtcbiAgfVxuXG4gIC8vIExlYWsgTW9kZXJuaXpyIG5hbWVzcGFjZVxuICB3aW5kb3cuTW9kZXJuaXpyID0gTW9kZXJuaXpyO1xuXG5cbjtcblxufSkod2luZG93LCBkb2N1bWVudCk7XG4iXX0=
