# Wall Poke Port

RPG no estilo Pokémon (Game Boy), feito em **JavaScript puro** como projeto de portfólio para praticar ECMAScript sem frameworks.

## Como rodar

Abra o arquivo `index.html` diretamente no browser. Nenhuma instalação necessária.

> Dica: Use a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) no VSCode para recarregamento automático.

## Controles

| Ação | Teclado |
|---|---|
| Mover | `W A S D` ou setas |
| Interagir / Falar | `Z` |
| Mobile | Botões direcionais na tela |

## Funcionalidades

- Exploração em mapa tile-based com câmera seguindo o jogador
- Transição entre mapas via portais
- Batalhas por turno com animações (estilo Pokémon)
- Sistema de diálogo com efeito typewriter
- Suporte a dispositivos mobile com controles touch

## Estrutura de Pastas

```
wall_poke_port/
├── index.html              # HTML principal + CSS inline
├── index.js                # Entry point: loop principal e inicialização
│
├── src/
│   ├── core/
│   │   ├── classes.js      # Classes base: Sprite, Monster, Boundary
│   │   └── gameState.js    # Documentação do estado global (futura refatoração)
│   ├── scenes/
│   │   └── battleScene.js  # Sistema de batalha: initBattle, animateBattle
│   ├── systems/
│   │   ├── collisionSystem.js  # Detecção de colisão AABB
│   │   ├── mapSystem.js        # Inicialização e troca de mapas
│   │   ├── inputSystem.js      # Input de teclado/touch e movimentação
│   │   └── chatSystem.js       # Sistema de diálogo typewriter
│   └── ui/
│       └── mobileUI.js     # Detecção mobile e controles touch
│
├── data/
│   ├── attacks.js          # Definição de ataques (nome, dano, tipo, cor)
│   ├── audio.js            # Instâncias de áudio (Howler.js)
│   ├── battleZones.js      # Tiles de zona de batalha por mapa
│   ├── characters.js       # Dados de NPCs por mapa
│   ├── collisions.js       # Tiles de colisão por mapa
│   ├── monsters.js         # Stats dos monstros (Emby, Draggle)
│   └── portals.js          # Portais e placas (destinos, imagens, diálogos)
│
├── img/
│   ├── Player/             # Sprites do jogador (4 direções)
│   ├── maps/map1/          # Imagens do mapa 1 + portals/
│   ├── battle/             # Assets de batalha (background, fireball, thornLeaves)
│   ├── oldMan/             # Sprite NPC velho
│   └── villager/           # Sprite NPC aldeão
│
└── audio/                  # Arquivos de áudio (.wav, .mp3)
```

## Como adicionar conteúdo

### Novo monstro
1. Adicionar sprite em `img/`
2. Definir em `data/monsters.js` com `position`, `image.src`, `frames`, `attacks`
3. Referenciar em `src/scenes/battleScene.js`

### Novo ataque
1. Adicionar em `data/attacks.js` com `name`, `damage`, `type`, `color`
2. Adicionar animação no `switch(attack.name)` em `src/core/classes.js`

### Novo mapa
1. Exportar imagens do Tiled e adicionar em `img/maps/`
2. Adicionar paths em `image_map` e `foregroundImage_map` no `index.js`
3. Adicionar `offset` do mapa no `index.js`
4. Exportar tiles de colisão → `data/collisions.js`
5. Exportar tiles de batalha → `data/battleZones.js`
6. Definir portais/placas → `data/portals.js`

### Novo NPC/Portal
1. Adicionar sprite em `img/`
2. Definir entrada em `data/portals.js` com `type.id`, `type.type`, `img`, e `teleport` ou `text`

## Tecnologias

| Biblioteca | Versão | Uso |
|---|---|---|
| [Howler.js](https://howlerjs.com/) | 2.2.3 | Gerenciamento de áudio |
| [GSAP](https://greensock.com/gsap/) | 3.9.1 | Animações e tweening |
| [Font Awesome](https://fontawesome.com/) | 5.5.0 | Ícones dos controles mobile |
| [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) | — | Fonte estilo 8-bit |
| [Tiled](https://www.mapeditor.org/) | — | Editor de mapas tile |

## Capturas

#### Diálogo com NPC
![testenpc](https://user-images.githubusercontent.com/19413241/209397012-e67ac093-0e69-4c68-8e86-e77c2d07c878.gif)

#### Mudança de mapa
![Gravar_2023_06_27_15_19_21_11](https://github.com/FranciscoWallison/wall_poke_port/assets/19413241/87f33d60-480e-4645-9678-8c4453b1fe51)

#### Casa
![image](https://user-images.githubusercontent.com/19413241/198895396-26d790ff-09d1-4939-984f-a9cb0ad2c9b7.png)

#### Rua
![image](https://user-images.githubusercontent.com/19413241/198895433-b5e8f949-5c70-405f-bd77-c8318dd89f89.png)
