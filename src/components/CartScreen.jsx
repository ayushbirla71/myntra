import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { IconButton, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function CartScreen({ open, setOpen }) {
  const [product, setProducts] = React.useState(
    localStorage.getItem("MYNTRA")
      ? JSON.parse(localStorage?.getItem("MYNTRA"))
      : []
  );
  //   const [open, setOpen] = React.useState(false);

  React.useEffect(()=>{
    setProducts( localStorage.getItem("MYNTRA")
    ? JSON.parse(localStorage?.getItem("MYNTRA"))
    : [])
  },[open])
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleDelete = (item)=>{
    let products = product?.filter((items)=>items?.id !== item?.id);
    setProducts(product)
    localStorage.setItem('MYNTRA', JSON.stringify(products))
    
  }

  const DrawerList = (
    <Box
      sx={{ width: { xs: 300, md: 500 } }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {product && product?.length >= 1
          ? product?.map((item, index) => (
              <ListItem secondaryAction={
                <IconButton onClick={()=>handleDelete(item)}>
                <DeleteOutlineOutlinedIcon />
              </IconButton>
              }>
                <ListItemButton sx={{ display: "flex", gap: 2, overflow:'hidden', paddingRight:3 }}>
                  <div>
                    <div className="h-10, w-10">
                      <img src={item?.image} />
                    </div>
                  </div>
                  <Box>
                    <Typography noWrap>{item?.title}</Typography>
                    <Typography variant="body2">{item?.description}</Typography>
                    <div>
                   
                    </div>
                  </Box>
                  <div></div>
                </ListItemButton>
              </ListItem>
            ))
          : null}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer anchor={"right"} open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
