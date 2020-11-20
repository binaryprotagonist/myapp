const mongoose = require('mongoose');
const userViewModal = require('../models/userViewModel');


class userController{

    /* for all user */
    async getAllUsers(){
        try{ 
          let users=await userViewModal.find();
          return ({ status: 200, message: '', success: true, result: users });
        }
        catch(err){
            return ({ status: 500, message: 'something went wrong', success: false });
        }
    }

    // for unique user
    async getUniqueUsers(){
        try{
            let users=await userViewModal.aggregate( [ { $group : { _id : "$UserId",count: { $sum: 1 } } } ] )
            return ({ status: 200, message: '', success: true, result: users });

        }catch(err){
            return ({ status: 500, message: 'something went wrong', success: false });

        }
    }

    /* function for all user with range filter */
    async filterUser(req){
        if(req.body && req.body.startDate &&  req.body.endDate){
            try{
                let users=await userViewModal.find({date: {
                    $gte: new Date(req.body.startDate),
                    $lt: new Date(req.body.endDate)
                } })
                return ({ status: 200, message: '', success: true, result: users });
    
            }catch(err){
               // console.log(err)
                return ({ status: 500, message: 'something went wrong', success: false });
    
            }
        }else{
            return ({ status: 400, message: 'variable is empty', success: false });

        }
        
    }
    
    // function for get unique user with dtar range filter
    async filterUniqueUserByDate(req){
        if(req.body && req.body.startDate &&  req.body.endDate){
            try{
                
                let users=await userViewModal.aggregate([
                    { "$match": {date:{$gte: new Date(req.body.startDate),
                        $lt: new Date(req.body.endDate)}} },
                        { $group : { _id : "$UserId",count: { $sum: 1 } } }
                    
                    ]).exec();
                console.log(users) 
                return ({ status: 200, message: '', success: true, result: users });
    
            }catch(err){
                console.log(err)
                return ({ status: 500, message: 'something went wrong', success: false });
    
            }
        }else{
            return ({ status: 400, message: 'variable is empty', success: false });
        }        
    }
}
module.exports = new userController();