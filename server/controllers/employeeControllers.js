const Employee = require('../model/Emolyee.js')

const getAllemployee=async(req, res) => {
    const employees = await Employee.find({})
    if(!employees) return res.status(204).json({message:"No employees found"})
    res.json(employees)
}

const createNewEmployee=async(req, res) => {
    if(!req?.body?.firstname || !req?.body?.lastname) return res.status(400).json({message:"firstname and lastname are required"})
       
    try {
        const result = await Employee.create({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
        })   
        res.status(201).json(result)
    } catch (error) {
        console.log(error)
    }
}

const updateEmployee=async(req, res) => {
        if(!req?.body?.id){
            return res.status(400).json({message:"Id parameter is required"})
        }

        const employee = await Employee.findOne({_id:req.body.id}).exec()

        if(!employee){
            return res.status(204).json({"message":`Employe ID ${req.body.id} not found`})
        }

        if(req.body?.firstname) employee.firstname = req.body.firstname
        if(req.body?.lastname) employee.lastname = req.body.lastname

        const result = await employee.save()
        res.status(200).json(result)
}

const deleteEmployee=async(req, res) => {
        if(!req?.body?.id){
            return res.status(400).json({message:"Id parameter is required"})
        }

        const employee = await Employee.findOne({_id:req.body.id}).exec()

        if(!employee){
            return res.status(204).json({message:`employee id ${req.body.id} not found`})
        }

        const result = await employee.deleteOne({_id:req.body.id})
        res.json({message:`user deleted succesfully --->${result}`})
}

const getEmployee =async(req, res) => {
    if(!req?.params?.id){
        return res.status(400).json({message:"Id parameter is required"})
    }
    const employee = await Employee.findOne({_id:req.params.id}).exec()
    if(!employee){
        return res.status(400).json({"message":`Employee Id ${req.params.id} not found`})
    }
    res.json(employee)
}


module.exports={
    getAllemployee,
    getEmployee,
    createNewEmployee,
    updateEmployee,
    deleteEmployee
}