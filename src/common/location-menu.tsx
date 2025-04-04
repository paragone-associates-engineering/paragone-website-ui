import { useLocations } from '../hooks/use-locations';
import { MenuItem } from '@mui/material';

const LocationMenuItems = () => {
    const {locations} = useLocations()
  return (
    <>
      {locations.map((location: string, index: number) => (
        <MenuItem key={index} value={location}>
          {location}
        </MenuItem>
      ))}
    </>
  );
};

export default LocationMenuItems;
