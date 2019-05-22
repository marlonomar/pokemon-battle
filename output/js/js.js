"use strict";

/**
 *  objetivo: insertar datos en la carta usando los datos suministrados por una 
 * API 
 */
$(document).ready(function () {
  var jugadores = function jugadores(jugador) {
    var click = function click(player) {
      $(".".concat(player, " div.pokeball")).on('click', function () {
        var nombre = $("#".concat(player)).val();
        call_ajax(nombre, pokemons);
      });
    };

    click(jugador);

    var pokemons = function pokemons(pokemon) {
      function player(player) {
        var carta = $(".".concat(player, " > .carta > .fondo"));
        var ambiente = $(".".concat(player, " > .carta > .fondo > .ambiente"));
        var tipos = $(".".concat(player, " > .carta > .fondo > .tipos"));
        carta.prepend("<h1>" + pokemon.name + "</h1>");
        carta.prepend("<div class='vida'><div><p>vida</p></div></div>");
        ambiente.append("<img src='./images/sprites/" + pokemon.name + ".gif' class='sprite'>");
        pokemon.types.map(function (poke) {
          carta.append("<p class='elementos' style='display:none'>" + poke.type.name + "<p>");
          tipos.prepend("<img src='./images/tipos/" + poke.type.name + ".PNG' class='tipo'>");
          $("img.tipo ").eq(0).addClass('tipo_secundario');
          $(".elementos").eq(0).hide();
          localStorage.setItem('tipo', JSON.stringify(poke.type.name));
        });
        pokemon.stats.map(function (estadistica) {
          $(".".concat(player, " > .carta > .fondo ul")).append("<li>" + estadistica.stat.name + " : " + estadistica.base_stat + "</li>");
        });
      }

      var estadisticaPokemon = {
        nombre: pokemon.name,
        velocidad: pokemon.stats[0].base_stat,
        defensa_especial: pokemon.stats[1].base_stat,
        ataque_especial: pokemon.stats[2].base_stat,
        defensa: pokemon.stats[3].base_stat,
        ataque: pokemon.stats[4].base_stat,
        hp: pokemon.stats[5].base_stat
      };
      localStorage.setItem("".concat(jugador), JSON.stringify(estadisticaPokemon));
      player(jugador);
      cambiar_fondo(jugador);
    };

    var call_ajax = function call_ajax(nombre, callback) {
      $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/" + nombre + "/",
        data: "GET",
        dataType: "JSON",
        success: function success(datos) {
          callback(datos);
        }
      });
    };

    var cambiar_fondo = function cambiar_fondo(player) {
      var Storage = localStorage.getItem('tipo');
      var tipo = JSON.parse(Storage);
      $(".".concat(player, " > .carta > .fondo")).css({
        "background": "url(./images/fondos/" + tipo + ".PNG)"
      });
      $(".".concat(player, " > .carta > .fondo > .ambiente")).css({
        "background": "url(./images/ambiente/" + tipo + ".jpg)",
        "background-size": "cover"
      });
    };
  };

  jugadores("player-1");
  jugadores("player-2");
});
/**
 * final del documento
 */