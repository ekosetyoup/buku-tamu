// Konfigurasi Supabase
const { createClient } = supabase;
const supa = createClient('https://ijlwxttwdyslscgopann.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqbHd4dHR3ZHlzbHNjZ29wYW5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MjQ4NzQsImV4cCI6MjA2NTIwMDg3NH0.EiwUAyT6chVNnlzm-RoC1kcPrnV-Mdgw3BEAQ16lGi8');

// Elemen DOM
const form = document.getElementById('formTamu');
const daftar = document.getElementById('daftarTamu');
const inputNama = document.getElementById('nama');
const inputPesan = document.getElementById('pesan');
const inputCari = document.getElementById('cariNama');

let dataTamu = [];

// Ambil dan tampilkan data
async function muatTamu(filter = '') {
  let query = supa.from('tamu').select('*').order('created_at', { ascending: false });
  if (filter) query = query.ilike('nama', `%${filter}%`);

  const { data, error } = await query;
  if (error) return alert('Gagal mengambil data');

  dataTamu = data;
  tampilkanTamu();
}

function tampilkanTamu() {
  daftar.innerHTML = '';
  dataTamu.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${item.nama}:</strong> ${item.pesan}
      <button onclick="hapusTamu(${item.id})">Hapus</button>
      <button onclick="editTamu(${item.id})">Edit</button>
    `;
    daftar.appendChild(li);
  });
}

// Tambah data
form.addEventListener('submit', async e => {
  e.preventDefault();
  const nama = inputNama.value.trim();
  const pesan = inputPesan.value.trim();
  if (!nama || !pesan) return;

  const { error } = await supa.from('tamu').insert({ nama, pesan });
  if (error) return alert('Gagal menambahkan data');

  form.reset();
  muatTamu();
});

// Hapus data
async function hapusTamu(id) {
  if (!confirm('Yakin ingin menghapus?')) return;

  const { error } = await supa.from('tamu').delete().eq('id', id);
  if (error) return alert('Gagal menghapus');
  muatTamu();
}

// Edit data
function editTamu(id) {
  const tamu = dataTamu.find(x => x.id === id);
  const namaBaru = prompt('Ubah nama:', tamu.nama);
  const pesanBaru = prompt('Ubah pesan:', tamu.pesan);
  if (!namaBaru || !pesanBaru) return;

  supa.from('tamu').update({ nama: namaBaru, pesan: pesanBaru }).eq('id', id)
    .then(() => muatTamu())
    .catch(() => alert('Gagal mengubah'));
}

// Cari tamu
inputCari.addEventListener('input', () => {
  const kata = inputCari.value.trim();
  muatTamu(kata);
});

// Load awal
muatTamu();
