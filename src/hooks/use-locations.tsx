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

  const locations = useSelector(selectAvailableLocations);
  const stateLocations = useSelector(selectStateLocations);

  useEffect(() => {
    if (locations?.length === 0) {
      dispatch(fetchAvailableLocations());
    }

    if (stateLocations.length === 0) {
      dispatch(fetchStateLocations());
    }
  }, [dispatch, locations.length, stateLocations.length]);

  return {
    locations,
    stateLocations,
  };
};
