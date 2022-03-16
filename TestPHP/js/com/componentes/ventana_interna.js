class VentanaInterna
{
	constructor(url, ventanaId, ancho, alto, recargarVentana)
	{
		this._url = url;
		this._alto = alto;
		this._ancho = ancho;
		this._recargar = recargarVentana;
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
				if(_this._recargar == true)
					location.reload();
				else
					_this.cerrar();
				
				//window.focus()
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
		var iframe = "<iframe ='iframe_"+this._ventanaId+"' src='"+this._url+"' style='width:100%;height:100%'> </iframe><button id='botoncerrarventana' type='button' style='display:none'></button>";
		$("#"+this._ventanaId).html(iframe);
		//var width = $(".ui-dialog").width();
		$(".ui-dialog-content").css("width","auto");
		$(".ui-dialog-content").css("margin","0px");
		$(".ui-dialog-content").css("overflow","hidden");
		
		var _this = this;
		$("#botoncerrarventana").click(function(){
			_this.cerrar();
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
	
}
