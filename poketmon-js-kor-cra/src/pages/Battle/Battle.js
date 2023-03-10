import React from "react";

const Battle = () => {

    $(document).ready(() => {
        // 3D angle
        $('.three-dee').click(() => {
            $('#pokemon').toggleClass('perspective')
            $('button').toggleClass('active')
            $('.depth').removeAttr('style')
        })
        const handleMouseMove = e => {
            const offset = $('#pokemon').offset()
            const width = $('#pokemon').width()
            const height = $('#pokemon').height()
            const posX = (100 - (((e.pageX - offset.left) / width * 100)) - 50) * 0.15
            const posY = (((e.pageY - offset.top) / height * 100) - 50) * 0.15
            const moving = `rotateX(${posY}deg) rotateY(${posX}deg)`
            $('.depth').css({'-webkit-transform': moving, '-moz-transform': moving, '-ms-transform': moving, '-o-transform': moving, 'transform': moving})
        }
        let enableHandler
        $('#pokemon').mousemove(function(e) {
            if ($(this).hasClass('perspective') && enableHandler) {
                handleMouseMove(e)
                enableHandler = false
            }
        })
        window.setInterval(() => {
            enableHandler = true
        }, 20)

        // Pokédex
        // const pokedex = (dex, level) => {
        //   $.ajax({
        //     'async': false,
        //     'global': false,
        //     'url': "js/pokemon.json",
        //     'dataType': "json",
        //     'success': function (data) {
        //         poke = data
        //     }
        //   })
        //   var stats = new Object()
        //       stats['id'] = poke[dex].id
        //       stats.name = poke[dex].name
        //       stats.hp  = Math.floor((poke[dex].stats.hp * 2 + 193) * level / 100 + 5)
        //       stats['atk'] = Math.floor(((poke[dex].stats.attack * 2 + 193) * level / 100 + 10) * level / 100 + 20)
        //       stats.def = Math.floor((poke[dex].stats.defense * 2 + 193) * level / 100 + 10)
        //       stats['spa'] = Math.floor(((poke[dex].stats.spattack * 2 + 193) * level / 100 + 10) * level / 100)
        //       stats['spd'] = Math.floor((poke[dex].stats.spdefense * 2 + 193) * level / 100 + 10)
        //       stats['spe'] = Math.floor((poke[dex].stats.speed * 2 + 193) * level / 100 + 10)
        //   return stats
        // }

        // Player setup
        const player = '레드'
        // var playerID = 25
        const playerLevel = 5
        const playerPokemon = {
            'name': '피카츄',
            'hp': 35,
            'atk': 70,
            'def': 30
        }
        const hpPlayerTotal = playerPokemon.hp
        let hpPlayer = hpPlayerTotal
        // var playerBaseAttack = playerPokemon.atk
        // var playerBaseDefense = playerPokemon.def
        $('.player .level').text(playerLevel)
        $('.player .hp').text(hpPlayerTotal)
        $('.player .hpTotal').text(hpPlayerTotal)
        $('.player .name').text(playerPokemon.name.toUpperCase())
        $('#move0').html('돌진')
        $('#move1').html('꼬리치기')
        $('#move2').html('-')

        // Foe setup
        const foe = '오바람'
        // var foeID = 133
        const foePokemon = {
            'name': '이브이',
            'hp': 40,
            'atk': 55,
            'def': 50
        }
        const hpFoeFull = foePokemon.hp
        let hpFoe = hpFoeFull
        // var foeBaseAttack = foePokemon.atk
        let foeBaseDefense = foePokemon.def
        $('.foe .level').text(playerLevel)
        $('.foe .name').text(foePokemon.name.toUpperCase())

        // Hide all menus except dialog
        const hider = () => {
            $('.window.menu').hide()
            $('.window.item').hide()
            $('.window.pkmn').hide()
            $('.window.fight').hide()
        }

        // Reset to battle ready mode for turn or cancel
        const reset = () => {
            $('.text1').text('')
            $('.text2').text('')
            $('.window.item').hide()
            $('.window.pkmn').hide()
            $('.window.fight').hide()
            $('.window.menu').show()
        }

        // Health bar width calculation and health numbers
        const healthbar = (current, total) => {
            const hpCurrent = current
            const hpTotal = total
            const percentTotal = 100
            const percentCurrent = hpCurrent * percentTotal / hpTotal
            return percentCurrent
        }

        // Enemy turn
        const attackEnd = () => {
            if (hpFoe <= 0) {
                $('.window.menu').hide()
                $('.foe .hp-bar-active').css('width', '0%')
                window.setTimeout( () => {
                    $('.foe .images').delay(500).animate({
                        bottom: '-35em'
                    }, 1000)
                    $('.text1').text(`${foePokemon.name.toUpperCase()} fainted!`)
                    $('.text2').text('')
                    typer()
                    window.setTimeout( () => {
                        $('.foe .stats').hide()
                        $('.text1').text(`Got $${Math.floor(playerLevel * 2.5)} for`)
                        $('.text2').text('winning!')
                        typer()
                        window.setTimeout( () => {
                            $('.text1').text(`${foe.toUpperCase()}: I can't`)
                            $('.text2').text('believe it!')
                            typer()
                            window.setTimeout( () => {
                                $('.text1').text('I chose the')
                                $('.text2').text('wrong POKéMON!')
                                typer()
                            }, 2000)
                        }, 2000)
                    }, 2000)
                }, 2000)
            } else {
                window.setTimeout( () => {
                    $('.text1').text(`${foePokemon.name.toUpperCase()}은 `)
                    $('.text2').text('돌진을 사용했다!')
                    typer()
                    $('.foe .images').animate({
                        right: '0em'
                    }, 100, 'linear').animate({
                        right: '1.8em'
                    }, 50, 'linear').delay(100).animate({
                        right: '0.8em'
                    }, 10, 'linear')
                    window.setTimeout( () => {
                        $('.player .images').css('opacity', 0)
                        window.setTimeout( () => {
                            $('.player .images').css('opacity', 1)
                            window.setTimeout( () => {
                                $('.player .images').css('opacity', 0)
                                window.setTimeout( () => {
                                    $('.player .images').css('opacity', 1)
                                    window.setTimeout( () => {
                                        $('.player .images').css('opacity', 0)
                                        window.setTimeout( () => {
                                            $('.player .images').css('opacity', 1)
                                            window.setTimeout( () => {
                                                const basePower = 40
                                                const baseDamage = Math.floor(Math.floor(Math.floor(2 * playerLevel / 5 + 2) * basePower * foePokemon.atk / playerPokemon.def) / 50) + 2
                                                hpPlayer -= baseDamage
                                                if (hpPlayer <= 0) {
                                                    $('.window.menu').hide()
                                                    $('.player .hp').text('0')
                                                    $('.player .hp-bar-active').css('width', '0%')
                                                    $('.player .stats').hide()
                                                    window.setTimeout( () => {
                                                        $('.player .images').delay(500).animate({
                                                            bottom: '-35.714em'
                                                        }, 1000)
                                                        $('.text1').text(`${playerPokemon.name.toUpperCase()} fainted...`)
                                                        $('.text2').text('')
                                                        typer()
                                                        window.setTimeout( () => {
                                                            $('.text1').text(`${player.toUpperCase()}은 더 이상`)
                                                            $('.text2').text('내보낼 포켓몬이 없다...')
                                                            typer()
                                                            window.setTimeout( () => {
                                                                $('.text1').text(`${player.toUpperCase()}는 눈앞이`)
                                                                $('.text2').text('')
                                                                typer()
                                                            }, 2000)
                                                        }, 2000)
                                                    }, 2000)
                                                } else {
                                                    $('.player .hp').text(hpPlayer)
                                                    $('.player .hp-bar-active').animate({
                                                        width: `${healthbar(hpPlayer, hpPlayerTotal)}%`
                                                    }, 500)
                                                    window.setTimeout( () => {
                                                        reset()
                                                    }, 2400)
                                                }
                                            }, 100)
                                        }, 100)
                                    }, 100)
                                }, 100)
                            }, 100)
                        }, 100)
                    }, 100)
                }, 2000)
            }
        }

        // Growl
        const growl = () => {
            hider()
            $('.text1').text(playerPokemon.name.toUpperCase())
            $('.text2').text('할퀴기를 사용했다!')
            typer()
            window.setTimeout( () => {
                if (foeBaseDefense < foePokemon.def - 20) {
                    $('.text1').text(`${foePokemon.name.toUpperCase()}의 방어력은`)
                    $('.text2').text('더 이상 떨어지지않는다')
                    typer()
                    window.setTimeout( () => {
                        attackEnd()
                    }, 2000)
                } else {
                    $('.text1').text(`${foePokemon.name.toUpperCase()}'의 방어력은`)
                    $('.text2').text('크게 떨어졌다!')
                    foeBaseDefense =- 2
                    typer()
                    window.setTimeout( () => {
                        attackEnd()
                    }, 2000)
                }
            }, 2000)
        }

        const attack = moveName => {
            hider()
            $('.text1').text(`${playerPokemon.name.toUpperCase()} used`)
            $('.text2').text(`${moveName.toUpperCase()}!`)
            typer()
            $('.player .images').animate({
                left: '0em'
            }, 100, 'linear').animate({
                left: '1.8em'
            }, 50, 'linear').delay(100).animate({
                left: '0.8em'
            }, 10, 'linear')
            window.setTimeout( () => {
                $('.foe .images').css('opacity', 0)
                window.setTimeout( () => {
                    $('.foe .images').css('opacity', 1)
                    window.setTimeout( () => {
                        $('.foe .images').css('opacity', 0)
                        window.setTimeout( () => {
                            $('.foe .images').css('opacity', 1)
                            window.setTimeout( () => {
                                $('.foe .images').css('opacity', 0)
                                window.setTimeout( () => {
                                    $('.foe .images').css('opacity', 1)
                                    const basePower = 40
                                    const baseDamage = Math.floor(Math.floor(Math.floor(2 * playerLevel / 5 + 2) * basePower * playerPokemon.atk / foePokemon.def) / 50) + 2
                                    hpFoe -= baseDamage
                                    $('.foe .hp-bar-active').animate({
                                        width: `${healthbar(hpFoe, hpFoeFull)}%`
                                    }, 500)
                                    attackEnd()
                                }, 100)
                            }, 100)
                        }, 100)
                    }, 100)
                }, 100)
            }, 100)
        }

        // Use potion
        const potion = potionType => {
            let strength
            hider()
            if (potionType === 'normal') {
                strength = 20
            } else if (potionType === 'super') {
                strength = 50
            } else if (potionType === 'hyper') {
                strength = 200
            } else {
                strength = 999
            }
            if (hpPlayer >= hpPlayerTotal) {
                $('.text1').text('체력은 이미')
                $('.text2').text('가득찬 상태이다!')
                typer()
                window.setTimeout( () => {
                    reset()
                }, 1000)
            } else {
                $('.text1').text('상처약을 사용했다!')
                $('.text2').text('')
                typer()
                hpPlayer += strength
                if (hpPlayer >= hpPlayerTotal) {
                    hpPlayer = hpPlayerTotal
                }
                $('.player .hp').text(hpPlayer)
                $('.player .hp-bar-active').animate({
                    width: `${healthbar(hpPlayer, hpPlayerTotal)}%`
                }, 500)
                potionCount--
                attackEnd()
            }
            $('.potionCount').text(potionCount)
            if (potionCount <= 0) {
                $('.potion').hide()
            }
        }

        // Animated typing of text
        var typer = () => {
            let line
            $('.text1, .text2').each(function() {
                $(this).text($(this).text().replace(new RegExp(' ', 'g'), ' '))
            })
            line = $('.text1, .text2')
            line.hide().contents().each(function() {
                let letters
                letters = void 0
                letters = `<span> ${this.data.split('').join(' </span><span> ')} </span>`
                $(this).replaceWith(letters)
            })
            line.find('span').hide().each(function() {
                if (!$.trim(this.innerHTML)) {
                    $(this).remove()
                }
            })
            line.show().find('span').each(function(i) {
                $(this).delay(40 * i).fadeIn(0)
            })
        }

        // Click elements
        var potionCount = 1
        $('.potionCount').text(potionCount)
        $('.button.item').click(() => {
            $('.window.item').show()
            $('.window.menu').hide()
        })
        $('.button.potion').click(() => {
            potion('normal')
        })
        $('.button.fight').click(() => {
            $('.window.fight').show()
        })
        $('.button.growl').click(() => {
            growl()
        })
        $('.button#move0').click(() => {
            attack('tackle')
        })
        $('.button#move1').click(() => {
            attack('tail whip')
        })
        $('.button#move2').click(() => {
            attack('-')
        })
        $('.button.back').click(() => {
            reset()
        })
        $('.button.pkmn').click(() => {
            $('.window.pkmn').show()
        })
        $('.button.run').click(() => {
            hider()
            $('.text1').text('도망칠 수 없다')
            $('.text2').text('')
            typer()
            window.setTimeout( () => {
                $('.text1').text('배틀에서 도망칠순 없어!')
                $('.text2').text('')
                typer()
                window.setTimeout( () => {
                    reset()
                }, 2000)
            }, 2000)
        })

        // Start animation
        const playPokemon = () => {
            $('.foe .images').css('right', '16em')
            $('.player .images').css('left', '16em')
            $('.player .pokemon, .foe .pokemon, .stats, .balls, .window.item, .window.pkmn, .window.fight, .window.menu').hide()
            window.setTimeout(() => {
                $('.foe .images').animate({
                    right: '0.8em'
                }, 800, 'linear')
                $('.player .images').animate({
                    left: '0.8em'
                }, 800, 'linear')
                window.setTimeout(() => {
                    $('.trainer, .balls').show()
                    window.setTimeout(() => {
                        $('.text1').text(`${foe.toUpperCase()} 은`)
                        $('.text2').text('싸움을 걸어왔다')
                        typer()
                        window.setTimeout(() => {
                            $('.balls').hide()
                            $('.foe .images').animate({
                                right: '-21em'
                            }, 400, 'linear')
                            window.setTimeout(() => {
                                $('.text1').text(`${foe.toUpperCase()} 은`)
                                $('.text2').text(`${foePokemon.name.toUpperCase()}를 내보냈다!`)
                                typer()
                                $('.foe .pokemon').show()
                                $('.foe .trainer').hide()
                                $('.foe .images').animate({
                                    right: '0.8em'
                                }, 700, 'linear')
                                window.setTimeout(() => {
                                    $('.foe .stats').show()
                                    $('.player .images').animate({
                                        left: '-21em'
                                    }, 400, 'linear')
                                    window.setTimeout(() => {
                                        $('.player .trainer').hide()
                                        $('.player .pokemon').show()
                                        $('.player .images').animate({
                                            left: '0.8em'
                                        }, 700, 'linear')
                                        $('.text1').text(`가라! ${playerPokemon.name.toUpperCase()}!`)
                                        $('.text2').text('')
                                        typer()
                                        $('.player .stats').show()
                                        window.setTimeout(() => {
                                            reset()
                                        }, 2000)
                                    }, 800)
                                }, 1500)
                            }, 1000)
                        }, 2500)
                    }, 400)
                }, 800)
            }, 600)
        }

        // Start
        playPokemon()
    })

    return (
        <div>
            <div id='pokemon'>
                <div className='depth'>
                    <div className='layer foe'>
                        <div className='info'>
                            <div className='balls'>
                                <img src='../../assets/img/blue_balls.svg'/>
                            </div>
                            <div className='stats'>
                                <div className='name'></div>
                                <div className='level-wrap'>
                                    <img src='../../assets/img/level.svg'/>
                                    <span className='level'></span>
                                </div>
                                <div className='hp-wrap'>
                                    <img src='../../assets/img/hp.svg'/>
                                    <div className='hp-bar'>
                                        <div className='hp-bar-active'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='images'>
                            <div className='trainer'>
                                <img src='../../assets/img/blue_front.svg'/>
                            </div>
                            <div className='pokemon'>
                                <img src='../../assets/img/eevee_front.svg'/>
                            </div>
                        </div>
                    </div>
                    <div className='layer player'>
                        <div className='images'>
                            <div className='trainer'>
                                <img src='../../assets/img/red_back.svg'/>
                            </div>
                            <div className='pokemon'>
                                <img src='../../assets/img/pikachu_back.svg'/>
                            </div>
                        </div>
                        <div className='info'>
                            <div className='balls'>
                                <img src='../../assets/img/red_balls.svg'/>
                            </div>
                            <div className='stats'>
                                <div className='name'></div>
                                <div className='level-wrap'>
                                    <img src='../../assets/img/level.svg'/>
                                    <span className='level'></span>
                                </div>
                                <div className='hp-wrap'>
                                    <img src='../../assets/img/hp.svg'/>
                                    <div className='hp-bar'/>
                                    <div className='hp-bar-active'></div>
                                </div>
                            </div>
                            <div className='health'>
                                <span className='hp'></span>
                                <span>/</span>
                                <span className='hpTotal'></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='layer windows'>
                    <div className='window texts'>
                        <div className='text text1'></div>
                        <div className='text text2'></div>
                    </div>
                    <div className='window menu'>
                        <span className='button fight'>FIGHT</span>
                        <span className='button pkmn'>
                          <sup>P</sup>
                          <sub>K</sub>
                          <sup>M</sup>
                          <sub>N</sub>
                        </span>
                        <span className='button item'>ITEM</span>
                        <span className='button run'>RUN</span>
                    </div>
                    <div className='window fight'>
                        <div className='button' id='move0'></div>
                        <div className='button' id='move1'></div>
                        <div className='button' id='move2'></div>
                        <div className='button back'>cancel</div>
                        <div className='window fight-details'>
                            <span className='type-header'>TYPE/</span>
                            <span className='type'>NORMAL</span>
                        </div>
                    </div>
                    <div className='window item'>
                        <div className='button potion'>
                            <span>POTION x</span>
                            <span className='potionCount'>1</span>
                        </div>
                        <div className='button back'>cancel</div>
                    </div>
                    <div className='window pkmn'>
                        <div className='button playerPokemonButton'>
                            <span className='playerpokemonname'></span>
                        </div>
                        <div className='button back'>cancel</div>
                    </div>
                </div>
            </div>
            <div className='text-area'>
                <p>
                    pokemon-js by <a href='http://www.superpencil.com'>Superpencil</a>
                </p>
            </div>
        </div>
    )
}
export default Battle;