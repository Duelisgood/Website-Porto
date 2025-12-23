/*--------------------------------------------------------------
# 1. MAIN EVENT LISTENER (PAGE LOGIC)
# Mendeteksi halaman mana yang sedang aktif (Home vs Projects)
--------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const container = document.getElementById('journey-container');

    // KONDISI A: Halaman Projects (Ada tombol filter)
    if (filterButtons.length > 0) {
        // Tampilkan SEMUA project saat awal load
        JourneyManager.render('All'); 

        // Aktifkan event listener untuk setiap tombol filter
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Reset status active pada semua tombol
                filterButtons.forEach(b => b.classList.remove('active'));
                // Set tombol yang diklik menjadi active
                e.target.classList.add('active');
                // Render project sesuai kategori
                JourneyManager.render(e.target.innerText);
            });
        });
    } 
    // KONDISI B: Halaman Home (Hanya ada container, tanpa filter)
    else if (container) {
        // HANYA tampilkan project yang punya tag "Featured"
        JourneyManager.render('Featured'); 
    }
});

/*--------------------------------------------------------------
# 2. CLASS DEFINITION (OOP)
# Blueprint untuk membuat kartu Project
--------------------------------------------------------------*/
class JourneyCard {
    constructor(name, description, image, url, categories) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.url = url;
        this.categories = categories; 
    }

    createHTML() {
        // Filter agar tag "Featured" tidak muncul sebagai badge visual
        const visibleCategories = this.categories.filter(cat => cat !== "Featured");
        
        // Membuat HTML untuk badge kategori
        const categoryLabels = visibleCategories
            .map(cat => `<span class="category-badge">${cat.toUpperCase()}</span>`)
            .join("");

        // Return struktur HTML kartu
        return `
            <div class="card">
                <img src="${this.image}" alt="${this.name}">
                <div class="card-body">
                    <div class="category-container">${categoryLabels}</div>
                    <h4 class="pixel-font" style="font-size: 0.9rem; margin: 5px 0 10px 0;">${this.name}</h4>
                    <p style="font-size: 0.75rem; color: #ccc; margin-bottom: 20px;">${this.description}</p>
                    <a href="${this.url}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
                        <button class="btn-card">KUNJUNGI SITUS</button>
                    </a>
                </div>
            </div>
        `;
    }
}

/*--------------------------------------------------------------
# 3. JOURNEY MANAGER (STATE MANAGEMENT)
# Mengelola data project dan fungsi rendering ke HTML
--------------------------------------------------------------*/
const JourneyManager = {
    container: document.getElementById('journey-container'),
    allProjects: [],

    addProject(name, description, image, url, categories) {
        const newProject = new JourneyCard(name, description, image, url, categories);
        this.allProjects.push(newProject);
        // Render ulang (akan di-handle oleh logic DOMContentLoaded di atas)
        // this.render('All'); 
    },

    render(filter) {
        if(!this.container) return;
        
        // Logika Filter: Cek apakah kategori ada di dalam array categories proyek
        const filtered = filter === 'All' 
            ? this.allProjects 
            : this.allProjects.filter(p => p.categories.includes(filter));

        this.container.innerHTML = filtered
            .map(project => project.createHTML())
            .join('');
    }
};

/*--------------------------------------------------------------
# 4. GLOBAL HELPER FUNCTIONS
# Fungsi pendukung interaksi UI
--------------------------------------------------------------*/
function filterProjects(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText === category) btn.classList.add('active');
    });

    JourneyManager.render(category);
}

/*--------------------------------------------------------------
# 5. DATA INJECTION (DATABASE)
# Input semua data project di sini
--------------------------------------------------------------*/
JourneyManager.addProject(
    "Web Tarot AI", 
    "Unlocking your destiny with AI powered divinations.", 
    "img/project/project-tarot.png", 
    "https://tarot-reader-nu.vercel.app/", 
    ["Web Dev", "Java Script", "Featured"]
);

JourneyManager.addProject(
    "Kafe Pintar", 
    "Brewing smarter business decisions with intelligent automation.", 
    "img/project/project-kafe.jpg", 
    "https://github.com/Duelisgood/KafePintar.git", 
    ["PHP", "Web Dev"]
);

JourneyManager.addProject(
    "Sekolah Pintar", 
    "ASimplifying academic administration with one intelligent platform.", 
    "img/project/project-sekolah.png", 
    "#", 
    ["PHP", "Web Dev"]
);

JourneyManager.addProject(
    "EcoTrack", 
    "Turning community reports into cleaner environments.", 
    "img/project/project-ecotrack.png", 
    "https://github.com/Duelisgood/ProgNET_EcoTrack", 
    ["PHP", "Web Dev"]
);

JourneyManager.addProject(
    "RPG-Text Base Game", 
    "Terminal Quest: Where imagination renders the graphics.",
    "img/project/project-rpg.png", 
    "https://github.com/Duelisgood/-C-RPG_TBG.git", 
    ["C", "Featured"]
);

JourneyManager.addProject(
    "Balinese Mask Detection", 
    "Where machine learning meets Balinese cultural identity.",
    "img/project/project-mask.png", 
    "https://github.com/Duelisgood/ModelTopeng.git", 
    ["Python", "Machine Learning", "Featured"]
);

/*--------------------------------------------------------------
# 6. MOBILE NAVIGATION (HAMBURGER MENU)
# Mengatur interaksi menu pada tampilan mobile
--------------------------------------------------------------*/
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        // Toggle class 'active' untuk animasi X dan slide menu
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Auto-close menu saat link diklik
    document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));
}

/*--------------------------------------------------------------
# 7. HOME GALLERY LOGIC (Mini Gallery)
# Menampilkan 3 foto pilihan di Halaman Depan
--------------------------------------------------------------*/

// 1. Definisi Class (Sama seperti di gallery.js tapi versi ringkas)
class HomeGalleryItem {
    constructor(image, title, caption, tags) {
        this.image = image;
        this.title = title;
        this.caption = caption;
        this.tags = tags;
    }

    createHTML() {
        const tagBadges = this.tags
            .filter(tag => tag !== "Featured") // Sembunyikan tag Featured
            .map(tag => `<span class="category-badge">${tag.toUpperCase()}</span>`)
            .join("");

        // Kita pakai class 'gallery-card' agar bentuknya kotak (1:1)
        return `
            <div class="card gallery-card">
                <img src="${this.image}" alt="${this.title}">
                <div class="card-body">
                    <div class="category-container">${tagBadges}</div>
                    <h4 class="pixel-font" style="font-size: 0.85rem; color: var(--sec-text); margin-top: 8px;">
                        ${this.title}
                    </h4>
                    <p style="font-size: 0.8rem; color: #ccc; margin-top: 5px; line-height: 1.4;">
                        ${this.caption}
                    </p>
                </div>
            </div>
        `;
    }
}

// 2. Manager Khusus Home Gallery
const HomeGalleryManager = {
    container: document.getElementById('home-gallery-container'),
    items: [],

    addItem(image, title, caption, tags) {
        const newItem = new HomeGalleryItem(image, title, caption, tags);
        this.items.push(newItem);
    },

    render() {
        if (!this.container) return; // Stop jika tidak ada container (misal di halaman lain)

        // Hanya ambil yang ada tag "Featured"
        const featuredItems = this.items.filter(item => item.tags.includes("Featured"));

        this.container.innerHTML = featuredItems
            .map(item => item.createHTML())
            .join('');
    }
};

// 3. Data Gallery untuk Home (Pilih 3 foto terbaikmu dan beri tag "Featured")
HomeGalleryManager.addItem(
    "img/gallery/setup-coding.jpg", 
    "JIMBARAN, 2025", 
    "Debugging code ditemani suara ombak. Healing spot terbaik.", 
    ["View", "Featured"] 
);

HomeGalleryManager.addItem(
    "img/gallery/theater-show.jpg", 
    "TEATER KAMPUS", 
    "Role: Antagonis. Ternyata acting marah lebih susah dari coding.", 
    ["Life", "Featured"]
);

HomeGalleryManager.addItem(
    "img/gallery/cat-coding.jpg", 
    "LATE NIGHT", 
    "3 AM motivation. Teman begadang setia menyelesaikan bug.", 
    ["Coding", "Featured"]
);


document.addEventListener('DOMContentLoaded', () => {
    HomeGalleryManager.render();
});

/*--------------------------------------------------------------
# 8. TYPEWRITER EFFECT (Sadboy/Romantic Mode)
# Efek mengetik dan menghapus teks secara bergantian
--------------------------------------------------------------*/

class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Index kata saat ini (looping jika sudah habis)
        const current = this.wordIndex % this.words.length;
        // Ambil teks lengkap dari kata saat ini
        const fullTxt = this.words[current];

        // Cek apakah sedang menghapus atau mengetik
        if (this.isDeleting) {
            // Hapus karakter
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Tambah karakter
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Masukkan teks ke dalam elemen HTML
        this.txtElement.innerHTML = this.txt;

        // Kecepatan Mengetik (Default)
        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2; // Lebih cepat saat menghapus
        }

        // Jika kata sudah selesai diketik
        if (!this.isDeleting && this.txt === fullTxt) {
            // Beri jeda waktu sebelum menghapus (supaya orang sempat baca)
            typeSpeed = this.wait;
            // Set status menjadi menghapus
            this.isDeleting = true;
        } 
        // Jika kata sudah selesai dihapus
        else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Pindah ke kata berikutnya
            this.wordIndex++;
            // Jeda sedikit sebelum mulai mengetik kata baru
            typeSpeed = 500;
        }

        // Jalankan fungsi ini lagi setelah waktu tertentu (looping)
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Inisialisasi saat halaman dimuat (DOM Load)
document.addEventListener('DOMContentLoaded', () => {
    const txtElement = document.getElementById('typing-text');
    
    // DAFTAR KATA-KATA (Sudah disingkat tapi makna sama)
    const words = [         // Default Identity
        "Currently in your heart",      // Status: Di hatimu
        "If forever existed, I'd still hold you", // Singkatan dari happy-ever-afters...
        "Can't move on while loving you",         // Singkatan dari How can I move on...
        "Pain isn't leaving, but hoping you return", // Singkatan dari The worst thing...
        "Don't know how to be just friends again"
    ];

    // Mulai efek mengetik (Wait time 2000ms = 2 detik diam setelah ngetik)
    if (txtElement) {
        new TypeWriter(txtElement, words, 2000);
    }
});