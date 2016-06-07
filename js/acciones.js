// JavaScript Document
$(document).ready(function(e) 
{
    document.addEventListener("deviceready",function()
	{
		var db= openDatabase("Test", "1.0", "Base de prueba", 65535);
		
		$("#Crear").bind("click",function (event)
		{
			db.transaction (function(ejecutar)
			{
				var sql= "CREATE TABLE Clientes (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(100) NOT NULL, apellido VARCHAR(100) NOT NULL)";
				ejecutar.executeSql (sql, undefined, function()
				{
					alert ("Tabla creada");
				},error);
				});
		});
		
		$("Eliminar").bind("click", function (event)
		{
			if (!confirm ("borrar tabla?","")) return;
			db.transaction(function(transaction)
			{
				var sql="DROP TABLE Clientes";
				transaction.executeSql(sql, undefined,function()
				{
					alert("Tabla borrada");
				}, error);
				});
		});
		
		function error(transaction, err) {
			alert("error de base de datos : " + err.message);
			return false;
		}
		$("#Insertar").bind("click", function (event)
		{
			var v_nombre =$("#Nombre").val();
			var v_apellido =$("#Apellido").val();
			db.transaction(function(ejecutar)
			{
				var sql= "INSET INTO Clientes (nombre, apellido) VALUES (?, ?)";
				ejecutar.executeSql (sql[v_nombre, v_apellido],function()
				{
				alert ("Cliente agregado");
				}, error);
					});
		});
		
		$("#Listar").bind("click", function (event)
		{
			db.transaction(function(ejecutar)
			{
				var sql ="SELECT * FROM Clientes";
				ejecutar.executeSql(sql, undefined,function(ejecutar, resultado)
				{
					var a_html= "<ul>";
					if(resultado.rows.length)
					{
						for (var i =0; i < resultado.rows.length; i++)
						{
							var fila = resultado.rows.item (i);
							
							var v_nombre = fila.nombre;
							var v_apellido = fila.apellido;
							alert(v_nombre);
							
							a_html += "<li>" + v_nombre + "&nbsp;" + v_apellido + "</li>";
						}
					}
					else
					{
						a_html += "<li> no hay clientes </li>";
					}
					a_html += "</ul>";
					
					$("#listado").unbind().bind("pagebeforeshow",function()
					{
						var $contenido = $("#listado div:jqmData(role=content)");
						$contenido.html(a_html);
						var $ul = $contenido.find("ul");
						$ul.listview();
						});
						$.mobile.changePage($("#listado"));
				}, error);
				});
				});
	}, false);
						
			
		
		
		
		
		
		});