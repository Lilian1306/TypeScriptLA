
export type Guitar = {
    id: number
    name: string
    image: string
    description: string
    price: number
}


export type cartItem = Guitar & {
    quantity: number
}

