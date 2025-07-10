// src/pages/api/submit-order.js
import { supabase } from '../../../api/supabase.js';

export async function POST({ request }) {
  const data = await request.json();

  const { name, phone, address, cart, total } = data;

  const { data: order, error } = await supabase
    .from('orders')
    .insert([
      {
        name,
        phone,
        address,
        total,
        status: 'pending',
        created_at: new Date().toISOString()
      }
    ])
    .select();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  // Optional: Insert cart items into order_items table
  for (let item of cart) {
    await supabase.from('order_items').insert([
      {
        order_id: order[0].id,
        item_name: item.name,
        quantity: item.quantity,
        price: item.price
      }
    ]);
  }

  return new Response(JSON.stringify({ success: true, order }), { status: 200 });
}
