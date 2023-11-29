import { OrderStatus } from "@prisma/client";

export const getOrderStatus = (orderStatus: OrderStatus) => {
  return {
    [OrderStatus.PAYMENT_CONFIRMED]: "Pagamento recebido",
    [OrderStatus.WAITING_FOR_PAYMENT]: "Aguardando pagamento",
  }[orderStatus];
};
