var kd  = require("./kd"),
    rad = Math.PI / 180

function spherical2cartesian(lat, lon) {
  lat *= rad
  lon *= rad
  var sin = Math.sin(lat)
  return [Math.cos(lon) * sin, Math.sin(lon) * sin, Math.cos(lat)]
}

function Position(object) {
  this.object = object
  this.position = spherical2cartesian(
    object.lat || object.latitude,
    object.lon || object.longitude
  )
}

function build(array) {
  var i   = array.length,
      out = new Array(i)

  while(i--)
    out[i] = new Position(array[i])

  return kd.build(out)
}

function lookup(lat, lon, node, n) {
  var array = kd.lookup(spherical2cartesian(lat, lon), node, n),
      i     = array.length

  /* Strip off position wrapper objects. */
  while(i--)
    array[i] = array[i].object

  return array
}

exports.build  = build
exports.lookup = lookup