import { getCurrentUser } from '@/lib/auth-actions';
import Card from '@/components/ui/Card';

export default async function OrdersPage() {
  const user = await getCurrentUser();
  const orders = user.orders?.edges || [];

  return (
    <div>
      <div className="mb-4 p-3 bg-primary/30 border border-primary rounded-sm text-emerald-800 text-sm">
        For support, please contact <a href="mailto:hello@grublify.com" className="underline">hello@grublify.com</a>.
      </div>
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {orders.length === 0 ? (
        <p className="text-secondary">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(({ node: order }) => (
            <Card key={order.id}>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                <div>
                  <div className="text-secondary font-bold text-lg">
                    Order <span className="ml-1">#{order.name.replace('#', '')}</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Placed: {new Date(order.processedAt).toLocaleDateString()}
                  </div>
                  <div className="text-secondary text-sm mt-1 font-semibold">
                    Status: {order.fulfillmentStatus}
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:text-right">
                  <span className="text-secondary font-bold text-xl">
                    {order.totalPrice.amount} {order.totalPrice.currencyCode}
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <span className="font-medium text-gray-700">Items:</span>
                <ul className="list-disc list-inside text-gray-600 text-sm mt-1">
                  {order.lineItems.edges.map(({ node: item }) => (
                    <li key={item.title}>
                      {item.title} &times; {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 