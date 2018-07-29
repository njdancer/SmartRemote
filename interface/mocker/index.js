var acState = {
  power: false,
  mode: 0,
  temp: 24,
};

const proxy = {
  'GET /api/ac': (req, res) => { return res.json(acState); },
  'PATCH /api/ac': (req, res) => {
    // Sanitise temp and mode
    var mode = req.body.mode;
    mode = mode ? Math.max(0, Math.min(4, mode)) : acState.mode;

    var temp = req.body.temp;
    temp = temp ? Math.max(16, Math.min(30, temp)) : acState.temp;

    return res.json(Object.assign(acState, {
      power: req.body.power,
      mode,
      temp,
    }));
  },
};

module.exports = proxy;
