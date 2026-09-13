const adminAuth= (req, res, next)=>{
    console.log("Admin authentication middleware triggered");
   const token = "xyz";
   const isAuthorized = token === "xyz"; // Replace with your actual authorization logic

   if (!isAuthorized) {
       return res.status(403).send("Unauthorized access");
   }else{
     next();
   }
   
}

const userAuth= (req,res,next)=>{
    console.log("User authentication middleware triggered for user route");    
    const token ="abc";
    const isAuthorized = token === "abc"; // Replace with your actual authorization logic

    if(!isAuthorized){
        return res.status(403).send("Unauthorized access");
    }
    next();
}

module.exports = { adminAuth, userAuth };