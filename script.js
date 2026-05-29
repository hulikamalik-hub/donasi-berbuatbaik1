document.addEventListener("DOMContentLoaded", function () {
    
    // Inisialisasi Elemen Halaman (Step)
    const step1 = document.getElementById("step-1");
    const step2 = document.getElementById("step-2");
    const step3 = document.getElementById("step-3");

    // Inisialisasi Tombol Aksi
    const btnLanjutQris = document.getElementById("btn-lanjut-qris");
    const btnKonfirmasiBayar = document.getElementById("btn-konfirmasi-bayar");
    const btnSelesaiKembali = document.getElementById("btn-selesai-kembali");
    const btnShareUtama = document.getElementById("btn-share-utama");

    // Input dan Display
    const inputNominal = document.getElementById("input-nominal");
    const displayNominalQris = document.getElementById("display-nominal-qris");

    // 1. PINDAH DARI STEP 1 KE STEP 2 (DONASI SEKARANG -> QRIS)
    if (btnLanjutQris) {
        btnLanjutQris.addEventListener("click", function () {
            const nominalValue = inputNominal.value;
            
            if (!nominalValue || nominalValue <= 0) {
                alert("Silakan masukkan nominal donasi yang valid terlebih dahulu, min!");
                return;
            }

            // Format nominal ke Rupiah untuk ditampilkan di halaman QRIS
            const formattedNominal = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            }).format(nominalValue);

            displayNominalQris.textContent = formattedNominal;

            // Alur perpindahan halaman
            step1.classList.add("hidden");
            step1.classList.remove("active");
            step2.classList.remove("hidden");
            step2.classList.add("active");
        });
    }

    // 2. PINDAH DARI STEP 2 KE STEP 3 (KONFIRMASI -> TERIMA KASIH)
    if (btnKonfirmasiBayar) {
        btnKonfirmasiBayar.addEventListener("click", function () {
            step2.classList.add("hidden");
            step2.classList.remove("active");
            step3.classList.remove("hidden");
            step3.classList.add("active");
        });
    }

    // 3. TOMBOL SELESAI (KEMBALI KE BERANDA AWAL)
    if (btnSelesaiKembali) {
        btnSelesaiKembali.addEventListener("click", function () {
            // Reset input form
            if(inputNominal) inputNominal.value = "";
            const inputNama = document.getElementById("input-nama");
            if(inputNama) inputNama.value = "";

            // Kembali ke halaman pertama
            step3.classList.add("hidden");
            step3.classList.remove("active");
            step1.classList.remove("hidden");
            step1.classList.add("active");
        });
    }

    // 4. FITUR UTAMA: TOMBOL BAGIKAN SISTEM HP (WEB SHARE API)
    if (btnShareUtama) {
        btnShareUtama.addEventListener("click", async () => {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: 'Napas Kecil Zayn',
                        text: 'Mari bersama-sama ulurkan tangan membantu perjuangan adik Zayn melalui program donasi ini.',
                        url: 'https://donasi-napas-kecil-zayn.netlify.app'
                    });
                    console.log('Berhasil memunculkan share sistem HP!');
                } catch (error) {
                    console.log('Batal membagikan:', error);
                }
            } else {
                // Skenario fallback jika browser tidak mendukung navigator.share
                const urlWeb = 'https://donasi-napas-kecil-zayn.netlify.app';
                navigator.clipboard.writeText(urlWeb);
                alert("Tautan website donasi telah disalin! Silakan langsung tempel (paste) ke WhatsApp atau media sosial kamu.");
            }
        });
    }
});
