// gameState.js
// Centraliza o estado global do jogo.
// Atualmente o jogo usa window.* para estado compartilhado entre scripts.
// Este arquivo documenta o estado e serve como ponto de partida para
// uma refatoração futura usando um objeto de estado único.
//
// COMO USAR (futura refatoração):
//   import { state } from './gameState.js'
//   state.player.position.x = 100
//
// ESTADO ATUAL (via window.*):
//   window.MAP_SELECT      — índice do mapa ativo (0, 1, 2)
//   window.SELECT_STATUS   — rastreia mudança de mapa no loop
//   window.player          — instância Sprite do jogador
//   window.renderables     — array de objetos a renderizar no loop
//   window.movables        — array de objetos que se movem com o player
//   window.boundaries      — array de Boundary (colisões)
//   window.battleZones     — array de Boundary (zonas de batalha)
//   window.characters      — array de Sprite (NPCs e portais)
//   window.battle          — { initiated: boolean }
//   window.VALID_PORTAL    — bloqueio de movimento durante interação

const gameState = {
  mapSelect: 0,
  selectStatus: 0,
  player: null,
  renderables: [],
  movables: [],
  boundaries: [],
  battleZones: [],
  characters: [],
  battle: {
    initiated: false
  },
  validPortal: false
}

// Sincroniza o estado com window.* (compatibilidade temporária)
function syncToWindow() {
  window.MAP_SELECT = gameState.mapSelect
  window.SELECT_STATUS = gameState.selectStatus
  window.player = gameState.player
  window.renderables = gameState.renderables
  window.movables = gameState.movables
  window.boundaries = gameState.boundaries
  window.battleZones = gameState.battleZones
  window.characters = gameState.characters
  window.battle = gameState.battle
  window.VALID_PORTAL = gameState.validPortal
}
