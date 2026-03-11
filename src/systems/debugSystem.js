// debugSystem.js
// Pressione F1 para toggle do modo debug ingame

window.DEBUG = {
  enabled: false,
  showBoundaries: true,
  showBattleZones: true,
  showPlayerInfo: true,
  hideBackground: false,
  showGrid: false
}

// Toggle com F1
window.addEventListener('keydown', (e) => {
  if (e.key === 'F1') {
    e.preventDefault()
    window.DEBUG.enabled = !window.DEBUG.enabled
    console.log('[DEBUG] Modo debug:', window.DEBUG.enabled ? 'ON' : 'OFF')
  }
  if (e.key === 'F2' && window.DEBUG.enabled) {
    window.DEBUG.hideBackground = !window.DEBUG.hideBackground
  }
  if (e.key === 'F3' && window.DEBUG.enabled) {
    window.DEBUG.showGrid = !window.DEBUG.showGrid
  }
})

function drawDebug() {
  if (!window.DEBUG.enabled) return

  // Esconde o fundo do mapa
  if (window.DEBUG.hideBackground) {
    if (window.background) window.background.opacity = 0
    if (window.foreground) window.foreground.opacity = 0
  } else {
    if (window.background) window.background.opacity = 1
    if (window.foreground) window.foreground.opacity = 1
  }

  // Paredes (vermelho)
  if (window.DEBUG.showBoundaries && window.boundaries) {
    window.boundaries.forEach((b) => {
      c.fillStyle = 'rgba(255, 0, 0, 0.4)'
      c.fillRect(b.position.x, b.position.y, b.width, b.height)
      c.strokeStyle = 'rgba(255, 0, 0, 0.9)'
      c.lineWidth = 1
      c.strokeRect(b.position.x, b.position.y, b.width, b.height)
    })
  }

  // Zonas de batalha (amarelo)
  if (window.DEBUG.showBattleZones && window.battleZones) {
    window.battleZones.forEach((b) => {
      c.fillStyle = 'rgba(255, 220, 0, 0.3)'
      c.fillRect(b.position.x, b.position.y, b.width, b.height)
      c.strokeStyle = 'rgba(255, 220, 0, 0.9)'
      c.lineWidth = 1
      c.strokeRect(b.position.x, b.position.y, b.width, b.height)
    })
  }

  // NPCs / portais (azul)
  if (window.characters) {
    window.characters.forEach((ch) => {
      c.fillStyle = 'rgba(0, 100, 255, 0.3)'
      c.fillRect(ch.position.x, ch.position.y, ch.width || 64, ch.height || 64)
      c.strokeStyle = 'rgba(0, 100, 255, 0.9)'
      c.lineWidth = 1
      c.strokeRect(ch.position.x, ch.position.y, ch.width || 64, ch.height || 64)
    })
  }

  // Hitbox do player (verde)
  if (window.player) {
    c.fillStyle = 'rgba(0, 255, 0, 0.25)'
    c.fillRect(window.player.position.x, window.player.position.y, window.player.width, window.player.height)
    c.strokeStyle = 'rgba(0, 255, 0, 1)'
    c.lineWidth = 2
    c.strokeRect(window.player.position.x, window.player.position.y, window.player.width, window.player.height)
  }

  // Grid de tiles (cinza)
  if (window.DEBUG.showGrid) {
    c.strokeStyle = 'rgba(255, 255, 255, 0.1)'
    c.lineWidth = 0.5
    for (let x = 0; x < canvas.width; x += 64) {
      c.beginPath(); c.moveTo(x, 0); c.lineTo(x, canvas.height); c.stroke()
    }
    for (let y = 0; y < canvas.height; y += 64) {
      c.beginPath(); c.moveTo(0, y); c.lineTo(canvas.width, y); c.stroke()
    }
  }

  // Painel de info (canto superior direito)
  if (window.DEBUG.showPlayerInfo && window.player) {
    const px = Math.round(window.player.position.x)
    const py = Math.round(window.player.position.y)
    const lines = [
      '[ DEBUG F1 ]',
      `Mapa:   ${window.MAP_SELECT}`,
      `Player: ${px}, ${py}`,
      `Walls:  ${window.boundaries ? window.boundaries.length : 0}`,
      `Battle: ${window.battleZones ? window.battleZones.length : 0}`,
      `NPCs:   ${window.characters ? window.characters.length : 0}`,
      '',
      'F2: toggle mapa',
      'F3: toggle grid',
    ]

    const padding = 12
    const lineHeight = 16
    const boxW = 200
    const boxH = lines.length * lineHeight + padding * 2
    const boxX = canvas.width - boxW - 10
    const boxY = 10

    c.fillStyle = 'rgba(0, 0, 0, 0.75)'
    c.fillRect(boxX, boxY, boxW, boxH)
    c.strokeStyle = '#00ff00'
    c.lineWidth = 1
    c.strokeRect(boxX, boxY, boxW, boxH)

    c.font = '10px monospace'
    c.fillStyle = '#00ff00'
    lines.forEach((line, i) => {
      c.fillText(line, boxX + padding, boxY + padding + (i + 1) * lineHeight - 4)
    })
  }
}
