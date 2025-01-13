import { type SchemaTypeDefinition } from 'sanity'
import {product} from './product'
import {inventory} from './inventory'
import {sales} from './sales'
import {shipment} from './shipment'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, inventory, sales, shipment],
}
