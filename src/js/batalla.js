$(document).ready(function(){
    const battle = ()=>{
        

        $("button").on('click',function(){
            let fondo = $("body");
            fondo.css({"background":'url("./images/fondoBatalla.png")'})
            fondo.css({"background-size":"cover"})
            const player1 = JSON.parse(localStorage.getItem('player-1'));
            const player2 = JSON.parse(localStorage.getItem('player-2'));

            const caja = $(".comentarios");
            
        
           function batalla(player1,player2){
            var dano
            var hp
           /**--------funciones para el juego------------- */
            const ataque =(defensor,atacante)=>{
                    if(atacante.ataque < defensor.defensa){
                        dano = -1;
                    }else{
                        dano = (parseInt(defensor.defensa) - parseInt(atacante.ataque));
                    }
                        return (parseInt(dano) * parseInt(-1));
                    
            }
            
            const ataque_especial =(defensor,atacante)=>{
                if(atacante.ataque_especial < defensor.defensa_especial){
                    dano = -1;
                }else{
                    dano = (parseInt(defensor.defensa_especial) - parseInt(atacante.ataque_especial));
                }
                    return (parseInt(dano) * parseInt(-1));
                
            }
            
            const impacto=(vida,ataque)=>{
                
                return (parseInt(vida.hp) - parseInt(ataque));
            }

            const bajar_ps=(player,defensor)=>{
                let ps = (dano /defensor.hp ) * 100 ;
                let vida = 100 - ps;
                console.log(ps)
                $(`body > div > div.${player} > div.carta > div > div.vida > div`).css({"width":`${vida}%`});
                if( vida > 20 && vida <= 50){
                    $(`body > div > div.${player} > div.carta > div > div.vida > div`).css({"background":"yellow"});
                }
                if(  vida <= 20){
                    $(`body > div > div.${player} > div.carta > div > div.vida > div`).css({"background":"red"});
                }
            }

            const botonAtacar =(player)=>{
                $(`.${player}  div.carta > div > div.stats`).append("<button class='btn btn-danger' id='atacar'>Atacar</button>")
            }
            /** ----ataque fisico o ataque especial---*/

            function combate (atacante,defensor,player,especialidad){
                caja.css({"display":"block"});
                hp = impacto(defensor,dano);
                var tipoAtacante = especialidad;
                if(hp < 0){
                    hp=0;
                }
              
                setTimeout(() => {
                    caja.empty();
                    if(tipoAtacante == ataque){
                        caja.append(`${atacante.nombre} ataca con una potencia de ${atacante.ataque}`);
                    }else{
                        caja.append(`${atacante.nombre} ataca con una potencia de ${atacante.ataque_especial}`);
                    }
                },5000);
              
                setTimeout(() => {
                    caja.empty();
                    caja.append(`${defensor.nombre} recibio un dano de ${dano} en sus puntos de vida`);
                    bajar_ps(player,defensor)
                },10000);
              
                setTimeout(() => {
                    hp
                    caja.empty();
                    caja.append(`los puntos de vida de ${defensor.nombre} bajaron a ${hp}`);
                    $(`body > div > div.${player} > div.carta > div > div.stats > ul > li:nth-child(6)`).text(`hp:${hp}`)
                    
                },15000);
                
                setTimeout(() => {
                    hp
                    if(hp <= 0){
                    caja.empty();
                    $(`body > div > div.${player} > div.carta > div > div.ambiente > img`).fadeOut(2000);
                    caja.append(`${atacante.nombre} a ganado!!!`);
                    localStorage.clear();
                }
                }, 20000);
              }
          
            /** ----condiciones del combate---*/

            if(player1.velocidad > player2.velocidad){

                if(player1.ataque >= player1.ataque_especial){
                         botonAtacar('player-1');
                         $("#atacar").click(function(){
                         caja.append(`el combate comienza entre ${player1.nombre} contra ${player2.nombre}`);
                         dano = (ataque(player2,player1));
                         combate(player1,player2,'player-2',ataque);
                    })
                    
                }
                else{
                        botonAtacar('player-1');
                        $("#atacar").click(function(){
                        caja.append(`el combate comienza entre ${player1.nombre} contra ${player2.nombre}`);
                        dano = (ataque_especial(player2,player1));
                        combate(player1,player2,'player-2',ataque_especial);
                    })
                    
                }
              }
                else{
              
                if(player2.ataque >= player2.ataque_especial){
                        botonAtacar('player-2');
                        $("#atacar").click(function(){
                        caja.append(`el combate comienza entre ${player1.nombre} contra ${player2.nombre}`);
                        dano = (ataque(player1,player2));
                        combate(player2,player1,'player-1',ataque);
                    })
                    
                }
                else{
                        botonAtacar('player-2');
                        $("#atacar").click(function(){
                        caja.append(`el combate comienza entre ${player1.nombre} contra ${player2.nombre}`);
                        dano = (ataque_especial(player1,player2));
                        combate(player2,player1,'player-1',ataque_especial);
                })
                }
              }
           }
           batalla(player1,player2);
            
        })
    }
    battle()
})