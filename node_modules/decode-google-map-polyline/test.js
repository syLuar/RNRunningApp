var decodePolyline = require('./index.js');

var testDatabase = ['neuaEejkbUEGc@j@PXl@p@P\\a@f@GHyDtEgC`DoCfDzHbQp@rAbH`JdBtBrCjDn@p@dDbDfIvHfD~CrK~Jo@z@uCrDmJnL}^ld@mVjZmQrTgArAFJ',
'neuaEejkbUEGc@j@PX\\ZNTP\\a@f@CBCD}BnC{@dASVsAbB_@d@oCfDzHbQd@dAJL@Br@bAzAjBpClDdBtBrCjDn@p@b@d@`C|B`DzCdDzCvArAhAdADDfE~D@?zDpDLLKLc@l@iAzAkAvA_@f@eCzCgEjFiBxBeHtIkB~Bw@bAUVuCnD}GpIKLoFvGkAvAg@n@yDxESPoDpEq@z@gEfF{BpCwE|FgArAFJ',
'tgddEariaUAIE@m@Pi@VGDKHWPUTa@h@Yh@KTc@dAEHWh@OTCBOTa@`@g@^o@Xq@Pq@Jg@BI?iD@w@?A?{B@qD@@~A@pB?dB@l@@rC@rCB?D@BBBB@D@D?B?@ADADCDC@E@C@EACAEAGCKCIAKAM?Q?GAG?OEEAGEQKo@c@YQIIOIo@m@OMMGE@E?CACCCECC?EAGCEQU[WMMUUMOiAcAIGCCKAA?A?C?C?CACCACACAC?C?C?C@AaAaAg@_@UMSGOEQEMCMAoAAiCAqCAeC@mC?S?C@A?C@C?EAECCAAACCACAE?IBG?SES_AuBi@wAa@gASk@e@qAm@yAM_@IWIYG_@ISAA?AAA?A?CAA?C?A@E@C?A@ABC@A@?EKAKCMC[AiB?aA?gC?O?o@MyAI[AGSq@Se@Sc@MS}A_CuAwBaBeCo@aACE_@k@IMOa@Ia@Cc@?a@Dc@f@uBAgC?C?q@AkEAuD@qC?E?[?sB@aAAMIUi@iBK_@Kc@r@[lAg@~Ak@`C}@dFmBh@S`@ONEQOK_@u@_DGB'
];

testDatabase.forEach(function(el) {
  console.log('Decoding compressed polyline: ' + el);
  console.log(decodePolyline(el));
})