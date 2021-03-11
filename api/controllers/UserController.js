const database = require('../models');
const Auth = require('../Auth')
const Token = require('../Auth/token')
const blacklist = require('../../redis/handle-blacklist')

class UserController{

    static async index(request, response){
        try {
            const allUsers = await database.Users.findAll();
            return response.status(200).json(allUsers);
        } catch (error) {
            return response.status(500).json(error.message);
        }        
    }

    static async show(request, response){
      const {id} = request.params
      try {
        const user = await database.Users.findOne({where:{id:Number(id)}})
        return response.status(200).json(user);
      } catch (error) {
        return response.status(500).json(error.message)
      }
    }

    static async store(request, response){
      let userData = request.body;
      userData.password = await Auth.encrypt(userData.password)
      try {
        const newUser = await database.Users.create(userData);
        return response.status(200).json(newUser);
      } catch (error) {
        response.status(500).json(error.message)
      }
    }

    static async update(request,response){
      const userData = request.body;
      const {id} = request.params;
      try {
        await database.Users.update(userData,{where:{id:Number(id)}});
        const updatedUser = await database.Users.findOne({where:{id:Number(id)}})
        return response.status(200).json(updatedUser);
      } catch (error) {
        return response.status(500).json(error.message);
      }
    }

    static async delete(request, response){
      const {id} = request.params;
     try {
      await database.Users.destroy({where:{id:Number(id)}});
      return response.status(200).json("success: successfuly deleted");
     } catch (error) {
      return response.status(500).json(error.message);
     }
    }

    static async restore(request, response){
      const {id} = request.params
      try {
      const restoredUser = await database.Users.restore({where:{id:Number(id)}});
        return response.status(200).json({success:"user restored"})
      } catch (error) {
        return response.status(500).json(error.message)
      }
    }

    static async login(request, response){
     try {
      const jwtToken = Token.create(request.user)
      response.set('Authorization',jwtToken)
      response.status(204).send()
     } catch (error) {
       response.status(500).json({error:error.message})
     }
    } 

    static async logout(request, response){
      await blacklist.insert(request.token)
      response.status(204).send()
    } 

}


module.exports = UserController