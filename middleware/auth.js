const jwt=require('jsonwebtoken');

const config=require('config');

module.exports=function(req,res,next){
    //Get Token from Header
    const token=req.header('x-auth-token');

    //Check if no token
    if(!token){
        return res.status(401).json({msg:'No token ,authorization denied'});
    }
    //Verify
    try{
        const decoded=jwt.verify(token,config.get('jwtSecret'))
        req.user=decoded.user;
        next();
    }catch(err){
        res.status(401).json({msg:'Token is Not Valid'})
    }
}