//--- Faz o fundo da div piscar quando se edita um item que
// utilizará os campos da mesma tela para troca de valores
function alterar(alvo){
	//alert("aqui");
	$(alvo).css("overflow","hidden");
	$(alvo).effect("highlight",{color:"#CD5C5C;"},1000);
}

function iniciaDialog(alvo){

	var dialog = $(alvo);

	dialog.dialog({
		autoOpen: false,
		resizable: false,
		height: "auto",
		width: 500,
		modal: true,
		title: "Aviso",
		open: function (event, ui) {
			$(".ui-widget-overlay").css({
	            opacity: 0.5,
	            filter: "Alpha(Opacity=100)",
	            backgroundColor: "black"
	    	});
	    },
	    buttons: [
          {
            text: "Ok",
            click: function() {
            	$( this ).dialog( "close" );
            	//$(dialog).empty(); -> para impedir que se abra varias modais depois do reload deo ajax
				//$(dialog).remove(); -> para impedir que se abra varias modais depois do reload deo ajax
            }
          }
        ]
	});

	dialog.dialog( "open" );
}

//------- contador de caracteres restantes
function contCaracteres(elemento, max){
	
	var conteudo = $(elemento).val();		
	var qtdAtual = conteudo.length;		
	var restantes = max - qtdAtual;
	
	if(qtdAtual > (max-1)){		
		$(elemento).val(conteudo.substr(0,max)).trigger('change');
	}
	
	$(elemento).parent().find(".restantes").text(restantes);
}


$(document).ready(function(){

	$(".bloco-abas").tabs();

	$("body").tooltip({
	  create: function( event, ui ) {void(0);}
	});

	//--- Ajusta as larguras das colunas das tabelas
	$(".tabela").each(function(index){

		$("th",this).each(function(index,value){
				
			var col_style = $(this).attr("style");
			var valorVW = col_style.split(":");
			var larguraVW = valorVW[1];

			$(this).parents().find("tbody tr td:nth-child("+(index+1)+")").css("width",larguraVW);
		});
	});	

	//--- Cria um title para os campos Select após serem modificados
	$("select").change(function(){
		var selecionado = $(this).find(":selected").text();
		$(this).attr("title",selecionado);
	});

	//--- Abre a janela dialog para Confirmar Exclusão
	$(".ic-excluir").click(function(){
		
		iniciaDialog("#confirmar");
		
	});

	//--- Controla ações do botão Incluir
	$(".incluir").click(function(){

		var btn = $(this);
		var incluir = $(".campos_incluir");

		var display = incluir.css("display");

		if(display == "none"){

			btn.attr("title","Fechar");
			//incluir.css("display","block");
			incluir.show("slow");
			btn.removeClass("glyphicon-plus");
			btn.addClass("glyphicon-minus");
			btn.css("background","#B85C5C");

		}else{

			btn.attr("title","Incluir");
			//incluir.css("display","none");
			incluir.hide("slow");
			btn.removeClass("glyphicon-minus");
			btn.addClass("glyphicon-plus");
			btn.css("background","#5cb85c");
		}

	});

	//-------- prepara controladores da função contCaracteres
	var arrTamanhos = new Array(250,256,512,1024,2048,4096);//array dos tamanhos máximos de caracteres

	$.each(arrTamanhos,function(index,value){
		
		var elemento = ".max-"+value;

		//------- prepara listener para cada tamanho
		$(elemento).keyup(function(){

			contCaracteres(this,value);

		});
	});//--
});