const router = require ('express').Router ();
const pool = require ('../../config/pool');

// User Login
router.route ('/api/login').post (async (req, res) => {
  console.log (req.body);
  const queryString = `SELECT * FROM Customer WHERE cusername = '${req.body.username}'`;
  const result = await pool.query (queryString);

  try {
    if (result.rows[0].cpassword === req.body.password) {
      res.setHeader ('content-type', 'application/json');
      res.send (JSON.stringify (result.rows[0]));
      res.status (200).send (JSON.stringify (result.rows[0]));
    } else {
      console.log ('Password does not match!');
      res.status (400).send ('Error: Password does not match');
    }
  } catch (error) {
    console.log ('Username does not exist!!');
    res.status (404).send ('Error: Username does not exist');
  }
});

router.route ('/api/login/staff').post (async (req, res) => {
  console.log (req.body);
  const queryString = `SELECT * FROM RestaurantStaff WHERE rsusername = '${req.body.username}'`;
  const result = await pool.query (queryString);

  if (result) {
    if (result.rows[0].rspassword === req.body.password) {
      res.setHeader ('content-type', 'application/json');
      res.send (JSON.stringify (result.rows[0]));
      res.status (200).json ();
    } else {
      res.status (404).json ('Error: Password does not match');
    }
  } else {
    res.status (404).json ('Error: Username does not exist');
  }
});

router.route ('/api/login/rider').post (async (req, res) => {
  console.log (req.body);
  const queryString = `SELECT * FROM Rider WHERE rusername = '${req.body.username}'`;
  const result = await pool.query (queryString);

  if (result) {
    if (result.rows[0].rpassword === req.body.password) {
      res.setHeader ('content-type', 'application/json');
      res.send (JSON.stringify (result.rows[0]));
      res.status (200).json ();
    } else {
      console.log ('Password does not match!');
      res.status (404).send ({error: 'Error: Password does not match'});
    }
  } else {
    console.log ('Username does not exist!!');
    res.status (404).send ({error: 'Error: Username does not exist'});
  }
});

router.route ('/api/login/manager').post (async (req, res) => {
  console.log (req.body);
  const queryString = `SELECT * FROM Manager WHERE musername = '${req.body.username}'`;
  const result = await pool.query (queryString);

  if (result) {
    console.log (result.rows[0].mpassword);
    console.log (result.rows[0].mpassword.length);
    console.log (req.body.password);
    console.log (req.body.password.length);
    if (result.rows[0].mpassword === req.body.password) {
      res.setHeader ('content-type', 'application/json');
      res.status (200).send (JSON.stringify (result.rows[0]));
    } else {
      console.log ('Ishhhhh this my issue?');
      res.status (404).json ('Error: Password does not match');
    }
  } else {
    console.log ('Is this my issue?');
    res.status (404).json ('Error: Username does not exist');
  }
});

module.exports = router;
