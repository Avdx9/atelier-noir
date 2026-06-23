'use client';
import { useState } from 'react';

const SERVICES = [
  { name:'Signature Cut & Style',     dur:'75 min', price:'£95'  },
  { name:'Bespoke Colour',            dur:'180 min',price:'£185' },
  { name:'Balayage & Toning',         dur:'210 min',price:'£220' },
  { name:'Keratin Treatment',         dur:'150 min',price:'£175' },
  { name:'Blow Dry & Finish',         dur:'45 min', price:'£65'  },
  { name:'Bridal Trial',              dur:'120 min',price:'£145' },
  { name:'Full Head Highlights',      dur:'150 min',price:'£165' },
  { name:'Scalp Treatment',           dur:'60 min', price:'£85'  },
];

const TIMES = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00'];

/* ── Get today + 90 days as min/max ── */
const today = new Date().toISOString().split('T')[0];
const maxDate = new Date(Date.now() + 90*24*60*60*1000).toISOString().split('T')[0];

export default function BookingForm() {
  const [form, setForm] = useState({
    name:'', phone:'', email:'', service:'', date:'', time:'', notes:''
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errMsg, setErrMsg] = useState('');

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const selectedService = SERVICES.find(s => s.name === form.service);

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.service || !form.date || !form.time) {
      setErrMsg('Please fill all required fields before submitting.');
      return;
    }
    setErrMsg('');
    setStatus('loading');

    try {
      /* ── Web3Forms — free, unlimited, no backend needed ──
         Get your access key from web3forms.com (free, 2 mins)
         Replace YOUR_ACCESS_KEY below with your actual key    */
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: 'ca9e582c-b32a-4540-bd0c-4c824562cecd',
          subject:    `New Booking Request — ${form.name} — ${form.date} at ${form.time}`,
          from_name:  'Atelier Noir Booking System',
          // Booking details
          'Client Name':    form.name,
          'Phone Number':   form.phone,
          'Email':          form.email || 'Not provided',
          'Service':        form.service,
          'Date Requested': form.date,
          'Time Requested': form.time,
          'Duration':       selectedService?.dur || '',
          'Price':          selectedService?.price || '',
          'Notes':          form.notes || 'None',
          // Redirect after submission (optional)
          redirect:         'false',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrMsg('Something went wrong. Please call us directly.');
      }
    } catch {
      setStatus('error');
      setErrMsg('Network error. Please call us directly on +44 (0)20 7123 4567.');
    }
  };

  if (status === 'success') return (
    <div className="booking-form form-success">
      <div className="form-success-icon">✓</div>
      <h3 className="form-success-title">Request Received</h3>
      <p className="form-success-text">
        Thank you, {form.name.split(' ')[0]}.<br/>
        Your <em>{form.service}</em> appointment request for {form.date} at {form.time} has been sent.<br/><br/>
        We will confirm by text to <strong>{form.phone}</strong> within 30 minutes during salon hours.
      </p>
    </div>
  );

  return (
    <div className="booking-form">
      <h3 className="form-title">Reserve Your Visit</h3>
      <p className="form-sub">We confirm every appointment by text within 30 minutes.</p>

      {errMsg && <div className="form-error">{errMsg}</div>}

      {/* Row 1 */}
      <div className="form-row">
        <div className="form-field">
          <label className="form-label">Full Name *</label>
          <input className="form-input" placeholder="Jane Smith"
            value={form.name} onChange={e => update('name', e.target.value)} />
        </div>
        <div className="form-field">
          <label className="form-label">Phone Number *</label>
          <input className="form-input" placeholder="+44 7700 000000" type="tel"
            value={form.phone} onChange={e => update('phone', e.target.value)} />
        </div>
      </div>

      {/* Row 2 */}
      <div className="form-row">
        <div className="form-field">
          <label className="form-label">Email Address</label>
          <input className="form-input" placeholder="jane@email.com" type="email"
            value={form.email} onChange={e => update('email', e.target.value)} />
        </div>
        <div className="form-field">
          <label className="form-label">Treatment *</label>
          <select className="form-input" value={form.service}
            onChange={e => update('service', e.target.value)}>
            <option value="">Select a service</option>
            {SERVICES.map(s => (
              <option key={s.name} value={s.name}>
                {s.name} — {s.price} ({s.dur})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 3 */}
      <div className="form-row">
        <div className="form-field">
          <label className="form-label">Preferred Date *</label>
          <input className="form-input" type="date"
            min={today} max={maxDate}
            value={form.date} onChange={e => update('date', e.target.value)} />
        </div>
        <div className="form-field">
          <label className="form-label">Preferred Time *</label>
          <select className="form-input" value={form.time}
            onChange={e => update('time', e.target.value)}>
            <option value="">Select a time</option>
            {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <span className="slot-unavailable">
            Availability confirmed on booking
          </span>
        </div>
      </div>

      {/* Notes */}
      <div className="form-field-full">
        <label className="form-label">Additional Notes</label>
        <textarea className="form-input" style={{ height:'80px', resize:'vertical' }}
          placeholder="Previous colour history, allergies, special requests..."
          value={form.notes} onChange={e => update('notes', e.target.value)} />
      </div>

      {/* Selected service summary */}
      {selectedService && (
        <div style={{
          background:'var(--warm)', border:'1px solid var(--border)',
          padding:'14px 18px', marginBottom:'14px',
          display:'flex', justifyContent:'space-between', alignItems:'center'
        }}>
          <span style={{ fontSize:'0.72rem', color:'var(--cream-mid)', fontStyle:'italic' }}>
            {selectedService.name}
          </span>
          <div style={{ display:'flex', gap:'16px', alignItems:'center' }}>
            <span style={{ fontSize:'0.6rem', letterSpacing:'0.15em', color:'var(--muted)', textTransform:'uppercase' }}>
              {selectedService.dur}
            </span>
            <span style={{ fontFamily:'var(--font-d)', fontSize:'1.1rem', color:'var(--gold)' }}>
              {selectedService.price}
            </span>
          </div>
        </div>
      )}

      <button className="form-btn" onClick={handleSubmit}
        disabled={status === 'loading'}>
        <span>{status === 'loading' ? 'Sending Request...' : 'Request Appointment →'}</span>
      </button>

      <p className="form-note">
        No payment required to book. We'll text to confirm your slot.<br/>
        48-hour cancellation notice appreciated.
      </p>
    </div>
  );
}
