import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAvailableLocations,
  fetchStateLocations,
  selectAvailableLocations,
  selectStateLocations,
} from "../redux/slices/locations-slice";
import { AppDispatch } from "../redux/store";

export const useLocations = (searchQuery?: string) => {
  const dispatch = useDispatch<AppDispatch>();

  const locations = useSelector(selectAvailableLocations);
  const stateLocations = useSelector(selectStateLocations);

  useEffect(() => {
    if (locations?.length === 0) {
      dispatch(fetchAvailableLocations({page:1}));
    }

    // Always dispatch stateLocations when searchQuery changes
    dispatch(fetchStateLocations({ page: 1 }));
  }, [dispatch, locations.length, searchQuery]);

  return {
    locations,
    stateLocations,
  };
};
