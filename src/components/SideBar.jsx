
import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Home from "../screen/Home";
import CartScreen from "./CartScreen";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { CheckBox } from "@mui/icons-material";
import { Button, Checkbox } from "@mui/material";
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';

const drawerWidth = 240;

function SideBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [categories, setCategories]= React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [selectedSort, setSelectedSort] = React.useState(false);
  const [products, setProducts] = React.useState(null);


  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };


const  handleSort = (sort)=>{

if(selectedSort){
    let list = products?.sort((e,b)=>b?.price - e?.price);
    setProducts(list)
}
else{

    let list = products?.sort((e,b)=> e?.price - b?.price);
    setProducts(list)
}
setSelectedSort((e)=>!e)

}


  React.useEffect(()=>{
    handleGetCategeris();
  },[])


  const handleGetCategeris = async ()=>{

    try {
      let res = await fetch("https://fakestoreapi.com/products/categories");
      

      
      
      if(res){
        res =  await res.json();

        if(res?.length>=1){
          console.log("categres", res);
          setCategories(res)
          
        }
      }
    } catch (error) {
      console.log(error?.message);
      
    }
  }

  const handleSetCategory = (item)=>{
    setSelectedCategory(item)
    
  }


  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const drawer = (
    <Box>
      <Toolbar>
        {" "}
        <Typography variant="h6" display={{ xs: "none", sm: "block" }}>
          {" "}
          MYNTRA
        </Typography>{" "}
      </Toolbar>

      <List>
        {categories?.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={()=>handleSetCategory(text)}>
              <IconButton >
              <Checkbox {...label} checked={selectedCategory === text} size="small" />

              </IconButton>
              <Typography>{text}</Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider/>
      <Box>
        <Button onClick={()=>handleSort()}>
          Sort By {selectedSort ? <ArrowUpwardOutlinedIcon/> : <ArrowDownwardOutlinedIcon/>}
        </Button>
      </Box>
    
    </Box>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box display={"flex"}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          color: "WindowText",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            // color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div className="flex flex-row justify-between w-full">
            <Typography
              display={{ xs: "block", sm: "none" }}
              variant="h6"
              noWrap
              component="div"
            >
              MYNTRA
            </Typography>
            <div className="flex justify-end w-full">
              <IconButton onClick={()=> setOpen(true)}>
                <AddShoppingCartIcon/>
              </IconButton>
              <CartScreen setOpen ={setOpen} open ={open}/>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box>
        <Home setProducts={setProducts} products={products}  selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
      </Box>
    </Box>
  );
}

SideBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default SideBar;
