const DisciplineService = require('../../services/university.services/discipline.service');

class DisciplineController {
    async createDiscipline(req, res, next) {
        try {
            const disciplineData = await DisciplineService.createDiscipline({...req.body});
            return res.status(201).json({
                message: "Дисциплина была успешно создана",
                ...disciplineData
            });            
        } catch (err) {
            next(err);
        }
    }
    async getDisciplines(req, res, next) {
        try {
            const disciplines = await DisciplineService.getDisciplines({...req.params});
            return res.status(200).json(disciplines);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new DisciplineController();