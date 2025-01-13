// schemas/sale.ts
import { defineField, defineType } from 'sanity';

export const sales =  defineType({
  name: 'sales',
  title: 'Sales',
  type: 'document',
  fields: [
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],  // Reference to the 'product' schema
      description: 'Select the product for this sale',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quantity_sold',
      title: 'Quantity Sold',
      type: 'number',
      description: 'Number of units sold',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'sale_price',
      title: 'Sale Price',
      type: 'number',
      description: 'Price at which the product was sold',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'date_of_sale',
      title: 'Date of Sale',
      type: 'datetime',
      description: 'When the sale occurred',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customer_id',
      title: 'Customer ID',
      type: 'string',
      description: 'Unique identifier for the customer',
      validation: (Rule) => Rule.required(),
    }),
  
  ],
  preview: {
    select: {
      title: 'product.name',
      subtitle: '_id',
      media: 'product.image',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title || 'No product selected',
        subtitle: subtitle || 'No sale ID',
        media: media || 'https://via.placeholder.com/150',
      };
    },
  },
});
