function valid_mobile_on() {
  if (screen.width < 640 || screen.height < 480) {
    // sirva a versão pra celular
    console.log('sirva a versão pra celular')
    document.querySelector('#rotateMode').style.display = 'block'
  } else if (screen.width < 1024 || screen.height < 768) {
    // talvez seja uma boa usar versão pra tablet
    console.log('talvez seja uma boa usar versão pra tablet')
    document.querySelector('#rotateMode').style.display = 'block'
  } else {
    // sirva a versão normal
    console.log('sirva a versão normal')
  }
}

function valid_mobile_off() {
  if (screen.width < 640 || screen.height < 480) {
    // sirva a versão pra celular
    console.log('sirva a versão pra celular')
    document.querySelector('#rotateMode').style.display = 'none'
  } else if (screen.width < 1024 || screen.height < 768) {
    // talvez seja uma boa usar versão pra tablet
    console.log('talvez seja uma boa usar versão pra tablet')
    document.querySelector('#rotateMode').style.display = 'none'
  } else {
    // sirva a versão normal
    console.log('sirva a versão normal')
  }
}