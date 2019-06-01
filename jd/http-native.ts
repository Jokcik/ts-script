const tls = require('tls');

export class HttpNative {
  run() {
    const headers = `
      GET /api/user HTTP/1.1
      Connection: keep-alive
      Pragma: no-cache
      Cache-Control: no-cache
      sec-ch-ua: Google Chrome 74
      Upgrade-Insecure-Requests: 1
      User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36
      Sec-Fetch-Dest: document
      Sec-Fetch-Mode: navigate
      Sec-Fetch-Site: cross-site
      Sec-Fetch-User: ?F
      Sec-Origin-Policy: 0
      Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
      Accept-Encoding: gzip, deflate, br
      Accept-Language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7
      Cookie: flocktory-uuid=46ceecf9-e1a7-4d56-aa82-07e62f2fbd6a-5; _ga=GA1.2.423885387.1554970650; _ym_uid=1554970650987922021; _ym_d=1554970650; _gcl_au=1.1.670224117.1555141686; _fbp=fb.1.1555315986218.1540172538; cw-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Mjg1NzY4MjIsImV4cCI6MTUyOTAwODgyMn0._XY-_bqk1aZvS_iVPhtaVl1dVA7w1ZZtSMxFgL8s46c; __zzat134=MDA0dC0gYCB7SykWRxsyYV5GaXUVVxAMXUVEdHswLWEPLXhLKQ8fGjYhC1VIM1hBEXUjeXIuOW1wNWFRQ0tjfBoKay8aFnxxKFEQD2BASm50JS0gTlFRJWEQEiJ1F1xGQTlcCjw6HHEzd0YbCR5ZLHxLKTVWUH0rG3tzXWkIcRUnfw4qbxt/Nl0cOWMRCxl+OmNdRkc3FUtxTxx6dl99KkBqJGBNYCRGWVV8JxV7MiQVWUtNKHIWaWVwdCFhH3YkUg0SCj8XI1xpOVQTTEBNR0J2dDI3V2MYOWNjDSIKdRddWj8oFVlxSx9uejM/XgsxD1s5JVgIEj8LJh4WfmwpVgwOX0VEcG8bbh4PaRMjZHgqSWtdTko2K2d+Sj4lcnYzZTMOV2MYCyZUNV9OeSYZDWk5VEERTyUKdmllbQwtUlFRS19/Dg4/aU5ZQ10fQUtEIHIzd3QuQGweZU5eIkddUHwhC0QwXS0bSVAYEhY=jUda4Q==; cfids134=bUigQIhaCu/RMekVQkJ9TOHi1OuPeODcaz2yqguIPNQBjcYZEaJW4esIm1Be/ELFaWDbPJZoNQOBBB+2jEb1+0Dl0Ik9Bvt1DEQRAjLbLbvxKCM4AiogJJ1braNCjHrW4i50VMoOwx6pcVuse0TPUvp1Q+gqOWols1PqZg==; _gid=GA1.2.1705787964.1559108165; _ym_isad=1; _ym_visorc_50568904=w; io=Yq-O1TT6ZIioRud-AAFk
    `;


// callback for when secure connection established
    function connected(stream) {
      if (stream) {
        // socket connected
        stream.write("GET / HTTP/1.0\n\rHost: cyberhero.tele2.ru:443\n\r\n\r");
      } else {
        console.log("Connection failed");
      }
    }

// needed to keep socket variable in scope
    var dummy: any = this;

// try to connect to the server
    dummy.socket = tls.connect(443, 'cyberhero.tele2.ru', function() {
      // callback called only after successful socket connection
      dummy.connected = true;
      if (dummy.socket.authorized) {
        // authorization successful
        dummy.socket.setEncoding('utf-8');
        connected(dummy.socket);
      } else {
        // authorization failed
        console.log(dummy.socket.authorizationError);
        connected(null);
      }
    });

    dummy.socket.addListener('data', function(data) {
      // received data
      console.log(data);
    });

    dummy.socket.addListener('error', function(error) {
      if (!dummy.connected) {
        // socket was not connected, notify callback
        connected(null);
      }
      console.log("FAIL");
      console.log(error);
    });

    dummy.socket.addListener('close', function() {
      // do something
    });

  }
}


let a = new HttpNative();

a.run();
