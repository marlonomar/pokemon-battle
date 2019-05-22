"use strict";

$(document).ready(function () {
  var battle = function battle() {
    $("button").on('click', function () {
      var player1 = JSON.parse(localStorage.getItem('player-1'));
      var player2 = JSON.parse(localStorage.getItem('player-2'));
      var caja = $(".comentarios");
      caja.css({
        "display": "block"
      });

      function batalla(player1, player2) {
        var dano;
        var hp;
        /**--------funciones para el juego------------- */

        var ataque = function ataque(defensor, atacante) {
          if (atacante.ataque < defensor.defensa) {
            dano = -1;
          } else {
            dano = parseInt(defensor.defensa) - parseInt(atacante.ataque);
          }

          return parseInt(dano) * parseInt(-1);
        };

        var ataque_especial = function ataque_especial(defensor, atacante) {
          if (atacante.ataque_especial < defensor.defensa_especial) {
            dano = -1;
          } else {
            dano = parseInt(defensor.defensa_especial) - parseInt(atacante.ataque_especial);
          }

          return parseInt(dano) * parseInt(-1);
        };

        var impacto = function impacto(vida, ataque) {
          return parseInt(vida.hp) - parseInt(ataque);
        };

        var bajar_ps = function bajar_ps(player, defensor) {
          var ps = dano / defensor.hp * 100;
          var vida = 100 - ps;
          console.log(ps);
          $("body > div > div.".concat(player, " > div.carta > div > div.vida > div")).css({
            "width": "".concat(vida, "%")
          });

          if (vida > 20 && vida <= 50) {
            $("body > div > div.".concat(player, " > div.carta > div > div.vida > div")).css({
              "background": "yellow"
            });
          }

          if (vida <= 20) {
            $("body > div > div.".concat(player, " > div.carta > div > div.vida > div")).css({
              "background": "red"
            });
          }
        };

        var botonAtacar = function botonAtacar(player) {
          $(".".concat(player, "  div.carta > div > div.stats")).append("<button class='btn btn-danger' id='atacar'>Atacar</button>");
        };
        /** ----ataque fisico o ataque especial---*/


        function combate(atacante, defensor, player, especialidad) {
          hp = impacto(defensor, dano);
          var tipoAtacante = especialidad;

          if (hp < 0) {
            hp = 0;
          }

          setTimeout(function () {
            caja.empty();

            if (tipoAtacante == ataque) {
              caja.append("".concat(atacante.nombre, " ataca con una potencia de ").concat(atacante.ataque));
            } else {
              caja.append("".concat(atacante.nombre, " ataca con una potencia de ").concat(atacante.ataque_especial));
            }
          }, 5000);
          setTimeout(function () {
            caja.empty();
            caja.append("".concat(defensor.nombre, " recibio un dano de ").concat(dano, " en sus puntos de vida"));
            bajar_ps(player, defensor);
          }, 10000);
          setTimeout(function () {
            hp;
            caja.empty();
            caja.append("los puntos de vida de ".concat(defensor.nombre, " bajaron a ").concat(hp));
            $("body > div > div.".concat(player, " > div.carta > div > div.stats > ul > li:nth-child(6)")).text("hp:".concat(hp));
          }, 15000);
          setTimeout(function () {
            hp;

            if (hp <= 0) {
              caja.empty();
              $("body > div > div.".concat(player, " > div.carta > div > div.ambiente > img")).fadeOut(2000);
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
              combate(player1, player2, 'player-2', ataque);
            });
          } else {
            botonAtacar('player-1');
            $("#atacar").click(function () {
              caja.append("el combate comienza entre ".concat(player1.nombre, " contra ").concat(player2.nombre));
              dano = ataque_especial(player2, player1);
              combate(player1, player2, 'player-2', ataque_especial);
            });
          }
        } else {
          if (player2.ataque >= player2.ataque_especial) {
            botonAtacar('player-2');
            $("#atacar").click(function () {
              caja.append("el combate comienza entre ".concat(player1.nombre, " contra ").concat(player2.nombre));
              dano = ataque(player1, player2);
              combate(player2, player1, 'player-1', ataque);
            });
          } else {
            botonAtacar('player-2');
            $("#atacar").click(function () {
              caja.append("el combate comienza entre ".concat(player1.nombre, " contra ").concat(player2.nombre));
              dano = ataque_especial(player1, player2);
              combate(player2, player1, 'player-1', ataque_especial);
            });
          }
        }
      }

      batalla(player1, player2);
    });
  };

  battle();
});