$(document).ready(function(){

	//-- Inicia o datepicker nos campos com class .datepicker
	$(".datepicker").datepicker({
		dateFormat: 'dd/mm/yy',
		changeMonth: true,
		changeYear: true,
	    showOn: "button",
	    buttonImage: "./img/calendario.png",
	    buttonImageOnly: false,
	    buttonText: "Seleção de data"
	});//--

	//-- Valida os campos de data: Nunca maior que Atual
	$(".dataMaxAtual").change(function(){

		var conteudo = $(this).val();

		var arrConteudo = conteudo.split("/");
		var diaConteudo = arrConteudo[0];
		var mesConteudo = arrConteudo[1];
		var anoConteudo = arrConteudo[2];

		if(conteudo.length == 10 && anoConteudo !== "" ){

			var dataAtual = new Date();
			var diaAtual = dataAtual.getDate();				
			var mesAtual = dataAtual.getMonth()+1;				
			var anoAtual = dataAtual.getFullYear();

			if(diaAtual < 10){
				diaAtual = "0"+diaAtual;
			}
			if(mesAtual < 10){
				mesAtual = "0"+mesAtual;
			}

			var atual = diaAtual + "/" + mesAtual + "/" + anoAtual;

			if(	anoConteudo > anoAtual || 
				(anoConteudo == anoAtual && mesConteudo > mesAtual) ||
				(anoConteudo == anoAtual && mesConteudo == mesAtual && diaConteudo > diaAtual)
			   ){

				alert("A data inserida não pode ser superior à atual ("+atual+")");

				$(this).addClass("borda-erro");

			}else{
				$(this).removeClass("borda-erro");
			}

		}//--fim if

	});//--

	//-- Valida os campos de data: Nunca menor que Atual
	$(".dataMinAtual").change(function(){

		var conteudo = $(this).val();

		var arrConteudo = conteudo.split("/");
		var diaConteudo = arrConteudo[0];
		var mesConteudo = arrConteudo[1];
		var anoConteudo = arrConteudo[2];

		if(conteudo.length == 10 && anoConteudo !== "" ){

			var dataAtual = new Date();
			var diaAtual = dataAtual.getDate();				
			var mesAtual = dataAtual.getMonth()+1;				
			var anoAtual = dataAtual.getFullYear();

			if(diaAtual < 10){
				diaAtual = "0"+diaAtual;
			}
			if(mesAtual < 10){
				mesAtual = "0"+mesAtual;
			}

			var atual = diaAtual + "/" + mesAtual + "/" + anoAtual;

			if(	anoConteudo < anoAtual || 
				(anoConteudo == anoAtual && mesConteudo < mesAtual) ||
				(anoConteudo == anoAtual && mesConteudo == mesAtual && diaConteudo < diaAtual)
			   ){

				alert("A data inserida não pode ser inferior à atual ("+atual+")");

				$(this).addClass("borda-erro");

			}else{
				$(this).removeClass("borda-erro");
			}

		}//--fim if

	});//--

	//-- Valida os campos de data: Comparar com a data inserida em outro campo
	$(".dataAposComparada").change(function(){

		var conteudo = $(this).val();
		var comparar = $(this).parent().prev().find(".dataComparada").val();

		//alert("conteudo: "+conteudo+" | comparar:"+comparar);

		var arrDataFim = conteudo.split("/");
		var diaFim = arrDataFim[0];
		var mesFim = arrDataFim[1];
		var anoFim = arrDataFim[2];

		var arrDataIni = comparar.split("/");
		var diaIni = arrDataIni[0];
		var mesIni = arrDataIni[1];
		var anoIni = arrDataIni[2];

		if( (anoFim < anoIni) ||
			(anoFim == anoIni && mesFim < mesIni) ||
			(anoFim == anoIni && mesFim == mesIni && diaFim < diaIni)
		   ){

			alert("A data Final não pode ser inferior à data Inical");

			$(this).addClass("borda-erro");

		}else{
			$(this).removeClass("borda-erro");
		}

	});

	$(".dataTranscorrida").change(function(){
		
		var conteudo = $(this).val();

		if(conteudo.length > 9){

			var arrConteudo = conteudo.split("/");
			var diaConteudo = eval(arrConteudo[0]);
			var mesConteudo = eval(arrConteudo[1]);
			var anoConteudo = eval(arrConteudo[2]);

			var dataAtual = new Date();
			var diaAtual = eval(dataAtual.getDate());
			var mesAtual = eval(dataAtual.getMonth()+1);
			var anoAtual = eval(dataAtual.getFullYear());

			//var anos = Math.abs(anoAtual - anoConteudo);

			var anos = anoAtual - anoConteudo;

			if(anos < 0){
				var periodo = " adiante";
			}else{
				var periodo = " atrás";
			}

			anos = Math.abs(anos);

			if(mesAtual > mesConteudo){
				var meses = (mesAtual - mesConteudo)-1;
			}else if(mesAtual < mesConteudo){
				anos--;
				var meses = 12-(mesConteudo - mesAtual);
			}else{//dependerá se o dia é anterior ou posterior

				//if(diaConteudo > diaAtual){}
				var meses = (mesAtual - mesConteudo);
			}

			if(diaConteudo > diaAtual){
				var dias = diaConteudo - diaAtual;
			}else if(diaConteudo > diaAtual){
				var dias = (30-diaConteudo)+diaAtual;
			}else{
				var dias = diaAtual - diaConteudo;
			}

			if(anos == 1){
				var str_anos = " ano";
			}else{
				var str_anos = " anos";
			}

			if(meses == 1){
				var str_meses = " mês";
			}else{
				var str_meses = " meses";
			}

			if(dias == 1){
				var str_dias = " dia";
			}else{
				var str_dias = " dias";
			}
			
			var idade = anos+str_anos+", "+meses+str_meses+", "+dias+str_dias + periodo;

			var cp_idade = $(this).parent().find(".idade");

			cp_idade.text("");
			cp_idade.text(idade);
		}

	});

	//-- Inicia o datepicker nos campos com class .monthpicker (apenas mês/ano)
	$(".monthpicker").datepicker({
		dateFormat: 'mm/yy',
		changeMonth: true,
		changeYear: true,
	    showOn: "button",
	    buttonImage: "./img/calendario.png",
	    buttonImageOnly: false,
	    buttonText: "Seleção de data"
	});//--

	//-- Valida os campos de data: Comparar com a data inserida em outro campo apenas mês/ano
	$(".mesAposComparado").change(function(){
		var conteudo = $(this).val();
		var comparar = $(this).parent().prev().find(".mesComparado").val();

		//alert("conteudo: "+conteudo+" | comparar:"+comparar);

		var arrDataFim = conteudo.split("/");
		var mesFim = arrDataFim[0];
		var anoFim = arrDataFim[1];

		var arrDataIni = comparar.split("/");
		var mesIni = arrDataIni[0];
		var anoIni = arrDataIni[1];

		if( (anoFim < anoIni) ||
			(anoFim == anoIni && mesFim < mesIni)
		   ){

			alert("A data Final não pode ser inferior à data Inical");

			$(this).addClass("borda-erro");

		}else{
			$(this).removeClass("borda-erro");
		}
	});
});