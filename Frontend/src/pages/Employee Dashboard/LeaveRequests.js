import React, { useState } from 'react';

export default function LeaveRequestPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const leaveTypes = [
    { value: '', label: 'Select leave type' },
    { value: 'sick', label: 'Sick Leave' },
    { value: 'vacation', label: 'Vacation' },
    { value: 'personal', label: 'Personal Leave' },
    { value: 'maternity', label: 'Maternity Leave' },
    { value: 'paternity', label: 'Paternity Leave' },
    { value: 'other', label: 'Other' },
  ];

  function validate() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Employee name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Employee email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) newErrors.email = 'Please enter a valid email address';
    }
    if (!form.leaveType) newErrors.leaveType = 'Please select a leave type';
    if (!form.startDate) newErrors.startDate = 'Please select the start date';
    if (!form.endDate) newErrors.endDate = 'Please select the end date';
    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      newErrors.endDate = 'End date cannot be before start date';
    }
    if (!form.reason.trim()) newErrors.reason = 'Please provide a reason for leave';
    return newErrors;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
      return;
    }
    setErrors({});
    console.log('Leave Request data:', form);
    setSubmitted(true);
    setForm({
      name: '',
      email: '',
      leaveType: '',
      startDate: '',
      endDate: '',
      reason: '',
    });
  }

  return (
    <>
      <style>{`
        :root {
          --color-bg: #ffffff;
          --color-text: #6b7280;
          --color-primary: #111827;
          --color-input-bg: #f9fafb;
          --color-border: #d1d5db;
          --radius: 12px;
          --shadow-card: 0 4px 12px rgba(0,0,0,0.05);
          --transition: 0.3s ease;
          --max-width: 720px;
        }
        * {
          box-sizing: border-box;
        }
        body, html, #root {
          margin: 0; padding: 0; height: 100%;
          font-family: 'Poppins', sans-serif;
          background-color: var(--color-bg);
          color: var(--color-text);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        main.container {
          max-width: var(--max-width);
          margin: 4rem auto;
          padding: 0 1.5rem;
          display: flex;
          justify-content: center;
          min-height: 100vh;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        main.container::before {
          content: "";
          position: absolute;
          top: -80px;
          left: 50%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle at center, #5eead4 20%, transparent 70%);
          transform: translateX(-50%);
          opacity: 0.25;
          filter: blur(80px);
          z-index: -1;
          pointer-events: none;
        }
        .card {
          background: var(--color-bg);
          border-radius: var(--radius);
          box-shadow: var(--shadow-card);
          padding: 3rem 3rem 2rem;
          max-width: 500px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          border: 1.5px solid transparent;
          transition: border-color var(--transition);
        }
        .card:focus-within {
          border-color: var(--color-primary);
        }
        h1 {
          font-weight: 700;
          font-size: 3rem;
          margin: 0 0 1.5rem;
          color: var(--color-primary);
          user-select: none;
          text-align: center;
        }
        label {
          font-weight: 600;
          margin-bottom: 0.3rem;
          display: inline-block;
          color: var(--color-primary);
          user-select: none;
        }
        input[type="text"],
        input[type="email"],
        input[type="date"],
        select,
        textarea {
          width: 100%;
          padding: 0.65rem 1rem;
          font-size: 1rem;
          border: 1.5px solid var(--color-border);
          border-radius: var(--radius);
          background-color: var(--color-input-bg);
          color: var(--color-primary);
          transition: border-color var(--transition), box-shadow var(--transition), background-color var(--transition);
          font-family: inherit;
          resize: vertical;
          min-height: 40px;
        }
        input[type="text"]:focus,
        input[type="email"]:focus,
        input[type="date"]:focus,
        select:focus,
        textarea:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 5px rgba(17, 24, 39, 0.3);
          background-color: #fff;
        }
        textarea {
          min-height: 90px;
        }
        select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3csvg fill='none' stroke='%23343a40' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3e%3c/path%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1em;
          padding-right: 2.5rem;
          cursor: pointer;
        }
        button {
          background-color: var(--color-primary);
          color: white;
          border: none;
          padding: 1rem 2rem;
          font-size: 1.25rem;
          font-weight: 700;
          border-radius: var(--radius);
          cursor: pointer;
          user-select: none;
          transition: background-color var(--transition), transform var(--transition);
          align-self: center;
          min-width: 140px;
        }
        button:hover,
        button:focus {
          background-color: #374151;
          outline: none;
          transform: scale(1.03);
        }
        .error-message {
          color: #dc2626;
          font-weight: 600;
          font-size: 0.875rem;
          margin-top: 0.25rem;
          user-select: none;
        }
        @media (max-width: 600px) {
          h1 {
            font-size: 2.25rem;
          }
          .card {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
      <main className="container" role="main">
        <section aria-labelledby="leave-request-heading" className="card" tabIndex={-1}>
          <h1 id="leave-request-heading">Leave Request</h1>
          <form onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="name">Employee Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                aria-describedby={errors.name ? 'error-name' : undefined}
                aria-invalid={errors.name ? 'true' : 'false'}
                required
              />
              {errors.name && <p className="error-message" id="error-name">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email">Employee Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your.email@example.com"
                value={form.email}
                onChange={handleChange}
                aria-describedby={errors.email ? 'error-email' : undefined}
                aria-invalid={errors.email ? 'true' : 'false'}
                required
              />
              {errors.email && <p className="error-message" id="error-email">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="leaveType">Leave Type</label>
              <select
                id="leaveType"
                name="leaveType"
                value={form.leaveType}
                onChange={handleChange}
                aria-describedby={errors.leaveType ? 'error-leaveType' : undefined}
                aria-invalid={errors.leaveType ? 'true' : 'false'}
                required
              >
                {leaveTypes.map(({ value, label }) => (
                  <option key={value} value={value} disabled={value === ''}>
                    {label}
                  </option>
                ))}
              </select>
              {errors.leaveType && <p className="error-message" id="error-leaveType">{errors.leaveType}</p>}
            </div>

            <div>
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                aria-describedby={errors.startDate ? 'error-startDate' : undefined}
                aria-invalid={errors.startDate ? 'true' : 'false'}
                required
              />
              {errors.startDate && <p className="error-message" id="error-startDate">{errors.startDate}</p>}
            </div>

            <div>
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                aria-describedby={errors.endDate ? 'error-endDate' : undefined}
                aria-invalid={errors.endDate ? 'true' : 'false'}
                required
              />
              {errors.endDate && <p className="error-message" id="error-endDate">{errors.endDate}</p>}
            </div>

            <div>
              <label htmlFor="reason">Reason for Leave</label>
              <textarea
                id="reason"
                name="reason"
                placeholder="Briefly explain the reason for your leave"
                value={form.reason}
                onChange={handleChange}
                aria-describedby={errors.reason ? 'error-reason' : undefined}
                aria-invalid={errors.reason ? 'true' : 'false'}
                required
                rows="4"
              />
              {errors.reason && <p className="error-message" id="error-reason">{errors.reason}</p>}
            </div>

            <button type="submit" aria-live="polite">Send Request</button>
          </form>
        </section>
      </main>
    </>
  );
}
