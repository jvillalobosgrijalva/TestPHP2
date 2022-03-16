class VentanaInternaBusqueda
{
	constructor(contexto, url, ventanaId, ancho, alto)
	{
		this._contexto = contexto;
		this._url = url;
		this._alto = alto;
		this._ancho = ancho;
		if (typeof $.fn.bootstrapBtn =='undefined') {
            $.fn.bootstrapBtn = $.fn.button.noConflict();
        }
		this._ventanaId = ventanaId;
	}
	
	mostrar()
	{
		var _this = this;
		var width = this._ancho!="" && this._ancho!=undefined?this._ancho: $("body").width() * 0.80;
		var height = this._alto!="" && this._alto!=undefined?this._alto: $("body").width() * 0.80;
		//dialog options
		var dialogOptions = {
			"title" : "",
			"width" : width,
			"height" : height,
			"modal" : false,
			"resizable" : false,
			"draggable" :true,
			"close" : function()
			{ 
				//location.reload();
				//window.focus()
				$("#"+_this._contexto.id).val("");
				$(this).remove(); 
				//_this._ventanas.pop(this);
			}
		};
		var dialogExtendOptions = {
			"closable" : true,
			"maximizable" : true,
			"minimizable" :true,
     		"minimizeLocation" : "left",
			"collapsable" :true,
			"dblclick" : "collapse",
			"titlebar" : false
		};
		
		//dialogExtendOptions.icons = {close : "ui-icon-circle-close"}	;
		
		dialogExtendOptions.maximize = function(a,b,c){
			//_this.ajustarVentanaLlamada();
		};
		
		dialogExtendOptions.restore = function(a,b,c){
			//_this.ajustarVentanaLlamada();
		};
		
		dialogOptions.resize = function(a,b,c){
			//_this.ajustarVentanaLlamada();
		
		};
		//var ventanaId = "ventana" + new Date().getTime();
		
		//var ventanaId = "ventana" + (this._ventanas.length + 1);
		$("body").append("<div id='"+this._ventanaId+"'></div>");
		this._ventana = $("#"+this._ventanaId).dialog(dialogOptions).dialogExtend(dialogExtendOptions);
		//this._ventanas.push(ventana);
		
		$(".ui-dialog-titlebar").addClass("bg-primary");
		
		this.cambiarIconosVentana(this._ventanaId);
		
		//TODO: Renderizar iframe
		var iframe = "<button type='button'  id='seleccionarRegistrobtn' class='btn btn-success mb-3' >Seleccionar registros</button>" +
				"<iframe  id='iframe_"+this._ventanaId+"' src='"+this._url+"' style='width:100%;height:100%'> </iframe>" +
				"";
		
		$("#"+this._ventanaId).html(iframe);
		var html = '';
		//$("#"+this._ventanaId).html(html);
		//var width = $(".ui-dialog").width();
		$(".ui-dialog-content").css("width","auto");
		$(".ui-dialog-content").css("margin","0px");
		$(".ui-dialog-content").css("overflow","hidden");
		
		var _this = this;
		$("#botoncerrarventana").click(function(){
			_this.cerrar();
		});
		$("#seleccionarRegistrobtn").click(function(){
			_this.selecccionar();
		});
	}
	
	cambiarIconosVentana(ventanaId)
	{
		/*$("#"+ventanaId).closest(".ui-dialog")
        .find(".ui-dialog-titlebar-close")
        .removeClass("ui-dialog-titlebar-close")
        .html("<span class='ui-icon ui-icon-triangle-1-s'>collapse</span>");*/
	}
	
	calcularAnchoVentana()
	{
		var ancho = $("body").width() * 0.80;
		/*if(width>640)
			width = 640;*/
		return ancho;
	}
	
	cerrar(){
		$(this._ventana).remove(); 
	}
	
	selecccionar(){
		var registro = "";
		var _this = this;
		var iframe = document.querySelector('#iframe_'+this._ventanaId);
		var iframeDocument = iframe.contentDocument
		var dataset = iframeDocument.activeElement.dataset;
		var json = dataset.registroSeleccionado;
		var registroSeleccionado = JSON.parse(json);
		this._contexto.valor =  registroSeleccionado[this._contexto._campoFiltrar];//.id;
//		$("#"+this._contexto.id).val("");
		$("#filtrarButton").trigger("click");
		//setTimeout(function(){ _this._contexto.valor =  1000000000; }, 3000)
		
		$(this._ventana).remove(); 
	}
}
