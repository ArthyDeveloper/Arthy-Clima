const appid = "9de5479e832a3da8e41042bd83940666"
var cidadedigitada;
var paislockado;
const Logo = document.querySelector(".Logo")
const CidadeNome = document.querySelector(".CidadeNome");
const TemperaturaNome = document.querySelector(".Temperatura");
const TemperaturaMinMaxNome = document.querySelector(".TemperaturaMinMax");
const UmidadeNome = document.querySelector(".Umidade");

Logo.addEventListener('click', function(){
    window.open("https://arthydeveloper.vercel.app");
})
function pesquisar(){
    cidadedigitada = document.querySelector('.CaixaDePesquisa').value;
    paislockado = document.querySelector('.Seletor').value

    if(cidadedigitada == "" && paislockado == "Países"){
        CidadeNome.innerHTML = "Insira a cidade e o país"
    }
    if(cidadedigitada !== "" && paislockado == "Países"){
        CidadeNome.innerHTML = "Insira o país"
    }
    if(cidadedigitada == "" && paislockado !== "Países"){
        CidadeNome.innerHTML = "Insira a cidade"
    }
    if(cidadedigitada !== "" && paislockado !== "Países"){
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cidadedigitada + "," + paislockado + "&format=json&appid=" + appid + "&mode=json&units=metric&cnt=1")
        .then(function (Resposta){
            return Resposta.json();
        })
        .then(function (ContatarResultados){
            if(ContatarResultados.message == "city not found"){
                CidadeNome.innerHTML = "Cidade não encontrada"
                TemperaturaNome.innerHTML = ""
                TemperaturaMinMaxNome.innerHTML = ""
                UmidadeNome.innerHTML = ""
                return
            }else{
                var cidade = (ContatarResultados.name);
                var temperatura = Math.round(ContatarResultados.main.temp)
                var temperaturamin = Math.round(ContatarResultados.main.temp_min)
                var temperaturamax = Math.round(ContatarResultados.main.temp_max)
                var umidade = (ContatarResultados.main.humidity)
                CidadeNome.innerHTML = cidade
                TemperaturaNome.innerHTML = temperatura + "C°"
                TemperaturaMinMaxNome.innerHTML = "Max: " + temperaturamax + "C° | Min: " + temperaturamin + "C°"
                UmidadeNome.innerHTML = "Umidade: " + umidade + "%";
            }
        })
    }
}

//#region GeoLocation
var opcoeslocal = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 5000
};
var latitude;
var longitude;
if(window.navigator.geolocation){
    navigator.geolocation.getCurrentPosition(posicao, erro, opcoeslocal)
} 
function erro(motivo){
    if(motivo.code === motivo.PERMISSION_DENIED){
        CidadeNome.innerHTML = "Localização negada, use o campo de busca.";
    }
}
function posicao(pos){
    longitude = pos.coords.longitude;
    latitude = pos.coords.latitude;
    fetch("https://api.openweathermap.org/data/2.5/?lat=" + latitude + "&lon=" + longitude + "&format=json&appid=" + appid + "&lang=PT_BR&mode=json&units=metric&cnt=1")
    .then(function (Resposta) {
        return Resposta.json();
    })
    .then(function (ContatarResultados) {
        if(ContatarResultados.message == "Invalid API key. Please see http://openweathermap.org/faq#error401 for more info."){
            location.reload();
        }
        var cidade = (ContatarResultados.name);
        var temperatura = Math.round(ContatarResultados.main.temp)
        var temperaturamin = Math.round(ContatarResultados.main.temp_min)
        var temperaturamax = Math.round(ContatarResultados.main.temp_max)
        var umidade = (ContatarResultados.main.humidity)
        CidadeNome.innerHTML = cidade
        TemperaturaNome.innerHTML = temperatura + "C°"
        TemperaturaMinMaxNome.innerHTML = "Max: " + temperaturamax + "C° | Min: " + temperaturamin + "C°"
        UmidadeNome.innerHTML = "Umidade: " + umidade + "%";
    })
}
//#endregion