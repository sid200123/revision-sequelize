const express = require("express");
const {
  sequelize,
  Categorys,
  SubCategorys,
  MultiSubCategorys,
} = require("./models");
const app = express();
const port = 2012;

app.use(express.json());

// for categories

app.post("/add", async (req, resp) => {
  try {
    const category = await Categorys.create(req.body);
    resp.json(category);
  } catch (err) {
    resp.json(err);
  }
});

app.get("/get", async (req, resp) => {
  try {
    // const category = await Categorys.findAll({
    //   include: "subcategory",
    // });
    const category = await Categorys.findAll({
      include: {
        model: SubCategorys,
        as: "subcategory",
        include: {
          model: MultiSubCategorys,
          as: "multicategory",
        },
      },
    });
    resp.send(category);
  } catch (err) {
    resp.json(err);
  }
});

app.put("/update/:uid", async (req, resp) => {
  const uuid = req.params.uid;
  try {
    const categroyData = await Categorys.findOne({
      where: {
        uuid: uuid,
      },
    });
    categroyData.name = req.body.name;
    categroyData.subCategory = req.body.subCategory;
    await categroyData.save();

    resp.json(categroyData);
  } catch (err) {
    resp.json(err);
  }
});

app.delete("/delete/:uid", async (req, resp) => {
  try {
    const categroy = await Categorys.findOne({
      where: {
        uuid: req.params.uid,
      },
    });
    await categroy.destroy();
    resp.json({ msg: `Id ${req.params.uid} delted` });
  } catch (err) {
    resp.json(err);
  }
});

// for sub categories
app.post("/addSub", async (req, resp) => {
  try {
    const subCategory = await SubCategorys.create(req.body);
    resp.json(subCategory);
  } catch (err) {
    resp.json(err);
  }
});

app.get("/getSub", async (req, resp) => {
  try {
    const category = await SubCategorys.findAll({
      include: "multicategory",
    });
    resp.send(category);
  } catch (err) {
    resp.json(err);
  }
});

// for multi sub categories
app.post("/addMulti", async (req, resp) => {
  try {
    const subCategory = await MultiSubCategorys.create(req.body);
    resp.json(subCategory);
  } catch (err) {
    resp.json(err);
  }
});

app.get("/getMulti", async (req, resp) => {
  try {
    const category = await MultiSubCategorys.findAll({
      include: [SubCategorys],
    });
    resp.send(category);
  } catch (err) {
    resp.json(err);
  }
});

app.listen(port, async () => {
  console.log(`server running on port ${port}`);
  await sequelize.authenticate();
  console.log("Database Connected!");
});
