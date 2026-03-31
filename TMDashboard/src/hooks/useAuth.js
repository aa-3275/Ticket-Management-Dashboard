import { useSelector } from "react-redux";

export const useAuth = () => {
  const { user } = useSelector((state) => state.auth);

  const isAdmin = user?.role === "admin";
  const isUser = user?.role === "user";

  return {
    user,
    isAdmin,
    isUser,
  };
};
