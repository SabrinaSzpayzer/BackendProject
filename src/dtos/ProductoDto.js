export default class ProductoDto {
    constructor({ _id, title, description, price, thumbnail, category, timestamp }) {
        this._id = _id
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.category = category
        this.timestamp = timestamp
    }
}

export function asDto(prod) {
    if (Array.isArray(prod))
        return prod.map(p => new ProductoDto(p))
    else
        return new ProductoDto(prod)
}