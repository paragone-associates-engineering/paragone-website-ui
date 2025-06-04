import { useLocations } from '../hooks/use-locations';
import { MenuItem } from '@mui/material';

const LocationMenuItems = () => {
    const {locations} = useLocations()
  return (
    <>
      {locations.map((location, index: number) => (
        <MenuItem key={index} value={location.region}>
          {location.region}
        </MenuItem>
      ))}
    </>
  );
};

export default LocationMenuItems;
