const User = require("../models/User.js");
const Book = require("../models/Book.js");
const bcrypt = require("bcrypt");
const { getByName } = require("../lib/user.controller.helper.js");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt")


const getUsers = async (req, res) => {
  const { name } = req.query;
  try {
    let users = await User.find();
    if (name) users = getByName({ users, name });

    return res.status(200).json({ users: users });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const getUserByID = async (req, res) => {
  const { idUser } = req.params;
  try {
    const userrrsId = await User.findById(idUser).populate(
      "selling_books",
      "-__v -sellers"
    )
    return res.status(200).json({ userrrs: userrrsId });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
  // en POSTMAN GET:
  // http://localhost:3000/users/acavaelidObtenidodesdeMongoDB
};

// const postUser = async (req, res) => {
//   try {
//     const user = req.body;
//     //const {name,email,password,admin,image,description,country}=req.body;
//     const nuevoUsuario = new User(
//       user
//       /*name:name,
//       email:email,
//       password:password,
//       admin:admin,
//       image:image,
//       description:description,
//       country:country,*/
//     );
//     await nuevoUsuario.save();
//     return res
//       .status(201)
//       .json({ status: "usuario registrado y guardado en la base de datos." });
//   } catch (error) {
//     return res.status(500).json({ error: error });
//   }

// const login = async (req, res) => {
//   const { email, password } = req.body

//   if (await User.findOne({ email }) === null) return res.status(400).json({ error: "Email no registrado" })

//   const user = await User.findOne({ email });

//   if (user.log_Google === true) {
//     if (password == user.password) {
//       const token = jwt.sign({ _id: User._id }, process.env.RESET_PASSWORD_KEY, {
//         expiresIn: "20m",
//       });
//       await User.findOneAndUpdate(
//         { email },
//         { localStorageToken: token }
//       )
//       console.log("el token es :", token)
//       return res.status(200).json({ auth: "Usuario logueado mediante Google Login", user, token });

//     } else {
//       return res.status(400).json({ auth: "Contraseña incorrecta", user })
//     }
//   } else {
//     const compare = await bcrypt.compare(password, user.password)
//     console.log("🚀 ~ file: auth.controller.js ~ line 78 ~ login ~ compare", compare)
//     if (!compare) return res.status(400).json({ error: "Contraseña invalida" })
//     const token = jwt.sign({ id: user._id, name: user.name, email: user.email, admin: user.admin }, process.env.JWT_ACC_ACTIVATE);

//     res.status(200).json({ auth: "Usuario logueado tradicionalmente", token, email: user.email })
//   }
// }

const postUserGoogle = async (req, res) => {
  const { email, password, image, name } = req.body;
  try {
    const nuevoUsuario = new User({

      email: email,
      password: password,
      image: image,
      name: name,

      log_Google: true
    });
    await nuevoUsuario.save();
    const user = await User.findOne({ email });
    const token = jwt.sign({ id: user._id, email, password, image, name }, process.env.JWT_ACC_ACTIVATE);


    res.status(201).json({ status: "usuario registrado mediante Google y guardado en la base de datos.", token });
  } catch (error) {

    const user = await User.findOne({ email });

    const token = jwt.sign({ id: user._id, email, password, image, name }, process.env.JWT_ACC_ACTIVATE);
    res.status(201).json({ status: "usuario registrado mediante Google y guardado en la base de datos.", token });
    // return res.status(500).json({ error: error });

  }
};

const putUser = async (req, res) => {
  const { idUser } = req.params;
  const { name, email, password, image, description, country } =
    req.body;
  let actualCliente;
  password
    ? (actualCliente = {
      name: name,
      email: email,
      password: await bcrypt.hash(password, 10),   
      image: image,
      description: description,
      country: country,
    })
    : (actualCliente = {
      name: name,
      email: email,    
      image: image,
      description: description,
      country: country,
    });
  await User.findByIdAndUpdate(idUser, actualCliente);
  res.status(200).json({
    status: "Usuario actualizado.",
  });
};

const becomeAdmin = async (req, res) => {
  const { idUser } = req.body
  try {
    const user = await User.findById(idUser)
    user.admin ? await user.updateOne({ admin: false }) : await user.updateOne({ admin: true })
    res.status(200).json({ status: "Usuario actualizado." })
  } catch (error) {
    res.status(400).json({ error: error })
  }
}

const putUserBook = async (req, res) => {
  const { idBook, idUser } = req.params;

  const BookPurch = await Book.findById(idBook);

  const sellingBooksUpdate = await User.findByIdAndUpdate(idUser, {
    // $push: { purchased_books: BookPurch.id },
    $push: { purchased_books: BookPurch._id },
  });

  const bookUpdated = await Book.findByIdAndUpdate(idBook, {
    $push: { buyer: idUser },
  });

  res.status(200).json({
    status: sellingBooksUpdate,
    statusBook: bookUpdated,
  });


  // en POSTMAN PUT:
  // http://localhost:3000/users/acavaelidObtenidodesdeMongoDB
};

const putUserWishList = async (req, res) => {
  const { idBook, idUser } = req.params;
  await User.findByIdAndUpdate(idUser, {
    $push: { wish_list: idBook },
  });
  res.status(200).json({
    status: "Libro agregado a wish list",
  });
};

const deleteUser = async (req, res) => {
  const { idUser } = req.params;
  try {
    await User.findByIdAndRemove(idUser, { useFindAndModify: false });
    return res.status(200).json({ status: "Usuario eliminado" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const purchasedBooks = async (req, res) => {
  const { idUser } = req.params;
  const { cartQuantity } = req.body;

  vair = await cartQuantity.map(e => {
    return {
      idLibro: e._id,
      cantidadLibro: e.cartQuantity,
      gastoPorLibro: e.price
    }
  });

  await vair.map(async (e) => {
    const usuar = await User.findById(idUser)
    usuar.available_money ?
      await usuar.updateOne({ $inc: { available_money: -(e.gastoPorLibro * e.cantidadLibro) } }) : console.log('hola');
    const lib = await Book.findById(e.idLibro)
    lib.stock > 0 ?
      await lib.updateOne({ $inc: { stock: -(e.cantidadLibro) } }) :
      console.log(`ya no hay stock de ${e.idLibro} para realizar la compra`);
  }
  )
  res.status(200).json({ status: "todo bien" })


  //for await of 
  /*try {
    const usuar= await User.findById(idUser)
    usuar.available_money?
   usuar.updateOne({$inc:{available_money:+e.gastoPorLibro}}):console.log('hola');
    const lib= Book.findById(e.idLibro)
    lib.stock>0?
   lib.updateOne({$inc:{stock:-e.cantidadLibro}}):console.log('chau');
    console.log('llegue hasta aqui')
    res.status(200).json({status:"todo bien"})
  
  } catch (error){
    res.status(400).json({error:error})
  }*/




  //const {gastoPorLibro,cantidadLibro} = req.body;
  // el gastoPorLibro debe recibirse como numero negativo desde el Front
  // si recibieramos una GIFT CARD, el gasto por Libro deberia recibirse en numero positivo
  /*try {
    const usuar= await User.findById(idUser)
    usuar.available_money?
    await usuar.updateOne({$inc:{available_money:+gastoPorLibro}}):console.log('hola');
    const lib= await Book.findById(idBook)
    lib.stock>0?
    await lib.updateOne({$inc:{stock:-cantidadLibro}}):console.log('chau');
    res.status(200).json({status:"todo bien"})
  
  } catch (error){
    res.status(400).json({error:error})
  }*/
}
module.exports = {
  getUsers,
  getUserByID,
  postUserGoogle,
  putUser,
  putUserBook,
  deleteUser,
  putUserWishList,
  becomeAdmin,
  purchasedBooks
};
