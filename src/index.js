const BACKGROUND_COLORS = {
    SUCCESS: '#57BF57',
    ERROR: '#E1715B',
    INFO: '#4D82D6',
    WARNING: '#D6A14D',
}
const POSITIONS = {
    TOP_RIGHT: 'toast-top-right',
    BOTTOM_RIGHT: 'toast-bottom-right',
    BOTTOM_LEFT: 'toast-bottom-left',
    TOP_LEFT: 'toast-top-left',
    TOP_CENTER: 'toast-top-center',
    BOTTOM_CENTER: 'toast-bottom-center',
}
const tick = () => new Promise((resolve) => setTimeout(resolve, 0))
const wait = (time) =>
    new Promise((resolve) => setTimeout(resolve, time * 1000))
const getTransition = () => `${'all'} ${0.3}s ${'ease'}`

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
    wait(0.3).then(() => {
        if (element.parentNode) element.parentNode.removeChild(element)
    })
}
const clearAll = (callback) => {
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
    const container = getContainer(position)
    container.appendChild(element)
    tick().then(() => {
        element.style.transition = getTransition()
    })
}
const getContainer = (position) => {
    const container = Array.from(
        document.getElementsByClassName('toast-wrapper')
    )
    let result
    if (container.length) {
        result = container[0]
    } else {
        const element = document.createElement('div')
        element.classList.add('toast-wrapper')
        element.classList.add(position)
        document.body.appendChild(element)
        result = element
    }
    return result
}
const showToast = ({
    type = BACKGROUND_COLORS.SUCCESS,
    text,
    time = 3,
    stay = false,
    position = POSITIONS.TOP_RIGHT,
}) => {
    const element = document.createElement('div')
    const id = generateRandomId()
    element.onclick = () => removeFromDocument(id, position)
    element.id = id
    element.position = position
    element.textContent = text
    element.style.backgroundColor = type
    element.classList.add('toast-container')
    addToDocument(element, position)
}
const error = ({
    text,
    time = 3,
    stay = false,
    position = POSITIONS.TOP_RIGHT,
}) => {
    showToast({ type: BACKGROUND_COLORS.ERROR, text, time, stay, position })
}
const success = ({
    text,
    time = 3,
    stay = false,
    position = POSITIONS.TOP_RIGHT,
}) => {
    showToast({ type: BACKGROUND_COLORS.SUCCESS, text, time, stay, position })
}
const warning = ({
    text,
    time = 3,
    stay = false,
    position = POSITIONS.TOP_RIGHT,
}) => {
    showToast({ type: BACKGROUND_COLORS.WARNING, text, time, stay, position })
}
const info = ({
    text,
    time = 3,
    stay = false,
    position = POSITIONS.TOP_RIGHT,
}) => {
    showToast({ type: BACKGROUND_COLORS.INFO, text, time, stay, position })
}
module.exports = {
    clearAll,
    error: error,
    getContainer: getContainer,
    info: info,
    success: success,
    warning: warning,
}
