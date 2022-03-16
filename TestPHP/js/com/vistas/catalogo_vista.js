
class CatalogoVista extends Vista
{
	
	constructor()
	{
		super();
		this._presentador = null;
		this._modo = Modo.ALTA;
		this._registroSeleccionado = null;
		this._nombresCamposllaves = ["id"];
		
	}
	
	inicializar()
	{
		super.inicializar();
		this.consultar();
	}
	
	alta()
	{
		this._modo = Modo.ALTA;
		this.limpiarFormulario("registroForm");
		this.inicializarValidaciones();
		this.activarLlaves();
		this.mostrarFormulario();
	}
	
	cambio()
	{
		this._modo = Modo.CAMBIO;
		this.limpiarFormulario("registroForm");
		this.desactivarLlaves();
		this.inicializarValidaciones();
		this.mostrarFormulario();
		if(this._presentador!=null)
			this._presentador.consultarPorLlaves();
	}
	
	activarLlaves(){}
	desactivarLlaves(){}
	inicializarValidaciones(){}
	
	confirmarEliminar(){
		var _this = this;
	    swal({
	            title: "\u00bfEst\u00E1 seguro de eliminar?",
	            text: "Se eliminar\u00e1 este registro !!",
	            type: "warning",
	            showCancelButton: true,
	            confirmButtonColor: "#DD6B55",
	            confirmButtonText: "Si, eliminar!!",
	            cancelButtonText: "No",
	            closeOnConfirm: false,
	            closeOnCancel: true,
	            showLoaderOnConfirm: true,
	        },
	        function(isConfirm){
	            if (isConfirm)
	            	{
	            	 setTimeout(function(){
	            		 _this.eliminar();
	 	            }, 1000);
	            }
	            
	        });
	}
	
	
	
	confirmarCancelar()
	{
		var _this = this;
	    swal({
	            title: "\u00bfEst\u00E1 seguro de cancelar?",
	            text: "Se cancelar\u00e1 este registro !!",
	            type: "warning",
	            showCancelButton: true,
	            confirmButtonColor: "#DD6B55",
	            confirmButtonText: "Si, cancelar!!",
	            cancelButtonText: "No",
	            closeOnConfirm: false,
	            closeOnCancel: true,
	            showLoaderOnConfirm: true,
	        },
	        function(isConfirm)
	        {
	            if (isConfirm) 
	            {
	            	 setTimeout(function(){
	            		 _this.cancelar();
	 	            }, 1000);
	            }
	        });
	}
	
	cerrarConfirmacionCancelar()
	{
		swal.close();
	}
	
	consultar()
	{	
		if(this._presentador!=null)
			this._presentador.consultar();
	}
	
	
	guardar(){
		if(this._presentador!=null)
			if(this._modo == Modo.ALTA)
				this._presentador.insertar();
			else
				this._presentador.actualizar();
	}
	
	inicializarEventosTabla(tbody, table)
	{
		this.inicializarEventosBotonesTabla(tbody, table, this._nombresCamposllaves);
	}
	
	get registroSeleccionado()
	{
		return this._registroSeleccionado;
	}
	
	inicializarEventosBotonesTabla(tbody, table, nombresCamposLlave)
	{
		var _this = this;
		$(tbody).on("click", "button.editar", function()
		{	
			 var tr = $(this).closest('tr');
			    
		    if ( $(tr).hasClass('child') ) {
		      tr = $(tr).prev();  
		    }

			_this._registroSeleccionado  = table.row( tr ).data();
			if (_this._registroSeleccionado != undefined)
			{
				_this._llaves = _this.copiarPropiedadesObjeto(_this._registroSeleccionado, nombresCamposLlave);//["id"]);
				_this.cambio();
			}
		});

		$(tbody).on("click", "button.cancelar", function()
		{
		 var tr = $(this).closest('tr');
		    
		    if ( $(tr).hasClass('child') ) {
		      tr = $(tr).prev();  
		    }

			_this._registroSeleccionado  = table.row( tr ).data();
			if (_this._registroSeleccionado != undefined)
			{
				_this._llaves = _this.copiarPropiedadesObjeto(_this._registroSeleccionado, nombresCamposLlave);//["id"]);
				_this.confirmarCancelar();
			}
		});
	}
	
	copiarPropiedadesObjeto(objeto, propiedades)
	{
		var copia = new Object();
		for (var  i  =  0; i  < propiedades.length; i++) 
		{  	
			var propiedad = propiedades[i];
			if(propiedad in objeto )
				copia[propiedad] = objeto[propiedad];
		}
		return copia;
	}
	

	
	cancelar()
	{
		if(this._presentador!=null)
			this._presentador.cancelar();
	}
	
	eliminar(){
		if(this._presentador!=null)
			this._presentador.eliminar();
	}
	
	
	
	
	
	consultarPorLlaves()
	{
		if(this._presentador!=null)
			this._presentador.consultarPorLlaves();
	}
	
	static get ALTA()
	{
		return "ALTA";
	}
	
	static get CAMBIO()
	{
		return  "CAMBIO";
	}
	
	

	/**********
	 * 
	 * Metodos para criterios de seleccion
	 * 
	 * ************/
	cerrarCriterios()
	{
		$("body").trigger("click");
	}
	/*********
	 * 
	 * Metodos para la paginaciÃ³n
	 * 
	 * ************/
	navegar(destino)
	{
		if(destino == 'anterior')
		{
			this._paginaActual = this._paginaActual - 1;
			this._presentador.consultar();
		}
		else if(destino == 'siguiente')
		{
			this._paginaActual = this._paginaActual + 1;	
			this._presentador.consultar();
		}
		this.validarBotones();
	}
	
	validarBotones()
	{
		if(this._paginas  == this._paginaActual && this._paginaActual != 1 )
		{
			$("#btnAnterior").show();
			$("#btnsiguiente").hide();
		}
		else if(this._paginaActual > 1 && this._paginaActual < this._paginas)
		{
			$("#btnsiguiente").show();
			$("#btnAnterior").show();
		}
		else if(this._paginaActual == 1 && this._paginas > 1 )
		{
			$("#btnAnterior").hide();
			$("#btnsiguiente").show();
		}
		else if(this._paginaActual == 1 )
		{
			$("#btnAnterior").hide();
			$("#btnsiguiente").hide();
		}
	}
	consultarNumeroRegistros()
	{	
		if(this._presentador!=null)
			this._presentador.consultarNumeroRegistros();
	}
	
	
	soloNumeros(event)
	{
		if(event.shiftKey)
			event.preventDefault();
		var keynum = window.event ? window.event.keyCode : e.which;
		   if ((keynum >= 48 && keynum <= 57))
			   return true;
		 
		   event.preventDefault();
	}
	
	cambiarPagina(paginacion)
	{
		this._paginacion = paginacion;
		this.consultar();
	}
	
	get paginacion(){
		return this._paginacion;
	}
	
//	set numeroRegistros(numeroRegistros){
//		this._tabla.numeroRegistros = numeroRegistros;
//	}
	
	get llaves(){
		return this._llaves;
	}
	
	limpiarFormulario(formulario)
	{
		$("#" + formulario).trigger("reset");
	}
	
	set total(total)
	{
		$("#totalRegistrosIndicador").html(total);
	}
	
	
	
	set registros(registros)
	{
		this._tabla.registros = registros;
		this.inicializarEventosTabla("#datosTabla tbody",this._datosTabla.DataTable());
		 $('[data-toggle="tooltip"]').tooltip(); 
		
	}
	
	set numeroRegistros(numeroRegistros){
		this._tabla.numeroRegistros = numeroRegistros;

	}
	
	get numeroRegistros()
	{
		return this._tabla.numeroRegistros;
	}
	
	mostrarFormulario()
	{
		this.mostrarModal("altaCambioModal");
		if(this._modo == Modo.ALTA)
			$('#altaCambioModalTitulo').html("Alta");
		else
			$('#altaCambioModalTitulo').html("Actualizaci\u00F3n");
	}
	
	cargandoOpciones(select)
	{
		$("#"+select).empty();
		$("#"+select).append('<option value="">Cargando...</option>');

	}
	
	cargarOpciones(select, registros, modo, modeloEdicion, campoModelo, campoId, campoDescripcion, texto)
	{
		$("#"+select).empty();
		if(texto!=null)
		{
			if(!texto=="")
				$("#"+select).append($('<option></option>').val("").html(texto));
		}
		for(var i=0; i < registros.length;	 i++)
		{
			var registro = registros[i];
			var descripcion="";
			if(campoDescripcion!="")
				descripcion =registro[campoDescripcion];
		    $("#"+select).append($("<option id='"+select+"_option"+i+"'></option>").val(registro[campoId]).html(descripcion));
		    $("#"+select+"_option"+i).data("registro",registro);
		}
		if(modo==Modo.CAMBIO && modeloEdicion!=null)
		{
			var id = modeloEdicion[campoModelo];
			$("#"+select).val(id);
		}
	}
	
	
	
}