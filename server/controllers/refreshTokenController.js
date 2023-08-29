const User = require('../model/UserM.js')
const jwt = require('jsonwebtoken')

const handRefressToken = async (req,res)=>{
    const cookies = req.cookies
    // console.log('coocke--->',cookies)
    if(!cookies?.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt
    // console.log('refreshToken--->',refressToken)
    res.clearCookie('jwt',{httpOnly:true,sameSite:'None',secure:true})


    const foundUser = await User.findOne({refreshToken}).exec()
    // console.log('foundUser---->',foundUser)




    //Detected refresh token reuse
    if(!foundUser) {
        jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err,decoded)=>{
            if(err){
                return res.status(409).json({message:"User Not found problem in refreshToken match",foundUser}) //forbidden
            }

            console.log('Attempted refreshToken reuse')
                const hackedUser = await User.findOne({username:decoded.username}).exec();
                hackedUser.refreshToken =[];

                const result =await hackedUser.save()
                console.log(result)
        })
        return res.status(409).json({message:"User Not found problem in refreshToken match",foundUser}) //forbidden
    }

    const newRefreshTokenInArray =foundUser.refreshToken.filter((rt)=>rt !==refreshToken)




    //evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err,decoded)=>{

            if(err){
                foundUser.refreshToken = [...newRefreshTokenInArray]
                const result = await foundUser.save()

                console.log('newRefTokenArray',result)
            }


            if(err || foundUser.username !== decoded.username) return res.sendStatus(403)
            const roles = Object.values(foundUser.roles)
            const accessToken = jwt.sign(
                {
                    "UserInfo":
                    {"username":decoded.username,"roles":roles}
                },
                process.env.ACCES_TOKEN_SECRET,
                { expiresIn:'30s' }
            )

            const newRefreshToken = jwt.sign(
                {"username":foundUser.username},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn:'1d'}
            )

            //saving refresh token 
            foundUser.refreshToken = [...newRefreshTokenInArray,newRefreshToken]
            await foundUser.save()

            res.cookie('jwt',newRefreshToken,{ httpOnly:true, maxAge:24*60*60*1000, sameSite:'None',secure:true }) //,secure:true 

            res.json({roles,accessToken})
        }
    )
       
}

module.exports = {handRefressToken}