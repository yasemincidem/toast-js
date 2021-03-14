const { fireEvent, getByText } = require('@testing-library/dom')
const toast = require('./index')

describe('toast', () => {
    afterEach(() => {
        toast.clearAll()
    })
    it('show 3 success toasts', () => {
        toast.success({ text: 'hello success message 1' })
        toast.success({ text: 'hello success message 2' })
        toast.success({ text: 'hello success message 3' })
        const container = toast.getContainer()
        expect(container.children.length).toBe(3)
    })
    it('show 2 warning toasts and clear all', () => {
        toast.warning({ text: 'hello success message 1' })
        toast.warning({ text: 'hello success message 2' })
        const container = toast.getContainer()
        expect(container.children.length).toBe(2)
        toast.clearAll()
        expect(container.children.length).toBe(0)
    })
})
