/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useEffect,  useState } from 'react';
import { fetchAvailableLocations } from '../redux/slices/locations-slice';
import { useDispatch, useSelector } from 'react-redux';
// import the RootState and AppDispatch types
import type { RootState, AppDispatch } from '../redux/store';

interface LocationAutocompleteProps {
  control: any;
  errors: any;
  name?: string;
}

export const AvailableLocationAutocomplete = ({ control, errors }:LocationAutocompleteProps) => {
  const dispatch: AppDispatch = useDispatch();
   const [searchText, setSearchText] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);
  
  
  const { availableLocations, loadingState, currentPage,  hasMorePages } = useSelector(
    (state: RootState) => state.locations
  );
  //console.log(availableLocations)

  // Debounce search to avoid too many API calls
//   const debouncedSearchText = useMemo(() => {
//     const timer = setTimeout(() => searchText, 500);
//     return () => clearTimeout(timer);
//   }, [searchText]);

  // Initial load and search
  useEffect(() => {
    dispatch(fetchAvailableLocations({ page: 1, searchString: searchText }));
  }, [dispatch, searchText]);

  // Load more data when scrolling
  const handleLoadMore = async () => {
    if (hasMorePages && !loadingMore && !loadingState) {
      setLoadingMore(true);
      await dispatch(fetchAvailableLocations({ 
        page: (currentPage ?? 1) + 1, 
        searchString: searchText 
      }));
      setLoadingMore(false);
    }
  };

  return (
    <Controller
      name="location"
      control={control}
      render={({ field: { onChange, value, ...field } }) => (
        <Autocomplete
          {...field}
          fullWidth
          size="small"
          options={availableLocations}
          getOptionLabel={(option) => option?.region || option?.city || ''}
          isOptionEqualToValue={(option, value) => option?.id === value?.id}
          value={
            availableLocations.find(
              loc => loc.region === value || loc.city === value
            ) || null
          }
          onChange={(_, newValue) => {
            onChange(newValue?.region || newValue?.city || '');
          }}
          onInputChange={(_, newInputValue) => {
            setSearchText(newInputValue);
          }}
          loading={loadingState}
          loadingText="Loading locations..."
          noOptionsText="No locations found"
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search location"
              error={!!errors.location}
              helperText={errors.location?.message}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loadingState ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          renderOption={(props, option, { index }) => {
            // Add load more functionality when reaching near the end
            if (index === availableLocations.length - 3 && hasMorePages) {
              handleLoadMore();
            }
            return (
              <li {...props} key={option.id}>
                {option.region} - 
                <span style={{fontSize:'0.8rem', opacity:"80%", marginLeft:2}}> {option.city} </span>
              </li>
            );
          }}
          ListboxProps={{
            onScroll: (event) => {
              const listboxNode = event.currentTarget;
              if (
                listboxNode.scrollTop + listboxNode.clientHeight >=
                listboxNode.scrollHeight - 10
              ) {
                handleLoadMore();
              }
            },
          }}
        />
      )}
    />
  );
};