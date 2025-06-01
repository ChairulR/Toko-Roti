import React from 'react'
import OrderTrack from '../../../components/order-tracking'

const product = {
  id: 1,
  name: "Chocolate Cake",
  price: 5000,
  image: "/placeholder.svg?height=40&width=40",
  flavor: "sweet",
  reviews: 10,
}

const user = {
  id: 1,
  name: "Bob Biki Mentega Cokelat",
}

const order = {
  id: 1,
  userId: 1,
  productId: 1,
  rating: 5,
  status: "COMPLETED",
  createdAt: "2023-10-01T10:00:00Z",
  updatedAt: "2023-10-01T12:00:00Z",
  product,
  user,
}


export default async function Page({ params }) {
  //ini id dari product yang di gunakan untuk mencari data order
  const { id } = params
 

  return (
    <div>
      <OrderTrack order={order} />
    </div>
  )
}
