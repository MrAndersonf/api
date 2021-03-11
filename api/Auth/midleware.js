const passport = require('passport');

module.exports = {
    local: (request, response, next)=>{
        passport.authenticate('local',{session:false},(error, user, info)=>{

            if(error && error.name === 'InvalidArgumentError'){
                return response.status(401).json({error: error.message})
            }


            if(error){
                return response.status(500).json({error: error.message})
            }


            if(!user){
                return response.status(401).json()
            }


            request.user = user;
            return next();
        }
        )(request, response, next);
    },
  

    bearer: (request, response, next) =>{
        passport.authenticate(
            'bearer',
            {session: false},
            (error, user, info) =>{

                if(error && error.name === 'JsonWebTokenError'){
                    return response.status(401).json({error: error.message})
                }

                if(error && error.name === 'TokenExpiredError'){
                    return response.status(401).json({error: error.message})
                }

                if(error){
                    return response.status(500).json({error: error.message})
                }

                if(!user){
                    return response.status(401).json()
                }
                request.token = info.token
                request.user = user;
                return next();
            }
        )(request, response, next)
    }
}