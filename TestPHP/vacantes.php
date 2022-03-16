<?php
    header('Content-Type: text/html; charset=UTF-8');
?>
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- Tell the browser to be responsive to screen width -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">
<!-- Favicon icon -->
<link rel="icon" type="image/png" sizes="16x16"
	href="images/favicon.png">
<title>Vacantes</title>

<link href="css/lib/chartist/chartist.min.css" rel="stylesheet">
<link href="css/lib/owl.carousel.min.css" rel="stylesheet" />
<link href="css/lib/owl.theme.default.min.css" rel="stylesheet" />
<!-- Bootstrap Core CSS -->
<link href="css/lib/bootstrap/bootstrap.min.css" rel="stylesheet">

<!-- Custom CSS -->
<link href="css/helper.css" rel="stylesheet">
<link href="css/style.css" rel="stylesheet">
<link href="css/lib/toastr/toastr.min.css" rel="stylesheet">
<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:** -->
<!--[if lt IE 9]>
    <script src="https:**oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https:**oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
</head>


<body class="fix-header fix-sidebar" >
	
	<!-- Preloader - style you can find in spinners.css -->
	<div class="preloader" style="display:non">
		<svg class="circular" viewBox="25 25 50 50" style="display:none">
			<circle class="path" cx="50" cy="50" r="20" fill="none"
				stroke-width="2" stroke-miterlimit="10" /> </svg>
	</div>
	<!-- Main wrapper  -->
	<div id="main-wrapper">
		<!-- Page wrapper  -->
		<div class="page-wrapper m-0">

			<!-- End Bread crumb -->
			<!-- Container fluid  -->
			<div class="container-fluid">

				<div class='row'>
					<div class="col-lg-12">
						<div class="card" style="padding-top: 8px; padding-bottom: 8px;">
							<!--  AQUI VA EL FILTRADO  -->
							<div class="col-lg-12" style="">
								<div class="float-lg-leght">
									<h3>Buscar</h3>
								</div>
								<div class="col-lg-2 float-lg-right">
									<button type='button' id='BuscarFechaBoton'
										class='btn btn-success active '>Buscar Registro</button>
								</div>
								<div class="col-lg-2 float-lg-right">
									<input id="fechaFinalInput" name="fechaFinalInput" type="date"
										class="fecha form-control">
								</div>
								<div class="col-lg-1 float-lg-right">
									<label for="fechaFinalInput">Fecha Final<span
										class="text-danger">*</span></label>
								</div>
								<div class="col-lg-2 float-lg-right">
									<input id="fechaInicialInput" name="fechaInicialInput"
										type="date" class="fecha form-control">
								</div>
								<div class="col-lg-1 float-lg-right">
									<label for="fechaInicialInput">Fecha Inicial<span
										class="text-danger">*</span></label>
								</div>
							</div>
							<br>
						</div>
					</div>

				</div>
				<div class="row">
					<div class="col-lg-6">
						<div class='card'
							style='overflow: scroll; overflow-x: hidden; max-height: 375px; min-height: 375px;'>
							<br>
							<div class='card-title'>
								<h4>Proyectos</h4>
								<div class="float-lg-right">
									<select class="btn btn-secondary dropdown-toggle  btn-sm"
										id="proyectoSelect">
									</select>
									<button class="btn btn-success active btn-sm" id="mostrarBoton"
										type="button">Mostrar</button>
								</div>


							</div>

							<div id='proyectosContenedor'></div>
							<br>
						</div>
					</div>
					<!-- /# column -->
					<div class="col-lg-6">
						<div class="card">
							<div class="card-title">
								<h4>Todo</h4>
							</div>
							<div class="todo-list">
								<div class="tdl-holder">
									<div class="tdl-content">
										<ul>
											<li class="color-primary"><label> <input type="checkbox"><i
													class="bg-primary"></i><span>Post three to six times on
														Twitter.</span> <a href='#' class="ti-close"></a>
											</label></li>
											<li class="color-success"><label> <input type="checkbox"
													checked><i class="bg-success"></i><span>Post one to two
														times on Facebook.</span> <a href='#' class="ti-close"></a>
											</label></li>
											<li class="color-warning"><label> <input type="checkbox"
													checked><i class="bg-warning"></i><span>Follow back those
														who follow you</span> <a href='#' class="ti-close"></a>
											</label></li>
											<li class="color-danger"><label> <input type="checkbox"
													checked><i class="bg-danger"></i><span>Connect with one new
														person</span> <a href='#' class="ti-close"></a>
											</label></li>
										</ul>
									</div>
									<input type="text" class="tdl-new form-control"
										placeholder="Type here">
								</div>
							</div>
						</div>
					</div>

				</div>
				<!-- Start Page Content -->
				<div class="row" id='cantidadesPorcentaje'></div>
				<!-- End PAge Content -->
			</div>
			<!-- End Container fluid  -->
			<!-- footer -->
			<!-- End footer -->
		</div>
		<!-- End Page wrapper  -->
	</div>
	<!-- End Wrapper -->


	<!-- All Jquery -->
	<script src="lib/jquery/jquery.min.js"></script>
	<!-- Bootstrap tether Core JavaScript -->
	<script src="lib/bootstrap/js/popper.min.js"></script>
	<script src="lib/bootstrap/js/bootstrap.min.js"></script>
	<!-- slimscrollbar scrollbar JavaScript -->
	<script src="js/jquery.slimscroll.js"></script>
	<!--Menu sidebar -->
	<script src="js/sidebarmenu.js"></script>
	<!--Toast -->
	<script src="lib/toastr/toastr.min.js"></script>
	<!--stickey kit -->
	<script src="lib/sticky-kit-master/dist/sticky-kit.min.js"></script>
	<!--  Sweet Alert -->
	<script src="lib/sweetalert/sweetalert.min.js"></script>
	<!-- Form validation -->
	<script src="lib/form-validation/jquery.validate.min.js"></script>
	<!-- Pagination -->
	<script src="lib/pagination/jquery.twbsPagination.min.js"></script>

	<!-- Clases -->
	<script src="js/clases/modo.js"></script>
	<!--Repositorios-->
	<!--Custom JavaScript -->
	<script src="js/custom.min.js"></script>


    <!--Select -->
	<script src="lib/select.js"></script>


	<!--Repositorios-->
	<script src="js/com/repositorios/repositorio.js"></script>
	<script src="js/com/repositorios/catalogo_repositorio.js"></script>
	<script src="js/vacante/repositorios/vacante_repositorio.js"></script>
	
	<!--Presentador-->
	<script src="js/com/presentadores/presentador.js"></script>
	<script src="js/com/presentadores/catalogo_presentador.js"></script>
	<script src="js/vacante/presentadores/vacante_presentador.js"></script>
	<!--Vista-->

	<script src="js/com/vistas/vista.js"></script>
	<script src="js/com/vistas/catalogo_vista.js"></script>
	<script src="js/vacante/vistas/vacante_vista.js"></script>

	<script src="lib/DataTables/datatables.min.js"></script>

</body>

</html>