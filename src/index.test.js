const toast = require('./index')

describe('toast', () => {
    beforeEach(() => {
        toast.clearAll()
    })
    it('show 3 success toasts', () => {
        toast.success({ text: 'hello success message 1' })
        toast.success({ text: 'hello success message 2' })
        toast.success({ text: 'hello success message 3' })
        expect(toast.getContainer().children.length).toBe(3)
    })
    it('show 2 warning toasts and clear all', () => {
        toast.warning({ text: 'hello warning message 1' })
        toast.warning({ text: 'hello warning message 2' })
        expect(toast.getContainer().children.length).toBe(2)
        toast.clearAll()
        expect(toast.getContainer().children.length).toBe(0)
    })
    it('show 3 info toasts and clear all and then show 1 more', () => {
        toast.info({ text: 'hello info message 1' })
        toast.info({ text: 'hello info message 1' })
        toast.info({ text: 'hello info message 2' })
        expect(toast.getContainer().children.length).toBe(3)
        toast.clearAll()
        toast.info({ text: 'hello info message 2' })
        expect(toast.getContainer().children.length).toBe(1)
    })
    it('success - pass message with default position', () => {
        toast.success({ text: 'hello success message 1' })
        const container = toast.getContainer()
        const element = container.children[0]
        expect(element.style.backgroundColor).toBe('rgb(87, 191, 87)')
        expect(element.position).toBe('toast-top-right')
        expect(element.textContent).toBe('hello success message 1')
    })
    it('info - pass message with top-left position', () => {
        toast.info({ text: 'hello info message 1', position: 'toast-top-left' })
        const container = toast.getContainer()
        const element = container.children[0]
        expect(element.style.backgroundColor).toBe('rgb(77, 130, 214)')
        expect(element.position).toBe('toast-top-left')
        expect(element.textContent).toBe('hello info message 1')
    })
    it('error - pass message with bottom-left position', () => {
        toast.error({
            text: 'hello error message 1',
            position: 'toast-bottom-left',
        })
        const container = toast.getContainer()
        const element = container.children[0]
        expect(element.style.backgroundColor).toBe('rgb(225, 113, 91)')
        expect(element.position).toBe('toast-bottom-left')
        expect(element.textContent).toBe('hello error message 1')
    })
    it('warning - pass message with bottom-right position', () => {
        toast.warning({
            text: 'hello warning message 1',
            position: 'toast-bottom-right',
        })
        const container = toast.getContainer()
        const element = container.children[0]
        expect(element.style.backgroundColor).toBe('rgb(214, 161, 77)')
        expect(element.position).toBe('toast-bottom-right')
        expect(element.textContent).toBe('hello warning message 1')
    })
    it('event - onCloseClick has been called', () => {
        const mockCallback = jest.fn()
        toast.warning({
            text: 'hello warning message 1',
            position: 'toast-bottom-right',
        })
        const element = toast.getContainer().children[0]
        element.onclick = mockCallback
        element.onclick()
        expect(mockCallback).toHaveBeenCalled()
    })
    it('event - onCloseClick removed newly created element', () => {
        toast.warning({
            text: 'hello warning message 1',
            position: 'toast-bottom-right',
        })
        const element = toast.getContainer().children[0]
        element.onclick()
        expect(toast.getContainer().children.length).toBe(0)
    })
})
