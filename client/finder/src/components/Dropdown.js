import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };  

  return (
    <div>
      <div style={{padding: '0 24px'}} onClick={handleClick}>{props.currFilter}</div>
      <Menu
        id="filter"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MenuItem onClick={() => {props.updateFilter('city');setAnchorEl(null)}}>City</MenuItem>
        <MenuItem onClick={() => {props.updateFilter('state');setAnchorEl(null)}}>State</MenuItem>
      </Menu>
    </div>
  );
}

function LongMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {data,anchor,setAnchor} = props;
  const open = Boolean(anchor);
  let cities = [];
  
  if(data.data)
    cities = data.data
  
  console.log(props);
  
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchor}
        keepMounted
        open={open}
        onClose={handleClose}
        anchorOrigin={{vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{
          style: {
            marginTop:30,
            maxHeight: 125,
            width: 200,
          },
        }}
      >
        {cities.map((option,idx) => (
          <MenuItem key={idx} selected={option === 'Pyxis'} onClick={handleClose}>
            {option.city}, {option.regionCode}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export {LongMenu};