class Select
{
	static fill(array, select , valueField, descriptionField, text)
	{
		$("#"+select).empty();
		
		if(text!=undefined)
			$("#"+select).append($('<option></option>').val("").html(text));
		
		$.each(array, function(i, row) 
		{
			var id = row[valueField];
			var text="";
			if(descriptionField!="")
				text =row[descriptionField];
		    $("#"+select).append($("<option id='"+select+"_option"+id+"' data-index='"+i+"'></option>").val(id).html(text));
		    $("#"+select+"_option"+id).data("data",row);
		   
		});
	}
	
	static fillConcat(array, select , valueField, valueFieldConcat, descriptionField)
	{
		$("#"+select).empty();
		$.each(array, function(i, row) 
		{
			var text="";
			if(descriptionField!="")
				text =row[valueFieldConcat]+" - "+row[descriptionField];
		    $("#"+select).append($("<option id='"+select+"_option"+i+"'></option>").val(row[valueField]).html(text));
		    $("#"+select+"_option"+i).data("data",row);
		});
	}
	
	static fillStringArray(array, select)
	{
		$("#"+select).empty();
		$.each(array, function(i, row) 
		{
			var text="";
		    $("#"+select).append($("<option id='"+select+"_option"+i+"'></option>").val(row).html(row));
		    $("#"+select+"_option"+i).data("data",row);
		});
	}
	
	
	static find(array, filterField, value)
	{
		var array = array.filter(function(row) {
		    return row[filterField] == value;
		});
		if(array.length>0)
			return array[0];
		else
			return null;
	}
	
	
}