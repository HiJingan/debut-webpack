import printMe from './print'

function createRootDom() {
  const rootElement = document.createElement('div')
  rootElement.innerHTML = 'hello webpack <br /><br />'

  const btn = document.createElement('button')
  btn.innerHTML = 'click me'
  btn.onclick = printMe
  // btn.addEventListener('click', printMe)

  rootElement.appendChild(btn)
  document.body.appendChild(rootElement)
}

createRootDom()
