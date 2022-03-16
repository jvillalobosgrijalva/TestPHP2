/**
 * 
 */
class CatalogoRepositorio extends Repositorio
{
	
	constructor(url)
	{
		super(url)
	}
	
	insertar(contexto,funcion, modelo)
	{
		$.post(this._url, {tokenSeguridad:this.tokenSeguridad, accion: "insertar", modelo : JSON.stringify(modelo)}, function(respuesta) 
		{
			funcion.call(contexto,JSON.parse(respuesta));
		});
	}
	
	actualizar(contexto,funcion, modelo)
	{
		$.post(this._url, {tokenSeguridad:this.tokenSeguridad, accion: "actualizar", modelo : JSON.stringify(modelo)}, function(respuesta) 
		{
			funcion.call(contexto,JSON.parse(respuesta));
		});
	}
	
	consultar(contexto,funcion, criterios,paginacion)
	{
		$.post(this._url, {tokenSeguridad:this.tokenSeguridad,accion: "consultar", criterios : JSON.stringify(criterios), paginacion : JSON.stringify(paginacion)}, function(respuesta) 
		{
			funcion.call(contexto,JSON.parse(respuesta));
		});
	}
	
	consultarNumeroRegistros(contexto,funcion, criterios)
	{
		$.post(this._url, {tokenSeguridad:this.tokenSeguridad,accion: "consultarNumeroRegistros", criterios : JSON.stringify(criterios)}, function(respuesta) 
		{
			funcion.call(contexto,JSON.parse(respuesta));
		});
	}

	consultarPorLlaves(contexto,funcion, llaves)
	{
		$.post(this._url, {tokenSeguridad:this.tokenSeguridad,accion: "consultarPorLlaves", llaves: JSON.stringify(llaves)}, function(respuesta) 
		{
			funcion.call(contexto,JSON.parse(respuesta));
		});
	}
	cancelar(contexto,funcion, llaves)
	{
		$.post(this._url, {tokenSeguridad:this.tokenSeguridad, accion: "cancelar", llaves: JSON.stringify(llaves)}, function(respuesta) 
		{
			funcion.call(contexto,JSON.parse(respuesta));
		});
	}
	
	eliminar(contexto,funcion, llaves)
	{
		$.post(this._url, {tokenSeguridad:this.tokenSeguridad,accion: "eliminar", llaves: JSON.stringify(llaves)}, function(respuesta) 
		{
			funcion.call(contexto,JSON.parse(respuesta));
		});
	}
	

}