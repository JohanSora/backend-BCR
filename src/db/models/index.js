const {  Language, LanguageSchema } = require('./language.model');
const {  AcademicDegrees, AcademicSchema } = require('./academic-degrees.model');
const {  Award, AwardSchema  } = require('./award.model');


function setupModels(sequelize){

    Language.init(LanguageSchema, Language.config(sequelize));
    AcademicDegrees.init(AcademicSchema, AcademicDegrees.config(sequelize));
    Award.init(AwardSchema, Award.config(sequelize));

}

module.exports = { setupModels };
