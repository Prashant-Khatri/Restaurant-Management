"use client"

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router=useRouter()
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-slate-100">
          Welcome to <span className="text-emerald-600">Yokai Restaurant</span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
          Experience delicious food, warm hospitality, and a seamless dining
          experience. Freshly prepared meals served with love ❤️
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow" onClick={()=>router.push('/place-order')}>
            Place an Order
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
              🍕 Fresh & Tasty Food
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Prepared daily using high-quality ingredients to give you the best taste.
            </p>
          </div>

          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
              ⏱️ Quick Service
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Order easily and get your food served quickly by our friendly staff.
            </p>
          </div>

          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
              ⭐ Customer Satisfaction
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              We care about your experience and always aim to exceed expectations.
            </p>
          </div>

        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-emerald-600 text-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">
            Ready to enjoy a great meal?
          </h2>
          <p className="mt-4 text-emerald-100">
            Place your order now and let us serve you something special.
          </p>

          <button className="mt-6 px-8 py-3 rounded-lg bg-white text-emerald-700 font-semibold hover:bg-emerald-50" onClick={()=>router.push('/place-order')}>
            Order Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} Yokai Restaurant. All rights reserved.
      </footer>
    </div>
  );
}
