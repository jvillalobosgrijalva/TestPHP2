class TimeInfo
{
	constructor()
	{
		this._date = new Date();
	}
	
	static getInstance()
	{
		if(this._instance==undefined)
			this._instance = new TimeInfo();		
		return this._instance;
	}
	
	get time()
	{
		return this._date.getTime();
	}
	
}