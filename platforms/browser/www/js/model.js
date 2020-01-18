function createDatabaseSqlite(nameDatabase, versionDatabase, messageDatabase, sizeDatabase){
	databaseVariable = openDatabase(nameDatabase, versionDatabase, messageDatabase, sizeDatabase);
	return(databaseVariable);
}
function createTableSqlite(nameTableSqlite, arrayNameFild){
	databaseVariable.transaction(function(tx){
		tx.executeSql("CREATE TABLE IF NOT EXISTS "+nameTableSqlite+" ("+arrayNameFild+")");
	});
}
function insertDataInTable(nameTableSqlite, arrayNameFild, arrayValues){
	databaseVariable.transaction(function(tx){
		tx.executeSql("INSERT INTO "+ nameTableSqlite+" ("+ arrayNameFild +")VALUES("+ arrayValues +")");
	});
}
// contoh read data
function readDataInTable(){
	databaseVariable.transaction(function(tx){
		tx.executeSql("SELECT * FROM user", [], function(tx, result){
			var rows = result.rows;
			var dataValue = "";
			for(var i=0;i<rows.length; i++){
				dataValue += rows[i]["username"] + rows[i]["password"];
			}
			$(".vle").html(dataValue);
		});
	});
}
function updateDataInTable(nameTableSqlite, setData, idValue){
	databaseVariable.transaction(function(tx){
		tx.executeSql("UPDATE "+nameTableSqlite+" SET "+setData+" WHERE "+idValue+"");
	});
}
function deleteDataInTable(nameTableSqlite, idDelete){
	databaseVariable.transaction(function(tx){
		tx.executeSql("DELETE FROM "+ nameTableSqlite +" WHERE "+ idDelete +"");
	});
}