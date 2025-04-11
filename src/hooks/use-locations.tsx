import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAvailableLocations,
  fetchStateLocations,
  selectAvailableLocations,
  selectStateLocations,
} from "../redux/slices/locations-slice";
import { AppDispatch } from "../redux/store";

export const useLocations = () => {
  const dispatch = useDispatch<AppDispatch>();

  const availableLocations = useSelector(selectAvailableLocations);
  const stateLocations = useSelector(selectStateLocations);

  useEffect(() => {
    if (availableLocations.length === 0) {
      dispatch(fetchAvailableLocations());
    }

    if (stateLocations.length === 0) {
      dispatch(fetchStateLocations());
    }
  }, [dispatch, availableLocations.length, stateLocations.length]);

  return {
    availableLocations,
    stateLocations,
  };
};
