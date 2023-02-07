const charOperacoes = ['+', '-', 'x', '/'];
const charNumeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const tiposAlerta = {
    alerta: "alert",
    danger: "danger"
};

function expressaoValida(expressao){
    let caracteresValidos = true;
    for(let i=0; i<expressao.length; i++){
        if(charOperacoes.indexOf(expressao[i]) == -1 && charNumeros.indexOf(expressao[i]) == -1 && expressao[i] != '.'){
            caracteresValidos = false;
            break;
        }
    }
    if(caracteresValidos)
        return true;

    return false;
}




function alerta(mensagem, tipo){
    let bgAlerta =  "";
    switch(tipo){
        case "danger":
            bgAlerta = "rgba(253, 105, 105, 0.3)";
            break;
        case "alert":
            bgAlerta = "rgba(241, 237, 107, 0.3)";
            break;
        default:
            bgAlerta = "#e7e7e7";
            break;
    }

    let copiaAlerta = $(".div-msg-alerta").find(".msg-alerta-principal").clone();
    $(".div-msg-alerta").append(copiaAlerta);
    $(copiaAlerta).find(".msg").text(mensagem);
    $(copiaAlerta).removeClass("msg-alerta-principal").addClass("msg-alerta-copia").css("background-color", bgAlerta).fadeIn(200);
    if($(".msg-alerta-copia").length > 1){
        $(".msg-alerta-copia:visible").first().hide();
    }
    setTimeout(function(){
        $(copiaAlerta).fadeOut(200);
        setTimeout(function(){
            $(copiaAlerta).remove();
        }, 500);
    }, 3000);
}