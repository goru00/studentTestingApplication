module.exports = (sequelize, Sequelize) => {
    const TeacherEmployment = sequelize.define('teacher_employments', {
        teacherId: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        directionId: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        disciplineId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    }, {
        timeStamps: false
    });
    return TeacherEmployment;
}