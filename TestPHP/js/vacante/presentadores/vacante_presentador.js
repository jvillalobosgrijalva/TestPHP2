class VacantePresentador extends CatalogoPresentador
{
	constructor(vista)
	{
		super(vista, new VacanteRepositorio());
	}
	
	
	
	ordenarCampos(){
		if(this._vista.llavesOrden != null){
			this._vista.cargando = true; 
			this._repositorio.ordenarCampos(this,function (resultado){			
				this._vista.cargando = false;
				if(resultado.mensajeError==""){
					this._vista.mostrarMensaje("Se guardo correctamente.");
					this.consultar();
				}
				else
					this._vista.mostrarMensajeError(resultado.mensajeError);
			
			},this._vista.llavesOrden, this._vista.orden);
		}
	}
	
}