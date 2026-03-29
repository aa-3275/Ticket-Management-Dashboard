import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickets: [],
  loading: false,
  error: null,
  total: 0,
};

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTickets: (state, action) => {
      state.tickets = action.payload;
    },

    addTicket: (state, action) => {
      state.tickets.push(action.payload);
    },

    deleteTicket: (state, action) => {
      state.tickets = state.tickets.filter((t) => t.id !== action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    updateTicket: (state, action) => {
      state.tickets = state.tickets.map((t) =>
        t.id === action.payload.id ? action.payload : t,
      );
    },
  },
});

export const {
  setTickets,
  addTicket,
  deleteTicket,
  setTotal,
  setError,
  setLoading,
  updateTicket,
} = ticketSlice.actions;
export default ticketSlice.reducer;
