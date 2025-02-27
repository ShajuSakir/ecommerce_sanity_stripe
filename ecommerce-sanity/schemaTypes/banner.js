import { defineField, defineType } from 'sanity';

export const banner = defineType({
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
    }),
    defineField({
      name: 'product',
      title: 'Product',
      type: 'string',
    }),
    defineField({
      name: 'desc',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'smallText',
      title: 'Small Text',
      type: 'string',
    }),
    defineField({
      name: 'midText',
      title: 'Mid Text',
      type: 'string',
    }),
    defineField({
      name: 'largeText1',
      title: 'Large Text 1',
      type: 'string',
    }),
    defineField({
      name: 'largeText2',
      title: 'Large Text 2',
      type: 'string',
    }),
    defineField({
      name: 'discount',
      title: 'Discount',
      type: 'string',
    }),
    defineField({
      name: 'saleTime',
      title: 'Sale Time',
      type: 'string',
    }),
  ],
});
