// src/components/InquiriesMessages.jsx
import React, { useState } from "react";

const InquiriesMessages = ({ inquiries = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch =
      inquiry.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inquiry.userEmail && inquiry.userEmail.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (inquiry.propertyTitle && inquiry.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter ? inquiry.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Inquiries & Messages</h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by name, email or property"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          <option value="read">Read</option>
          <option value="unread">Unread</option>
        </select>
      </div>

      {/* Inquiry Cards */}
      {filteredInquiries.length === 0 ? (
        <p>No inquiries found.</p>
      ) : (
        <div className="space-y-2">
          {filteredInquiries.map(inquiry => (
            <div
              key={inquiry.id}
              className="border p-3 rounded flex justify-between items-start bg-white shadow-sm"
            >
              <div>
                <p className="font-semibold">{inquiry.userName}</p>
                <p className="text-sm text-gray-600">{inquiry.userEmail}</p>
                {inquiry.propertyTitle && (
                  <p className="text-sm text-gray-600">Property: {inquiry.propertyTitle}</p>
                )}
                <p className="text-sm text-gray-600">{inquiry.message}</p>
                <p className="text-xs text-gray-400">{new Date(inquiry.date).toLocaleString()}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                  Mark as Read
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  Delete
                </button>
                <a
                  href={`mailto:${inquiry.userEmail}`}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-center"
                >
                  Reply
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InquiriesMessages;
