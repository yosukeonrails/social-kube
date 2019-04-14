var ArrayToQuery = (arr, arrName)=>{
	var query="";
		arr.forEach( (value, index) => {
		var and = index == 0 ? "" : "&"
		var str= 	and+arrName+"="+value;
		query= query+str;
		});
		return query
	}
	
module.exports = {
	ArrayToQuery,
}