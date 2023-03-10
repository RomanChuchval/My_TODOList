import {v1} from "uuid";

import {
    addNewTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    todoListsDataReducer
} from "./todoListsDataReducer";
import {addNewTodoListAC, removeTodoListAC} from "./todoListsReducer";
import {TodoListDataType} from "../../AppWithRedux";

let todoListId1: string
let todoListId2: string
let startState: TodoListDataType

beforeEach( () => {
    todoListId1 = v1()
    todoListId2 = v1()
    startState = {
        [todoListId1]: [
            {id: '1', taskName: 'React', isDone: false},
            {id: '2', taskName: 'Redux', isDone: true},
            {id: '3', taskName: 'Axios', isDone: false},
        ],
        [todoListId2]: [
            {id: '1', taskName: 'HTML', isDone: true},
            {id: '2', taskName: 'CSS', isDone: false},
            {id: '3', taskName: 'Axios', isDone: true}
        ]
    }
})


test('correct task should be removed', () => {

    const resultState = todoListsDataReducer(startState,removeTaskAC( todoListId1,'2' ))

    expect(resultState[todoListId1]).not.toBe(startState)
    expect(resultState[todoListId1][1].taskName).toBe('Axios')
    expect(resultState[todoListId1].length).toBe(2)
    expect(resultState[todoListId2].length).toBe(3)
})


test('correct task should be change taskStatus', ()=> {

    const todoListID = todoListId1
    const taskID = '2'
    const newStatus = false

    const resultState = todoListsDataReducer(startState, changeTaskStatusAC(todoListID, taskID, newStatus))

    expect(resultState).not.toBe(startState)
    expect(resultState[todoListID][1].isDone).toBe(newStatus)
    expect(resultState[todoListID][0].isDone).toBe(false)
    expect(resultState[todoListID][2].isDone).toBe(false)
    expect(resultState[todoListID].length).toBe(3)
})


test('correct todoListData array should be correct add new task', () => {

    const todoListID = todoListId2
    const newTasktitle = 'Metal'

    const resultState = todoListsDataReducer(startState, addNewTaskAC(todoListID,newTasktitle))

    expect(resultState).not.toBe(startState)
    expect(resultState[todoListID].length).toBe(4)
    expect(resultState[todoListID][0].taskName).toBe(newTasktitle)
})

test('task title should be changed correctly', () => {

    const todoListID = todoListId2
    const taskId = '2'
    const newTasktitle = 'Metal!!!!'

    const resultState = todoListsDataReducer(startState, changeTaskTitleAC(todoListID, taskId, newTasktitle ))

    expect(resultState).not.toBe(startState)
    expect(resultState[todoListID].length).toBe(3)
    expect(resultState[todoListID][1].taskName).toBe(newTasktitle)
})

test('should correct remove full tasksList', () => {

    const todoListID = todoListId2

    const resultState = todoListsDataReducer(startState, removeTodoListAC(todoListID))

    expect(resultState[todoListID]).toBeUndefined()
    expect(resultState[todoListId1]).toBe(startState[todoListId1])

})

test('should correct add new empty array for new TodoList tasks', () => {

    const newTitle = 'newTitle'
    const id = v1()

    const resultState = todoListsDataReducer(startState, addNewTodoListAC(newTitle, id))


    expect(resultState[id].length).toBe(0)
    expect(resultState[id]).not.toBeUndefined()
    expect(resultState).not.toBe(startState)
})



