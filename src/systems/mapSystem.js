function update_map() {
    try {
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
          if (symbol === 1025){
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
          let index = -1;
          if (portalsMapData[window["MAP_SELECT"]].length > 0) {

            index = portalsMapData[window["MAP_SELECT"]].map(object => object.type.id).indexOf(symbol);         
            if (index != -1) {
              let key  = portalsMapData[window["MAP_SELECT"]][index].type.type;
              const imgNpc= new Image();
              imgNpc.src = portalsMapData[window["MAP_SELECT"]][index].img;
              let type   = portalsMapData[window["MAP_SELECT"]][index].type;
              let animate= portalsMapData[window["MAP_SELECT"]][index].animate;
              let frames = portalsMapData[window["MAP_SELECT"]][index].frames;
              let scale  = portalsMapData[window["MAP_SELECT"]][index].scale;

              switch (key) {
                case "portal":
                  window['characters'].push(
                    new Sprite({
                      position: {
                        x: j * (Boundary.width) + offset[window["MAP_SELECT"]].x,
                        y: i * (Boundary.height+1) + offset[window["MAP_SELECT"]].y
                      },
                      image: imgNpc,
                      frames,
                      scale,
                      animate,
                      type,
                    })
                  )
                break;
                case "placa":
                  window['characters'].push(
                    new Sprite({
                      position: {
                        x: j * (Boundary.width +2) + offset[window["MAP_SELECT"]].x,
                        y: i * (Boundary.height -1 ) + offset[window["MAP_SELECT"]].y
                      },
                      image: imgNpc,
                      frames,
                      scale,
                      animate,
                      type,
                    })
                  );
                  // index = -1;
                  break;
                default:
                  break;
              }
              console.log(index, "index_ok");
            }
          }
          if (symbol !== 0 && index === -1) {
            console.log(index, "index");
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
        window['player'],
        window['foreground']
      ]
      
      window.battle = {
        initiated: false
      }
    } catch (error) {
        console.error('error', error)
    }
  }