const User = require("../models/User.js");

module.exports=createUser=async ()=> {
    // c deberiaos traer los users por query/body desde el front
    const users = [
    {id: 1, name: 'Franco', email: 'Franco@mail.com', password: '1234',
    admin:true,image:'aaaa',description:'dfa',country:'Argentina',
    //selling_books:ObjectId('hola')
},
    {id: 2, name: 'Toni', email: 'Toni@mail.com', password: '1234',
    admin:false,image:'', description:'dgfasg',country:'Colombia',
    //selling_books:ObjectId('chau')
}]
    
    let aver= users.map(e=>({
    //await User.create( users.map(e=>({
        name:e.name,
        email:e.email,
        password:e.password,
        admin:e.admin,
        image:e.image,
        description:e.description,
        country:e.country,
        //selling_books:e.selling_books,
        //purchased_books:'Los3ch',
        //wish_list:'CaperucitaRoja'
    }))
    //)
    //await User.create(aver);
    //console.log(aver);
}
createUser()

  
 /* const putBook = async (req, res) => {
    const { idBook } = req.params;
    const { idUser } = req.params;
    const book = req.body;
    if (!idUser) {
      try {
        const bookUpdated = await Book.updateOne({ _id: idBook }, { $set: book });
        return res.status(201).json({ bookUpdated: bookUpdated });
      } catch (error) {
        return res.status(500).json({ error: error });
      }
    } else {
      try {
        const bookUpdated = await Book.findByIdAndUpdate(
          idBook,
          { $push: { sellers: idUser } },
          { new: true, useFindAndModify: false }
        );
        return res.status(201).json({ bookUpdated: bookUpdated });
      } catch (error) {
        return res.status(500).json({ error: error });
      }
    }
  };
  
  module.exports = {
    putBook,
  };*/
