const tick = () => new Promise((resolve) => setTimeout(resolve, 0))
const wait = (time) =>
    new Promise((resolve) => setTimeout(resolve, time * 1000))
const getTransition = () => `${'all'} ${0.3}s ${'ease'}`
const enterClicked = (event) => event.keyCode === 13
const escapeClicked = (event) => event.keyCode === 27
const generateRandomId = () => {
    // RFC4122 version 4 compliant UUID
    const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
    return `toast-${id}`
}
const removeFromDocument = (id, position) => {
    const element = document.getElementById(id)
    if (!element) return
    element.style[position] = `-${element.offsetHeight}px`

    if (element.listener)
        window.removeEventListener('keydown', element.listener)

    wait(0.3).then(() => {
        if (element.parentNode) element.parentNode.removeChild(element)
    })
}
const hideAlerts = (callback) => {
    const alertsShowing = document.getElementsByClassName('toast-container')
    if (alertsShowing.length) {
        for (let i = 0; i < alertsShowing.length; i++) {
            const alert = alertsShowing[i]
            removeFromDocument(alert.id, alert.position)
        }
        if (callback) wait(0.3).then(() => callback())
    }
}
const addToDocument = (element, position) => {
    element.classList.add('toast-container')
    document.body.appendChild(element)
    tick().then(() => {
        element.style.transition = getTransition()
        element.style[position] = 0
    })
}
const testAlert = ({
    type = '#4d82d6',
    text,
    time = 3,
    stay = false,
    position = 'bottom',
}) => {
    hideAlerts()
    const element = document.createElement('div')
    window.addEventListener('keydown', (event) => {
        if (enterClicked(event) || escapeClicked(event)) hideAlerts()
    })
    const id = generateRandomId()
    element.onclick = () => removeFromDocument(id, position)
    element.id = id
    element.textContent = text
    element.style.backgroundColor = type
    addToDocument(element, position)
}
