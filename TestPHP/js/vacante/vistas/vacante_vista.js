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
		
		this._campoFotografia = "valor1";
		this._campoTitulo = "titulo";
		this._campoFecha = "fecha";
		this._campoEmpresa = "empresa";
		this._campoCiudad = "ciudad";
		this._campoPais = "pais";
		this._campodescripcion = "descripcion";
		
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
	
	set registros(registros)
	{
		this._registros = registros;
		
		
		var plantillaHtml = `<div id="click{{id}}" class="media">
								<div class="media-left">
									<a href="#"><img alt="" src="{{fotografia}}" class="fotolistaTarjeta margenlistaTarjeta"></a>
								</div>
								<div class="media-body margenlistaTarjeta">
									<h4 class=" media-heading text-primary">{{titulo}}</h4>
									<p class="text-secondary">{{texto}}</p>
									<p class="comment-date">{{fecha}}</p>
								</div>
							</div>`;

		var fecha = new Date();
		
		$("#"+this.id +"contenedor").html("");
		$("#"+this.id +"contenedor").empty();
		for(var i=0; i < registros.length; i++)
		{
			var registro = registros[i];
			var plantilla = Handlebars.compile(plantillaHtml);
			var progressId = "progress"+i;
			var imagen = registro[this._campoFotografia];
			if(imagen === undefined)
				imagen = 'images/plantilla/corporate.jpg';
			var item = {
							id : progressId, 
							fotografia:  imagen,
							titulo: registro[this._campoTitulo],  
							fecha :registro[this._campoFecha],
							texto :registro[this._campoEmpresa]+" - "+registro[this._campoCiudad]+" - "+registro[this._campoPais]+" - ",
							descripcion: registro[this._campodescripcion],
							time : fecha.getTime()
						};
			
			$("#vacantesContenedor").append(plantilla(item));
//			if(registro[this._campoFotografia] != undefined || registro[this._campoFotografia] != "")
//				$( "#imgTarg"+progressId ).addClass( "fotolistaTarjeta margenlistaTarjeta" );

			$("#click"+progressId).data("_this",this);
			$("#click"+progressId).data("item",item);
			$("#click"+progressId).click(this.cardClick);
		}
		
		$("#clickprogress0").trigger('click');
		
	}
	
			
	cardClick(event){
		$("#descripcionVacante").empty();
			var _this =$("#"+event.currentTarget.id).data("_this");
			var item =$("#"+event.currentTarget.id).data("item");
			var html =`<div class="card-title">
								<h3>{{titulo}}</h3>
							</div>
							<div class="todo-list"  style='overflow: scroll; overflow-x: hidden; max-height: 375px; min-height: 375px;'>
								<div class="tdl-holder">
									<div class="tdl-content" >
										<ul>
											<li class="color-primary"><label> <i
													class="bg-primary"></i><p>{{descripcion}}</p> <a href='#' class="ti-close"></a>
											</label></li>
										</ul>
									</div>
								</div>
							</div>`;		
			var plantilla = Handlebars.compile(html);
			$("#descripcionVacante").append(plantilla(item));
	 }	
	
}

var vista = new VacanteVista();
$(document).ready(function() 
{
	vista.inicializar();
});
