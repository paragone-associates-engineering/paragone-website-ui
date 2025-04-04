import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations, selectLocations } from "../redux/slices/locations-slice";
import { AppDispatch } from "../redux/store";

export const useLocations = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { locations, loading, error } = useSelector(selectLocations);

  useEffect(() => {
    if (locations.length === 0) {
      dispatch(fetchLocations());
    }
  }, [dispatch, locations.length]);

  return { locations, loading, error };
};
