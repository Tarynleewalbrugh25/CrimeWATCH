import { connection as db} from "../Config/index.js";
import { hash, compare } from "bcrypt"
class Users{
    fetchUsers(req, res){
        const qry = `
        SELECT userID, firstName, lastName, emailAddress, cellNumber, userPassword
        FROM users;
        `
        db.query(qry, (err, results)=>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                results
            })
            console.log("nothing");
            
        })
    }
    fetchUser(req, res){
        const qry = `
        SELECT userID, firstName, lastName, emailAddress, cellNumber, userPassword
        FROM users
        WHERE userID = ?;
        `
        db.query(qry, [req.params.id], (err, result)=>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                result: result[0]
            })
        })
    }
    async createUser(req, res){
        let data = req.body
        data.userPassword = await hash(data?.userPassword, 8)
        let user = {
            emailAddress: data.emailAddress,
            userPassword: data.userPassword
        }
        const qry = `
        INSERT INTO users SET ?; 
        `
        db.query(qry, [data], (err)=>{
            if (err){
                res.json({
                    status: res.statusCode,
                    msg: "This email address is already in use"
                })
            }else{
                let token = createToken(user)
                res.json({
                    status: res.statusCode,
                    token,
                    msg: 'You\'re registered'
                })
            }
        })
    }
    async deleteUser(req, res){
        const qry = `
        Delete FROM users
        WHERE userID = ?;
        `
        db.query(qry,[req.params.id], (err)=>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                msg: "This User was deleted"
            })
        })
    }
    async updateUser(req, res){
        const data = req.body
        if(data?.userPassword){
            data.userPassword = await hash(data?.userPassword, 8)
        }
        const qry = `
        UPDATE users
        SET ?
        WHERE userID = ${req.params.id}
        `
        db.query(qry, [data], (err)=>{
            if (err) throw err
            res.json({
                status: res.statusCode,
                msg: "This user was updated"
            })
        })
    }
    
    login(req, res){
        const {emailAddress, userPassword} = req.body
        const qry = `
        SELECT userID, firstName, lastName, emailAddress, cellNumber, userPassword
        FROM users
        WHERE emailAddress = ?;
        `
        db.query(qry, [emailAddress], async(err, result)=>{
            if (err) throw err
            if(!result?.length){
                res.json({
                    status: res.statusCode,
                    msg: "Wrong email address provided"
                })
            }else{
                const validPass = await compare(userPassword, result[0].userPassword)
                if(validPass){
                    const token = createToken({
                        userID:result[0].userID,
                        emailAddress,
                        userPassword,
                        userRole:result[0].userRole
                    })
                    res.json({
                        status: res.statusCode,
                        msg: "you're logged in",
                        token,
                        result: result[0]
                    })
                }else{
                    res.json({
                        status: res.statusCode,
                        msg: "Please provide the correct password"
                    })
                }
            }
        })
    }
}
export{
    Users
}