import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export default function CartComp({item, handleAddtoCart}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* <CardMedia
        sx={{ height: 140 }}
        image={item?.image ? item?.image : ''}
        title="green iguana"
      /> */}
      <div className='h-56 overflow-hidden'>
        <img className='w-full' src={item?.image ? item?.image : ''}/>
      </div>
      <CardContent>
        <Typography noWrap gutterBottom variant="h5" component="div">
          {item?.title ? item?.title : ""}
        </Typography>
        <Typography noWrap variant="body2" sx={{ color: 'text.secondary' }}>
        {item?.description? item?.description : ''}
        </Typography>
      </CardContent>
      <CardActions className='flex justify-between'>
        <Typography size="small">{item?.price}</Typography>
        <Button size="small" variant='contained' onClick={()=>handleAddtoCart(item)}>Add TO Cart</Button>
      </CardActions>
    </Card>
  );
}
