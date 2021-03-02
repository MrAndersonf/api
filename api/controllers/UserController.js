const database = require('../models');

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
      const userData = request.body;
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
      await database.Users.destoy({where:{id:Number(id)}});
      response.status(200);
     } catch (error) {
      response.status(500);
     }
    }

}


module.exports = UserController