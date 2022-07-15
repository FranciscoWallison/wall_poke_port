function update_map() {

    // Informações dos mapas
    window.collisionsMap = []
    for (let i = 0; i < collisions[window["MAP_SELECT"]].length; i += largura_mapa[window["MAP_SELECT"]]) {
      window['collisionsMap'].push(collisions[window["MAP_SELECT"]].slice(i, largura_mapa[window["MAP_SELECT"]] + i))
    }
  
    window.battleZonesMap = []
    for (let i = 0; i < battleZonesData[window["MAP_SELECT"]].length; i += largura_mapa[window["MAP_SELECT"]]) {
      window['battleZonesMap'].push(battleZonesData[window["MAP_SELECT"]].slice(i, largura_mapa[window["MAP_SELECT"]] + i))
    }
  
    window.charactersMap = []
    for (let i = 0; i < charactersMapData[window["MAP_SELECT"]].length; i += largura_mapa[window["MAP_SELECT"]]) {
      window['charactersMap'].push(charactersMapData[window["MAP_SELECT"]].slice(i, largura_mapa[window["MAP_SELECT"]] + i))
    }
  
    // Colisão
    window.boundaries = []
    window['collisionsMap'].forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 1025)
          window['boundaries'].push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset[window["MAP_SELECT"]].x,
                y: i * Boundary.height + offset[window["MAP_SELECT"]].y
              }
            })
          )
      })
    })
    
    // Zona de batalha
    window.battleZones = []  
    window['battleZonesMap'].forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 1025)
          window['battleZones'].push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset[window["MAP_SELECT"]].x,
                y: i * Boundary.height + offset[window["MAP_SELECT"]].y
              }
            })
          )
      })
    })
  
    // Selecionar os NPC'S
    window.characters = []
    const villagerImg = new Image()
    villagerImg.src = './img/villager/Idle.png'
    const oldManImg = new Image()
    oldManImg.src = './img/oldMan/Idle.png'
  
    window['charactersMap'].forEach((row, i) => {
      row.forEach((symbol, j) => {
        // 1026 === villager
        // if (symbol === 1026) {
        //   window['characters'].push(
        //     new Sprite({
        //       position: {
        //         x: j * Boundary.width + offset[window["MAP_SELECT"]].x,
        //         y: i * Boundary.height + offset[window["MAP_SELECT"]].y
        //       },
        //       image: villagerImg,
        //       frames: {
        //         max: 4,
        //         hold: 60
        //       },
        //       scale: 3,
        //       animate: true
        //     })
        //   )
        // }
        // // 1031 === oldMan
        // else if (symbol === 1031) {
        //   window['characters'].push(
        //     new Sprite({
        //       position: {
        //         x: j * Boundary.width + offset[window["MAP_SELECT"]].x,
        //         y: i * Boundary.height + offset[window["MAP_SELECT"]].y
        //       },
        //       image: oldManImg,
        //       frames: {
        //         max: 4,
        //         hold: 60
        //       },
        //       scale: 3
        //     })
        //   )
        // }
    
        if (symbol !== 0) {
          window['boundaries'].push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset[window["MAP_SELECT"]].x,
                y: i * Boundary.height + offset[window["MAP_SELECT"]].y
              }
            })
          )
        }
      })
    })
  
    // Usando a ferramenta do Tiled "Usar o nível de zoom atual" para exportar a imagem 
    window.image_map = new Image()
    window['image_map'].src = image_map[window["MAP_SELECT"]]
    // Usando a ferramenta do Tiled "Usar o nível de zoom atual" para exportar a imagem 
    window.foregroundImage = new Image()
    window['foregroundImage'].src = foregroundImage_map[window["MAP_SELECT"]]
  
    // image select MAP
    window.background = new Sprite({
      position: {
        x: offset[window["MAP_SELECT"]].x,
        y: offset[window["MAP_SELECT"]].y
      },
      image: window['image_map']
    })
    
    window.foreground = new Sprite({
      position: {
        x: offset[window["MAP_SELECT"]].x,
        y: offset[window["MAP_SELECT"]].y 
      },
      image: window['foregroundImage']
    })
  
    // update animate
    window.movables = [
      window['background'],
      ...window['boundaries'],
      window['foreground'],
      ...window['battleZones'],
      ...window['characters'],
    ]
    window.renderables = [
      window['background'],
      ...window['boundaries'],
      ...window['battleZones'],
      ...window['characters'],
      player,
      window['foreground']
    ]
    
    window.battle = {
      initiated: false
    }
  
  }