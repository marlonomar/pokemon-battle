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
            
            let tipos = [
     
      {
            "tipo":"fairy",
            "efectividad":{
                  "efectivo":["fighting","dragon","dark"],
                  "ineficas":["poison","steel"],
                  "inmune":[]
            }
      },
      {
            "tipo":"steel",
            "efectividad":{
                  "efectivo":["ice","rock","fairy"],
                  "ineficas":["fire","fighting","ground"],
                  "inmune":[] 
            }
      },
      {
            "tipo":"dark",
            "efectividad":{
                  "efectivo":["psychic","ghost"],
                  "ineficas":["fighting","bug","fairy"],
                  "inmune":[]
            }
      },
      {
            "tipo":"dragon",
            "efectividad":{
                  "efectivo":["dragon"],
                  "ineficas":["ice","fairy"],
                  "inmune":["fairy"]
            }
      },
      {
            "tipo":"ghost",
            "efectividad":{
                  "efectivo":["ghost","psychic"],
                  "ineficas":["dark"],
                  "inmune":["fighting","normal"]
            }
      },
      {
            "tipo":"rock",
            "efectividad":{
                  "efectivo":["fire","ice","flying","bug"],
                  "ineficas":["water","grass","fighting","ground","steel"],
                  "inmune":[]
            }
      },
      {
            "tipo":"bug",
            "efectividad":{
                  "efectivo":["grass","psychic","dark"],
                  "ineficas":["fire","flying","rock"],
                  "inmune":[]
            }
      },
      {
            "tipo":"psychic",
            "efectividad":{
                  "efectivo":["fighting","poison"],
                  "ineficas":["bug","ghost","dark"],
                  "inmune":["dark"]
            }
      },
      {
            "tipo":"flying",
            "efectividad":{
                  "efectivo":["grass","fighting","bug"],
                  "ineficas":["electric","ice","rock"],
                  "inmune":[]
            }
      },
      {
            "tipo":"ground",
            "efectividad":{
                  "efectivo":["fire","electric","poison","rock","steel"],
                  "ineficas":["water","grass","ice"],
                  "inmune":["flying"]
            }
      },
      {
            "tipo":"poison",
            "efectividad":{
                  "efectivo":["grass","fairy"],
                  "ineficas":["ground","psychic"],
                  "inmune":["poison","steel"]
            }
      },
      {
            "tipo":"fighting",
            "efectividad":{
                  "efectivo":["normal","ice","rock","dark","steel"],
                  "ineficas":["flying","psychic","fairy"],
                  "inmune":["ghost"]
            }
      },
      {
            "tipo":"ice",
            "efectividad":{
                  "efectivo":["grass","ground","flying","dragon"],
                  "ineficas":["fire","fighting","rock","steel"],
                  "inmune":[]
            }
      },
      {
            "tipo":"grass",
            "efectividad":{
                  "efectivo":["water","ground","rock"],
                  "ineficas":["fire","ice","poison","flying","bug"],
                  "inmune":[]
            }
      },
      {
            "tipo":"electric",
            "efectividad":{
                  "efectivo":["water","flying"],
                  "ineficas":[],
                  "inmune":["ground"]
            }     
      },
      {
            "tipo":"water",
            "efectividad":{
                  "efectivo":["fire","ground","rock"],
                  "ineficas":["electric","grass"],
                  "inmune":[]
            }
  
      },
      {
            "tipo":"fire",
            "efectividad":{
                  "efectivo":["grass","ice","bug","steel"],
                  "ineficas":["water","ground","rock"],
                  "inmune":[]
            }
      },
      {
            "tipo":"normal",
            "efectividad":{
                  "efectivo":[],
                  "ineficas":["fighting"],
                  "inmune":["ghost"]
            }
      }
  ]
  
            const efetividadTipos =(ataca,defiende)=>{

      function getType (tipo){
        
          return tipos.find(search=> search.tipo == tipo)
        }
        
      function efectividad (atacante,defensor){
        
        if( atacante.efectividad.efectivo.find(search=> search == defensor.tipo)){
              return "efectivo" 
          }
          
        if( atacante.efectividad.inmune.find(search=> search == defensor.tipo)){
            return "inmune"
        }
        
        if( atacante.efectividad.ineficas.find(search=> search == defensor.tipo)){
            return "ineficas"
        }
        else{
            return "neutral" 
        } 
        }
      
      let type = getType(ataca.tipo)
        
      let efetividad_ataque = efectividad(type,defiende)
      
      return efetividad_ataque
                
            }
      
            const ataque =(defensor,atacante)=>{
                   let efectividad = efetividadTipos(atacante,defensor)
                      
                        switch (efectividad) {
                              case "efectivo":
                                    dano = (parseInt(defensor.defensa) - parseInt(atacante.ataque * 1.5));
                                    break;
                              case "ineficas":
                                    dano = (parseInt(defensor.defensa) - parseInt(atacante.ataque / 1.2));
                                    break;
                              case "neutral":
                                    dano = (parseInt(defensor.defensa) - parseInt(atacante.ataque));
                                    break;
                              case "inmune":
                                    dano = 0;
                                    break;
                        
                              default:
                                    break;
                        }
                        console.log(dano)
                        return (parseInt(dano) * parseInt(-1));
                    
            }
            
            const ataque_especial =(defensor,atacante)=>{
                 let efectividad = efetividadTipos(atacante,defensor)
                  switch (efectividad) {
                        case "efectivo":
                              dano = (parseInt(defensor.defensa_especial) - parseInt(atacante.ataque_especial * 1.5));
                              break;
                        case "ineficas":
                              dano = (parseInt(defensor.defensa_especial) - parseInt(atacante.ataque_especial / 1.2));
                              break;
                        case "neutral":
                              dano = (parseInt(defensor.defensa_especial) - parseInt(atacante.ataque_especial));
                              break;
                        case "inmune":
                              dano = 0;
                              break;
                  
                        default:
                              break;
                  }
                  console.log(dano)
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
                let efectividad = efetividadTipos(atacante,defensor)
                var potencia;
                console.log(tipoAtacante)
                switch (efectividad) {
                  case "efectivo":
                        potencia_especial = parseInt(atacante.ataque_especial * 1.5);
                        break;
                  case "ineficas":
                        potencia_especial =parseInt(atacante.ataque_especial / 1.2);
                        break;
                  case "neutral":
                        potencia_especial =parseInt(atacante.ataque_especial);
                        break;
                  case "inmune":
                        potencia_especial = 0;
                        break;
            
                  default:
                        break;
                  }

                  switch (efectividad) {
                        case "efectivo":
                              potencia = parseInt(atacante.ataque * 1.5);
                              break;
                        case "ineficas":
                              potencia =parseInt(atacante.ataque / 1.2);
                              break;
                        case "neutral":
                              potencia =parseInt(atacante.ataque);
                              break;
                        case "inmune":
                              potencia = 0;
                              break;
                  
                        default:
                              break;
                        }

                if(hp < 0){
                    hp=0;
                }
              
                setTimeout(() => {
                    caja.empty();
                    if(tipoAtacante == ataque){
                        caja.append(`${atacante.nombre} ataca con una potencia de ${potencia} es un ataque ${efectividad}`);
                    }else{
                        caja.append(`${atacante.nombre} ataca con una potencia de ${potencia_especial} es un ataque ${efectividad}`);
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