const toast = require('./index')
const wait = (time) =>
    new Promise((resolve) => setTimeout(resolve, time * 1000))
describe('toast', () => {
    beforeEach(() => {
        toast.clearAll()
    })
    it.each(['success', 'warning', 'info', 'error'])(
        'show 3 $type toasts',
        (type) => {
            toast[type]({ text: 'hello success message 1' })
            toast[type]({ text: 'hello success message 1' })
            toast[type]({ text: 'hello success message 1' })
            expect(toast.getContainer().children.length).toBe(3)
        }
    )
    it('show 2 warning toasts and clear all', () => {
        toast.warning({ text: 'hello warning message 1' })
        toast.warning({ text: 'hello warning message 2' })
        toast.clearAll()
        expect(toast.getContainer().children.length).toBe(0)
    })
    it('show 3 info toasts and clear all and then show 1 more', () => {
        toast.info({ text: 'hello info message 1' })
        toast.info({ text: 'hello info message 1' })
        toast.info({ text: 'hello info message 2' })
        toast.clearAll()
        toast.info({ text: 'hello info message 2' })
        expect(toast.getContainer().children.length).toBe(1)
    })
    it.each`
        type         | position                | expected
        ${'success'} | ${''}                   | ${{ backgroundColor: 'rgb(87, 191, 87)', position: 'toast-top-right', textContent: 'hello' }}
        ${'info'}    | ${'toast-top-left'}     | ${{ backgroundColor: 'rgb(77, 130, 214)', position: 'toast-top-left', textContent: 'hello' }}
        ${'warning'} | ${'toast-bottom-left'}  | ${{ backgroundColor: 'rgb(214, 161, 77)', position: 'toast-bottom-left', textContent: 'hello' }}
        ${'error'}   | ${'toast-bottom-right'} | ${{ backgroundColor: 'rgb(225, 113, 91)', position: 'toast-bottom-right', textContent: 'hello' }}
    `(
        `$type - pass message with default position`,
        ({ type, position, expected }) => {
            toast[type]({ text: 'hello', position })
            const container = toast.getContainer()
            const element = container.children[0]
            expect({
                backgroundColor: element.style.backgroundColor,
                position: element.position,
                textContent: element.textContent,
            }).toStrictEqual(expected)
        }
    )

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
    it('event - onCloseClick removed newly created element', async () => {
        toast.warning({
            text: 'hello warning message 1',
            position: 'toast-bottom-right',
        })
        const element = toast.getContainer().children[0]
        await element.onclick()
        expect(toast.getContainer().children.length).toBe(0)
    })
})
