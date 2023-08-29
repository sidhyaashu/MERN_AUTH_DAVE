const User = require('../model/UserM')

const handleLogout = async (req,res)=>{
    //on client also delete the token

    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(204) //no content
    const refreshToken = cookies.jwt

    // is refresh token in db
    const foundUser = await User.findOne({refreshToken}).exec()
    if(!foundUser) {
        res.clearCookie('jwt',{httpOnly:true,sameSite:'None',secure:true})
        return res.sendStatus(204)
    } //forbidden

    //delete token
    foundUser.refreshToken = foundUser.refreshToken.filter((rt)=>rt !==refreshToken)
    const result =await foundUser.save()

    res.clearCookie('jwt',{httpOnly:true,sameSite:'None'}) //,secure:true secure:true -only serve on https
    res.status(204).json({message:"Logout",refreshToken})
       
}

module.exports = {handleLogout}