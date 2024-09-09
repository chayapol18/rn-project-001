import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TodoListState {
  id: number,
  title: string,
  detail: string,
  startDate: string,
  endDate: string,
  status: string,
  isShowDetail: boolean,
  isCheck: boolean
}

const todoList: TodoListState[] = [{
  id: 1,
  title: "task1",
  detail: "detail task1",
  startDate: "04-09-2024 12:00",
  endDate: "04-09-2024 12:00",
  status: "todo",
  isShowDetail: false,
  isCheck: false
},
{
  id: 2,
  title: "learning",
  detail: "detail task2",
  startDate: "02-09-2024 12:00",
  endDate: "02-09-2024 12:00",
  status: "done",
  isShowDetail: false,
  isCheck: false
},
{
  id: 3,
  title: "learning",
  detail: "detail task3",
  startDate: "02-09-2024 12:00",
  endDate: "02-09-2024 12:00",
  status: "inProgress",
  isShowDetail: false,
  isCheck: false
},
{
  id: 4,
  title: "learning",
  detail: "detail task4",
  startDate: "02-09-2024 12:00",
  endDate: "02-09-2024 12:00",
  status: "pending",
  isShowDetail: false,
  isCheck: false
}]

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState: {
    data: todoList,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // state.id += 1
    },
    updateTodoList: (state, action: PayloadAction<TodoListState[]>) => {
      state.data = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, updateTodoList } = todoListSlice.actions

export default todoListSlice.reducer