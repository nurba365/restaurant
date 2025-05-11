import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-5 mt-12 text-sm text-gray-600 border-t">
      © {new Date().getFullYear()} Restaurant Review — Все права защищены.
    </footer>
  );
}
