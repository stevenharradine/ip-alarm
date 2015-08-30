var CONFIG     = require("./config"),
    nodemailer = require("nodemailer"),
    http       = require("http"),
    old_ip     = ""

run ()

function run () {
  getCurrentIp (CONFIG.DNS_SERVER, function (ip) {
    if (theIpHasChanged && theIpIsInTheBlacklist (ip)) {
      sendAlerts (ip, function () {
        console.log ("Starting over")

        setTimeout(run, CONFIG.TEST_INTERVAL)
      })
    }
  })
}

function sendAlerts (ip, callback) {
  var transporter = nodemailer.createTransport({
    service: CONFIG.EMAIL_PROVIDER,
    auth: {
      user: CONFIG.EMAIL_USER,
      pass: CONFIG.EMAIL_PASSWORD
    }
  }),
  email_body = "The IP has changed to " + ip,
  mailOptions = {                            // setup e-mail data with unicode symbols
    from: "IP Watch ✔ <ip-watch@alert.com>", // sender address
    to: CONFIG.NOTIFY_EMAIL,                 // list of receivers
    subject: "IP drift detected ✘",          // Subject line
    text: email_body,                        // plaintext body
    html: email_body                         // html body
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
    if (error){
      console.log(error);
    } else {  // message sent
      //if (verbose) console.log("Message sent: " + info.response)
      callback()
    }
  })
}

function theIpIsInTheBlacklist (ip) {
  for (i in CONFIG.IP_BLACKLIST) {
    if (CONFIG.IP_BLACKLIST[i] == ip) {
      return true
    }
  }

  return false
}

function theIpHasChanged (current_ip) {
  var ip_has_changed = old_ip != current_ip

  if (ip_has_changed) {
    console.log (current_ip)

    old_ip = current_ip
  }

  return ip_has_changed
}

function getCurrentIp (dns_server, callback) {
  var options = {
    host: dns_server,
    port: 80,
    path: '/',
    method: 'POST'
  }

  var req = http.request(options, function(res) {
    res.setEncoding('utf8')
    res.on('data', function (chunk) {
      callback (chunk.split(": ")[1].split("</")[0])
    })
  })

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message)
  })

  // write data to request body
  req.write('data\n')
  req.write('data\n')
  req.end()
}