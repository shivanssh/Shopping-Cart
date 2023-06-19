import { Button, Card } from "react-bootstrap";
import formatCurrency from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

const   StoreItem = ({ id, name, price, imgUrl }: StoreItemProps) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromcart,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);
  return (
    <Card>
      <Card.Img src={imgUrl} variant="top" height="200px" />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity ? (
            <div
              className="d-flex flex-column align-items-center"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                <div>
                  <span className="fs-4">{quantity}</span> in cart
                </div>
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromcart(id)}
              >
                Remove
              </Button>
            </div>
          ) : (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
              + Add to cart
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
