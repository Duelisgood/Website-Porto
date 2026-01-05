/*--------------------------------------------------------------
# 1. CLASS DEFINITION (OOP)
# Blueprint untuk membuat item Gallery
--------------------------------------------------------------*/
class GalleryItem {
    constructor(image, title, caption, tags) {
        this.image = image;
        this.title = title; // Judul berupa Tanggal atau Lokasi
        this.caption = caption;
        this.tags = tags;
    }

    createHTML() {
        // Membuat badge kategori kecil
        const tagBadges = this.tags
            .map(tag => `<span class="category-badge">${tag.toUpperCase()}</span>`)
            .join("");

        // Menggunakan class "gallery-card" agar rasio gambar menjadi kotak (1:1)
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

/*--------------------------------------------------------------
# 2. GALLERY MANAGER (STATE MANAGEMENT)
# Mengelola data gallery dan fungsi rendering
--------------------------------------------------------------*/
const GalleryManager = {
    container: document.getElementById('gallery-container'),
    allItems: [],

    addItem(image, title, caption, tags) {
        const newItem = new GalleryItem(image, title, caption, tags);
        this.allItems.push(newItem);
    },

    render(filter) {
        if (!this.container) return;

        // Logika Filter: Tampilkan jika tag sesuai atau 'All'
        const filtered = filter === 'All' 
            ? this.allItems 
            : this.allItems.filter(item => item.tags.includes(filter));

        this.container.innerHTML = filtered
            .map(item => item.createHTML())
            .join('');
    }
};

/*--------------------------------------------------------------
# 3. DATA INJECTION (DATABASE)
# Input semua foto gallery di sini
--------------------------------------------------------------*/
GalleryManager.addItem(
    "img/gallery/setup-coding.jpg", 
    "JIMBARAN, 2025", 
    "Debugging code ditemani suara ombak. Bug hilang, healing datang. ☕🌊", 
    ["Coding", "View"]
);

GalleryManager.addItem(
    "img/gallery/theater-show.jpg", 
    "TEATER", 
    "Role: Antagonis. Ternyata acting marah lebih susah daripada fixing syntax error. 🎭", 
    ["Life"]
);

GalleryManager.addItem(
    "img/gallery/cat-coding.jpg", 
    "LATE NIGHT", 
    '3 AM motivation. "One more line" adalah kebohongan terbesar programmer.', 
    ["Life", "Coding"]
);

GalleryManager.addItem(
    "img/gallery/sunset.png", 
    "PANTAI SENJA", 
    "Langit jingga, suara ombak, dan jeda singkat dari dunia yang berisik.", 
    ["Life", "View", ]
);

/*--------------------------------------------------------------
# 4. EVENT LISTENER & FILTER LOGIC
# Menangani interaksi tombol filter di halaman Gallery
--------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
    // Render awal semua foto
    GalleryManager.render('All');

    // Logic Tombol Filter Gallery
    const filterButtons = document.querySelectorAll('.filter-btn-gallery');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Reset active class
            filterButtons.forEach(b => b.classList.remove('active'));
            // Set active ke tombol yang diklik
            e.target.classList.add('active');
            
            // Render berdasarkan text tombol
            const category = e.target.innerText; 
            GalleryManager.render(category);
        });
    });
});

/*--------------------------------------------------------------
# 5. MOBILE NAVIGATION (HAMBURGER MENU)
# Duplikasi logic navbar agar berfungsi di halaman Gallery
--------------------------------------------------------------*/
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));
}