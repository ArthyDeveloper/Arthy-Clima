// Por favor, não use minha chave da API do OpenWeather, se você for no site deles poderá criar uma chave só sua para criar seus projetos da mesma forma que eu!
console.log("Sim, o GeoLocation não está funcionando e eu não tenho idéia de como fazê-lo funcionar. Obrigado pela visita e sinta-se a vontade para se inspirar em meu código.")
const appid = "9de5479e832a3da8e41042bd83940666"
var cidadedigitada;
var paislockado;
const Background = document.querySelector(".Container1")
const Logo = document.querySelector(".Logo")
const CidadeNome = document.querySelector(".CidadeNome");
const CondiçãoClima = document.querySelector(".CondiçãoClima");
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
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cidadedigitada + "," + paislockado + "&format=json&lang=PT_BR&appid=" + appid + "&mode=json&units=metric&cnt=1")
        .then(function (Resposta){
            return Resposta.json();
        })
        .then(function (ContatarResultados){
            if(ContatarResultados.message == "city not found"){
                CidadeNome.innerHTML = "Cidade não encontrada"
                CondiçãoClima.innerHTML = ""
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
                var condicao = (ContatarResultados.weather[0].description)
                console.log(condicao)
                
                // Condições temporais a partir daqui
                if (condicao == "chuva leve"){
                    CondiçãoClima.innerHTML = "Chuva Leve";
                    Background.style.backgroundImage = "url(https://source.unsplash.com/1920x1080/?rain)";
                }
                if (condicao == "chuva"){
                    CondiçãoClima.innerHTML = "Chuva"
                    Background.style.backgroundImage = "url(https://source.unsplash.com/1920x1080/?rain)";
                }
                if (condicao == "chuvoso"){
                    CondiçãoClima.innerHTML = "Chuvoso"
                    Background.style.backgroundImage = "url(https://source.unsplash.com/1920x1080/?thunder,rain)";
                }
                if (condicao == "temporal"){
                    CondiçãoClima.innerHTML = "Temporal"
                    Background.style.backgroundImage = "url(https://source.unsplash.com/1920x1080/?rain,cloudy)";
                }
                if (condicao == "garoa"){
                    CondiçãoClima.innerHTML = "Garoa"
                    Background.style.backgroundImage = "url(https://source.unsplash.com/1920x1080/?foggy)";
                }
                if (condicao == "nuvens"){
                    CondiçãoClima.innerHTML = "Algumas nuvens"
                    Background.style.backgroundImage = "url(https://source.unsplash.com/1920x1080/?clouds,sunrise)";
                }
                if (condicao == "nuvens dispersas"){
                    CondiçãoClima.innerHTML = "Nuvens dispersas"
                    Background.style.backgroundImage = "url(https://source.unsplash.com/1920x1080/?clouds)";
                }
                if (condicao == "parcialmente nublado"){
                    CondiçãoClima.innerHTML = "Parcialmente nublado"
                    Background.style.backgroundImage = "url(https://source.unsplash.com/1920x1080/?cloudy)";
                }
                if (condicao == "nublado"){
                    CondiçãoClima.innerHTML = "Nublado"
                    Background.style.backgroundImage = "url(https://source.unsplash.com/1920x1080/?cloudy)";
                }
                
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
        CidadeNome.innerHTML = "Insira a cidade e o país";
    }
}
function posicao(pos){
    longitude = pos.coords.longitude;
    latitude = pos.coords.latitude;
    fetch("https://api.openweathermap.org/data/2.5/?lat=" + latitude + "&lon=" + longitude + "&format=json&lang=PT_BR&appid=" + appid + "&lang=PT_BR&mode=json&units=metric&cnt=1")
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