import { useDispatch, useSelector } from "react-redux";
import { fetchTickets, deleteTicket } from "../store/ticketSlice";

export const useTickets = () => {
  const dispatch = useDispatch();
  const { tickets, loading, error, total } = useSelector(
    (state) => state.tickets,
  );

  const getTickets = (limit, skip) => {
    dispatch(fetchTickets({ limit, skip }));
  };

  const removeTicket = (id) => {
    dispatch(deleteTicket(id));
  };

  return {
    tickets,
    loading,
    error,
    total,
    getTickets,
    removeTicket,
  };
};
