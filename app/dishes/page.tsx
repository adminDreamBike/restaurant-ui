'use client'

import { Suspense } from "react"
import { DishDetails } from "../components/Dish/DishDetails"

export default function Dishes() {
    return (
        <Suspense fallback={<div>Loading dishes...</div>}>
            <DishDetails />
        </Suspense>
        
    )
}