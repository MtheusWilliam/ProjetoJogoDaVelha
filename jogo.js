var rodada = 1;
var matriz_jogo = Array(3);

matriz_jogo['A'] = Array(3);
matriz_jogo['B'] = Array(3);
matriz_jogo['C'] = Array(3);

matriz_jogo['A'][1] = 0;
matriz_jogo['A'][2] = 0;
matriz_jogo['A'][3] = 0;

matriz_jogo['B'][1] = 0;
matriz_jogo['B'][2] = 0;
matriz_jogo['B'][3] = 0;

matriz_jogo['C'][1] = 0;
matriz_jogo['C'][2] = 0;
matriz_jogo['C'][3] = 0;


$(document).ready(function(){

	$('#btn_iniciar').click( function(){
		if($('#ipt_nomeJog1').val() == 0 || $('#ipt_nomeJog2').val() == 0){
			alert('Insira o nome dos dois jogadores');
			return false;
		}
		else{
			$('#pagina_inicial').hide();
			$('#pagina_jogo').show();
			$('#lbl_nomeJog1').html($('#ipt_nomeJog1').val());
			$('#lbl_nomeJog2').html($('#ipt_nomeJog2').val());
		}
	});

	$('.jogada').click( function(){
		var id_campo_clicado = this.id;
		jogada(id_campo_clicado);

	});

	function jogada(id){
		var icone = '';
		var ponto = 0;

		if ((rodada % 2) == 1) {
			icone = 'url("imagens/marcacao_1.png")';
			ponto = -1;
			$('#'+id).off();
		} else{
			icone = 'url("imagens/marcacao_2.png")';
			ponto = 1;
			$('#'+id).off();
		}
		
		rodada++;

		$('#'+id).css('background-image', icone);

		var linha_coluna = id.split('');

		matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;

		verifica_combinacao();
	}

	function verifica_combinacao(){
		var pontos = 0;
		//verifica na horizontal
		for (var i = 1; i <=3; i++){
			pontos = pontos + matriz_jogo['A'][i];
		}
		ganhador(pontos);

		pontos = 0;
		for (var i = 1; i <=3; i++){
			pontos = pontos + matriz_jogo['B'][i];
		}
		ganhador(pontos);

		pontos = 0;
		for (var i = 1; i <=3; i++){
			pontos = pontos + matriz_jogo['C'][i];
		}
		ganhador(pontos);

		//verifica vertical
		for(var l = 1; l<=3; l++){
			pontos = 0;
			pontos += matriz_jogo['A'][l];
			pontos += matriz_jogo['B'][l];
			pontos += matriz_jogo['C'][l];
			ganhador(pontos);
		}

		//verifica diagonal
		pontos = 0;
		pontos = matriz_jogo['A'][1] + matriz_jogo['B'][2] + matriz_jogo['C'][3];
		ganhador(pontos);

		pontos = 0;
		pontos = matriz_jogo['A'][3] + matriz_jogo['B'][2] + matriz_jogo['C'][1];
		ganhador(pontos);

	}
	function ganhador(pontos){
		if (pontos == -3) {
			var jogada_1 = $('#ipt_nomeJog1').val();
			alert(jogada_1 + ' ganhou');
			$('.jogada').off();
		}
		else if(pontos == 3){
			var jogada_2 = $('#ipt_nomeJog2').val();
			alert(jogada_2 + ' ganhou');
			$('.jogada').off();
		}
	}

});