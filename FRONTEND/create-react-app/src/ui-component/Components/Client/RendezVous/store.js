// // store.js
// import { createStore } from "redux";

// // Action types
// const ADD_RDV_DATE = "ADD_RDV_DATE";

// // Action creators
// export const addRdvDate = (date) => ({
//   type: ADD_RDV_DATE,
//   date,
// });

// // Initial state
// const initialState = {
//   rdvDates: [], // Tableau pour stocker les dates des rendez-vous
// };

// // Reducer
// const rootReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_RDV_DATE:
//       return {
//         ...state,
//         rdvDates: [...state.rdvDates, action.date],
//       };
//     default:
//       return state;
//   }
// };

// // Create store
// const store = createStore(rootReducer);

// export default store;
