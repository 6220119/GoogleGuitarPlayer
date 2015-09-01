/**
 * User: nvucuong
 * Date: 9/1/2015
 * Time: 2:51 PM
 */

var uncss = require('uncss');

var files   = ['../index.html'];
  //options = {
  //  ignore       : ['#added_at_runtime', /test\-[0-9]+/],
  //  media        : ['(min-width: 700px) handheld and (orientation: landscape)'],
  //  csspath      : '..',
  //  raw          : 'h1 { color: green }',
  //  //stylesheets  : ['lib/bootstrap/dist/css/bootstrap.css', 'src/public/css/main.css'],
  //  ignoreSheets : [/fonts.googleapis/],
  //  timeout      : 1000,
  //  htmlroot     : 'public',
  //  report       : false,
  //  uncssrc      : '.uncssrc'
  //};

//uncss(files, options, function (error, output) {
//  console.log(output);
//});

/* Look Ma, no options! */
uncss(files, function (error, output) {
  console.log(output);
});

///* Specifying raw HTML */
//var rawHtml = '...';
//
//uncss(rawHtml, options, function (error, output) {
//  console.log(output);
//});