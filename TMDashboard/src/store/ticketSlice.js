import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTicketsAPI } from "../services/ticketService";

export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async ({ limit, skip }, { rejectWithValue }) => {
    try {
      const data = await fetchTicketsAPI(limit, skip);

      return {
        tickets: data.todos.map((item) => ({
          id: item.id,
          title: item.todo,
          status: item.completed ? "Resolved" : "Pending",
        })),
        total: data.total,
      };
    } catch (err) {
      return rejectWithValue("Failed to fetch tickets");
    }
  },
);
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
    // ✅ Keep only CRUD
    addTicket: (state, action) => {
      state.tickets.push(action.payload);
    },

    deleteTicket: (state, action) => {
      state.tickets = state.tickets.filter((t) => t.id !== action.payload);
    },

    updateTicket: (state, action) => {
      state.tickets = state.tickets.map((t) =>
        t.id === action.payload.id ? action.payload : t,
      );
    },
  },

  // 🔥 Async handling
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload.tickets;
        state.total = action.payload.total;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addTicket, deleteTicket, updateTicket } = ticketSlice.actions;
export default ticketSlice.reducer;
