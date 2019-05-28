
/**
 *  objetivo: insertar datos en la carta usando los datos suministrados por una 
 * API 
 */
    $(document).ready(function(){
        let jugadores =(jugador)=>{
            
            function limpiarCarta(player){
                   $(`body > div > div.${player} > div.carta > div > h1`).empty()
                   $(`body > div > div.${player} > div.carta > div > div:nth-child(1)`).empty()
                   $(`body > div > div.${player} > div.carta > div > div.ambiente`).empty()
                   $(`body > div > div.${player} > div.carta > div > div.tipos`).empty();
                   $(`body > div > div.${player} > div.carta > div > div.stats > ul`).empty();
            }
            const click=(player)=>{
                $(`.${player} div.pokeball`).on('click',function(){
                    limpiarCarta(player)
                    let text = $(`#${player}`).val();
                    let nombre = text.toLowerCase();
                    call_ajax(nombre,pokemons);
                  
                });
            }
            
            click(jugador);
            
            const pokemons = (pokemon)=>{ 

                function player (player){
                    const carta =  $(`.${player} > .carta > .fondo`);
                    const ambiente = $(`.${player} > .carta > .fondo > .ambiente`);
                    const tipos = $(`.${player} > .carta > .fondo > .tipos`);
                    carta.prepend("<h1>"+pokemon.name+"</h1>");
                    carta.prepend("<div  style='display:inline'><div class='vida'><div><p>vida</p></div></div></div>")
                    ambiente.append("<img src='./images/sprites/"+pokemon.name+".gif' class='sprite'>");
                    localStorage.setItem('tipo',JSON.stringify(pokemon.types[0].type.name));
                    
                    pokemon.types.map(function(poke){
                        tipos.prepend("<img src='./images/tipos/"+poke.type.name+".PNG' class='tipo'>");
                        
                    });
                    
                    pokemon.stats.map(function(estadistica){
                        $(`.${player} > .carta > .fondo ul`).append("<li>"+estadistica.stat.name+" : "+estadistica.base_stat+"</li>");       
                    });
                
                }

                let estadisticaPokemon = {

                    nombre:pokemon.name,
                    velocidad : pokemon.stats[0].base_stat,
                    defensa_especial : pokemon.stats[1].base_stat,
                    ataque_especial : pokemon.stats[2].base_stat,
                    defensa : pokemon.stats[3].base_stat,
                    ataque : pokemon.stats[4].base_stat,
                    hp : pokemon.stats[5].base_stat,
                    tipo: pokemon.types[0].type.name
                    
                }

                localStorage.setItem(`${jugador}`,JSON.stringify(estadisticaPokemon));
                player(jugador);
                cambiar_fondo(jugador);
            }
            
            const call_ajax =(nombre,callback) =>{

                $.ajax({
                    url:"https://pokeapi.co/api/v2/pokemon/"+nombre+"/",
                    data:"GET",
                    dataType:"JSON",
                    success:function(datos){
                        callback(datos)            
                            }
                });

            }
            
            const cambiar_fondo=(player)=>{

                const Storage =localStorage.getItem('tipo');
                const tipo = JSON.parse(Storage);

                $(`.${player} > .carta > .fondo`).css({"background":"url(./images/fondos/"+tipo+".PNG)"});
                $(`.${player} > .carta > .fondo > .ambiente`).css({"background":"url(./images/ambiente/"+tipo+".jpg)","background-size":"cover"});
                
            }
        }

        jugadores("player-1");
        jugadores("player-2");
        
    })
/**
 * final del documento
 */