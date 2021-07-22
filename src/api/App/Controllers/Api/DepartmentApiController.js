'use strict';

const Department = require('../../Models/Departament');

class DepartmentApiController {

    /**
     * Fetch all departments
     *
     * @param request
     * @param response
     * @param next
     * @returns {Promise<void>}
     */
    async index(request, response, next)
    {
       await Department.find({}, (err, departments) => {
            return response.status(200).json(departments);
        }).catch((err) => {
            return response.status(500).json({ err: err })
        });
    }

    /**
     * Find one department
     *
     * @param request
     * @param response
     * @param next
     * @returns {Promise<void>}
     */
    async show(request, response, next)
    {
        await Department.findOne({ slug: request.params.slug }, (err, department) => {
            return response.status(200).json(department);
        }).catch((err) => {
            return response.status(500).json({ err: err });
        })
    }

    async store(request, response, next)
    {
        let newDepartment = new Department();
        newDepartment.name = "Administrativo";
        newDepartment.slug = "administration";

        newDepartment.save((err, department) => {
            if(err){
                return response.status(500).json({
                    error: 500,
                    errorMessage: err,
                    message: "Não foi possível criar o departamento, tente novamente mais tared!"
                });
            }else{
                return response.status(200).json({
                    message: "O departamento foi criado com sucesso!",
                    department: department
                })
            }
        })
    }

}

module.exports = DepartmentApiController;