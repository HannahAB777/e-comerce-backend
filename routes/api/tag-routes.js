const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  Tag.findAll({
    include: [
      {
        model: Product,
      },
    ],
  }).then((tags) => {
    res.json(tags);
  });
  // be sure to include its associated Product data
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  Tag.findByPk(req.params.id, {
    include: [
      {
        model: Product,
      },
    ],
  }).then((tags) => res.json(tags));
  // be sure to include its associated Product data
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create(
    {
      tag_name: req.body.tag_name,
    }
  ).then((update) => res.json(update));
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then((update) => res.json(update));
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  const tagDelete = await Tag.destroy(
    {
      where: {
        id: req.params.id,
      },
    }
  );
  return res.json(tagDelete);
});

module.exports = router;
