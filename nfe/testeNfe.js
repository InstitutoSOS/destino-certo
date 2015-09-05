var fs = require('fs'),
    nfejs = require('nfejs');
var dir = 'C:\\Users\\NOTE-RACZ\\Dropbox\\Pessoal\\RaczConsultoria\\Comercial\\Oportunidades\\Destino Certo\\Notas YouGreen\\'
fs.readFile(dir + 'VIDRO COLORIDO _35150714450646000185550010000000081000000082.xml','utf8',function(err, data) {
    //console.log(data);
  nfejs(data, function(err, nfe) {
      console.log(JSON.stringify(nfe, null, 2));//console.log();
  });
});