import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 px-6 text-center text-gray-500 text-sm mb-20 md:mb-0">
      <p>© {new Date().getFullYear()} Thangyan Alwan. Recreating Cultural Memories.</p>
      <p className="mt-2 italic">Celebrating the Myanmar Water Festival.</p>
    </footer>
  );
};

export default Footer;
