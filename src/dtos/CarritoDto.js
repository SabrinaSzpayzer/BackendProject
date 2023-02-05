export default class CarritoDto {
    constructor({ _id, productos, timestamp }) {
        this._id = _id
        this.productos = productos
        this.timestamp = timestamp
    }
}

export function asDto(carr) {
    if (Array.isArray(carr))
        return carr.map(c => new CarritoDto(c))
    else
        return new CarritoDto(carr)
}