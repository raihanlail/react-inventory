const pool = require("../config/db");

require("dotenv").config();

const getInventory = async (req, res) => {
  const result = await pool.query("SELECT * FROM inventory");
  res.json(result.rows);
};

const addInventory = async (req, res) => {
  const { name, quantity, description } = req.body;
  const result = await pool.query(
    "INSERT INTO inventory (name, quantity, description) VALUES ($1, $2, $3) RETURNING *",
    [name, quantity, description]
  );
  res.json(result.rows[0]);
};

const updateInventory = async (req, res) => {
  const { name, quantity, description } = req.body;
  const { id } = req.params;
  const result = await pool.query(
    "UPDATE inventory SET name=$1, quantity=$2, description=$3 WHERE id=$4 RETURNING *",
    [name, quantity, description, id]
  );
  res.json(result.rows[0]);
};

const deleteInventory = async (req, res) => {
  await pool.query("DELETE FROM inventory WHERE id=$1", [req.params.id]);
  res.json({ message: "Item deleted" });
};

module.exports = {
  getInventory,
  addInventory,
  updateInventory,
  deleteInventory,
};
