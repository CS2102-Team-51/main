/*
	Restaurant
*/
CREATE TABLE Restaurant (
	rid SERIAL NOT NULL PRIMARY KEY,
	rname VARCHAR(50) UNIQUE NOT NULL,
	raddress VARCHAR(255) NOT NULL,
	rminCost NUMERIC NOT NULL,
	rimage TEXT
);

CREATE TABLE Restaurant_Staff (
	rsid SERIAL NOT NULL PRIMARY KEY,
	rsname VARCHAR(50) NOT NULL,
	rsposition VARCHAR(50) NOT NULL,
	rsusername VARCHAR(50) NOT NULL UNIQUE,
	rspassword VARCHAR(50) NOT NULL,
	rid SERIAL NOT NULL,
	FOREIGN KEY (rid) REFERENCES Restaurant ON DELETE CASCADE
);

/*
	Food
*/
CREATE TABLE Food (
	fid SERIAL NOT NULL PRIMARY KEY,
	fname VARCHAR(255) NOT NULL,
	fprice NUMERIC NOT NULL CHECK (fprice >= 0),
	favailable BOOLEAN NOT NULL,
	flimit INT NOT NULL CHECK (flimit >= 0),
	fimage TEXT,
	rid SERIAL NOT NULL,
	FOREIGN KEY (rid) REFERENCES Restaurant(rid)
);

CREATE TABLE Category (
	cid SERIAL NOT NULL PRIMARY KEY,
	cname VARCHAR(50)
);

CREATE TABLE food_categorized (
	fid SERIAL NOT NULL,
	cid SERIAL NOT NULL,
	FOREIGN KEY (fid) REFERENCES Food(fid),
	FOREIGN KEY (cid) REFERENCES Category(cid)
);

/*
	Orders and Customer
*/
CREATE TABLE Order_List (
	ocid SERIAL NOT NULL PRIMARY KEY,
	oorder_place_time TIMESTAMP,
	oorder_enroute_restaurant TIMESTAMP,
	oorder_arrives_restaurant TIMESTAMP,
	oorder_enroute_customer TIMESTAMP,
	oorder_arrives_customer TIMESTAMP,
	odelivery_fee NUMERIC NOT NULL CHECK (odelivery_fee >= 0),
	ofinal_price NUMERIC NOT NULL CHECK (ofinal_price >= 0),
	opayment_type TEXT,
	orating INTEGER,
	ostatus TEXT
);

CREATE TABLE order_contains (
	unit_price NUMERIC NOT NULL CHECK (unit_price >= 0),
	quantity INTEGER NOT NULL CHECK (quantity > 0),
	total_price NUMERIC NOT NULL CHECK (total_price >= 0),
	fid SERIAL NOT NULL,
	ocid SERIAL NOT NULL,
	FOREIGN KEY (fid) REFERENCES Food(fid),
	FOREIGN KEY (ocid) REFERENCES Order_List(ocid)
);

CREATE TABLE Customer (
	cid SERIAL NOT NULL PRIMARY KEY,
	cname VARCHAR(50) NOT NULL,
	ccontact_number INT,
	cusername VARCHAR(50) NOT NULL UNIQUE,
	cpassword VARCHAR(50) NOT NULL,
	cjoin_time TIMESTAMP NOT NULL,
	crewards_points INT NOT NULL
);

CREATE TABLE make_order (
	rest_rating INTEGER,
	review_text TEXT,
	ocid SERIAL NOT NULL UNIQUE,
	rid SERIAL NOT NULL,
	cid SERIAL NOT NULL,
	FOREIGN KEY (ocid) REFERENCES Order_List(ocid),
	FOREIGN KEY (rid) REFERENCES Restaurant(rid),
	FOREIGN KEY (cid) REFERENCES Customer(cid)
);

/*
	Promotions and coupons
*/
CREATE TABLE Promotion (
	pid SERIAL NOT NULL PRIMARY KEY,
	pisPercentage BOOLEAN NOT NULL,
	pdatetime_active_from TIMESTAMP NOT NULL,
	pdatetime_active_to TIMESTAMP NOT NULL CHECK (pdatetime_active_to > pdatetime_active_from),
	pminSpend NUMERIC NOT NULL CHECK (pminSpend >= 0),
	pdiscount_val NUMERIC NOT NULL,
	pname TEXT NOT NULL,
	pdescription TEXT NOT NULL
);

CREATE TABLE Coupon (
	pid INTEGER NOT NULL,
	PRIMARY KEY (pid),
	couponCode VARCHAR(10) NOT NULL UNIQUE,
	FOREIGN KEY (pid) REFERENCES Promotion(pid) ON DELETE CASCADE
);

CREATE TABLE coupon_wallet (
	custid SERIAL NOT NULL,
	cid SERIAL NOT NULL,
	FOREIGN KEY (custid) REFERENCES Customer(cid) ON DELETE CASCADE,
	FOREIGN KEY (cid) REFERENCES Coupon(cid) ON DELETE CASCADE
);

CREATE TABLE Campaign (
	pid INTEGER NOT NULL PRIMARY KEY,
	FOREIGN KEY (pid) REFERENCES Promotion(pid) ON DELETE CASCADE,
	cMon BOOLEAN NOT NULL,
	cTue BOOLEAN NOT NULL,
	cWed BOOLEAN NOT NULL,
	cThu BOOLEAN NOT NULL,
	cFri BOOLEAN NOT NULL,
	cSat BOOLEAN NOT NULL,
	cSun BOOLEAN NOT NULL
);

CREATE TABLE Offer_On (
	fid SERIAL NOT NULL,
	pid SERIAL NOT NULL,
	FOREIGN KEY (fid) REFERENCES Food(fid),
	FOREIGN KEY (pid) REFERENCES Campaign(pid)
);

/*
	Customer Details
*/
-- Omitted due to redundancy
--
--CREATE TABLE Address (
--	address_line TEXT NOT NULL,
--	zipcode INT NOT NULL,
--	cid SERIAL,
--	FOREIGN KEY (cid) REFERENCES Customer(cid) ON DELETE CASCADE
-- );
--

CREATE TABLE Credit_Card (
	card_number BIGINT NOT NULL,
	expiry_date DATE NOT NULL,
	cvv INT NOT NULL,
	PRIMARY KEY(card_number, expiry_date, cvv)
);

CREATE TABLE register_cc (
	card_number BIGINT NOT NULL,
	expiry_date DATE NOT NULL,
	cvv INT NOT NULL,
	cid SERIAL,
	FOREIGN KEY (card_number, expiry_date, cvv) REFERENCES Credit_Card(card_number, expiry_date, cvv),
	FOREIGN KEY (cid) REFERENCES Customer(cid)
);

/*
	Riders
*/
CREATE TABLE Rider (
	rid SERIAL NOT NULL PRIMARY KEY,
	rname VARCHAR(255) NOT NULL,
	rusername VARCHAR(50) NOT NULL UNIQUE,
	rpassword VARCHAR(50) NOT NULL,
	rtotal_salary NUMERIC NOT NULL
);

CREATE TABLE Part_Timer (
	rid SERIAL NOT NULL PRIMARY KEY,
	base_salary NUMERIC NOT NULL,
	FOREIGN KEY (rid) REFERENCES Rider ON DELETE CASCADE
);

CREATE TABLE Weekly_Past_Salaries (
	rid SERIAL NOT NULL PRIMARY KEY,
	week_no INTEGER NOT NULL,
	salary NUMERIC NOT NULL,
	base_salary NUMERIC NOT NULL,
	FOREIGN KEY (rid) REFERENCES Part_Timer ON DELETE CASCADE
);

CREATE TABLE Full_Timer (
	rid SERIAL NOT NULL PRIMARY KEY,
	base_salary NUMERIC NOT NULL,
	FOREIGN KEY (rid) REFERENCES Rider ON DELETE CASCADE
);

CREATE TABLE Monthly_Past_Salaries (
	rid SERIAL NOT NULL PRIMARY KEY,
	month_no INTEGER NOT NULL,
	salary NUMERIC NOT NULL,
	base_salary NUMERIC NOT NULL,
	FOREIGN KEY (rid) REFERENCES Full_Timer ON DELETE CASCADE
);

/*
	Work Schedules
*/
CREATE TABLE Monthly_WS (
	mid SERIAL NOT NULL PRIMARY KEY,
	rid SERIAL,
	FOREIGN KEY (rid) REFERENCES Full_Timer ON DELETE CASCADE
);

CREATE TABLE Weekly_WS (
	wid SERIAL NOT NULL PRIMARY KEY,
	rid SERIAL,
	mid SERIAL,
	FOREIGN KEY (rid) REFERENCES Part_Timer ON DELETE CASCADE,
	FOREIGN KEY (mid) REFERENCES Monthly_WS ON DELETE CASCADE
);

CREATE TABLE Day_WS (
	did SERIAL NOT NULL PRIMARY KEY,
	wid SERIAL NOT NULL,
	FOREIGN KEY (wid) REFERENCES Weekly_WS ON DELETE CASCADE
);

CREATE TABLE Hour_Block (
	hid SERIAL NOT NULL PRIMARY KEY,
	start_time INTEGER NOT NULL,
	end_time INTEGER NOT NULL
);

CREATE TABLE Schedule_Hours (
	did SERIAL NOT NULL,
	hid SERIAL NOT NULL,
	FOREIGN KEY (did) REFERENCES Day_WS,
	FOREIGN KEY (hid) REFERENCES Hour_Block
);
