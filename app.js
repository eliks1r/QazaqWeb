document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. Sticky Header Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in-element');
    const appearanceOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearanceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearanceOptions);

    fadeElements.forEach(element => {
        appearanceObserver.observe(element);
    });

    // 4. ROI Calculator Logic (Upgraded ranges & visual gauge bar)
    const trafficSlider = document.getElementById('traffic-slider');
    const ticketSlider = document.getElementById('ticket-slider');
    const trafficVal = document.getElementById('traffic-val');
    const ticketVal = document.getElementById('ticket-val');
    const lossResult = document.getElementById('loss-result');
    const nicheBtns = document.querySelectorAll('.niche-btn');
    const gaugeFill = document.getElementById('gauge-fill');
    const gaugePercent = document.getElementById('gauge-percent');

    let currentConversion = 0.08; // default auto conversion rate
    let currentLossFactor = 0.40; // default auto loss rate

    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    function calculateLoss() {
        const traffic = parseInt(trafficSlider.value);
        const ticket = parseInt(ticketSlider.value);
        
        // Calculate lost clients: traffic * conversion rate * loss factor
        const lostClients = traffic * currentConversion * currentLossFactor;
        // Calculate lost revenue: lost clients * average ticket
        const lostRevenue = Math.round(lostClients * ticket);
        
        lossResult.textContent = `${formatNumber(lostRevenue)} ₸`;

        // Update visual gauge: define a scale relative to an average high loss of 15 000 000 ₸
        const maxExpectedLoss = 15000000;
        let percent = (lostRevenue / maxExpectedLoss) * 100;
        percent = Math.min(Math.max(percent, 0), 100); // Clamp between 0% and 100%
        
        if (gaugeFill && gaugePercent) {
            gaugeFill.style.width = `${percent}%`;
            gaugePercent.textContent = `${Math.round(percent)}%`;
            
            // Dynamically shift color or glow on gauge fill based on intensity
            if (percent < 30) {
                gaugeFill.style.boxShadow = '0 0 10px rgba(16, 185, 129, 0.4)';
            } else if (percent < 70) {
                gaugeFill.style.boxShadow = '0 0 10px rgba(234, 179, 8, 0.4)';
            } else {
                gaugeFill.style.boxShadow = '0 0 15px rgba(255, 59, 105, 0.6)';
            }
        }
    }

    if (trafficSlider && ticketSlider) {
        trafficSlider.addEventListener('input', (e) => {
            trafficVal.textContent = formatNumber(e.target.value);
            calculateLoss();
        });

        ticketSlider.addEventListener('input', (e) => {
            ticketVal.textContent = `${formatNumber(e.target.value)} ₸`;
            calculateLoss();
        });

        nicheBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                nicheBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                currentConversion = parseFloat(btn.dataset.conversion);
                currentLossFactor = parseFloat(btn.dataset.loss);
                calculateLoss();
            });
        });

        // Initialize calculation
        calculateLoss();
    }

    // 5. Case Studies Tabs
    const caseTabs = document.querySelectorAll('.case-tab');
    const caseSlides = document.querySelectorAll('.case-slide');

    caseTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            caseTabs.forEach(t => t.classList.remove('active'));
            caseSlides.forEach(slide => slide.classList.remove('active'));

            tab.classList.add('active');
            const targetCase = tab.dataset.case;
            const targetSlide = document.getElementById(`case-${targetCase}`);
            if (targetSlide) {
                targetSlide.classList.add('active');
            }
        });
    });

    // 6. Services Modals Data & Logic
    const servicesData = {
        landing: {
            title: "Landing Page + Мессенджеры",
            subtitle: "Быстрый старт под рекламную акцию с высокой конверсией",
            features: [
                "Глубокий анализ конкурентов и болей вашей аудитории в картах",
                "Индивидуальный UX/UI дизайн с высокой мобильной отзывчивостью",
                "Написание продающей структуры и текстов (копирайтинг)",
                "Кнопки быстрой связи: WhatsApp, Telegram, прямой звонок",
                "Установка аналитики Яндекс.Метрика и Google Analytics",
                "Срок разработки: 3-5 рабочих дней"
            ],
            price: "от 120 000 ₸"
        },
        corporate: {
            title: "Автоматизированный сайт + Altegio",
            subtitle: "Интеграция онлайн-записи для автосервисов, клиник и салонов услуг",
            features: [
                "Интеграция виджета онлайн-записи Altegio / YCLIENTS",
                "Настройка электронного журнала мастеров и расписания",
                "Автоматические WhatsApp/SMS напоминания клиентам о визитах",
                "Формирование клиентской базы и базовой CRM аналитики",
                "Разработка многостраничной структуры под ключевые услуги",
                "Срок разработки: 15-20 рабочих дней"
            ],
            price: "от 250 000 ₸"
        },
        redesign: {
            title: "Глубокий Редизайн & СЕО",
            subtitle: "Омоложение вашего старого сайта для повышения отдачи от рекламы",
            features: [
                "Анализ текущих ошибок юзабилити и причин низкой конверсии",
                "Перенос контента на современную, быструю и легкую платформу",
                "Адаптация под современные требования Google Mobile-First",
                "Ускорение загрузки страниц до зеленой зоны Lighthouse (90+ баллов)",
                "Сохранение всех текущих позиций в поисковой выдаче (SEO-редиректы)",
                "Срок разработки: 5-7 рабочих дней"
            ],
            price: "от 80 000 ₸"
        }
    };

    const detailsModal = document.getElementById('details-modal');
    const modalBodyContent = document.getElementById('modal-body-content');
    const modalClose = document.getElementById('modal-close');
    const openModalBtns = document.querySelectorAll('.open-details-modal');

    function openModal(serviceKey) {
        const data = servicesData[serviceKey];
        if (!data) return;

        let featuresHtml = '';
        data.features.forEach(feat => {
            featuresHtml += `<li><i class="fa-solid fa-circle-check"></i> <span>${feat}</span></li>`;
        });

        // Set order WhatsApp link specifically for the service
        const waText = `Здравствуйте! Хочу заказать услугу "${data.title}" и автоматизацию`;
        const waUrl = `https://wa.me/77064146072?text=${encodeURIComponent(waText)}`;

        modalBodyContent.innerHTML = `
            <h3 class="modal-title" style="margin-bottom: 0.5rem; font-weight: 800;">${data.title}</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.95rem;">${data.subtitle}</p>
            <ul class="modal-features-list">
                ${featuresHtml}
            </ul>
            <div style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: var(--primary-teal); margin-bottom: 2rem;">
                Стоимость: ${data.price}
            </div>
            <a href="${waUrl}" target="_blank" class="btn btn-primary" id="modal-order-btn" style="width: 100%;">Заказать в WhatsApp</a>
        `;

        detailsModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        const modalOrderBtn = document.getElementById('modal-order-btn');
        if (modalOrderBtn) {
            modalOrderBtn.addEventListener('click', () => {
                closeAllModals();
            });
        }
    }

    function closeAllModals() {
        detailsModal.classList.remove('active');
        document.getElementById('success-modal').classList.remove('active');
        document.body.style.overflow = '';
    }

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            openModal(btn.dataset.service);
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeAllModals);
    }

    // Close modal on overlay click
    window.addEventListener('click', (e) => {
        if (e.target === detailsModal || e.target === document.getElementById('success-modal')) {
            closeAllModals();
        }
    });

    // 7. Lead Form Submission (WhatsApp Integration)
    const leadForm = document.getElementById('lead-form');
    const successModal = document.getElementById('success-modal');
    const successModalClose = document.getElementById('success-modal-close');

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('form-name').value;
            const phoneInput = document.getElementById('form-phone').value;
            const nicheSelect = document.getElementById('form-niche');
            const nicheText = nicheSelect.options[nicheSelect.selectedIndex].text;

            if (!nameInput || !phoneInput) return;

            const submitBtn = document.getElementById('form-submit');
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Подготовка чата...';

            // Construct direct WhatsApp message link
            const waText = `Здравствуйте! Меня зовут ${nameInput}. Мой телефон: ${phoneInput}. Хочу заказать аудит ниши и автоматизацию. Сфера бизнеса: ${nicheText}.`;
            const waUrl = `https://wa.me/77064146072?text=${encodeURIComponent(waText)}`;

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                
                // Open WhatsApp chat in a new tab
                window.open(waUrl, '_blank');

                // Show feedback modal
                document.getElementById('success-modal-message').textContent = 
                    `Уважаемый ${nameInput}, мы открыли чат WhatsApp для отправки вашей заявки. Мы свяжемся с вами в течение 15 минут!`;
                
                successModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                leadForm.reset();
            }, 1000);
        });
    }

    if (successModalClose) {
        successModalClose.addEventListener('click', closeAllModals);
    }
});
