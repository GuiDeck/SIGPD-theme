function removerAtivo(){

	//-- remover a class .ativo de todos os itens
	$.each( $(".menu-principal ul li ul li"), function(){
		$(".menu-principal ul li ul li").removeClass("ativo");
	});
}

$(document).ready(function(){

	//-- Monta menu
	$(".menu-principal ul ul, .menu-principal ul ul ul").css("display","none");

	$(".menu-principal ul li").click(function(e){

		if(e.target != this) return;

		var li = $(this);

		var item = li.text();// texto que será apresentado no .menu-titulo

		var item_icon = li.find("i").attr("class");

		$.each( $(".menu-principal ul ul ul"), function(){
			$(this).slideUp("slow");
		});

		if( li.has("ul").length ){

			removerAtivo();

			item = $(this).clone()    	//clone the element
						  .children() 	//select all the children
						  .remove()   	//remove all the children
						  .end()  		//again go back to selected element
						  .text();

			if($("ul",li).css("display") !== "block"){
				$("ul",this).slideDown("slow");
			}
		}

		item = "<i class='"+item_icon+"'></i>" + item;

		//alert("aqui: "+li.index());

		//if(li.index() == 0){
			//$(".menu-titulo").html(item);
		//}
	});

	//-- 
	$(".menu-principal ul li ul li").click(function(){

		removerAtivo();

		$(this).addClass("ativo");
	});

	//-- Exibe/esconde a lista de módulos
	$(".menu-titulo").click(function(){

		if($(".modulos").css("display") == "block"){

			$(".modulos").slideUp("slow");

		}else{
			$(".modulos").slideDown("slow");
		}
	});

	//-- Percorre a estrutura do menu para recuperar o nome dos módulos
	var arr_modulos = $('#menu > ul > li').clone().children().remove().end();

	//-- Monta a lista de módulos
	$.each(arr_modulos,function(index,value){

		$('.modulos ul').append(arr_modulos[index]);

	});

	//-- Ações de escolha do módulo
	$.each($('.modulos ul li'),function(){

		$(this).click(function(){

			var modulo_nome = $(this).text();

			var meu_modulo = $("#menu ul li:contains(" + modulo_nome + ")");

			$.each($('#menu > ul > li'),function(){
				$(this).css("display","none");
			});

			meu_modulo.slideDown("slow");

			$("ul",meu_modulo).slideDown("slow");

			$("ul ul", meu_modulo).css("display","none");

			var item_icon = $(this).find("i").attr("class");

			modulo_nome = "<i class='"+item_icon+"'></i>" + modulo_nome;

			$(".menu-titulo").html(modulo_nome);

			//alert(typeof($("#menu")));

			$(".modulos").slideUp("slow");

		});
	});

	//-- Encontra os ícones de cada módulo e o atribui à lista de módulos
	$.each($("#menu > ul > li").children("i"),function(index,value){
		var classe = $(this).attr("class");
		var icone = '<i class="'+classe+'"></i>';

		$('.modulos ul li:nth('+index+')').prepend(icone);

	});

	//-- inicializa o menu com o módulo Social aberto
	$.each($('#menu > ul > li'),function(){
		$(this).css("display","none");
	});

	var unico = $("#menu ul li:contains('Cadastro Único')");

	var tit_unico = unico.clone().children().remove().end();

	unico.slideDown("slow");

	$("ul, ul",unico).css("display","block");

	$("ul ul",unico).css("display","none");

	var item_icon = unico.find("i").attr("class");

	var modulo_nome = "<i class='"+item_icon+"'></i>Cadastro Único";

	$(".menu-titulo").html(modulo_nome);

});