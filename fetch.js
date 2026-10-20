document.addEventListener('DOMContentLoaded', () => {
  const loadingStatus = document.getElementById('loading-status');
  const productContainer = document.getElementById('product-container');

  // Fungsi async untuk mengambil data produk dari API
  async function fetchProducts() {
    try {
      // Tampilkan status loading
      loadingStatus.textContent = 'Memuat data produk...';
      loadingStatus.classList.remove('error', 'hidden');

      // Ambil data dari endpoint DummyJSON (dibatasi 8 produk agar rapi)
      const response = await fetch('https://dummyjson.com/products?limit=8');

      // Cek apakah response HTTP sukses (status 200-299)
      if (!response.ok) {
        throw new Error(`Gagal mengambil data (HTTP Status: ${response.status})`);
      }

      // Ubah response ke format JSON
      const data = await response.json();

      // Sembunyikan pesan loading jika data berhasil diambil
      loadingStatus.classList.add('hidden');

      // Tampilkan data produk ke halaman web lewat DOM
      renderProducts(data.products);
    } catch (error) {
      // Penanganan error jika fetch gagal
      loadingStatus.textContent = `Terjadi kesalahan: ${error.message}`;
      loadingStatus.classList.add('error');
    }
  }

  // Fungsi manipulasi DOM untuk membuat elemen kartu produk
  function renderProducts(products) {
    productContainer.innerHTML = ''; // Bersihkan kontainer terlebih dahulu

    products.forEach((product) => {
      // Buat elemen div untuk card produk
      const card = document.createElement('div');
      card.className = 'product-card';

      // Isi elemen card menggunakan data dari API
      card.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}">
        <div>
          <h3 class="product-title">${product.title}</h3>
          <p class="product-price">$${product.price}</p>
        </div>
      `;

      // Tempelkan card ke dalam kontainer utama
      productContainer.appendChild(card);
    });
  }

  // Jalankan fungsi fetch saat halaman dimuat
  fetchProducts();
});