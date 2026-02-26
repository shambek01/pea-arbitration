// Mobile burger menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const b1 = document.getElementById('b1');
    const b2 = document.getElementById('b2');
    const b3 = document.getElementById('b3');
    const isOpen = !menu.classList.contains('hidden');
    menu.classList.toggle('hidden');
    if (!isOpen) {
        b1.style.transform = 'translateY(8px) rotate(45deg)';
        b2.style.opacity = '0';
        b3.style.transform = 'translateY(-8px) rotate(-45deg)';
    } else {
        b1.style.transform = '';
        b2.style.opacity = '';
        b3.style.transform = '';
    }
}
window.toggleMobileMenu = toggleMobileMenu;

// Phone Mask Logic
const phoneInput = document.getElementById('phoneInput');
phoneInput?.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.startsWith('7')) value = value.substring(1);
    if (value.startsWith('8')) value = value.substring(1);

    let formattedValue = '+7';
    if (value.length > 0) formattedValue += ' (' + value.substring(0, 3);
    if (value.length > 3) formattedValue += ') ' + value.substring(3, 6);
    if (value.length > 6) formattedValue += '-' + value.substring(6, 8);
    if (value.length > 8) formattedValue += '-' + value.substring(8, 10);

    e.target.value = formattedValue.substring(0, 18);
});

const arbitratorsData = [];
for (let i = 1; i <= 71; i++) arbitratorsData.push({ id: 'arb' + i, name: i === 1 ? 'Хамзина Жанна' : i === 2 ? 'Мурзахметов Бахтияр' : 'Арбитр Специалист №' + i, pos: i === 1 ? 'Председатель ПЭА' : 'Арбитр ПЭА', exp: (10 + (i % 15)).toString() });

const ADMIN_PASS = "admin123";
let isAuth = false;
window.currentLang = 'ru';

window.translations = {
    'ru': {
        'brand_name': 'Первый Экономический', 'brand_sub': 'Арбитраж',
        'nav_about': 'О нас', 'nav_arbitrators': 'Арбитры', 'nav_calc': 'Калькулятор', 'nav_contacts': 'Контакты', 'nav_apply': 'Подать заявку',
        'hero_title': 'Если спор неизбежен, <br><span class="text-amber-500">выигрывайте его у нас!</span>',
        'hero_desc': 'Разрешение коммерческих споров в рамках правового поля с полным соблюдением принципов конфиденциальности.',
        'btn_apply': 'Подать иск онлайн', 'btn_clause': 'Арбитражная оговорка',
        'stat_arbitrators': 'Арбитров в реестре', 'stat_cases': 'Рассмотренных дел', 'stat_cancelled': 'Отмененных решений',
        'features_title': 'Преимущества арбитража',
        'f1_title': 'Оперативность', 'f1_desc': 'Рассмотрение дела занимает от 7 до 14 дней.',
        'f2_title': 'Готовые решения', 'f2_desc': 'Шаблоны документов доступны бесплатно.',
        'f3_title': 'Юридическая сила', 'f3_desc': 'Решения вступают в силу немедленно.',
        'calc_title': 'Калькулятор сбора', 'calc_label': 'Сумма исковых требований (KZT)', 'calc_result_label': 'Размер сбора:',
        'form_title': 'Подача заявления', 'form_desc': 'Заполните форму для начала процесса.',
        'label_name': 'ФИО / Организация', 'label_phone': 'Телефон', 'label_email': 'E-mail', 'label_sum': 'Сумма иска', 'label_message': 'Суть спора',
        'btn_submit_form': 'Отправить заявление', 'success_title': 'Заявка принята', 'success_desc': 'Данные сохранены в системе.',
        'arb_title': 'Наши Арбитры', 'arb_view_all': 'Все 71 арбитр', 'lib_title': 'Документы', 'address': 'г. Астана, ул. Иманова 13, оф. 709/1',
        'footer_admin': 'Управление'
    },
    'kz': {
        'brand_name': 'Бірінші Экономикалық', 'brand_sub': 'Төрелік',
        'nav_about': 'Біз туралы', 'nav_arbitrators': 'Төрешілер', 'nav_calc': 'Калькулятор', 'nav_contacts': 'Байланыс', 'nav_apply': 'Өтінім беру',
        'hero_title': 'Егер дау туындаса — <br><span class="text-amber-500">бізде жеңіңіз!</span>',
        'hero_desc': 'Коммерциялық дауларды құқықтық аяда, құпиялылық принциптерін толық сақтай отырып шешу.',
        'btn_apply': 'Онлайн талап қою', 'btn_clause': 'Төрелік ескертпе',
        'stat_arbitrators': 'Тізілімдегі төрешілер', 'stat_cases': 'Қаралған істер', 'stat_cancelled': 'Күші жойылған жоқ',
        'features_title': 'Төреліктің артықшылықтары',
        'f1_title': 'Жеделдік', 'f1_desc': 'Істі қарау мерзімі 7-ден 14 күнге дейін.',
        'f2_title': 'Дайын шешімдер', 'f2_desc': 'Құжаттар үлгілері тегін қолжетімді.',
        'f3_title': 'Заңды күші', 'f3_desc': 'Шешімдер дереу күшіне енеді.',
        'calc_title': 'Төлем калькуляторы', 'calc_label': 'Талап сомасы (KZT)', 'calc_result_label': 'Төлем мөлшері:',
        'form_title': 'Өтініш беру', 'form_desc': 'Процесті бастау үшін форманы толтырыңыз.',
        'label_name': 'Аты-жөніңіз / Ұйым', 'label_phone': 'Телефон', 'label_email': 'E-mail', 'label_sum': 'Талап сомасы', 'label_message': 'Даудың мәні',
        'btn_submit_form': 'Өтінімді жіберу', 'success_title': 'Өтінім қабылданды', 'success_desc': 'Деректер жүйеде сақталды.',
        'arb_title': 'Біздің Төрешілер', 'arb_view_all': 'Барлық 71 төреші', 'lib_title': 'Құжаттар', 'address': 'Астана қ., Иманов к-сі 13, 709/1 кеңсе',
        'footer_admin': 'Басқару'
    }
};

window.setLanguage = function (lang) {
    window.currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (window.translations[lang][key]) el.innerHTML = window.translations[lang][key];
    });
    document.getElementById('lang-ru').classList.toggle('active', lang === 'ru');
    document.getElementById('lang-kz').classList.toggle('active', lang === 'kz');
    if (!document.getElementById('registry-view').classList.contains('view-hidden')) window.renderArbitrators();
}

window.switchView = function (view) {
    if (view === 'admin' && !isAuth) { window.openAdminAuthModal(); return; }
    document.querySelectorAll('.view-content').forEach(v => v.classList.add('view-hidden'));
    document.getElementById(view + '-view').classList.remove('view-hidden');
    if (view === 'registry') window.renderArbitrators();
    window.scrollTo(0, 0);
}

window.openAdminAuthModal = function () { document.getElementById('admin-auth-modal').classList.remove('modal-hidden'); document.getElementById('adminPassword').focus(); }
window.closeAdminAuth = function () { document.getElementById('admin-auth-modal').classList.add('modal-hidden'); }
window.checkAdminPassword = function () { if (document.getElementById('adminPassword').value === ADMIN_PASS) { isAuth = true; window.closeAdminAuth(); window.switchView('admin'); } else { document.getElementById('authError').classList.remove('hidden'); } }
window.scrollToApply = function () { window.switchView('home'); setTimeout(() => document.getElementById('apply-section').scrollIntoView({ behavior: 'smooth' }), 50); }
window.closeSuccess = function () { document.getElementById('success-modal').classList.add('modal-hidden'); }
window.closeModal = function () { document.getElementById('arbitrator-modal').classList.add('hidden'); }

window.renderArbitrators = function (filter = '') {
    const grid = document.getElementById('arbitratorsGrid');
    grid.innerHTML = '';
    arbitratorsData.filter(arb => arb.name.toLowerCase().includes(filter.toLowerCase())).forEach(arb => {
        const card = document.createElement('div');
        card.className = "bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 cursor-pointer hover:border-amber-500 hover:shadow-xl transition-all duration-300 group";
        card.onclick = () => window.openArbitratorModal(arb.id, arb.name, arb.pos, arb.exp);
        card.innerHTML = `<div class="w-20 h-20 bg-slate-50 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition"><i class="fas fa-user-tie text-3xl text-navy"></i></div><h4 class="font-black text-sm mb-2 text-navy">${arb.name}</h4><p class="text-[10px] text-amber-600 font-black uppercase tracking-widest">${arb.pos}</p>`;
        grid.appendChild(card);
    });
}

window.filterArbitrators = function () { window.renderArbitrators(document.getElementById('registrySearch').value); }
window.openArbitratorModal = function (id, name, pos, exp) {
    document.getElementById('modal-name').innerText = name;
    document.getElementById('modal-pos').innerText = pos;
    document.getElementById('modal-exp').innerText = `${exp} лет`;
    document.getElementById('modal-bio').innerText = `Профессиональный арбитр с многолетним опытом разрешения хозяйственных и корпоративных споров. Специализируется на гражданском праве.`;
    document.getElementById('modal-img').src = `https://ui-avatars.com/api/?name=${name.split(' ').join('+')}&background=0F172A&color=fff&size=200`;
    document.getElementById('arbitrator-modal').classList.remove('hidden');
}

window.calculateFee = function () {
    const sum = parseFloat(document.getElementById('claimSum').value) || 0;
    let fee = (sum <= 1600000) ? sum * 0.06 : (sum <= 5000000) ? sum * 0.05 : (sum <= 10000000) ? sum * 0.04 : sum * 0.03;
    if (sum <= 5000000 && fee < 300000) fee = 300000;
    document.getElementById('feeResult').innerText = fee.toLocaleString('ru-RU') + ' KZT';
}

window.onload = window.calculateFee;
document.getElementById('adminPassword')?.addEventListener('keypress', (e) => { if (e.key === 'Enter') window.checkAdminPassword(); });

// ── Scroll Reveal ──────────────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
