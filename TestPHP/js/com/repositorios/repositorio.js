class Repositorio
{
	constructor(url)
	{
		this._url = this.contexto+url;
	}

	set url(url)
	{
		this._url = url;
	}
	
	get url()
	{
		return this._url;
	}
	
	get contexto(){
		var pathArray = location.pathname.split('/');
		if(pathArray.length>1)
			return "/"+pathArray[1];
		return "";
	}
	

	
}