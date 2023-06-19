import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItem from "./CartItem";
import formatCurrency from "../utilities/formatCurrency";
import itemList from "../data/items.json";

type ShoppingCartProps = {
  isCartOpen: boolean;
};

const ShoppingCart = ({ isCartOpen }: ShoppingCartProps) => {
  const { closeCart, cartItem } = useShoppingCart();

  return (
    <Offcanvas show={isCartOpen} placement="end" onHide={closeCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItem.map((item) => {
            return <CartItem key={item.id} {...item} />;
          })}
          <div className="ms-auto fw-bold fs-5">
            Total{' '}
            {formatCurrency(
              cartItem.reduce((total, currentItem) => {
                const item = itemList.find(
                  (item) => item.id === currentItem.id
                );
                return total + (item?.price || 0) * currentItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
