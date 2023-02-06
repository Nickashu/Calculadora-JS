$(document).on("click", ".btn-calculadora", function(){
    let textoNovo = apertarBotao($(this));
    $(".corpo-calculadora").find(".input-tela").val(textoNovo);
});


function apertarBotao(botao){
    const calculadora = $(".corpo-calculadora");
    let textoInput = calculadora.find(".input-tela").val();
    if($(botao).hasClass("btn-num")){
        textoInput = tratarResult(textoInput);
        if($(botao).text() == "0"){
            if(charNumeros.indexOf(textoInput.charAt(textoInput.length - 1)) > -1 || textoInput.charAt(textoInput.length - 1) == '.')   //Verificando se o último caractere digitado é um algaritmo
                textoInput += $(botao).text();
        }
        else
            textoInput += $(botao).text();

        $(".corpo-calculadora").find(".input-tela").removeClass("result");
    }
    else if($(botao).hasClass("btn-operacao")){
        if(charOperacoes.indexOf(textoInput.charAt(textoInput.length - 1)) > -1)   //Verificando se o último caractere digitado é uma operação
            alerta("Operações em sequência não são permitidas", tiposAlerta.alerta);
        else if(textoInput.length == 0)
            alerta("Não foi informado nenhum número", tiposAlerta.alerta);
        else
            textoInput += $(botao).text();
        
        $(".corpo-calculadora").find(".input-tela").removeClass("result");
    }
    else if($(botao).hasClass("btn-backspace")){
        textoInput = tratarResult(textoInput);
        if(textoInput.charAt(textoInput.length - 1) == '.' && textoInput.charAt(textoInput.length - 2) == '0')
            textoInput = textoInput.length > 0 ? textoInput.substring(0, textoInput.length-2) : textoInput;
        else
            textoInput = textoInput.length > 0 ? textoInput.substring(0, textoInput.length-1) : textoInput;

        $(".corpo-calculadora").find(".input-tela").removeClass("result");
    }
    else if($(botao).hasClass("btn-limpar")){
        textoInput = "";
        $(".corpo-calculadora").find(".input-tela").removeClass("result");
    }
    else if($(botao).hasClass("btn-limpar-registro")){
        let copiaTexto = textoInput;
        for(let i=copiaTexto.length-1; i>=0; i--){
            if(charOperacoes.indexOf(copiaTexto.charAt(i)) == -1)
                textoInput = textoInput.substring(0, textoInput.length-1);
            else
                break;
        }
        $(".corpo-calculadora").find(".input-tela").removeClass("result");
    }
    else if($(botao).hasClass("btn-virgula")){
        textoInput = tratarResult(textoInput);
        let numero = textoInput;
        for(let i=textoInput.length-1; i>=0; i--){
            if(charOperacoes.indexOf(textoInput.charAt(i)) > -1 || i==0){
                numero = textoInput.substring(i, textoInput.length);
                break;
            }
        }
        if(numero.indexOf(".") > -1)  //Verificando se já existe uma vírgula no número
            alerta("Já existe um ponto decimal neste número", tiposAlerta.alerta);
        else{
            if(charNumeros.indexOf(numero.charAt(numero.length - 1)) > -1)
                textoInput += $(botao).text();
            else
                textoInput += "0" + $(botao).text();
        }
        $(".corpo-calculadora").find(".input-tela").removeClass("result");
    }
    else if($(botao).hasClass("btn-igual")){
        textoInput = calcular(textoInput);
    }

    return textoInput;
}

function calcular(expressao){
    let resultado = expressao;

    if(expressaoValida(expressao)){
        if(charOperacoes.indexOf(expressao.charAt(expressao.length - 1)) > -1)
            alerta("A expressão está incompleta", tiposAlerta.danger);
        else{
            resultado = eval(expressao.replace("x", "*"));
            if(resultado.toString().indexOf(".") > -1)
                resultado = resultado.toFixed(5);
            $(".corpo-calculadora").find(".input-tela").addClass("result");
        }
    }
    else{
        alerta("Você digitou uma expressão inválida", tiposAlerta.danger);
        resultado = "";
    }

    return resultado;
}

function tratarResult(txt){
    let textoInput = txt;
    if($(".corpo-calculadora").find(".input-tela").hasClass("result"))
        textoInput = "";
    return textoInput;
}