/**
 * SnapVault - Main Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close other items
        faqItems.forEach(otherItem => otherItem.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // Interactive Live Search Simulation
  const liveSearchInput = document.getElementById('demoSearchInput');
  const liveSearchResults = document.getElementById('demoSearchResults');

  if (liveSearchInput && liveSearchResults) {
    const mockData = [
      {
        title: "Swiggy Delivery Receipt",
        category: "Payments & Receipts",
        text: "Order #SW-98421 - Amount: ₹ 450.00 via GPay UPI",
        date: "Today, 1:15 PM",
        tag: "₹ 450.00"
      },
      {
        title: "Amazon Electronics Order",
        category: "Shopping & Orders",
        text: "Order ID: ORD-883921. Arriving Nov 24. Total ₹ 2,000.00",
        date: "Yesterday",
        tag: "Amazon"
      },
      {
        title: "Goa Beach Flight Booking",
        category: "Travel & Tickets",
        text: "PNR: 6E-4921 Flight 6E-302 Seat 14B Gate 4 #GoaTrip",
        date: "18 Nov",
        tag: "PNR 6E-4921"
      },
      {
        title: "FastAPI Backend Endpoint",
        category: "Code & Technical Notes",
        text: "async def verify_otp(code: str) -> bool: return validate(code)",
        date: "14 Nov",
        tag: "Python"
      },
      {
        title: "Tax Receipts 2026",
        category: "Custom Collection",
        text: "Medical Insurance receipt ₹ 15,000.00 claim approved",
        date: "10 Nov",
        tag: "Tax 2026"
      }
    ];

    liveSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();

      if (!query) {
        renderResults(mockData);
        return;
      }

      // Normalized search: if searching digits, match with or without commas/currency
      const queryDigits = query.replace(/[^\d]/g, '');

      const filtered = mockData.filter(item => {
        const fullString = `${item.title} ${item.category} ${item.text} ${item.tag}`.toLowerCase();
        if (fullString.includes(query)) return true;

        if (queryDigits && queryDigits.length >= 2) {
          const itemDigits = fullString.replace(/[^\d]/g, '');
          if (itemDigits.includes(queryDigits)) return true;
        }

        return false;
      });

      renderResults(filtered, query);
    });

    function renderResults(items, highlightQuery = '') {
      if (items.length === 0) {
        liveSearchResults.innerHTML = `
          <div style="padding: 1.5rem; text-align: center; color: var(--text-dim); font-size: 0.9rem;">
            No screenshots found on-device matching "<strong>${escapeHtml(highlightQuery)}</strong>".
          </div>
        `;
        return;
      }

      liveSearchResults.innerHTML = items.map(item => {
        let displayTitle = escapeHtml(item.title);
        let displayText = escapeHtml(item.text);

        if (highlightQuery) {
          const reg = new RegExp(`(${escapeRegExp(highlightQuery)})`, 'gi');
          displayTitle = displayTitle.replace(reg, '<span class="match-hl">$1</span>');
          displayText = displayText.replace(reg, '<span class="match-hl">$1</span>');
        }

        return `
          <div class="search-result-card">
            <div class="result-main">
              <h5>${displayTitle}</h5>
              <p>${displayText}</p>
            </div>
            <span class="mockup-tag tag-receipt">${escapeHtml(item.tag)}</span>
          </div>
        `;
      }).join('');
    }

    function escapeHtml(string) {
      const div = document.createElement('div');
      div.textContent = string;
      return div.innerHTML;
    }

    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
  }
});
