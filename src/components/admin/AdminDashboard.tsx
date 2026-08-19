import React, { useState, useEffect } from 'react';
import { X, RefreshCw, Shield } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { db } from '../../database/db';
import type { BookingStatus } from '../../database/types';
import { getDashboardStats, updateBookingStatus } from '../../services/bookingService';

export const AdminDashboard: React.FC = () => {
  const { isAdminOpen, closeAdmin } = useBooking();
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'rooms' | 'messages' | 'subscribers'>('overview');
  const [, setTick] = useState(0);

  useEffect(() => {
    // Re-render when db changes
    const unsubscribe = db.subscribe(() => {
      setTick((t) => t + 1);
    });
    return unsubscribe;
  }, []);

  if (!isAdminOpen) return null;

  const stats = getDashboardStats();
  const config = db.getConfig();
  const bookings = db.getBookings();
  const rooms = db.getRooms();
  const messages = db.getContactMessages();
  const subscribers = db.getNewsletterSubscribers();

  const handleStatusChange = (bookingId: string, newStatus: BookingStatus) => {
    updateBookingStatus(bookingId, newStatus);
  };

  const handleReset = () => {
    if (window.confirm('Reset local resort database to factory seed state? All test bookings and messages will be refreshed.')) {
      db.resetDatabase();
    }
  };

  const formatPrice = (amt: number) => {
    return `${config.currencySymbol}${amt.toLocaleString('en-IN')}`;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-6xl bg-[#141312] border border-stone/20 text-ivory rounded-none shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone/15 bg-charcoal shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-bronze/10 border border-bronze/40 flex items-center justify-center text-bronze">
              <Shield size={16} />
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-[0.35em] text-bronze font-semibold block">
                KAIROS RESORT MANAGEMENT SYSTEM
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-ivory">
                Local Operations & PMS Console
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-stone/30 hover:border-stone text-[10px] uppercase tracking-[0.2em] text-stone hover:text-ivory transition-colors"
              title="Reset test data"
            >
              <RefreshCw size={12} />
              <span className="hidden sm:inline">Reset Seed Data</span>
            </button>
            <button
              onClick={closeAdmin}
              className="p-2 text-stone hover:text-ivory border border-transparent hover:border-stone/30 transition-all"
              aria-label="Close admin dashboard"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 bg-[#181716] border-b border-stone/15 flex gap-6 overflow-x-auto text-xs uppercase tracking-[0.2em] shrink-0">
          {[
            { id: 'overview', label: 'Executive Overview' },
            { id: 'bookings', label: `Reservations (${bookings.length})` },
            { id: 'rooms', label: `Accommodations (${rooms.length})` },
            { id: 'messages', label: `Inquiries (${messages.length})` },
            { id: 'subscribers', label: `Newsletter (${subscribers.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 border-b-2 font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-ivory border-bronze font-semibold'
                  : 'text-stone/50 border-transparent hover:text-stone'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-grow space-y-8">
          
          {/* 1. OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-6 bg-charcoal/60 border border-stone/15 space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-bronze block">Total Revenue</span>
                  <div className="font-serif text-3xl sm:text-4xl text-ivory font-light">
                    {formatPrice(stats.totalRevenue)}
                  </div>
                  <span className="text-[10px] text-stone/50 block">From confirmed stays</span>
                </div>

                <div className="p-6 bg-charcoal/60 border border-stone/15 space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-bronze block">Total Bookings</span>
                  <div className="font-serif text-3xl sm:text-4xl text-ivory font-light">
                    {stats.totalBookings}
                  </div>
                  <span className="text-[10px] text-stone/50 block">{stats.confirmedBookings} confirmed</span>
                </div>

                <div className="p-6 bg-charcoal/60 border border-stone/15 space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-bronze block">Upcoming Arrivals</span>
                  <div className="font-serif text-3xl sm:text-4xl text-ivory font-light">
                    {stats.upcomingArrivalsCount}
                  </div>
                  <span className="text-[10px] text-stone/50 block">Arriving soon</span>
                </div>

                <div className="p-6 bg-charcoal/60 border border-stone/15 space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-bronze block">Active Suites</span>
                  <div className="font-serif text-3xl sm:text-4xl text-ivory font-light">
                    {stats.totalRooms}
                  </div>
                  <span className="text-[10px] text-stone/50 block">100% operational</span>
                </div>
              </div>

              {/* Recent Bookings Preview */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-2xl font-light text-ivory">Recent Reservation Records</h4>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="text-xs uppercase tracking-[0.2em] text-bronze hover:underline"
                  >
                    View All
                  </button>
                </div>

                <div className="overflow-x-auto border border-stone/15">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#181716] text-[9px] uppercase tracking-[0.2em] text-stone/50 border-b border-stone/15">
                      <tr>
                        <th className="p-4">Code</th>
                        <th className="p-4">Guest</th>
                        <th className="p-4">Residence</th>
                        <th className="p-4">Dates</th>
                        <th className="p-4">Total</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone/10 bg-charcoal/30">
                      {bookings.slice(0, 5).map((b) => (
                        <tr key={b.id} className="hover:bg-charcoal/60 transition-colors">
                          <td className="p-4 font-mono font-medium text-bronze">{b.reservationCode}</td>
                          <td className="p-4">
                            <div className="font-medium text-ivory">{b.guestName}</div>
                            <div className="text-[10px] text-stone/50">{b.email}</div>
                          </td>
                          <td className="p-4 text-stone/90">{b.roomName}</td>
                          <td className="p-4 text-stone/70">
                            {formatDate(b.checkIn)} — {formatDate(b.checkOut)} ({b.nights}n)
                          </td>
                          <td className="p-4 font-serif text-sm text-ivory">{formatPrice(b.total)}</td>
                          <td className="p-4">
                            <span
                              className={`text-[9px] uppercase tracking-[0.15em] px-2.5 py-1 font-semibold rounded-none border ${
                                b.status === 'CONFIRMED'
                                  ? 'bg-green-950/40 text-green-300 border-green-800/40'
                                  : b.status === 'PENDING'
                                  ? 'bg-amber-950/40 text-amber-300 border-amber-800/40'
                                  : b.status === 'CANCELLED'
                                  ? 'bg-red-950/40 text-red-300 border-red-800/40'
                                  : 'bg-stone-900 text-stone-300 border-stone-700'
                              }`}
                            >
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 2. BOOKINGS MANAGEMENT */}
          {activeTab === 'bookings' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-1">
                <h4 className="font-serif text-3xl font-light text-ivory">Guest Reservations</h4>
                <p className="text-xs text-stone/70">
                  Manage reservations, review guest details, and update live booking statuses.
                </p>
              </div>

              {bookings.length === 0 ? (
                <div className="p-12 text-center border border-stone/15 bg-charcoal/30 text-stone/50">
                  No reservations recorded yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="p-6 bg-charcoal/50 border border-stone/15 space-y-4 hover:border-stone/30 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone/15 gap-4">
                        <div>
                          <span className="font-mono text-xl text-bronze font-semibold tracking-wider">
                            {booking.reservationCode}
                          </span>
                          <span className="text-[10px] text-stone/50 block">Booked on {formatDate(booking.createdAt)}</span>
                        </div>

                        {/* Status Switcher */}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase tracking-[0.2em] text-stone/50">Status:</span>
                          <select
                            value={booking.status}
                            onChange={(e) => handleStatusChange(booking.id, e.target.value as BookingStatus)}
                            className="bg-[#1f1e1d] border border-stone/30 text-ivory text-xs px-3 py-1.5 focus:outline-none focus:border-bronze"
                          >
                            <option value="CONFIRMED">CONFIRMED</option>
                            <option value="PENDING">PENDING</option>
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                        <div>
                          <span className="text-[9px] uppercase tracking-[0.2em] text-stone/50 block">Guest</span>
                          <div className="font-medium text-ivory">{booking.guestName}</div>
                          <div className="text-[10px] text-stone/50">{booking.email}</div>
                          <div className="text-[10px] text-stone/50">{booking.phone}</div>
                        </div>

                        <div>
                          <span className="text-[9px] uppercase tracking-[0.2em] text-stone/50 block">Suite</span>
                          <div className="font-medium text-ivory">{booking.roomName}</div>
                          <div className="text-[10px] text-stone/50">{booking.adults} Adults, {booking.children} Children</div>
                        </div>

                        <div>
                          <span className="text-[9px] uppercase tracking-[0.2em] text-stone/50 block">Dates</span>
                          <div className="font-medium text-ivory">{formatDate(booking.checkIn)} — {formatDate(booking.checkOut)}</div>
                          <div className="text-[10px] text-stone/50">{booking.nights} Nights Stay</div>
                        </div>

                        <div>
                          <span className="text-[9px] uppercase tracking-[0.2em] text-stone/50 block">Payment Summary</span>
                          <div className="font-serif text-lg text-ivory font-light">{formatPrice(booking.total)}</div>
                          <div className="text-[10px] text-stone/50">Tax: {formatPrice(booking.tax)}</div>
                        </div>
                      </div>

                      {booking.specialRequests && (
                        <div className="pt-2 border-t border-stone/10 text-xs text-stone/70">
                          <span className="text-bronze font-medium">Guest Notes: </span>
                          <span>“{booking.specialRequests}”</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 3. ROOMS OVERVIEW */}
          {activeTab === 'rooms' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-1">
                <h4 className="font-serif text-3xl font-light text-ivory">Resort Accommodations</h4>
                <p className="text-xs text-stone/70">
                  Live inventory of all luxury villas and residences at Kairos.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rooms.map((room) => (
                  <div key={room.id} className="p-6 bg-charcoal/40 border border-stone/15 space-y-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={room.images[0]}
                        alt={room.name}
                        className="w-28 h-20 object-cover border border-stone/20 shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h5 className="font-serif text-2xl font-light text-ivory">{room.name}</h5>
                        </div>
                        <p className="text-xs text-stone/60">{room.size} • Up to {room.capacity} Guests</p>
                        <div className="font-serif text-lg text-bronze">{formatPrice(room.pricePerNight)} / night</div>
                      </div>
                    </div>

                    <p className="text-xs text-stone/70 line-clamp-2">{room.description}</p>

                    <div className="flex flex-wrap gap-2 pt-2 border-t border-stone/10">
                      {room.amenities.slice(0, 3).map((a, i) => (
                        <span key={i} className="text-[9px] bg-[#1d1c1b] px-2 py-1 border border-stone/20 text-stone/70">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. INQUIRIES */}
          {activeTab === 'messages' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-1">
                <h4 className="font-serif text-3xl font-light text-ivory">Concierge Inquiries</h4>
                <p className="text-xs text-stone/70">
                  Direct guest messages and custom itinerary requests submitted via the contact form.
                </p>
              </div>

              {messages.length === 0 ? (
                <div className="p-12 text-center border border-stone/15 bg-charcoal/30 text-stone/50">
                  No contact messages received yet. Submit a message in the Contact section to test!
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className="p-6 bg-charcoal/50 border border-stone/15 space-y-3">
                      <div className="flex items-center justify-between pb-3 border-b border-stone/15">
                        <div>
                          <div className="font-medium text-ivory">{msg.name}</div>
                          <div className="text-[10px] text-stone/50">{msg.email} • {msg.phone}</div>
                        </div>
                        <span className="text-[10px] text-stone/40">{formatDate(msg.createdAt)}</span>
                      </div>

                      <p className="text-xs text-stone/90 leading-relaxed font-light">“{msg.message}”</p>

                      {(msg.preferredDates || msg.guests) && (
                        <div className="text-[11px] text-stone/60 pt-2 border-t border-stone/10">
                          {msg.preferredDates && <span>Preferred Dates: {msg.preferredDates} • </span>}
                          {msg.guests && <span>Party: {msg.guests}</span>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 5. NEWSLETTER SUBSCRIBERS */}
          {activeTab === 'subscribers' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-1">
                <h4 className="font-serif text-3xl font-light text-ivory">Notes from Kairos Subscribers</h4>
                <p className="text-xs text-stone/70">
                  List of emails registered to receive occasional editorial dispatches from the resort.
                </p>
              </div>

              {subscribers.length === 0 ? (
                <div className="p-12 text-center border border-stone/15 bg-charcoal/30 text-stone/50">
                  No newsletter subscribers yet. Enter your email in the footer to test!
                </div>
              ) : (
                <div className="overflow-x-auto border border-stone/15">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#181716] text-[9px] uppercase tracking-[0.2em] text-stone/50 border-b border-stone/15">
                      <tr>
                        <th className="p-4">Email Address</th>
                        <th className="p-4">Subscribed Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone/10 bg-charcoal/30">
                      {subscribers.map((sub) => (
                        <tr key={sub.id} className="hover:bg-charcoal/60">
                          <td className="p-4 text-ivory font-medium">{sub.email}</td>
                          <td className="p-4 text-stone/60">{formatDate(sub.subscribedAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
