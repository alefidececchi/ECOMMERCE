const express = require("express");
const router = express.Router();
const User = require('../models/User');


router.get("/", async (req, res) => {
  try {
    const userrrs = await User.find();
    // console.log('Ingreso a la ruta de usuarios');
    //console.log(userrrs);
    return res.status(200).json({ userrrs: userrrs });
  } catch (error) {
    return res.status(500).json({ error: error })
  }
});

router.get('/:idUser', async (req, res) => {
  const { idUser } = req.params
  try {
    const userrrsId = await User.findById(idUser);
    return res.status(200).json({ userrrs: userrrsId });
  } catch (error) {
    return res.status(500).json({ error: error })
  }
  // en POSTMAN GET:
  // http://localhost:3000/users/acavaelidObtenidodesdeMongoDB
});


router.post('/register', async (req, res) => {
  try {
    const user = req.body;
    //const {name,email,password,admin,image,description,country}=req.body;
    const nuevoUsuario = new User(
      user
      /*name:name,
      email:email,
      password:password,
      admin:admin,
      image:image,
      description:description,
      country:country,*/
    );
    await nuevoUsuario.save();
    return res.status(201).json({ status: 'usuario registrado y guardado en la base de datos.' })
  } catch (error) {
    return res.status(500).json({ error: error })
  }
});

router.put('/:idUser', async (req, res) => {
  const { idUser } = req.params;
  const { name, email, password, admin, image, description, country } = req.body;
  const actuCliente = {
    name: name,
    email: email,
    password: password,
    admin: admin,
    image: image,
    description: description,
    country: country,
  }
  await User.findByIdAndUpdate(idUser, actuCliente);
  res.status(200).json({
    status: 'Usuario actualizado.'
  });
})


router.put('/:idUser/:idBook', async (req, res) => {
  const { idBook, idUser } = req.params;
  const sellingBooksUpdate = await User.findByIdAndUpdate(idUser, { $push: { selling_books: idBook } });

  res.status(200).json({
    status: sellingBooksUpdate
  })
  // en POSTMAN PUT:
  // http://localhost:3000/users/acavaelidObtenidodesdeMongoDB
})

router.delete('/:idUser', async (req, res) => {
  const { idUser } = req.params
  try {
    await User.findByIdAndRemove(idUser, { useFindAndModify: false });
    return res.status(200).json({ status: 'Usuario eliminado' })
  } catch (error) {
    return res.status(500).json({ error: error })
  }
})
module.exports = router;