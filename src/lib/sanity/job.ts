import { defineField, defineType } from 'sanity';

export const jobSchema = defineType({
  name: 'job',
  title: 'Job Update Notification',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Update Notification Title',
      type: 'string',
      validation: (Rule: any) => Rule.required().error('Job title is required'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL path)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required().error('Slug is required'),
    }),
    defineField({
      name: 'company',
      title: 'Company Name',
      type: 'string',
      validation: (Rule: any) => Rule.required().error('Company name is required'),
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'opportunityType',
      title: 'Opportunity Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-Time Job', value: 'Full-Time' },
          { title: 'Internship Drive', value: 'Internship' },
        ],
        layout: 'radio',
      },
      initialValue: 'Full-Time',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'Remote',
    }),
    defineField({
      name: 'experienceLevel',
      title: 'Experience Level',
      type: 'string',
      options: {
        list: [
          { title: 'Fresher (0 YOE)', value: 'Fresher' },
          { title: '1-3 YOE', value: '1-3 YOE' },
          { title: '3+ YOE', value: '3+ YOE' },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'eligibleBatches',
      title: 'Eligible Graduation Batches',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '2021', value: '2021' },
          { title: '2022', value: '2022' },
          { title: '2023', value: '2023' },
          { title: '2024', value: '2024' },
          { title: '2025', value: '2025' },
          { title: '2026', value: '2026' },
        ],
      },
    }),
    defineField({
      name: 'qualification',
      title: 'Eligible Degrees / Qualifications',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'B.Tech / B.E', value: 'B.Tech / B.E' },
          { title: 'M.Tech / M.E', value: 'M.Tech / M.E' },
          { title: 'BCA / MCA', value: 'BCA / MCA' },
          { title: 'B.Sc / M.Sc', value: 'B.Sc / M.Sc' },
          { title: 'Any Graduate', value: 'Any Graduate' },
        ],
      },
    }),
    defineField({
      name: 'domain',
      title: 'Job Domain',
      type: 'string',
      options: {
        list: [
          { title: 'IT / Software', value: 'IT/Software' },
          { title: 'Non-IT', value: 'Non-IT' },
          { title: 'Core Engineering', value: 'Core' },
          { title: 'Design & UI/UX', value: 'Design' },
          { title: 'Product & Management', value: 'Product' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'workMode',
      title: 'Work Mode',
      type: 'string',
      options: {
        list: [
          { title: 'Remote', value: 'Remote' },
          { title: 'Hybrid', value: 'Hybrid' },
          { title: 'Onsite', value: 'Onsite' },
        ],
      },
      initialValue: 'Remote',
    }),
    defineField({
      name: 'applyUrl',
      title: 'Official Employer Application Portal URL',
      type: 'url',
      validation: (Rule: any) => Rule.required().uri({
        scheme: ['http', 'https']
      }).error('Must be a valid official URL'),
    }),
    defineField({
      name: 'salary',
      title: 'Salary / Stipend (Optional)',
      description: 'e.g. "₹8-12 LPA" or "₹20,000/month stipend"',
      type: 'string',
    }),
    defineField({
      name: 'verifiedAt',

      title: 'Verified Notification Timestamp',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'keyDetails',
      title: 'Key Details & Important Notes',
      description: 'Bonds, service agreements, shift timings, stipend details.',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'description',
      title: 'Notification Overview',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }),
  ],
});
