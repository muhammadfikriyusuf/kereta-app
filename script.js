// Fungsi tab aktif
function openTab(evt, tabName) {
  const tabs = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
  }

  const tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.className += " active";
}

// Simpan data booking ke Firebase
document.getElementById('formBooking').addEventListener('submit', function(e) {
  e.preventDefault();

  const nama = document.getElementById('namaBooking').value;
  const dari = document.getElementById('dariBooking').value;
  const ke = document.getElementById('keBooking').value;
  const tanggal = document.getElementById('tanggalBooking').value;

  firebase.database().ref('bookings/').push({
    jenis: 'Booking',
    nama,
    dari,
    ke,
    tanggal
  });

  alert('Booking berhasil disimpan!');
  this.reset();
});

// Simpan data pembelian ke Firebase
document.getElementById('formPembelian').addEventListener('submit', function(e) {
  e.preventDefault();

  const nama = document.getElementById('namaPembelian').value;
  const jumlah = document.getElementById('jumlahTiket').value;
  const kelas = document.getElementById('kelasTiket').value;

  firebase.database().ref('pembelians/').push({
    jenis: 'Pembelian',
    nama,
    jumlah,
    kelas
  });

  alert('Tiket berhasil dibeli!');
  this.reset();
});

// Tampilkan riwayat dari Firebase
window.onload = function() {
  const daftarRiwayat = document.getElementById('daftarRiwayat');

  // Ambil data Booking
  firebase.database().ref('bookings').on('child_added', function(snapshot) {
    const data = snapshot.val();
    const item = document.createElement('li');
    item.textContent = `[Booking] ${data.nama} - Dari: ${data.dari}, Ke: ${data.ke}, Tanggal: ${data.tanggal}`;
    daftarRiwayat.appendChild(item);
  });

  // Ambil data Pembelian
  firebase.database().ref('pembelians').on('child_added', function(snapshot) {
    const data = snapshot.val();
    const item = document.createElement('li');
    item.textContent = `[Pembelian] ${data.nama} - Jumlah: ${data.jumlah}, Kelas: ${data.kelas}`;
    daftarRiwayat.appendChild(item);
  });
};