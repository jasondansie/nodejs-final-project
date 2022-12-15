'use strict'

const adapt = (entry) => {
    return {
        id: +entry.number,
        name: entry.name,
        quantity: +entry.quantity,
        rating: entry.rating,
        genre: entry.genre
    }
}

module.exports = {adapt}