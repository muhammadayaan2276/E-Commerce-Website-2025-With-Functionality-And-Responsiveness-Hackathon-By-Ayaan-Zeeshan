import { type SchemaTypeDefinition } from 'sanity'
import {product} from './product'

import {sales} from './sales'
import {shipment} from './shipment'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, sales, shipment],
}
