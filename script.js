const SUPABASE_URL = 'https://ijlwxttwdyslscgopann.supabase.co';
const SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqbHd4dHR3ZHlzbHNjZ29wYW5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MjQ4NzQsImV4cCI6MjA2NTIwMDg3NH0.EiwUAyT6chVNnlzm-RoC1kcPrnV-Mdgw3BEAQ16lGi8';

const headers = {
  'apikey': SUPABASE_API_KEY,
  'Authorization': `Bearer ${SUPABASE_API_KEY}`,
  'Content-Type': 'application/json',
};

async function getTamu() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/tamu?select=*`, {
    headers,
  });
  const data = await res.json();

  const daftar = document.getElementById('daftarTamu');
  daftar.innerHTML = data.reverse().map(t => `
    <li><strong>${t.nama}</strong>: ${t.pesan}</li>
  `).join('');
}

document.getElementById('formTamu').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nama = document.getElementById('nama').value;
  const pesan = document.getElementById('pesan').value;

  await fetch(`${SUPABASE_URL}/rest/v1/tamu`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ nama, pesan }),
  });

  document.getElementById('formTamu').reset();
  getTamu();
});

getTamu();
