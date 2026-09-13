// NoodleTable Interactive Scripts
document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Drawer Navigation
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerBackdrop = document.getElementById('mobile-drawer-backdrop');

  function openDrawer() {
    mobileDrawer.classList.add('active');
    drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  // 3. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 4. Interactive Noodle Dough Hydration & Broth Pairing Calculator
  const noodleTypeSelect = document.getElementById('noodle-type');
  const flourWeightRange = document.getElementById('flour-weight');
  const flourValDisplay = document.getElementById('flour-val');
  const waterVolOutput = document.getElementById('calc-water');
  const hydrationPctOutput = document.getElementById('calc-hydration');
  const brothPairingOutput = document.getElementById('calc-broth');
  const simmerTimeOutput = document.getElementById('calc-simmer');
  const chewProfileOutput = document.getElementById('calc-chew');

  const noodleData = {
    'kansui-ramen': {
      hydration: 0.34,
      broth: '18-Hour Double Chintan with Kombu & Roasted Marrow',
      simmer: '90 to 110 seconds at rolling 100°C',
      chew: 'Firm Al Dente Elastic Tensile Snap (Kansui Alkaline)'
    },
    'hand-pulled-lamian': {
      hydration: 0.48,
      broth: 'Slow-Simmered Clear Beef Shank Consommé with Star Anise',
      simmer: '120 seconds flash blanch',
      chew: 'Tender Silky Drag with Deep Gluten Extension'
    },
    'sanuki-udon': {
      hydration: 0.50,
      broth: 'Smoked Bonito & Golden Shiro Shoyu Dashi Reduction',
      simmer: '8 to 10 minutes rolling boil',
      chew: 'Dense Mochi-like Pillowy Spring & Rebound'
    },
    'knife-cut-ribbon': {
      hydration: 0.44,
      chew: 'Rustic Toothsome Edge with Velvety Center Rib',
      broth: 'Spiced Chili Crisp & Dark Black Vinegar Reduction',
      simmer: '3 to 4 minutes simmering'
    },
    'egg-tagliolini': {
      hydration: 0.56,
      broth: 'Cultured Brown Butter, Sage & Glace de Volaille Emulsion',
      simmer: '150 seconds gentle simmer',
      chew: 'Rich Custard-like Melting Ribbon Texture'
    }
  };

  function updateCalculator() {
    if (!noodleTypeSelect || !flourWeightRange) return;
    const flourGrams = parseInt(flourWeightRange.value, 10);
    flourValDisplay.textContent = `${flourGrams}g`;

    const selectedType = noodleTypeSelect.value;
    const info = noodleData[selectedType] || noodleData['kansui-ramen'];

    const waterGrams = Math.round(flourGrams * info.hydration);
    const pct = Math.round(info.hydration * 100);

    waterVolOutput.textContent = `${waterGrams} ml (${waterGrams}g)`;
    hydrationPctOutput.textContent = `${pct}% Hydration Ratio`;
    brothPairingOutput.textContent = info.broth;
    simmerTimeOutput.textContent = info.simmer;
    chewProfileOutput.textContent = info.chew;
  }

  if (noodleTypeSelect && flourWeightRange) {
    noodleTypeSelect.addEventListener('change', updateCalculator);
    flourWeightRange.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  // 5. Reservation / Contact Form Toast Feedback
  const resForm = document.getElementById('reservation-form');
  if (resForm) {
    resForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = document.getElementById('form-feedback');
      if (feedback) {
        feedback.style.display = 'block';
        feedback.className = 'alert alert-success';
        feedback.innerHTML = '<strong>Seating Request Received:</strong> Our dining concierge will confirm your Mercer Street dinner reservation within two hours.';
        resForm.reset();
      }
    });
  }
});
