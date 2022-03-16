class Vista 
{
	constructor()
	{
		this._cargando = false;
		this._presentador = null;
		this._procedenciaFoto="";
		this._ventanas = [];
		this._configuracionPaginaEjecucion = $("body").attr("data-configuracionPaginaEjecucion");
		this._logotipoConfiguracionPagina = $("body").attr("data-logotipoConfiguracionPagina");
		this._enlacePublico = $("body").attr("data-enlacePublico");
	}
	
	inicializar()
	{
		var _this = this;
		$(window).on("resize", function(){_this.redimensionar();});
		
			
		$('body').on('hidden.bs.modal', function () {
		    if($('.modal:visible').length > 0)
		    {
		        $('body').addClass('modal-open');
		    }
		});
		 
        $("#criteriosDiv").slimScroll({
            position: "left",
            size: "5px",
            height: "100%",
            color: "#dcdcdc"
        });
        
        
	}
	
	
	
	abrirUrl(url,target,metodo,parametros)
	{
		var formulario = this.crearFormulario(url, metodo, target);
		if(parametros!=null)
		{
			for(var i= 0; i < parametros.length; i++)
			{
				var parametro = parametros[i];
				this.crearParametro(formulario,parametro.nombre, parametro.valor);

			}
		}
		formulario.submit();
	}
	crearFormulario(url, metodo, target)
	{
		var form = document.createElement('form');
	    document.body.appendChild(form);
	    form.action = url;
	    form.method = metodo;
	    form.target = target;
	    return form;
	}

	
	crearParametro(formInput, elementName, elementValue) 
	{
		var input = document.createElement('input');
		input.id = elementName;
		input.name = elementName;
		input.value = elementValue;
		input.style.display = 'none';
		formInput.appendChild(input);
		return input;
	}

	
	despuesMostrarModal(id)
	{
		
	}
	despuesCerrarModal(id)
	{
		
	}
	
		
	ocultarModal(modal)
	{
		$("#"+modal).modal("hide");
	}
	
	mostrarModal(modal)
	{	
		var _this = this;
		if($("#"+modal).length > 0){
			$("#"+modal).off('shown.bs.modal').on('shown.bs.modal', function (e) {
				  _this.despuesMostrarModal(this.id);
				  $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
			});
			
			
			$("#"+modal).modal({backdrop: 'static', keyboard: false});
			
			$("#"+modal).on("hidden.bs.modal",function () {
				_this.despuesCerrarModal(this.id);
			});
		}
	}
	
	
	set cargando(cargando)
	{
		this._cargando  = cargando;
		if(cargando)
			$(".preloader").fadeIn();
		else
			$(".preloader").fadeOut();
	}
	
	get cargando()
	{
		return this._cargando;
	}
	
	mostrarMensajeError(mensaje)
	{
		 toastr.error(mensaje,"",{
		        "positionClass": "toast-bottom-right",
		        timeOut: 5000,
		        "closeButton": true,
		        "debug": false,
		        "newestOnTop": true,
		        "progressBar": true,
		        "preventDuplicates": true,
		        "onclick": null,
		        "showDuration": "300",
		        "hideDuration": "1000",
		        "extendedTimeOut": "1000",
		        "showEasing": "swing",
		        "hideEasing": "linear",
		        "showMethod": "fadeIn",
		        "hideMethod": "fadeOut",
		        "tapToDismiss": false

		    });
	}
	
	mostrarMensaje(titulo, mensaje, origen)
	{
		 toastr.success(mensaje, titulo,{
		        "positionClass": "toast-bottom-right",
		        timeOut: 5000,
		        "closeButton": true,
		        "debug": false,
		        "newestOnTop": true,
		        "progressBar": true,
		        "preventDuplicates": true,
		        "onclick": null,
		        "showDuration": "300",
		        "hideDuration": "1000",
		        "extendedTimeOut": "1000",
		        "showEasing": "swing",
		        "hideEasing": "linear",
		        "showMethod": "fadeIn",
		        "hideMethod": "fadeOut",
		        "tapToDismiss": false

		    });
	}
	
	mostrarAlerta(titulo, mensaje)
	{
		swal({
            title: titulo,
            text: mensaje,
            type: "warning",
            showCancelButton: false,
            confirmButtonText: "Entendido",
            closeOnConfirm: true
        });
	}
	
	mostrarMensajeAdvertencia(mensaje)
	{
		 toastr.warning(mensaje,"",{
		        "positionClass": "toast-bottom-right",
		        timeOut: 5000,
		        "closeButton": true,
		        "debug": false,
		        "newestOnTop": true,
		        "progressBar": true,
		        "preventDuplicates": true,
		        "onclick": null,
		        "showDuration": "300",
		        "hideDuration": "1000",
		        "extendedTimeOut": "1000",
		        "showEasing": "swing",
		        "hideEasing": "linear",
		        "showMethod": "fadeIn",
		        "hideMethod": "fadeOut",
		        "tapToDismiss": false

		    });
	}
	
	crearVentana(url, target, parametros)
	{
		var form = document.createElement('form');
	    document.body.appendChild(form);
	    form.action = url;
	    form.method = "post";
	    form.target = target;
	    
	    if(parametros!=null)
		    for (var variable in parametros)
		    {
		    	var input = document.createElement('input');
				input.id = variable;
				input.name = variable;
				input.value = parametros[variable];
				input.style.display = 'none';
				form.appendChild(input);
		    }
	    
	    var input = document.createElement('input');
	    input.id = "tokenSeguridad";
		input.name = "tokenSeguridad";
		input.value =$("body").attr("data-tokenSeguridad");
		input.style.display = 'none';
	    form.appendChild(input);
	    form.submit();
	    
	    return form;
	}

	createNewFormElement(formInput, elementName, elementValue) 
	{
		var input = document.createElement('input');
		input.id = elementName;
		input.name = elementName;
		input.value = elementValue;
		input.style.display = 'none';
//		input.tokenSeguridad = $("body").attr("data-tokenSeguridad");
		formInput.appendChild(input);
		return input;
	}
	
	
	getFecha(fecha)
	{
		var dd = fecha.getDate();
		var mm = fecha.getMonth()+1; 
		var yyyy = fecha.getFullYear();
		
		if(dd<10) 
		{
		    dd='0'+dd;
		} 

		if(mm<10) 
		{
		    mm='0'+mm;
		} 
		
		return  dd+'/'+mm+'/'+yyyy;
		
	}
	
	
	cerrar()
	{
		 setTimeout(function(){
    		 window.close();
         }, 1000);
	}
	
	get propiedades()
	{
		var style = getComputedStyle(document.body);
		var propiedades = {};

		propiedades.primary = style.getPropertyValue('--primary');
		propiedades.secondary = style.getPropertyValue('--secondary');
		propiedades.success = style.getPropertyValue('--success');
		propiedades.info = style.getPropertyValue('--info');
		propiedades.warning = style.getPropertyValue('--warning');
		propiedades.danger = style.getPropertyValue('--danger');
		propiedades.light = style.getPropertyValue('--light');
		propiedades.dark = style.getPropertyValue('--dark');
		
		return propiedades;
	}
	
	
	
	
	mensajeVentana(titulo, contenido, cancelar, textoBotonSalir,contexto, funcionAceptar)
	{
		var _this = this;
		swal({
	            title: titulo,
	            text: contenido,
				html: true,
	            type: "warning",
	            showCancelButton: cancelar,
	            confirmButtonColor: "#DD6B55",
	            confirmButtonText: textoBotonSalir,
	            cancelButtonText: "Cancelar",
	            closeOnConfirm: true,
	            closeOnCancel: true,
	            showLoaderOnConfirm: true,
	        },
	        function(isConfirm)
	        {
	            if (isConfirm) 
	            {
	            	 setTimeout(function()
					{
	            		  if(funcionAceptar != null && contexto != null)
        					funcionAceptar.call(contexto);
		
	 	            }, 1000);
	            }
	        });
	}
	
	tooltip()
	{
		$('[rel="tooltip"]').on('click', function () {
		    $(this).tooltip('hide');
		})
		
	  $('[data-toggle="tooltip"]').tooltip({
	        container: 'body',
	        trigger : 'hover'
	    });
	}
	
	
	redimensionar()
	{
		/*var ancho = this.calcularAnchoVentana();
		$(".ui-dialog").width(ancho);*/
	}
	

}