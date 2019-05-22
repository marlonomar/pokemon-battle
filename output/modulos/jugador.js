"use strict";

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
  /**--------------------LOGICA DEL COMBATE------------------------ */


  jugadores("player-1");
  jugadores("player-2");

  var battle = function battle() {
    $("button").on('click', function () {
      var player1 = JSON.parse(localStorage.getItem('player-1'));
      var player2 = JSON.parse(localStorage.getItem('player-2'));
      var caja = $(".comentarios");
      caja.css({
        "display": "block"
      });

      function batalla(player1, player2) {
        /**--------funciones para el juego------------- */
        ataque = function ataque(defensor, atacante) {
          var dano = parseInt(defensor.defensa) - parseInt(atacante.ataque);
          return parseInt(dano) * parseInt(-1);
        };

        ataque_especial = function ataque_especial(defensor, atacante) {
          var dano = parseInt(defensor.defensa_especial) - parseInt(atacante.ataque_especial);
          return parseInt(dano) * parseInt(-1);
        };

        impacto = function impacto(vida, ataque) {
          return parseInt(vida.hp) - parseInt(ataque);
        };

        bajar_ps = function bajar_ps(player) {
          $("body > div > div.".concat(player, " > div.carta > div > div.vida > div")).css({
            "width": "".concat(100 - dano, "%")
          });

          if (dano >= 50) {
            $("body > div > div.".concat(player, " > div.carta > div > div.vida > div")).css({
              "background": "yellow"
            });
          }

          if (dano > 80) {
            $("body > div > div.".concat(player, " > div.carta > div > div.vida > div")).css({
              "background": "red"
            });
          }
        };

        botonAtacar = function botonAtacar(player) {
          $(".".concat(player, "  div.carta > div > div.stats")).append("<button class='btn btn-danger' id='atacar'>Atacar</button>");
        };
        /** ----ataque fisico o ataque especial---*/


        function combate_fisico(atacante, defensor, player) {
          setTimeout(function () {
            caja.empty();
            caja.append("".concat(atacante.nombre, " ataca con una potencia de ").concat(atacante.ataque));
          }, 5000);
          setTimeout(function () {
            caja.empty();
            caja.append("".concat(defensor.nombre, " recibio un dano de ").concat(dano, " en sus puntos de vida"));
            bajar_ps(player);
          }, 10000);
          setTimeout(function () {
            hp = impacto(defensor, dano);
            caja.empty();
            caja.append("los puntos de vida de ".concat(defensor.nombre, " bajaron a ").concat(hp));
          }, 15000);
          setTimeout(function () {
            hp = impacto(defensor, dano);

            if (hp <= 0) {
              caja.empty();
              $("body > div > div.".concat(player, " > div.carta > div > div.ambiente > img")).fadeOut(2000);
              caja.append("".concat(atacante.nombre, " a ganado!!!"));
              localStorage.clear();
            }
          }, 20000);
        }

        function combate_especial(atacante, defensor, player) {
          setTimeout(function () {
            caja.empty();
            caja.append("".concat(atacante.nombre, " ataca con una potencia de ").concat(atacante.ataque_especial));
          }, 5000);
          setTimeout(function () {
            caja.empty();
            caja.append("".concat(defensor.nombre, " recibio un dano de ").concat(dano, " en sus puntos de vida"));
            bajar_ps(player);
          }, 10000);
          setTimeout(function () {
            hp = impacto(defensor, dano);
            caja.empty();
            caja.append("los puntos de vida de ".concat(defensor.nombre, " bajaron a ").concat(hp));
          }, 15000);
          setTimeout(function () {
            hp = impacto(defensor, dano);

            if (hp <= 0) {
              caja.empty();
              $("body > div > div.".concat(player, " > div.carta > div > div.ambiente > img")).fadeOut(1500);
              caja.append("".concat(atacante.nombre, " a ganado!!!"));
              localStorage.clear();
            }
          }, 20000);
        }
        /** ----condiciones del combate---*/


        if (player1.velocidad > player2.velocidad) {
          if (player1.ataque >= player1.ataque_especial) {
            botonAtacar('player-1');
            $("#atacar").click(function () {
              caja.append("el combate comienza entre ".concat(player1.nombre, " contra ").concat(player2.nombre));
              dano = ataque(player2, player1);
              combate_fisico(player1, player2, 'player-2');
            });
          } else {
            botonAtacar('player-1');
            $("#atacar").click(function () {
              caja.append("el combate comienza entre ".concat(player1.nombre, " contra ").concat(player2.nombre));
              dano = ataque_especial(player2, player1);
              combate_especial(player1, player2, 'player-2');
            });
          }
        } else {
          if (player2.ataque >= player2.ataque_especial) {
            botonAtacar('player-2');
            $("#atacar").click(function () {
              caja.append("el combate comienza entre ".concat(player1.nombre, " contra ").concat(player2.nombre));
              dano = ataque(player1, player2);
              combate_fisico(player2, player1, 'player-1');
            });
          } else {
            botonAtacar('player-2');
            $("#atacar").click(function () {
              caja.append("el combate comienza entre ".concat(player1.nombre, " contra ").concat(player2.nombre));
              dano = ataque_especial(player1, player2);
              combate_especial(player2, player1, 'player-1');
            });
          }
        }
      }

      batalla(player1, player2);
    });
  };

  battle();
});