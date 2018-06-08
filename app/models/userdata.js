
module.exports = function(sequelize, Sequelize) {

	var Userdata = sequelize.define('userdata', {
		id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
		
        username: {type:Sequelize.TEXT},
        xName : {type:Sequelize.TEXT},
		xValue : {type:Sequelize.TEXT},
        yName : {type:Sequelize.TEXT},
        yValue : {type:Sequelize.TEXT},
        tableName : {type:Sequelize.TEXT},
        status: {type: Sequelize.ENUM('active','inactive'),defaultValue:'active' }

});
	
	return Userdata;

}