/**
 * SUBHA — Artist Portfolio
 * Dynamic Glassmorphic Experience, 3D Tilts, Lightbox, and Micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---------------- Artwork Data Registry ----------------
  const artworks = [
    {
      id: 1,
      title: "The Golden Solitude",
      category: "cottages",
      categoryLabel: "Cottages & Architecture",
      status: "Available Original",
      medium: "Watercolor & Fine Archival Ink",
      paper: "Arches 300gsm Cold-Pressed Cotton",
      dimensions: "9\" x 12\" (23 x 31 cm)",
      year: "2026",
      image: "images/autumn-cottage.jpg",
      description: "A sun-drenched autumn retreat framed by vivid amber, ochre, and vermilion foliage. Meticulous penwork details the stonework and chimney while warm watercolor glazes evoke the stillness of late afternoon sunlight."
    },
    {
      id: 2,
      title: "Azure Peaks & Nomads",
      category: "landscapes",
      categoryLabel: "Landscapes & Skies",
      status: "Original Piece",
      medium: "Prussian & Ultramarine Glaze Wash",
      paper: "French Cold-Pressed 300gsm",
      dimensions: "11\" x 14\" (28 x 36 cm)",
      year: "2026",
      image: "images/mountain-serenity.jpg",
      description: "Seven graduated atmospheric planes of blue mountains receding into high morning mist. The foreground silhouetted pines contrast with soaring wild birds navigating the crisp mountain heights."
    },
    {
      id: 3,
      title: "The Royal Plumage",
      category: "wildlife",
      categoryLabel: "Flora & Wildlife",
      status: "Featured Original",
      medium: "Cobalt & Emerald Granulating Mineral",
      paper: "100% Cotton Archival Rag",
      dimensions: "12\" x 16\" (30 x 40 cm)",
      year: "2026",
      image: "images/sapphire-peacock.jpg",
      description: "A regal peacock study highlighting jewel-toned sapphire and emerald washes. The background blooms with spontaneous granulating watercolor textures, creating an organic dialogue between structure and liquidity."
    },
    {
      id: 4,
      title: "Radiance in Bloom",
      category: "wildlife",
      categoryLabel: "Flora & Wildlife",
      status: "Available Original",
      medium: "Negative Space Watercolor & Splatter",
      paper: "Arches 300gsm Grain Fin",
      dimensions: "10\" x 14\" (25 x 35 cm)",
      year: "2026",
      image: "images/sunlit-daisy.jpg",
      description: "A striking botanical composition featuring a radiant white daisy carved out through negative painting against a deep cerulean blue wash, accented with energetic droplet splatter effects."
    },
    {
      id: 5,
      title: "Emerald Dew & Crimson",
      category: "wildlife",
      categoryLabel: "Flora & Wildlife",
      status: "Study Piece",
      medium: "Wet-on-Wet Botanical Watercolor",
      paper: "100% Cotton Hot-Pressed",
      dimensions: "8\" x 10\" (20 x 25 cm)",
      year: "2026",
      image: "images/ladybug-leaf.jpg",
      description: "A delicate macro study of a vivid scarlet ladybug perched on a curved olive-green leaf. Explores luminous highlights and crisp cast shadows to bring miniature nature into focus."
    },
    {
      id: 6,
      title: "Celestial Diffusion",
      category: "landscapes",
      categoryLabel: "Landscapes & Skies",
      status: "Abstract Original",
      medium: "Fluid Chromatic Dispersion",
      paper: "Heavyweight Rough Cotton 300gsm",
      dimensions: "12\" x 18\" (30 x 46 cm)",
      year: "2026",
      image: "images/rainbow-wash.jpg",
      description: "An ethereal watercolor cloudscape celebrating pure chromatic freedom. Warm sunset corals and sunrise yellows organically melt into dreamy violet and turquoise washes across textured cotton grain."
    }
  ];

  let currentArtworkIndex = 0;

  // ---------------- Interactive Cursor Glow ----------------
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.innerWidth > 768) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorGlow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      cursorGlow.style.opacity = '0';
    });

    const animateCursor = () => {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      cursorGlow.style.transform = `translate(${currentX}px, ${currentY}px)`;
      requestAnimationFrame(animateCursor);
    };
    animateCursor();
  }

  // ---------------- Sticky Header on Scroll ----------------
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ---------------- Mobile Menu Drawer ----------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const expanded = navMenu.classList.contains('open');
      mobileMenuBtn.setAttribute('aria-expanded', expanded);
    });

    // Close menu when clicking nav links
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // ---------------- Active Section Scroll Spy ----------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNavOnScroll = () => {
    const scrollPos = window.scrollY + 160;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNavOnScroll);

  // ---------------- 3D Card Perspective Tilt Effect ----------------
  const cards = document.querySelectorAll('.card-glass-shell, #heroTiltCard');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Max rotation: 8 degrees
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  // ---------------- Gallery Category Filtering ----------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const artworkCards = document.querySelectorAll('.artwork-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      artworkCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ---------------- Lightbox Modal Functionality ----------------
  const modal = document.getElementById('artworkModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalStatus = document.getElementById('modalStatus');
  const modalMedium = document.getElementById('modalMedium');
  const modalPaper = document.getElementById('modalPaper');
  const modalDimensions = document.getElementById('modalDimensions');
  const modalYear = document.getElementById('modalYear');
  const modalDesc = document.getElementById('modalDesc');
  const modalInquireBtn = document.getElementById('modalInquireBtn');

  const populateModal = (index) => {
    currentArtworkIndex = index;
    const art = artworks[index];
    if (!art) return;

    modalImg.src = art.image;
    modalImg.alt = art.title;
    modalTitle.textContent = art.title;
    modalCategory.textContent = art.categoryLabel;
    modalStatus.textContent = art.status;
    modalMedium.textContent = art.medium;
    modalPaper.textContent = art.paper;
    modalDimensions.textContent = art.dimensions;
    modalYear.textContent = art.year;
    modalDesc.textContent = art.description;
  };

  const openModal = (id) => {
    const index = artworks.findIndex(a => a.id === parseInt(id, 10));
    if (index !== -1) {
      populateModal(index);
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const nextArtwork = () => {
    const nextIdx = (currentArtworkIndex + 1) % artworks.length;
    populateModal(nextIdx);
  };

  const prevArtwork = () => {
    const prevIdx = (currentArtworkIndex - 1 + artworks.length) % artworks.length;
    populateModal(prevIdx);
  };

  // Attach card click handlers
  artworkCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      openModal(id);
    });
  });

  // Modal event listeners
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextArtwork(); });
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevArtwork(); });

  // Pre-fill inquiry form from modal
  if (modalInquireBtn) {
    modalInquireBtn.addEventListener('click', () => {
      closeModal();
      const currentArt = artworks[currentArtworkIndex];
      const messageField = document.getElementById('clientMessage');
      if (messageField && currentArt) {
        messageField.value = `Hello Subha,\n\nI am interested in acquiring your artwork titled "${currentArt.title}" (${currentArt.dimensions}, ${currentArt.medium}). Could you please share availability and pricing details?\n\nBest regards,`;
      }
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') nextArtwork();
    if (e.key === 'ArrowLeft') prevArtwork();
  });

  // ---------------- Commission Form Handling & Toast ----------------
  const commissionForm = document.getElementById('commissionForm');
  const toastMessage = document.getElementById('toastMessage');

  if (commissionForm) {
    commissionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('submitBtn');
      const originalText = submitBtn.innerHTML;

      // Button feedback
      submitBtn.innerHTML = `<span>Sending Inquiry...</span>`;
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Show glass toast
        if (toastMessage) {
          toastMessage.classList.add('show');
          setTimeout(() => {
            toastMessage.classList.remove('show');
          }, 4500);
        }

        commissionForm.reset();
      }, 1000);
    });
  }

  console.log("SUBHA Artist Portfolio initialized with Glassmorphism Engine.");
});