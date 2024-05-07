# decode-google-map-polyline

A tool for decoding google map compressed polyline using official map utility. 
See more: https://developers.google.com/maps/documentation/utilities/polylinealgorithm

## Install
```bash
npm install --save decode-google-map-polyline
```

## Example
```js
  const decodePolyline = require('decode-google-map-polyline');
  var polyline = 'neuaEejkbUEGc@j@PXl@p@P\\a@f@GHyDtEgC`DoCfDzHbQp@rAbH`JdBtBrCjDn@p@dDbDfIvHfD~CrK~Jo@z@uCrDmJnL}^ld@mVjZmQrTgArAFJ';
  console.log(decodePolyline(polyline));
```
Bash output:
```bash
[ { lat: -31.89864, lng: 115.89811 },
  { lat: -31.89861, lng: 115.89815 },
  { lat: -31.89843, lng: 115.89793 },
  { lat: -31.89852, lng: 115.8978 }, 
  ... more items ]
```
