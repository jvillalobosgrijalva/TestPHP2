/**
 * 
 */

class CatalogoPresentador extends Presentador
{
	constructor(vista,repositorio)
	{
		super();
		this._vista =vista;
		this._repositorio = repositorio;
	}
	
	consultar()
	{
		this._vista.cargando = true;
		this._repositorio.consultar(this,this.consultarResultado, this._vista.criterios,this._vista.paginacion);
	}
	
	consultarResultado(resultado)
	{
		this._vista.cargando = false;
		if(resultado.mensajeError==""){
			this._vista.registros = resultado.valor;			
		}
		else
			this._vista.mostrarMensajeError(resultado.mensajeError);
	}
	
	insertar()
	{
		this._vista.cargando = true; 
		this._repositorio.insertar(this,this.insertarResult, this._vista.modelo);
	}
	
	insertarResult(resultado)
	{
		this._vista.cargando = false;
		if(resultado.mensajeError=="")
		{			
			this._vista.mostrarMensaje("","El registro se guardo correctamente.","insertarResult");
			this.consultarNumeroRegistros();
			this._vista.ocultarModal("altaCambioModal");
			this.consultarIndicadores();
		}
		else
			this._vista.mostrarMensajeError(resultado.mensajeError);
	}
	actualizar()
	{
		this._vista.cargando = true; 
		this._repositorio.actualizar(this,this.actualizarResult, this._vista.modelo);
	}
	actualizarResult(resultado)
	{
		this._vista.cargando = false;
		if(resultado.mensajeError=="")
		{			
			this._vista.mostrarMensaje("","Registro actualizado correctamente.","actualizarResult");
			this._vista.ocultarModal("altaCambioModal");
			this.consultarNumeroRegistros();
		}
		else
			this._vista.mostrarMensajeError(resultado.mensajeError);
	}
	
	cancelar()
	{
		this._vista.cargando = true; 
		this._repositorio.cancelar(this,this.cancelarResult, this._vista.llaves);
	}
	
	cancelarResult(resultado)
	{
		this._vista.cargando = false;
		if(resultado.mensajeError=="")
		{	
			this._vista.cerrarConfirmacionCancelar();
			this._vista.mostrarMensaje("","Registro cancelado.");
			
			this.consultarNumeroRegistros();
			this.consultarIndicadores();
			this._vista.ocultarModal("altaCambioModal");
		}
		else{
			this._vista.cerrarConfirmacionCancelar();
			this._vista.mostrarMensajeError("Hubo problema al cancelar.");
			this._vista.mostrarMensajeError(resultado.mensajeError);
		}
	}
	
	eliminar()
	{
		this._vista.cargando = true; 
		this._repositorio.eliminar(this,this.eliminarResult, this._vista.llaves);
	}
	
	eliminarResult(resultado)
	{
		this._vista.cargando = false;
		if(resultado.mensajeError=="")
		{	
			this._vista.cerrarConfirmacionCancelar();
			this._vista.mostrarMensaje("","Registro eliminado.");
			
			this.consultarNumeroRegistros();
			this.consultarIndicadores();
			this._vista.ocultarModal("altaCambioModal");
		}
		else{
			this._vista.cerrarConfirmacionCancelar();
			this._vista.mostrarMensajeError("Hubo problema al eliminar.");
			this._vista.mostrarMensajeError(resultado.mensajeError);
		}
	}
	
	consultarPorLlaves()
	{
		this._vista.cargando = true; 
		this._repositorio.consultarPorLlaves(this,this.consultarPorLlavesResult, this._vista.llaves);
	}
	consultarPorLlavesResult(resultado)
	{
		this._vista.cargando = false;
		if(resultado.mensajeError=="")
			this._vista.modelo = resultado.valor;
		else
			this._vista.mostrarMensajeError(resultado.mensajeError);
	}
	
	consultarNumeroRegistros()
	{
		if(this._repositorio!=null)
		{
			this._vista.cargando = true;
			this._repositorio.consultarNumeroRegistros(this,this.consultarNumeroRegistrosResultado, this._vista.criterios);
		}
	}
	
	consultarNumeroRegistrosResultado(resultado)
	{
		this._vista.cargando = false;
		if(resultado.mensajeError==""){
			this._vista.numeroRegistros = resultado.valor;
			this._vista.total = resultado.valor;
			this._vista.consultar();
		}
		else
			this._vista.mostrarMensajeError(resultado.mensajeError);
	}
	
	consultarIndicadores(){}
}