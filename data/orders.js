import { fetchWithResponse } from "./fetcher";

export function getCart() {
  return fetchWithResponse("cart", {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
}

export function getOrders() {
  return fetchWithResponse("orders", {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
}

export function completeCurrentOrder(payment_type_id) {
  console.log(payment_type_id)
  return fetchWithResponse(`cart/complete`, {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ payment_type_id })
  });
}
