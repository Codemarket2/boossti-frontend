import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Button, Stack } from '@mui/material';

const products = [
  {
    img: '/images/cup.avif',
    title: 'Brewster Mug',
    price: 20.0,
  },
  {
    img: '/images/shirt.avif',
    title: 'ZebraBlend T-Shirt',
    price: 20.0,
  },
  {
    img: '/images/brown-bag.avif',
    title: 'Sunbeam Tote',
    price: 20.0,
  },
  {
    img: '/images/blueBag.avif',
    title: 'Azure Escape Bag',
    price: 20.0,
  },

  {
    img: '/images/shirt.avif',
    title: 'ZebraBlend T-Shirt',
    price: 20.0,
  },
  {
    img: '/images/blueBag.avif',
    title: 'Azure Escape Bag',
    price: 20.0,
  },
];

const productCategories = [
  {
    img: '/public/images/accessories.avif',
    title: 'Accessories',
  },
  {
    img: '/public/images/apparel.avif',
    title: 'Apparel',
  },
];

const SyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  // height: "100%",
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

const SyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export function Search() {
  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  );
}

export default function MainContent() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(null);

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  return (
    <Stack gap={4}>
      <Grid container justifyContent="center" alignItems="center" sx={{ background: '#f5f5f5' }}>
        <Grid xs={12} md={6} sx={{ p: 10 }}>
          <Typography gutterBottom variant="h2">
            Discover our Curated Collection
          </Typography>
          <Typography gutterBottom>
            Explore our carefully selected products for your home and lifestyle.
          </Typography>

          <Button
            variant="contained"
            sx={{
              mt: 2,
              borderRadius: 10,
              background: 'black',
              color: 'white',
              textTransform: 'capitalize',
            }}
          >
            Shop Now
          </Button>
        </Grid>

        <Grid xs={12} md={6}>
          <img src="/images/cup.avif" width="100%" height="auto" />
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12}>
        {products?.map((product) => (
          <Grid xs={12} md={4} key={product?.title}>
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(0)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 0 ? 'Mui-focused' : ''}
            >
              <CardMedia
                component="img"
                alt={product?.title}
                image={product?.img}
                aspect-ratio="16 / 9"
                sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
              />
              <SyledCardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {product?.title}
                </Typography>

                <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                  $ {product?.price}
                </StyledTypography>
              </SyledCardContent>
            </SyledCard>
          </Grid>
        ))}

        <Grid container spacing={2} columns={12}>
          {productCategories?.map((category) => (
            <Grid xs={12} md={6} key={category?.title}>
              <SyledCard
                variant="outlined"
                onFocus={() => handleFocus(0)}
                onBlur={handleBlur}
                tabIndex={0}
                className={focusedCardIndex === 0 ? 'Mui-focused' : ''}
              >
                <CardMedia
                  component="img"
                  alt={category?.title}
                  image={category.img}
                  aspect-ratio="16 / 9"
                  sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                />
                <SyledCardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {category?.title}
                  </Typography>
                  <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                    Shop Now
                  </StyledTypography>
                </SyledCardContent>
              </SyledCard>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Stack>
  );
}
