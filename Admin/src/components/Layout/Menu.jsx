import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MonochromePhotosIcon from '@mui/icons-material/MonochromePhotos';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import PermDeviceInformationIcon from '@mui/icons-material/PermDeviceInformation';
import { Link } from "react-router-dom";

// Adicione a prop `open` aqui
const Menu = ({ open }) => {
    const linksMenu = [
        {
            nome: "Home",
            icone: EmojiEventsIcon,
            route: "/home"
        },
        {
            nome: "Retrato Preto",
            icone: MonochromePhotosIcon,
            route: "/retrato-preto"
        },
        {
            nome: "Retrato Colorido",
            icone: ColorLensIcon,
            route: "/retrato-colorido"
        },
        {
            nome: "informacoes",
            icone: PermDeviceInformationIcon,
            route: "/informacoes"
        },
    ];

    return (
        <List>
            {linksMenu.map((menu, index) => (
                <ListItem key={menu.nome} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton 
                      component={Link} 
                      to={menu.route} 
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                          }}
                        >
                            {React.createElement(menu.icone)}
                        </ListItemIcon>
                        <ListItemText primary={menu.nome} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
}

export default Menu;
