class ArrayUtils
{
	static groupBy(fields, array)
	{
		var groups= [];
		if(array!=null)
		{
			if(fields=="" || fields==undefined)
			{
				var fieldsArray = ["valor"];
				for(var i = 0; i < array.length; i++)
				{
					var item = {valor: array[i]};
					var group = ArrayUtils.searchGroup(item,fieldsArray,groups);
					if(group==null)
					{
						group = new Object;
						for(var j=0; j<fieldsArray.length;j++)
						{
							group[fieldsArray[j]] = item[fieldsArray[j]];
						}	
						group.data = [];
						group.data.push(item);
						groups.push(group);
					}	 
					else
					{		
						group.data.push(item);
					}
				}		
			}
			else
			{
				
				if(array!=undefined)
				{
					var fieldsArray = fields.split(",");
					for(var i = 0; i < array.length; i++)
					{
						var item = array[i];
						var group = ArrayUtils.searchGroup(item,fieldsArray,groups);
						if(group==null)
						{
							group = new Object;
							for(var j=0; j<fieldsArray.length;j++)
							{
								group[fieldsArray[j]] = item[fieldsArray[j]];
							}	
							group.data = [];
							group.data.push(item);
							groups.push(group);
						}	 
						else
						{		
							group.data.push(item);
						}
					}		
					//orderBy(fields,groups);		
				}
			}
		}
		return groups;
	}
	
	static searchGroup(item,arrayFields,groups)
	{
		var val1 = ArrayUtils.getValues(item,arrayFields);			
		for(var i= 0;i < groups.length;i++)
		{
			var val2 = ArrayUtils.getValues(groups[i],arrayFields);
			if(ArrayUtils.equalValues(val1,val2))
				return groups[i];
		}		
		return null;
	}
	

	static equalValues(values1,values2)
	{
		for(var i=0; i< values1.length;i++)
		{
			if(values1[i]!=values2[i])
				return false;
		}
		return true;	
	}
	
	static getValues(item,fieldsArray)
	{
		var values = [];
		for(var i=0; i< fieldsArray.length;i++)
		{
			var field = fieldsArray[i];
			var value = ArrayUtils.getValue(item,field);
			values.push(value);
		}
		return values;
	}
	
	static getValue(item, field)
	{
		var fieldsArray = field.split(".");
		if(fieldsArray.length==1)
			return item[field];
		else
		{
			if(fieldsArray.length>0)
			{
				var obj = item[fieldsArray[0]];
				for (var i = 1; i < fieldsArray.length; i++) 
				{
					var f = fieldsArray[i];
					obj = obj[f]; 
				}
			}
			return obj;
		}
	}
	
	static searchWithValues(fields,values,array)
	{
		if(array!=null)
		{
			if(fields=="" || fields==undefined)
			{
				var fieldsArray = ["valor"];
				for(var i=0;i < array.length;i++)
				{
					var item = {valor: array[i]};
					var val2 = ArrayUtils.getValues(item,fieldsArray);
					if(ArrayUtils.equalValues(values,val2))
						return item;
				}		
			}
			else
			{
				var fieldsArray = fields.split(",");						
				for(var i=0;i < array.length;i++)
				{
					if(array[i]!=null)
					{
						var val2 = ArrayUtils.getValues(array[i],fieldsArray);
						if(ArrayUtils.equalValues(values,val2))
							return array[i];
					}
				}		
			}
			
		}
		return null;
	}
	
	static filterWithValues(fields,values,array)
	{
		var items = [];
		if(array!=null)
		{
			var fieldsArray = fields.split(",");						
			for(var i=0;i < array.length;i++)
			{
				var val2 = ArrayUtils.getValues(array[i],fieldsArray);
				if(ArrayUtils.equalValues(values,val2))
					items.push(array[i]);
			}		
		}
		return items;
	}
	
	static orderBy(field, array){
		var newArray = array.slice();
		newArray.sort(function (a, b) {
			a = parseInt(a[field]);
			b = parseInt(b[field]);
			if (a > b) {
			    return 1;
			  }
			  if (a < b) {
			    return -1;
			  }
			  return 0;
		});
		return newArray;
	}
	
	static objectToArray(object, idField, valueField)
	{
		var array = [];
		for (var property in object) 
		{
			var prop = new Object();
			prop[idField]= property;
			prop[valueField] = object[property];
			array.push(prop);
		}
		return array;
	}
	
	
	static createTreeViewData(nodes,nodeIdField,textField,childrenField,expanded,disabled)
	{
		var tree = [];
		if(nodes!=null)
		{
			for(var i=0;i < nodes.length; i++)
			{
				var node = nodes[i];
				var object =  Object.assign({}, node);
				object.nodeId = object[nodeIdField];
				object.text = object[textField];
				object.state = {expanded:expanded, disabled : disabled};
				object.nodes = ArrayUtils.createChildrenNodes(node,nodeIdField,textField,childrenField,expanded,disabled);
				tree.push(object);
			}
		}
		return tree;
	}
	
	static treeToArray(nodes,childrenField)
	{
		var array = [];
		if(nodes!=null)
		{
			for(var i=0;i < nodes.length; i++)
			{
				var node = nodes[i];
				array.push(node);
				ArrayUtils.addChildren(node,childrenField,array);
			}
		}
		return array;
	}
	
	static addChildren(node, childrenField,array)
	{
		var children = node[childrenField];
		if(children!=undefined)
		{
			for(var i=0;i < children.length; i++)
			{
				var child = children[i];
				array.push(child);
				ArrayUtils.addChildren(child,childrenField,array);
			}
		}
	}
	
	static createChildrenNodes(parentNode,nodeIdField,textField,childrenField,expanded,disabled)
	{
		if(disabled==null)
			disabled = false;
		var children = [];
		var childrenNodes =  parentNode[childrenField];
		if(childrenNodes!=null)
		{
			if(childrenNodes.length>0)
			{
				for(var i=0;i < childrenNodes.length; i++)
				{
					var childNode = childrenNodes[i];
					var object =  Object.assign({}, childNode);
					object.nodeId = object[nodeIdField];
					object.text = object[textField];
					object.state = {expanded:expanded,disabled:disabled};
					object.nodes = ArrayUtils.createChildrenNodes(childNode,nodeIdField,textField,childrenField,expanded,disabled);
					children.push(object);
				}
			}
		}
		return children;
	}
	
	static getMax(field,array)
	{
		var max = 0;
		if(array!=null)
			if(array.length>0)
			{
				var element = array[0];
				max = element[field];
				for(var i =1;i<array.length;i++)
				{
					element = array[i];
					if(element[field]>max)
						max = element[field];
				} 	
			}				
		return max;
	}
	
	static getMin(field,array)
	{
		var min = 0;
		if(array!=null)
			if(array.length>0)
			{
				var element = array[0];
				min = element[field];
				for(var i =1;i<array.length;i++)
				{
					element = array[i];
					if(element[field]<min)
						min = elemento[field];
				} 	
			}				
		return min;
	}
	
	static searchWithValuesTree(fields,values,array, childrenField)
	{
		if(array!=null)
		{
			var fieldsArray = fields.split(",");						
			for(var i=0;i < array.length;i++)
			{
				var item = array[i];
				var val2 = ArrayUtils.getValues(item,fieldsArray);
				if(ArrayUtils.equalValues(values,val2))
					return array[i];
				else
					return ArrayUtils.searchWithValuesTree(fields,values,item[childrenField],childrenField);
			}		
		}
		return null;
	}
	
	
	
	static habilitarNodos(nodos)
	{
		if(nodos!=null)
		{
			for(var i=0; i < nodos.length; i++)
			{
				var nodo = nodos[i];
				nodo.state.disabled = false;
				ArrayUtils.habilitarNodos(nodo.nodes);
			}
		}
		
	}
	
	
	static getIndexWithValues(fields,values,array)
	{
		if(array!=null)
		{
			if(fields=="" || fields==undefined)
			{
				var fieldsArray = ["valor"];
				for(var i=0;i < array.length;i++)
				{
					var item = {valor: array[i]};
					if(item!=null)
					{
						var val2 = ArrayUtils.getValues(item,fieldsArray);
						if(ArrayUtils.equalValues(values,val2))
							return i;
					}
				}		
			}
			else
			{
				var fieldsArray = fields.split(",");						
				for(var i=0;i < array.length;i++)
				{
					if(array[i]!=null)
					{
						var val2 = ArrayUtils.getValues(array[i],fieldsArray);
						if(ArrayUtils.equalValues(values,val2))
							return i;
					}
				}		
			}
		}
		return -1;
	}
	
	static join(array,field)
	{
		var values = [];
		for(var i=0; i< array.length;i++)
		{
			var item = array[i];
			var value = ArrayUtils.getValue(item,field);
			values.push(value);
		}
		return values;
	}
	
	static joinAsString(array,field)
	{
		var values = "";
		for(var i=0; i< array.length;i++)
		{
			var item = array[i];
			var value = ArrayUtils.getValue(item,field);
			values+=value;
			if(i < array.length - 1)
				values+=",";
		}
		return values;
	}
	
	static revolver(unshuffled)
	{
		let shuffled = unshuffled
	  .map((value) => ({ value, sort: Math.random() }))
	  .sort((a, b) => a.sort - b.sort)
	  .map(({ value }) => value);
		return shuffled;
	}
}