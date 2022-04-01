import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Rating from '@mui/material/Rating';
import { useGetUserStarRating } from '@frontend/shared/hooks/starRating/getStarRating';
import { useStarRating } from './util/updateUserRating';

interface StarRatingProps {
  parentId: string;
}

export default function StarRating({ parentId }: StarRatingProps) {
  const { data, loading } = useGetUserStarRating(parentId);
  const [rating, setRating] = useState<undefined | any>();
  const [value, setValue] = useState(data?.getRatingCounts?.averageStarRating);
  const { handleRating } = useStarRating(parentId);
  useEffect(() => {
    if (data?.getRatingCounts?.userStarRating) {
      setValue(data?.getRatingCounts?.userStarRating?.starRating);
      setRating(data?.getRatingCounts?.userStarRating);
    }
  }, [data]);
  return (
    <>
      <Box
        component="fieldset"
        mb={3}
        className="flex flex-row"
        borderColor="transparent"
        style={{ display: 'flex', flexDirection: 'row', margin: '0.8rem 1rem' }}
      >
        <Rating
          disabled={loading}
          name="simple-controlled"
          value={value}
          className="w-1/2"
          onChange={(event, newValue) => {
            handleRating(newValue, value, rating?._id);
            setValue(newValue);
          }}
        />
        <div className="m-1">
          {data?.getRatingCounts?.ratingCount}
          {data?.getRatingCounts?.ratingCount === 1 ? ' review' : ' reviews'}
        </div>
      </Box>
    </>
  );
}
