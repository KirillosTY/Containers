import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Todo from '../src/Todos/Todo'



const todoList =[{
    text: "test 1",
    done: false,
},
{
    text:"test 2",
    done: true
}
]

describe('<Todo/>', () => {
    it('should render items', () => {

        
        const onButtonPress =  jest.fn(() => {
            ()=> 'pressed';
        })

        render(<Todo todo={todoList[0]}
             onClickDelete={() => onButtonPress()} 
             onClickComplete={() => onButtonPress()}/>)
        
        expect(screen.getByText('test 1')).toBeVisible()
        expect(screen.getByText('This todo is not done')).toBeVisible()

        
    })

      it('Buttons should work', () => {

       const onButtonPress =  jest.fn(() => {
            ()=> 'pressed';
        })

        render(<Todo todo={todoList[0]}
             onClickDelete={() => onButtonPress()} 
             onClickComplete={() => onButtonPress()}/>)
        
        expect(screen.getByText('Delete')).toBeVisible()
        const button = screen.getByText('Delete')
        fireEvent.click(button)
        const secondButton = screen.getByText('Set as done')
        expect(screen.getByText('This todo is not done')).toBeVisible()

        
    })
})