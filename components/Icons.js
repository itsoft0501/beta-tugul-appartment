export default function Icons() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <symbol id="i-phone" viewBox="0 0 24 24"><path fill="currentColor" d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.6 3.6a1 1 0 0 1-.25 1z" /></symbol>
      <symbol id="i-pin" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" /></symbol>
      <symbol id="i-zoom" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5M11 8.5v5M8.5 11h5" /></g></symbol>
      <symbol id="i-arrow" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" /></symbol>
      <symbol id="i-shield" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z M9 12l2 2 4-4" /></symbol>
      <symbol id="i-tree" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" d="M12 21v-5M12 3l6 8h-3l4 5H5l4-5H6l6-8z" /></symbol>
      <symbol id="i-wallet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" d="M4 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7zm0 0l11-3v3M16 13.5h.01" /></symbol>
    </svg>
  );
}

export function Icon({ id, className = 'ic', style }) {
  return (
    <svg className={className} style={style} aria-hidden="true">
      <use href={`#${id}`} />
    </svg>
  );
}
