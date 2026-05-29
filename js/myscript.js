document.addEventListener("DOMContentLoaded", function () {

    const sepeteButonlari = document.querySelectorAll(".sepete-ekle");

    sepeteButonlari.forEach(function (button) {
        button.addEventListener("click", function () {
            const urunIsmi = button.dataset.isim;
            const fiyat = Number(button.dataset.fiyat);

            if (!urunIsmi || !fiyat) return;

            let sepet = JSON.parse(localStorage.getItem("sepetim")) || [];

            sepet.push({
                isim: urunIsmi,
                fiyat: fiyat
            });

            localStorage.setItem("sepetim", JSON.stringify(sepet));

            alert(urunIsmi + " sepete eklendi!");
        });
    });


    const tbody = document.getElementById("sepetTabloGövde");

    if (tbody) {
        let sepet = JSON.parse(localStorage.getItem("sepetim")) || [];
        tbody.innerHTML = ""; 
        let toplam = 0;

        sepet.forEach(function (urun, index) {
            toplam += urun.fiyat;

            const satir = document.createElement("tr");
            satir.innerHTML = `
                <td>${urun.isim}</td>
                <td>${urun.fiyat} TL</td>
                <td>
                    <button class="sil-btn" style="background:none; color:red; border:none; cursor:pointer; text-decoration:underline;">
                        Sil
                    </button>
                </td>
            `;
            const silBtn = satir.querySelector(".sil-btn");
            silBtn.addEventListener("click", function () {
                urunSil(index); 
            });

            tbody.appendChild(satir);
        });

        const toplamAlan = document.getElementById("toplamYazi");
        if (toplamAlan) {
            toplamAlan.innerHTML = "Toplam: " + toplam + " TL";
        }
    }

    const satinalBtn = document.getElementById("satinalBtn");
    if (satinalBtn) {
        satinalBtn.addEventListener("click", function () {
            window.location.href = "odeme.html";
        });
    }


    
    const kuponBtn = document.getElementById("kuponBtn");
    if (kuponBtn) {
        kuponBtn.addEventListener("click", function () {
            let kupon = "YEMEKYE-" + Math.floor(Math.random() * 9000 + 1000);
            
            const kuponMesajAlani = document.getElementById("kuponMesaj");
            if (kuponMesajAlani) {
                kuponMesajAlani.innerHTML = "Kodunuz: " + kupon;
            }
        });
    }

});


function urunSil(index) {
    let sepet = JSON.parse(localStorage.getItem("sepetim")) || [];
    
    sepet.splice(index, 1);
    
    localStorage.setItem("sepetim", JSON.stringify(sepet));
    
    location.reload();
}
