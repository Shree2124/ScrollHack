import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/slices/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useLayoutEffect(() => {
    if (!user) dispatch(fetchUser());
  }, [dispatch,user]);

  //   useEffect(() => {
  //     if (!loading && !user) {
  //       navigate('/auth/login');
  //     }
  //   }, [loading, user, navigate]);

  return { user, loading };
};

export default useAuth;
