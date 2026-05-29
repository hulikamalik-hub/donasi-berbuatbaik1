document.addEventListener("DOMContentLoaded", function () {
    // Navigasi Elemen Utama Halaman
    const openDonationButtons = document.querySelectorAll(".open-donation-btn");
    const closeModalBtn = document.getElementById("close-modal-btn");
    const donationModal = document.getElementById("donation-modal");
    const submitDonationBtn = document.getElementById("submit-donation-btn");
    const successPage = document.getElementById("success-page");
    const backHomeBtn = document.getElementById("back-home-btn");

    // Elemen Input Form & QRIS Dinamis
    const donationAmountInput = document.getElementById("donation-amount-input");
    const qrisDynamicSection = document.getElementById("qris-dynamic-section");
    const displayTotalPrice = document.getElementById("display-total-price");
    const qrisCustomSubtext = document.getElementById("qris-custom-subtext");
    const proofFileInput = document.getElementById("proof-file");

    // Elemen Baca Selengkapnya & Lihat Donatur
    const readMoreBtn = document.getElementById("read-more-btn");
    const extendedStory = document.getElementById("extended-story");
    const seeMoreDonorsBtn = document.getElementById("see-more-donors-btn");
    const moreDonors = document.getElementById("more-donors");

    // 1. Fungsi Format Angka ke Rupiah Currency
    function formatRupiah(angka) {
        if (!angka) return "0";
        return parseFloat(angka).toLocaleString("id-ID");
    }

    // 2. Deteksi Input Nominal Donasi Secara Real-Time (Live)
    if (donationAmountInput && qrisDynamicSection && displayTotalPrice && qrisCustomSubtext) {
        donationAmountInput.addEventListener("input", function () {
            const currentVal = donationAmountInput.value.trim();

            if (currentVal !== "" && parseInt(currentVal) > 0) {
                const formattedPrice = formatRupiah(currentVal);
                
                // Perbarui nilai rincian teks pembayaran
                displayTotalPrice.textContent = "Total: Rp " + formattedPrice + ",-";
                
                // Perbarui isi teks instruksi kustom sub-QRIS
                qrisCustomSubtext.innerHTML = "Scan QR untuk membayar Donasi Rp " + formattedPrice + ",- dan tebarkan kebaikanmu hari ini! 💖";
                
                // Munculkan container QRIS ke layar
                qrisDynamicSection.style.display = "block";
            } else {
                // Sembunyikan jika kosong
                displayTotalPrice.textContent = "Total: Rp 0,-";
                qrisDynamicSection.style.display = "none";
            }
        });
    }

    // 3. Fungsi Buka Formulir Donasi
    openDonationButtons.forEach(button => {
        button.addEventListener("click", function () {
            if (donationModal) {
                donationModal.style.display = "block";
                donationModal.scrollTop = 0;
            }
        });
    });

    // 4. Fungsi Tombol Kembali / Tutup Form
    if (closeModalBtn && donationModal) {
        closeModalBtn.addEventListener("click", function () {
            donationModal.style.display = "none";
        });
    }

    // 5. Tombol Baca Selengkapnya Cerita Zayn
    if (readMoreBtn && extendedStory) {
        readMoreBtn.addEventListener("click", function () {
            if (extendedStory.style.display === "none") {
                extendedStory.style.display = "block";
                readMoreBtn.innerHTML = 'Sembunyikan <i class="fa-solid fa-chevron-up"></i>';
            } else {
                extendedStory.style.display = "none";
                readMoreBtn.innerHTML = 'Baca Selengkapnya <i class="fa-solid fa-chevron-down"></i>';
            }
        });
    }

    // 6. Tombol Tampilkan Lebih Banyak List Donatur
    if (seeMoreDonorsBtn && moreDonors) {
        seeMoreDonorsBtn.addEventListener("click", function () {
            if (moreDonors.style.display === "none") {
                moreDonors.style.display = "block";
                seeMoreDonorsBtn.innerHTML = 'Sembunyikan <i class="fa-solid fa-chevron-up"></i>';
            } else {
                moreDonors.style.display = "none";
                seeMoreDonorsBtn.innerHTML = 'Lihat Lebih Banyak <i class="fa-solid fa-chevron-down"></i>';
            }
        });
    }

    // 7. Aksi Kirim Bukti & Buka Pop-up Terima Kasih (Halaman 3)
    if (submitDonationBtn && successPage) {
        submitDonationBtn.addEventListener("click", function () {
            // Validasi kelengkapan form utama wajib diisi
            const nameField = document.getElementById("donor-name").value.trim();
            const amountField = donationAmountInput.value.trim();

            if (!nameField || !amountField) {
                alert("Harap lengkapi Nama dan Nominal Donasi Anda terlebih dahulu!");
                return;
            }

            if (proofFileInput && proofFileInput.files.length === 0) {
                alert("Harap pilih atau lampirkan File Bukti Transfer Anda terlebih dahulu!");
                return;
            }

            // Tutup form dan luncurkan pop-up sukses transparan hitam
            if (donationModal) donationModal.style.display = "none";
            successPage.style.display = "flex";
        });
    }

    // 8. Tombol Kembali Ke Form Dari Pop-up Terima Kasih
    if (backHomeBtn && successPage) {
        backHomeBtn.addEventListener("click", function () {
            successPage.style.display = "none";
            
            // Reset isian formulir setelah berdonasi agar bersih kembali
            document.getElementById("donor-name").value = "";
            document.getElementById("donor-email").value = "";
            document.getElementById("donor-phone").value = "";
            donationAmountInput.value = "";
            document.getElementById("donor-message").value = "";
            if (proofFileInput) proofFileInput.value = "";
            if (qrisDynamicSection) qrisDynamicSection.style.display = "none";
        });
    }
});
