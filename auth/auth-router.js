const router = require('express').Router();
//require by romeo
const Users = require('../user-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.use((err,req,res,next)=>{
  res.status(500).json({
      message:'sth went wrong'
  })
})

router.post('/register', async (req, res) => {
  // implement registration
  try{
    const {username,password} = req.body
    const user = await Users.findBy({username}).first()
    if(user){
      res.status(409).json({
          message:'user name already taken'
      })  
    }
  const newUser = await Users.add({
      username,
     
      password:await bcrypt.hash(password,10)
      
  })
  res.status(201).json(newUser)
}catch(err){
    next(err)
}
});



router.post('/login', async (req, res) => {
  // implement login
  try{
    const {username,password}= req.body
    const user = await Users.findBy({username}).first()
   if(!user){
       return res.status(401).json({
           message:'invalid user'
       })
   }
   const passWordValid = await bcrypt.compare(password,user.password)
   if (!passWordValid){
      return res.status(401).json({
          message:'invalid user'
      })
   }
  
  const token = jwt.sign({
      userID: user.id,
      userRole:"basic",
  },process.env.JWT_SECRET)
  res.json({
       message:`welcome back ${user.username}`,
       token:token
   })
  }catch(err){
   next(err)
  }
  
});

module.exports = router;
