const Item = require("../models/item");
const fs = require("fs");
const path = require("path");

exports.createItem = (req, res) => {
  const dir =
    path.resolve(__dirname, "..", "uploads") + "/" + req.file.filename;
  const newItem = new Item({
    name: req.body.name,
    price: req.body.price,
    discount: req.body.discount,
    sponsored: req.body.sponsored,
    image: {
      data: fs.readFileSync(dir),
      contentType: req.file.mimetype,
    },
    rating: req.body.rating,
    description: req.body.description,
    link: "/uploads/" + req.file.filename,
  });
  newItem
    .save()
    .then((item) => {
      res.send("Item added to database");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.code });
    });
};

exports.updateItem = (req, res) => {
  let item = req.body;
  if (req.file) {
    const dir = path.resolve(__dirname, "..", "uploads") + "/" + req.file.filename;
    item.image = {
      data: fs.readFileSync(dir),
      contentType: req.file.mimetype,
    };
    const link = "/uploads/" + req.file.filename;
    item = { ...item, link: link };
  }
  Item.findOneAndUpdate({ _id: req.params.id }, { $set: item })
    .then((item) => {
      res.send("Item updated");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.code });
    });
};

exports.deleteItem = (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then((item) => {
      res.json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.code });
    });
};

exports.getItems = async (req, res) => {
  Item.find()
    .select("-image")
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.code });
    });
};
