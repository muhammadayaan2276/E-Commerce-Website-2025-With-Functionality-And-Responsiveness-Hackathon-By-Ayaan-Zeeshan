import { defineField, defineType } from 'sanity';

export const shipment = defineType({
  name: 'shipment',
  title: 'Shipment',
  type: 'document',
  fields: [
    defineField({
      name: 'sales',
      title: 'Sales',
      type: 'reference',
      to: [{ type: 'sales' }], // Reference to the 'sales' schema
      description: 'Link to the sale associated with this shipment',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tracking_id',
      title: 'Tracking ID',
      type: 'string',
      description: 'Unique identifier for the shipment',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order_id',
      title: 'Order ID',
      type: 'string',
      description: 'The order associated with the shipment',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shipment_status',
      title: 'Shipment Status',
      type: 'string',
      description: 'Current status of the shipment (e.g., shipped, in transit, delivered)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'estimated_delivery_date',
      title: 'Estimated Delivery Date',
      type: 'datetime',
      description: 'Estimated date for the shipment to be delivered',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'carrier',
      title: 'Carrier',
      type: 'string',
      description: 'The carrier handling the shipment (e.g., UPS, FedEx)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shipment_origin',
      title: 'Shipment Origin',
      type: 'string',
      description: 'Location from which the shipment originated',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shipment_destination',
      title: 'Shipment Destination',
      type: 'string',
      description: 'Final destination of the shipment',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customer_phone',
      title: 'Customer Phone',
      type: 'string',
      description: 'Customer phone number for shipment updates',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'tracking_id',
      subtitle: 'shipment_status',
      media: 'sales.product.image',  // Use the product image from the referenced sale
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title || 'No tracking ID',
        subtitle: subtitle || 'No shipment status',
        media: media || 'https://via.placeholder.com/150', // Fallback image if media is not available
      };
    },
  },
});
