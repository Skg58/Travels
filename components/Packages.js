"use client"

import React, { use } from 'react';
import Link from 'next/link';
import Head from 'next/head';

const popularPacks = [
  {
    name: 'Starter Pack',
    description: 'Essential tools to get started quickly.',
    features: [
      'Included stay',
      'Food',
      'Access to community events',
      'Basic support for queries',
    ],
    details: 'Perfect for individuals or small groups looking to experience the essentials with comfort and convenience.',
  },
  {
    name: 'Pro Pack',
    description: 'Advanced features for professionals.',
    features: [
      'Included stay',
      'Food',
      'Guided Tours',
      'Priority check-in',
      'Access to exclusive workshops',
    ],
    mostBought: true,
    details: 'Ideal for professionals who want more activities, guidance, and networking opportunities during their stay.',
  },
  {
    name: 'Enterprise Pack',
    description: 'Complete solution for large teams.',
    features: [
      'Included stay',
      'Food',
      'Guided Tours',
      'VIP Support',
      'Customizable schedules',
      'Team-building activities',
    ],
    details: 'Designed for organizations or large groups seeking a tailored experience with premium support and flexibility.',
  },
];

const Page = () => {
  const getPackageUrl = (packName) =>
    `/packages/${encodeURIComponent(packName.toLowerCase().replace(/\s+/g, '-'))}`;

  return ( 
    <div className="min-h-screen bg-gray-50 py-12 px-4 mt-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Popular Packs
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {popularPacks.map((pack) => (
            <div
              key={pack.name}
              className={`
                relative bg-white rounded-lg shadow-md p-6 flex flex-col items-center
                transition-all duration-300 ease-in-out
                hover:scale-105 hover:shadow-xl
                ${pack.mostBought ? 'border-2 border-indigo-500 bg-indigo-50 hover:bg-indigo-100' : 'hover:bg-gray-100'}
              `}
            >
              {pack.mostBought && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  Most Bought
                </span>
              )}
              <h2 className={`text-xl font-semibold mb-2 ${pack.mostBought ? 'text-indigo-700' : 'text-gray-700'}`}>
                {pack.name}
              </h2>
              <p className="text-gray-500 mb-4 text-center">{pack.description}</p>
              <div className="mb-4 text-gray-700 text-sm text-center">
                {pack.details}
              </div>
              <ul className="mb-4">
                {pack.features.map((feature, idx) => (
                  <li key={idx} className="text-gray-600 text-sm flex items-center">
                    <span className="mr-2 text-green-500">✓</span> {feature}
                  </li>
                ))}
              </ul>
              <Link href={"/Booking"}  >
                <div
                  className="mt-6 px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition block text-center"
                  aria-label={`View details for ${pack.name}`}
                >
                  Book Package
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;