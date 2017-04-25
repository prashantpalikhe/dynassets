# Dynassets

Dynassets creates a simple server to serve static files like JavaScript, CSS etc. with specific delay and execution time. 

E.g.
  
`http://localhost:3000/js/3000/2000` would serve a JavaScript file that would take at least 3s before the 1st byte to return and would take at least 2s to execute in the browser.
 
Use this to create HTMl pages with different delay value on different assets to check their impact on load-time and run-time performance in different browser.

E.g.

Load up a web font with 5s delay to see how different browsers behaves when waiting for the font to download. 

Load up a CSS in different parts of HTML with 2s delay to see how it impacts rendering in different browsers.

I needed a quick way to generate different kinds of static files with different delay values to understand how different browsers handle them and how it impacts the application that I create. And the result is `dynassets`

## Installation

```
$ npm i dynassets -g
```

## Usage

```
$ dynassets
```

Now, you can start using urls like

`http://localhost:3000/js/3000/2000`