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
    ["PHP", "Web Dev","Featured"]
);

JourneyManager.addProject(
    "RPG-Text Base Game", 
    "Terminal Quest: Where imagination renders the graphics.",
    "img/project/project-rpg.png", 
    "https://github.com/Duelisgood/-C-RPG_TBG.git", 
    ["C", "Featured"]
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