var os     = require('os'),
    ifaces = os.networkInterfaces()

getCurrentIP ("eth0", function (ip) {
  console.log (ip)
})

function getCurrentIP (interface_name, callback) {
  Object.keys(ifaces).forEach(function (ifname) {
    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' == iface.family && ifname == interface_name) {
        callback (iface.address)
      }
    })
  })
}