import React from 'react';
import { NavLink } from 'react-router-dom';

const categories = [
  'top',
  'general',
  'business',
  'entertainment',
  'health',
  'sports',
  'technology',
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          <NavLink to="/" className="flex items-center gap-2 text-indigo-600 font-bold text-xl mr-8">
            <span>NewsAI</span>
          </NavLink>
          
          <div className="hidden md:flex items-center space-x-4 flex-grow justify-center">
            {categories.map((category) => (
              <NavLink
                key={category}
                to={`/${category}`}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-700 hover:bg-indigo-50'
                  }`
                }
              >
                {category}
              </NavLink>
            ))}
          </div>
          
          <div className="md:hidden flex-grow">
            <select
              onChange={(e) => {
                window.location.href = `/${e.target.value}`;
              }}
              value={window.location.pathname.slice(1) || 'top'}
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {categories.map((category) => (
                <option key={category} value={category} className="capitalize">
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}