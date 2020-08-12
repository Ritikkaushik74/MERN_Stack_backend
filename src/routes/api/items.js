const express = require("express");

const router = express.Router();

//item Model
const Item = require("../../models/Item");

//route  GET api/items
//@des ALL Items
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

//route POST api/items
// @des Add item
router.post("/", (req, res) => {
  const newitem = new Item({
    name: req.body.name
  });
  newitem.save().then(item => res.json(item));
});

//route POST api/items/:id
//@des Delete item by id
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    // .then(item => console.log(item))
    // .then(item => res.json(item))
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
