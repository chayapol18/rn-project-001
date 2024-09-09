import { configureStore } from '@reduxjs/toolkit'
import userDataSlice from './userDataSlice'
import todoListDataSlice from './todoListDataSlice'

export const store = configureStore({
  reducer: {
    user: userDataSlice,
    todolist: todoListDataSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


// import { atom, selector } from 'recoil';

// export const valueState = atom({
//   key: 'valueState',
//   default: 'initial value',
// });

// export const valueLength = selector({
//   key: 'valueLength',
//   get: ({ get }) => {
//     const value = get(valueState);
//     return value.length;
//   },
// });


// export const userData = atom({
//   key: 'userData',
//   default: {
//     name: "leo",
//     age: 28
//   }
// });

