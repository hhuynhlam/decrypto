function io(io) {
  return (req, res, next) => {
    res.io =  io

    return next()
  }
}

module.exports = {
  io: io,
}
