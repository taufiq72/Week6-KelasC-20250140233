document.addEventListener('DOMContentLoaded', () => {
  // Seleksi elemen form dan input menggunakan DOM
  const userForm = document.getElementById('user-form');
  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const feedbackInput = document.getElementById('feedback-text');
  const formFeedback = document.getElementById('form-feedback');

  // Pasang Event Listener 'submit' pada form
  userForm.addEventListener('submit', (event) => {
    // Mencegah perilaku default form (page reload saat submit)
    event.preventDefault();

    // Ambil nilai dari masing-masing input & hapus spasi berlebih
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const feedback = feedbackInput.value.trim();

    // VALIDASI 1: Cek apakah ada input yang kosong
    if (!username || !email || !feedback) {
      showFeedback('Harap isi semua kolom input terlebih dahulu!', 'error');
      return;
    }

    // VALIDASI 2: Cek format email sederhana
    if (!email.includes('@') || !email.includes('.')) {
      showFeedback('Format email tidak valid!', 'error');
      return;
    }

    // UMPAN BALIK SUKSES: Jika semua validasi lolos
    showFeedback(`Terima kasih, ${username}! Pesan kamu berhasil dikirim.`, 'success');

    // Kosongkan kembali form setelah sukses
    userForm.reset();
  });

  // Fungsi penolong untuk menampilkan pesan umpan balik secara dinamis
  function showFeedback(message, type) {
    formFeedback.textContent = message;
    formFeedback.className = `feedback-box ${type}`; // Memberi kelas 'success' atau 'error'
    formFeedback.classList.remove('hidden'); // Tampilkan kotak pesan
  }
});