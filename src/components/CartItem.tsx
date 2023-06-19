import { Button, Stack } from "react-bootstrap";
import itemList from "../data/items.json";
import { useShoppingCart } from "../context/ShoppingCartContext";
import formatCurrency from "../utilities/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromcart } = useShoppingCart();

  const item = itemList.find((item) => item.id === id);
  if (!item) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3} className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        alt="norefferer"
        style={{ width: "125px", height: "75px" }}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          <span className="text-muted" style={{ fontSize: ".75rem" }}>
            x{quantity}
          </span>{" "}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
      <Button variant="outline-danger" size="sm" onClick={()=>removeFromcart(item.id)}>&times;</Button>
    </Stack>
  );
};

export default CartItem;
