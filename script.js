document.addEventListener('DOMContentLoaded', () => {
  const routeData = [
    {
      year: '1095',
      label: 'Clermont',
      title: 'The Call at Clermont Sets the West in Motion',
      summary:
        'Pope Urban II frames the expedition as a holy duty, unleashing a movement driven by devotion, ambition, fear, and the promise of salvation.',
      turningPoint:
        'Preaching becomes mass mobilization, drawing nobles, peasants, and opportunists into the same campaign.',
      thread:
        'The crusading idea now exists as a social force powerful enough to reorder inheritance, warfare, and pilgrimage.',
      target: '#timeline'
    },
    {
      year: '1099',
      label: 'Jerusalem',
      title: 'Jerusalem Falls and a Latin Kingdom Is Born',
      summary:
        'The conquest of Jerusalem becomes the defining victory of the First Crusade and gives the movement its strongest claim to divine favor.',
      turningPoint:
        'A successful siege turns a papal appeal into a functioning crusader state in the Levant.',
      thread:
        'Military success secures prestige, but it also locks western powers into long-term occupation and defense.',
      target: '#jerusalem'
    },
    {
      year: '1113',
      label: 'Hospitallers',
      title: 'The Hospitallers Become a Permanent Force',
      summary:
        'Recognition of the Knights Hospitaller marks the shift from short expedition to durable institutional presence in the eastern Mediterranean.',
      turningPoint:
        'The crusading world gains an order built to protect pilgrims, manage wealth, and project power over generations.',
      thread:
        'The movement is no longer only about marching east; it is now building structures that can survive between campaigns.',
      target: '#timeline'
    },
    {
      year: '1204',
      label: 'Constantinople',
      title: 'Constantinople Is Taken by Men Who Were Never Meant to Attack It',
      summary:
        'The sack of Constantinople reveals how debt, politics, and opportunism can overwhelm the original religious purpose of a crusade.',
      turningPoint:
        'Latin Christendom fractures itself, weakening Byzantium while enriching Venice and poisoning east-west relations.',
      thread:
        'What began as holy war becomes imperial plunder, exposing the instability inside the crusading project.',
      target: '#constantinople'
    },
    {
      year: '1212',
      label: 'Children',
      title: 'Zeal Without Power Ends in Catastrophe',
      summary:
        'The Children\'s Crusade endures as one of the starkest warnings about religious fervor divorced from logistics, leadership, and protection.',
      turningPoint:
        'Popular piety turns tragic when the young and vulnerable are drawn into a movement beyond their means to survive.',
      thread:
        'The crusading ideal now reaches far beyond knights and rulers, but that wider reach carries devastating human costs.',
      target: '#children'
    },
    {
      year: '1291',
      label: 'Acre',
      title: 'The Last Mainland Crusader Strongholds Are Lost',
      summary:
        'By the fall of the remaining crusader states, the era closes not with triumph but with exhaustion and strategic failure.',
      turningPoint:
        'The Latin foothold in the Holy Land collapses, ending the long experiment in western rule over the Levant.',
      thread:
        'The memory of the crusades survives, but the political project that sustained them in the east is finished.',
      target: '#timeline'
    }
  ];

  const revealElements = document.querySelectorAll(
    '.story, .timeline-entry, .factcheck-card'
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  const timelineDots = document.querySelectorAll('.timeline-dot');
  timelineDots.forEach((dot, i) => {
    dot.style.animationDelay = `${i * 0.3}s`;
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const masthead = document.querySelector('.masthead');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const mastheadH = masthead.offsetHeight;
        if (scrollY < mastheadH) {
          const opacity = 1 - scrollY / mastheadH * 0.4;
          masthead.style.opacity = Math.max(opacity, 0.6);
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  document.querySelectorAll('.factcheck-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = '#b22222';
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = '#c5a55a';
    });
  });

  const routeSlider = document.querySelector('#route-year');
  const routePlayButton = document.querySelector('#route-play');
  const routeStops = Array.from(document.querySelectorAll('.route-stop'));
  const routeJump = document.querySelector('#route-jump');

  if (routeSlider && routePlayButton && routeJump && routeStops.length) {
    const routeFields = {
      currentYear: document.querySelector('[data-route-field="current-year"]'),
      currentLabel: document.querySelector('[data-route-field="current-label"]'),
      displayYear: document.querySelector('[data-route-field="display-year"]'),
      title: document.querySelector('[data-route-field="title"]'),
      summary: document.querySelector('[data-route-field="summary"]'),
      turningPoint: document.querySelector('[data-route-field="turning-point"]'),
      thread: document.querySelector('[data-route-field="thread"]')
    };

    let activeRouteIndex = Number(routeSlider.value);
    let autoplayId = null;

    const clearRouteHighlights = () => {
      document.querySelectorAll('.route-targeted').forEach((element) => {
        element.classList.remove('route-targeted');
      });
    };

    const stopAutoplay = () => {
      if (autoplayId !== null) {
        window.clearInterval(autoplayId);
        autoplayId = null;
      }

      routePlayButton.classList.remove('is-playing');
      routePlayButton.setAttribute('aria-pressed', 'false');
      routePlayButton.textContent = '▶ Let the Chronicle Unfold';
    };

    const applyRouteState = (index) => {
      const event = routeData[index];

      if (!event) {
        return;
      }

      activeRouteIndex = index;
      routeSlider.value = String(index);

      routeStops.forEach((stop) => {
        stop.classList.toggle('is-active', Number(stop.dataset.routeIndex) === index);
      });

      routeFields.currentYear.textContent = event.year;
      routeFields.currentLabel.textContent = event.label;
      routeFields.displayYear.textContent = event.year;
      routeFields.title.textContent = event.title;
      routeFields.summary.textContent = event.summary;
      routeFields.turningPoint.innerHTML = `<strong>Turning point:</strong> ${event.turningPoint}`;
      routeFields.thread.innerHTML = `<strong>Long thread:</strong> ${event.thread}`;
      routeJump.href = event.target;

      clearRouteHighlights();
      document.querySelectorAll(`[data-year="${event.year}"]`).forEach((element) => {
        element.classList.add('route-targeted');
      });
    };

    const startAutoplay = () => {
      stopAutoplay();
      routePlayButton.classList.add('is-playing');
      routePlayButton.setAttribute('aria-pressed', 'true');
      routePlayButton.textContent = '❚❚ Hold the Chronicle';

      autoplayId = window.setInterval(() => {
        const nextIndex = (activeRouteIndex + 1) % routeData.length;
        applyRouteState(nextIndex);
      }, 4200);
    };

    routeSlider.addEventListener('input', () => {
      stopAutoplay();
      applyRouteState(Number(routeSlider.value));
    });

    routeStops.forEach((stop) => {
      stop.addEventListener('click', () => {
        stopAutoplay();
        applyRouteState(Number(stop.dataset.routeIndex));
      });
    });

    routePlayButton.addEventListener('click', () => {
      if (autoplayId === null) {
        startAutoplay();
        return;
      }

      stopAutoplay();
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoplay();
      }
    });

    applyRouteState(activeRouteIndex);
  }

});
