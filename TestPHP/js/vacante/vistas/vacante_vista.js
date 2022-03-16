class VacanteVista extends CatalogoVista
{
	constructor()
	{
		super();
		this._presentador = new VacantePresentador(this);
		this._estatus = 1;
		
	}
	
	inicializar()
	{
		super.inicializar();
		var vista = this;
		
		$("#filtrarCriterioBtn").click(function(){
			vista.consultarNumeroRegistros();
			vista.cerrarCriterios();
		});
		$("#cerrarAreaCriterios").click(function(){
			vista.cerrarCriterios();
		});
		$(".cerrarModalBtn").click(function(){
			vista.ocultarModal("altaCambioModal");
			vista.limpiarFormulario();
			vista.inicializarValidaciones();
			});
		$("#guardarModalBtn").click(function(){
			  $("#registroForm").submit();
		});
		$("#altaLink").click(function(){
			vista.limpiarFormulario();
			vista._modeloEdicion = null;
			vista.alta();
			
		});
		
		
		
//		this.consultar();
	}
	
	ordenarCampos(orden){
		this._ordenCampos = orden;
		this._presentador.ordenarCampos();
		
	}
	 
	
	
	inicializarValidaciones()
	{
        jQuery("#registroForm").validate({
            ignore: [],
            errorClass: "invalid-feedback animated fadeInDown",
            errorElement: "div",
            errorPlacement: function(e, a) {
                jQuery(a).parents(".form-group > div").append(e)
            },
            highlight: function(e) {
                jQuery(e).closest(".form-group").removeClass("is-invalid").addClass("is-invalid")
            },
            success: function(e) {
                jQuery(e).closest(".form-group").removeClass("is-invalid"), jQuery(e).remove()
            },
            rules: {
                "nombreCortoInput": {
                    required: !0
                },
                "nombreLargoInput": {
                    required: !0
                },
            },
            messages: {
                "nombreCortoInput": "Por favor ingrese un nombre corto ",
                "nombreLargoInput": "Por favor ingrese un nombre largo ",
            },
            submitHandler:function (form) {
            	 vista.guardar();
            }
        });
	}
	
	/**********
	 * 
	 * Funciones para limpiar campos
	 * 
	 * *************/
	
	limpiarCriterios()
	{
		$("#identificadorPerfilCriterioInput").val("");
		$("#nombrePerfilCriterioInput").val("");
	}
	limpiarFormulario()
	{
		$("#registroForm").trigger("reset");
	}
	
	/************
	 * 
	 * Ã�rea para metodos GET and SET
	 * 
	 * ***********/
	
	get criterios()
	{
	
		var datos ={
				id: $("#identificadorCriterioInput").val(),
				nombreCorto: $("#nombreCCriterioInput").val(),
				nombreLargo: $("#nombrelCriterioInput").val()
		};
		return datos;
	}
	
	get modelo()
	{
		var id = 0;
		if($("#idInput").val() != "")
			 id = $("#idInput").val();
		
		var modelo ={
				id:id, 
				nombreCorto:$("#nombreCortoInput").val(), 
				nombreLargo:$("#nombreLargoInput").val(), 
		};
		return modelo;
	}
	
	set modelo(modelo)
	{
		this._modeloEdicion = modelo;
		$("#idInput").val(this._modeloEdicion.id);
		$("#nombreCortoInput").val(this._modeloEdicion.nombreCorto);  
		$("#nombreLargoInput").val(this._modeloEdicion.nombreLargo);  
	}

	get llavesOrden(){
		return {tipoUsuarioSeleccionado: ""};
	}
	
	get orden(){
		return this._ordenCampos;
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
				_this._llaves = _this.copiarPropiedadesObjeto(_this._registroSeleccionado, ["id"]);//["id"]);
				_this.cambio();
			}
		});

		$(tbody).on("click", "button.eliminar", function()
		{
		 var tr = $(this).closest('tr');
		    
		    if ( $(tr).hasClass('child') ) {
		      tr = $(tr).prev();  
		    }

			_this._registroSeleccionado  = table.row( tr ).data();
			if (_this._registroSeleccionado != undefined)
			{
				_this._llaves = _this.copiarPropiedadesObjeto(_this._registroSeleccionado, ["id"]);//["id"]);
				_this.confirmarEliminar();
			}
		});
	}
	
}

var vista = new VacanteVista();
$(document).ready(function() 
{
	vista.inicializar();
});
