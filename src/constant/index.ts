
export const propertyTypes = [
  { value: "",            label: "Select type" },
  { value: "commercial",  label: "Commercial" },
  { value: "apartment", label: "Apartment" },
  { value: "bungalow",    label: "Bungalow" },
   { value: "detached", label: "Detached" },
  { value: "semi‑detached", label: "Semi Detached" },
  { value: "terrace",     label: "Terrace" },
  { value: "duplex",      label: "Duplex" },
  { value: "maisonette",  label: "Maisonette" },
  { value: "penthouse",   label: "Penthouse" },
  { value: "triplex",     label: "Triplex" },
  { value: "townhouse",   label: "Townhouse" },
];

export const properties = [
    {
      id: 1,
      title: 'Modern Apartment with Ocean View',
      location: '123 Coastal Highway, Malibu, CA',
      price: 850000,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=800&q=80',
      type: 'For Sale',
      propertyType:'apartment',
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      featured: true
    },
    {
      id: 2,
      title: 'Luxury Penthouse in Downtown',
      location: '456 Main St, New York, NY',
      price: 1250000,
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&w=800&q=80',
      type: 'For Sale',
      propertyType:'house',
      bedrooms: 4,
      bathrooms: 3,
      area: 2400,
      featured: true
    },
    {
      id: 3,
      title: 'Cozy Studio Near University',
      location: '789 College Blvd, Berkeley, CA',
      price: 2200,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&w=800&q=80',
      type: 'For Rent',
      propertyType:'apartment',
      bedrooms: 1,
      bathrooms: 1,
      area: 650,
      featured: false
    },
    {
      id: 4,
      title: 'Family Home with Garden',
      location: '234 Oak Street, Seattle, WA',
      price: 675000,
      image: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&w=800&q=80',
      type: 'For Sale',
      propertyType:'apartment',
      bedrooms: 4,
      bathrooms: 2.5,
      area: 2100,
      featured: true
    },
    {
      id: 5,
      title: 'Modern Office Space',
      location: '567 Business Ave, Chicago, IL',
      price: 4500,
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&w=800&q=80',
      type: 'For Rent',
      bedrooms: 0,
      bathrooms: 2,
      area: 1200,
      featured: false
    },
    {
      id: 6,
      title: 'Riverside Cottage with Dock',
      location: '890 River Rd, Charleston, SC',
      price: 520000,
      image: 'https://images.unsplash.com/photo-1574259392081-dbe3c19cd15e?auto=format&w=800&q=80',
      type: 'For Sale',
      bedrooms: 2,
      bathrooms: 1,
      area: 1050,
      featured: false
    }
  ];

  
//   export const filterOptions: FilterOption[] = [
//     { value: 'all', label: 'All properties', icon: <HouseIcon /> },
//     { value: 'location', label: 'Location', icon: <LocationOnIcon /> },
//     { value: 'sale', label: 'For sale', icon: <HomeWorkIcon /> },
//     { value: 'rent', label: 'For rent', icon: <ApartmentIcon /> },
//     { value: 'short_stay', label: 'Short stay', icon: <HomeWorkIcon /> },
//     { value: 'land', label: 'Land', icon: <TerrainIcon /> },
//   ];
 
  export const testimonials = [
    {
      name: 'Jennifer Smith',
      title: 'First-time Buyer',
      content: 'The agents at Paragone Signature made my first home-buying experience stress-free and enjoyable. They guided me through every step of the process and found me the perfect property within my budget.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Michael Johnson',
      title: 'Property Investor',
      content: `I've been working with Paragone Signature for years to build my investment portfolio. Their market knowledge and property management services are unmatched. Highly recommend their team!`,
      rating: 4.5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Rebecca Williams',
      title: 'Property Seller',
      content: 'Excellent service from start to finish. The team at Paragone Signature marketed my property beautifully and sold it for above asking price in just two weeks!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Richard Davis',
      title: 'Commercial Client',
      content: `Affordable price and exceptional service. They found the perfect commercial location for my business and negotiated great terms on the lease. I couldn't be happier.`,
      rating: 4,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    }
  ];
  
  // Partner logos
  export const partners = [
    { name: 'Karen', logo: 'https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741309558/image_30_d8wils.png' },
    { name: 'The Box', logo: 'https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741265757/image_25_k84gx6.png' },
    { name: 'Landmark', logo: 'https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741309558/image_30_d8wils.png' },
    { name: 'Karen', logo: 'https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741309556/image_26_dt6kpp.png' },
    { name: 'Bruce', logo: 'https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741309553/image_29_ny5slc.png' },
    { name: 'Nest', logo: 'https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741265757/image_25_k84gx6.png' },
    { name: 'The Box', logo: 'https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741309556/image_26_dt6kpp.png' },
  ];
  
  
