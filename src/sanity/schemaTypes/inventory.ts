import { defineType, defineField } from 'sanity';

export const inventory = defineType({
  name: 'inventory',
  title: 'Inventory',
  type: 'document',
  fields: [
    // Reference to the product document
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
      description: 'Reference to the associated product',
      validation: (Rule) => Rule.required(),
    }),

    // SKU field
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
      description: 'Stock Keeping Unit (must be unique)',
      validation: (Rule) => Rule.required(),
    }),

    // Stock levels field
    defineField({
      name: 'stock_levels',
      title: 'Stock Levels',
      type: 'array',
      description: 'Available stock based on size and color',
      of: [
        {
          type: 'object',
          name: 'stock_level', // Name added here
          title: 'Stock Level',
          fields: [
            {
              name: 'size',
              title: 'Size',
              type: 'string',
              description: 'Size of the item',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'color',
              title: 'Color',
              type: 'string',
              description: 'Color of the item',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
              description: 'Quantity in stock',
              validation: (Rule) => Rule.min(0).required(),
            },
          ],
        },
      ],
    }),

    // Price adjustment field
    defineField({
      name: 'price_adjustment',
      title: 'Price Adjustment',
      type: 'object',
      description: 'Adjustments related to pricing or item condition',
      fields: [
        defineField({
          name: 'discount',
          title: 'Discount',
          type: 'number',
          description: 'Discount percentage (0–100)',
          validation: (Rule) => Rule.min(0).max(100).required(),
        }),
        defineField({
          name: 'faulty_item',
          title: 'Faulty Item',
          type: 'boolean',
          description: 'Indicates whether the item is faulty',
        }),
        defineField({
          name: 'replacement_policy',
          title: 'Replacement Policy',
          type: 'string',
          description: 'Policy for replacing the item',
          options: {
            list: [
              { title: 'None', value: 'None' },
              { title: 'Exchange Only', value: 'Exchange Only' },
              { title: 'Full Refund', value: 'Full Refund' },
            ],
          },
        }),
      ],
    }),

    // Supplier contact field
    defineField({
      name: 'supplier_contact',
      title: 'Supplier Contact',
      type: 'string',
      description: 'Supplier contact information',
      validation: (Rule) => Rule.required(),
    }),
  ],

  // Preview configuration
  preview: {
    select: {
      title: 'sku', // SKU as the primary title
      subtitle: 'product._ref', // Show the referenced product ID as subtitle
      media: 'product.image', // Use the image field for thumbnail display
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: `SKU: ${title}`,
        subtitle: `Product ID: ${subtitle}`,
        media, // Show the image in the dashboard
      };
    },
  },
});
