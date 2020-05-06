const router = require ('express').Router ();
const pool = require ('../../config/pool');

// Get a specific restaurantStaff
router.route ('/api/restaurantStaff/:rsid').get (async (req, res) => {
  const rsid = req.params.rid;
  const queryString = `SELECT * FROM Restaurant_Staff WHERE rsid = '${rsid}'`;

  const result = await pool.query (queryString);
  res.setHeader ('content-type', 'application/json');
  res.send (JSON.stringify (result.rows[0]));
  res.status (200).json ();
});

// Get all restaurants
router.route ('/api/restaurantStaffs').get (async (req, res) => {
  const queryString = 'SELECT * FROM Restaurant_Staff';

  const result = await pool.query (queryString);
  res.setHeader ('content-type', 'application/json');
  res.send (JSON.stringify (result.rows));
  res.status (200).json ();
});

//Post a rsstaurantStaff
router.route ('/api/staff').post (async (req, res) => {
  console.log (req.body);

  try {
    await pool.query (
      `INSERT INTO Restaurant_Staff (rsname, rsposition, rsusername, rspassword) 
      VALUES('${req.body.rsname}', ${req.body.rsposition}, '${req.body.rsusername}',
         '${req.body.rspassword}');`
    );
    return res.status (201).json ();
  } catch (err) {
    console.log (err);
    return res.status (404).json ('Error' + err);
  }
});

module.exports = router;
