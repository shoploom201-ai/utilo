const en = {
  langName: 'English',
  defaultCountry: 'GB',
  tagline: 'Free tax calculators and image tools that run right in your browser.',
  nav: { home: 'Home', language: 'Language' },
  footer: { about: 'About', privacy: 'Privacy Policy', contact: 'Contact', note: 'All tools are free to use.' },
  home: {
    title: 'Free online tax calculators and image tools',
    intro: 'Quick, private tools for everyday work. No sign-up and no uploads — everything runs on your device.',
    categories: { tax: 'Tax calculators', finance: 'Finance calculators', image: 'Image tools' },
  },
  common: {
    privacyNote: 'Runs entirely in your browser. Your numbers and files never leave your device.',
    howTo: 'How to use',
    faq: 'Frequently asked questions',
    lastReviewed: 'Rates last reviewed',
  },
  tools: {
    'vat-calculator': {
      name: 'VAT Calculator',
      short: 'Add or remove VAT, GST or consumption tax for 17 countries.',
      metaDescription:
        'Free VAT calculator: add or remove VAT or GST from any amount with standard and reduced rates for the UK, EU, Japan, Korea, Australia and more.',
      ui: {
        country: 'Country',
        rate: 'Tax rate',
        standard: 'Standard',
        reduced: 'Reduced',
        amount: 'Amount',
        mode: 'Calculation',
        add: 'Add tax (net → gross)',
        remove: 'Remove tax (gross → net)',
        net: 'Net amount',
        tax: 'Tax',
        gross: 'Gross amount',
        disclaimer:
          'For estimates only. Rules for specific goods and services vary, so check with your national tax authority before filing.',
      },
      howTo: [
        'Choose the country and the tax rate that applies to your item.',
        'Enter the amount.',
        'Choose whether the amount excludes tax (add) or already includes it (remove). Results update instantly.',
      ],
      faq: [
        { q: 'How do I remove VAT from a price?', a: 'Divide the gross price by 1 plus the rate. With 20% VAT, 120 ÷ 1.20 = 100 net, so the VAT is 20.' },
        { q: 'What is the difference between VAT and GST?', a: 'They are the same kind of consumption tax. Australia, New Zealand and Singapore call it GST, and Japan calls it consumption tax.' },
        { q: 'Why are there reduced rates?', a: 'Many countries tax essentials such as food, books or medicine at a lower rate. Choose “Reduced” when your item qualifies.' },
      ],
    },
    'loan-calculator': {
      name: 'Loan Calculator',
      short: 'Monthly payment, total interest and a full repayment schedule for any loan.',
      metaDescription:
        'Free loan calculator: work out the monthly payment, total interest and repayment schedule for a mortgage, car or personal loan. Compare annuity, equal principal and interest-only repayment.',
      ui: {
        amount: 'Loan amount',
        rate: 'Annual interest rate (%)',
        years: 'Term (years)',
        method: 'Repayment method',
        annuity: 'Equal payments (annuity)',
        equalPrincipal: 'Equal principal',
        bullet: 'Interest only, principal at end',
        payment: 'Monthly payment',
        totalInterest: 'Total interest',
        totalPaid: 'Total repaid',
        schedule: 'Monthly repayment schedule',
        month: 'Month',
        principal: 'Principal',
        interest: 'Interest',
        balance: 'Balance',
        disclaimer: 'For estimates only. Fees, insurance and variable rates are not included; your lender’s figures may differ.',
      },
      howTo: [
        'Enter the loan amount, the annual interest rate and the term in years.',
        'Choose a repayment method to see how the monthly payment and total interest change.',
        'Open the schedule to see how much principal and interest you pay each month.',
      ],
      faq: [
        { q: 'What is the difference between the repayment methods?', a: 'With equal payments you pay the same amount every month. With equal principal you repay the same principal each month, so payments start higher and fall over time. With interest only you pay just the interest and repay the whole principal at the end.' },
        { q: 'Which method costs the least interest?', a: 'Equal principal usually costs the least because the balance falls fastest. Interest only costs the most because the full balance stays outstanding until the end.' },
        { q: 'Are fees and insurance included?', a: 'No. The calculator uses a fixed rate and ignores fees, insurance and rate changes, so treat the result as an estimate.' },
      ],
    },
    'image-compressor': {
      name: 'Image Compressor & Converter',
      short: 'Shrink, resize and convert images to WebP, JPEG or PNG without uploading them.',
      metaDescription:
        'Free image compressor: reduce file size, resize and convert photos to WebP, JPEG or PNG in your browser. No upload, no sign-up, works with many files at once.',
      ui: {
        choose: 'Choose images or drop them here',
        format: 'Output format',
        quality: 'Quality',
        maxWidth: 'Max width (px)',
        keepSize: 'Keep original',
        original: 'Original',
        result: 'Result',
        download: 'Download',
        smaller: 'smaller',
        larger: 'larger',
        error: 'This image could not be read.',
        pngNote: 'PNG is lossless, so the quality slider has no effect.',
      },
      howTo: [
        'Choose one or more images, or drag them onto the box.',
        'Pick an output format and quality. WebP usually gives the smallest files.',
        'Optionally set a maximum width, then download each result.',
      ],
      faq: [
        { q: 'Are my images uploaded to a server?', a: 'No. Compression happens inside your browser, so your photos stay on your device.' },
        { q: 'Which format should I choose?', a: 'WebP for websites, JPEG for wide compatibility with photos, and PNG for screenshots or images that need transparency.' },
        { q: 'Why did my file get larger?', a: 'Some images are already well compressed. Try a lower quality, a smaller width or a different format.' },
      ],
    },
  },
  pages: {
    about: {
      title: 'About',
      body: [
        '{site} is a collection of small, free tools for everyday tasks such as working out sales tax or preparing images for the web.',
        'Every tool runs in your browser. We do not ask you to sign up, and we never see the numbers or files you use.',
        'Tax rates are checked against official sources and the review date is shown on each calculator. Results are estimates and are not tax advice.',
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      body: [
        'Last updated: 2026-11-23.',
        'The tools on {site} do not collect personal information. Calculations and image processing happen in your browser, and files are never uploaded.',
        'We use Google AdSense to show ads. Google and its partners use cookies to serve ads based on your previous visits to this and other websites.',
        'You can turn off personalised advertising at https://www.google.com/settings/ads or learn more at https://policies.google.com/technologies/ads.',
        'Our hosting provider may record standard technical information such as IP address and browser type for security purposes.',
        'If you have questions about this policy, contact us at {email}.',
      ],
    },
    contact: {
      title: 'Contact',
      body: [
        'Found a wrong tax rate, a bug or have an idea for a new tool? We would like to hear from you.',
        'Email: {email}',
        'We usually reply within a few working days.',
      ],
    },
  },
};

export type Dict = typeof en;
export default en;
