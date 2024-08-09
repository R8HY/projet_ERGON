// src/components/Cart.js
import React from 'react';
import { Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Cart({ cart, removeFromCart }) {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Panier
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="body2">Votre panier est vide.</Typography>
      ) : (
        <List>
          {cart.map((item) => (
            <ListItem key={item.id}>
              <ListItemText primary={item.name} secondary={`Prix: ${item.price}`} />
              <ListItemSecondaryAction>
                <IconButton onClick={() => removeFromCart(item.id)} edge="end" aria-label="Supprimer">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}

export default Cart;
