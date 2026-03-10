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
        'brand_name': 'Центрально-Евразийский', 'brand_sub': 'Арбитражный суд',
        'nav_about': 'О нас', 'nav_arbitrators': 'Арбитры', 'nav_documents': 'Документы', 'nav_contacts': 'Контакты', 'nav_apply': 'Подать заявку',
        'hero_title': 'Справедливое разрешение споров <br><span class="text-amber-500">для вашего бизнеса</span>',
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
        'footer_admin': 'Управление',
        'how_works_title': 'Как это работает',
        'how_works_desc': 'Простой процесс разрешения спора от подачи заявления до результата',
        'step1_title': '1. Подача иска',
        'step1_desc': 'Заполните форму онлайн или отправьте документы на почту',
        'step2_title': '2. Выбор арбитра',
        'step2_desc': 'Стороны выбирают независимого арбитра из нашего реестра',
        'step3_title': '3. Рассмотрение',
        'step3_desc': 'Оперативное изучение дела с соблюдением конфиденциальности',
        'step4_title': '4. Решение',
        'step4_desc': 'Вынесение окончательного решения, имеющего юридическую силу',
        'form_storage': 'Безопасное хранение',
        'lib_desc_full': 'Мы подготовили все необходимые шаблоны для вашей защиты.',
        'doc1': 'Арбитражная оговорка',
        'doc1_hint': 'Нажмите, чтобы посмотреть текст оговорки',
        'doc2': 'Образец иска',
        'reg_rules': 'Регламент',
        'reg_desc': 'Ознакомьтесь с правилами работы арбитража',
        'btn_pdf': 'Скачать PDF',
        'docs_page_desc': 'Официальные документы и материалы арбитража',
        'docs_section_static': 'Шаблоны и документы',
        'docs_section_uploads': 'Загруженные документы',
        'docs_empty': 'Документы ещё не загружены.',
        'faq_title': 'Часто задаваемые вопросы',
        'faq1_q': 'Обязательно ли решение арбитража?',
        'faq1_a': 'Да, решение арбитража окончательно, вступает в силу немедленно после его оглашения и обязательно для исполнения сторонами.',
        'faq2_q': 'Как долго рассматривается дело?',
        'faq2_a': 'В среднем рассмотрение дела в нашем арбитраже занимает от 7 до 14 дней. Это значительно быстрее, чем в государственных судах.',
        'faq3_q': 'Можно ли обжаловать решение?',
        'faq3_a': 'Решение арбитража является окончательным и не подлежит апелляционному обжалованию, что экономит время и средства сторон.',
        'about_title': 'Об арбитраже',
        'about_desc': 'Всё, что нужно знать об арбитражном разбирательстве',
        'about_q1': 'Что такое арбитраж',
        'about_a1_1': 'Арбитраж – это негосударственный суд, образованный специально для рассмотрения конкретного гражданско-правового спора или постоянно действующий арбитраж.',
        'about_a1_2': 'Постоянно действующие арбитражи могут образовываться физическими и (или) юридическими лицами в соответствии с законодательством Республики Казахстан.',
        'about_a1_3': 'Арбитраж для рассмотрения конкретного спора создается сторонами для разрешения спора и действует до разрешения данного спора или до принятия сторонами решения о передаче спора в суд.',
        'about_q2': 'Кто вправе обратиться в арбитраж',
        'about_a2_1': 'Сторонами в арбитраже могут быть физические и (или) юридические лица, независимо от их места жительства или места нахождения на территории Республики Казахстан либо за её пределами. Спор может быть передан на рассмотрение арбитража при наличии заключённого между сторонами арбитражного соглашения в отношении споров, которые возникли или могут возникнуть между сторонами по какому-либо конкретному гражданско-правовому отношению.',
        'about_a2_2': 'Арбитражное соглашение в отношении спора, который находится на рассмотрении в суде, может быть заключено до принятия решения по спору указанным судом. В этом случае суд выносит определение об оставлении заявления без рассмотрения.',
        'about_a2_3': 'Арбитражное соглашение заключается в письменной форме. Оно может быть заключено в виде арбитражной оговорки, включённой в текст гражданско-правового договора.',
        'about_q3': 'Форма и содержание арбитражного соглашения',
        'about_a3_1': 'Арбитражное соглашение считается заключённым в письменной форме, если оно содержится в виде арбитражной оговорки в документе, подписанном сторонами, либо заключено путём обмена письмами, телеграммами, телефонограммами, факсами, электронными документами или иными документами, определяющими субъектов и содержание их волеизъявления.',
        'about_a3_2': 'Арбитражное соглашение также считается заключённым в письменной форме, если оно заключается путём обмена исковым заявлением и отзывом на иск, в которых одна из сторон утверждает о наличии соглашения, а другая против этого не возражает.',
        'about_a3_3': 'Ссылка в договоре на документ, содержащий условие о передаче спора на разрешение арбитража, является арбитражным соглашением при условии, что договор заключён в письменной форме, и данная ссылка такова, что делает арбитражное соглашение частью договора.',
        'about_a3_info': 'Для включения арбитражной оговорки в заключённый договор (соглашение, контракт) необходимо заключить дополнительное соглашение к нему, в котором предусмотреть вышеуказанную арбитражную оговорку.',
        'about_q4': 'Какие споры рассматривает арбитраж?',
        'about_a4_info': 'Арбитраж вправе рассматривать споры, вытекающие из гражданско-правовых отношений, между физическими и (или) юридическими лицами:',
        'about_a4_li1': 'имущественные споры;',
        'about_a4_li2': 'споры, возникающие из личных неимущественных отношений, связанных с имущественными.',
        'about_q5': 'Арбитражу не подведомственны споры:',
        'about_a5_li1': 'затрагивающие интересы несовершеннолетних лиц, недееспособных или ограниченно дееспособных, третьих лиц, не являющихся участниками арбитражного соглашения;',
        'about_a5_li2': 'споры между банками второго уровня;',
        'about_a5_li3': 'о реабилитации и банкротстве;',
        'about_a5_li4': 'между субъектами естественных монополий и их потребителями;',
        'about_a5_li5': 'между государственными органами, субъектами квазигосударственного сектора;',
        'about_a5_li6': 'возникающие из личных неимущественных отношений, не связанных с имущественными.',
        'about_q6': 'Преимущества рассмотрения спора в арбитраже по сравнению с государственным судом',
        'about_a6_li1': 'Спорящие стороны вправе самостоятельно определить правила, по которым арбитраж должен будет рассмотреть спор.',
        'about_a6_li2': 'Стороны вправе самостоятельно выбрать место и язык разбирательства.',
        'about_a6_li3': 'Стороны вправе самостоятельно выбирать арбитров.',
        'about_a6_li4': 'Конфиденциальность разбирательства.',
        'about_a6_li5': 'Быстрота и эффективность процесса.',
        'about_a6_li6': 'Решение арбитража является окончательным, пересмотру по существу дела не подлежит.',
        'about_a6_li7': 'Арбитражное решение легче исполнить на территории иностранного государства, благодаря наличию Конвенции о признании и приведении в исполнение иностранных арбитражных решений (г. Нью-Йорк, 10 июня 1958 года).',
        'table1_title': 'Сравнение суда и арбитража',
        'th_comp': 'Сравнение',
        'th_court': 'Суд',
        'th_arb': 'Арбитраж',
        'td_term_title': 'Срок рассмотрения дела',
        'td_term_court': '3 месяца',
        'td_term_arb': '1 месяц, максимум 2 месяца',
        'td_force_title': 'Вступление в законную силу решения',
        'td_force_court': 'Через 1 месяц после изготовления в окончательной форме',
        'td_force_arb': 'В день изготовления решения в окончательной форме',
        'td_cancel_title': 'Основания для отмены решения',
        'td_cancel_court': 'По любым основаниям',
        'td_cancel_arb': 'Только процессуальные нарушения, без пересмотра решения арбитража по существу',
        'td_terr_title': 'Территориальная подсудность',
        'td_terr_court': 'Только на определённой территории, на которой расположен суд',
        'td_terr_arb': 'По всей территории Казахстана',
        'td_fee_title': 'Сумма госпошлины и арбитражного сбора',
        'td_fee_court': '3%, максимум 20 000 МРП',
        'td_fee_arb': 'Чем больше сумма иска, тем меньше арбитражный сбор, максимум 15 000 МРП',
        'table2_title': 'Сравнение размеров госпошлины и арбитражного сбора',
        'th2_1': 'Цена иска (тенге)',
        'th2_2': 'Госпошлина (тенге)',
        'th2_3': 'Арбитражный сбор (тенге)',
        'td2_last': 'от 650 000 МРП и более',
        'arb_registry_title': 'Реестр арбитров',
        'val_search': 'Поиск арбитра по фамилии...',
        'search_not_found': 'По вашему запросу ничего не найдено',
        'office_title': 'Наш офис',
        'label_address': 'Адрес',
        'address': 'г. Астана, пр-т Кабанбай батыр, 53, блок D2',
        'address_br': 'г. Астана, пр-т Кабанбай батыр, 53,<br>блок D2',
        'label_working_hours': 'Режим работы',
        'working_hours': 'Пн-Пт: 09:00 - 18:00',
        'label_phone_short': 'Телефон',
        'admin_login_title': 'Вход для Admin',
        'admin_pass_placeholder': 'Пароль',
        'admin_pass_error': 'Ошибка. Неверный пароль.',
        'admin_enter': 'Войти',
        'admin_cancel': 'Отмена',
        'clause_text': 'Все споры, разногласия или требования, возникшие из настоящего договора (соглашения, контракта), либо в связи с ним, подлежат разрешению в постоянно действующем арбитраже – ТОО «Центрально-Азиатский экономический арбитраж» в соответствии с его Регламентом. Состав арбитража будет включать одного арбитра. Язык арбитражного разбирательства – русский.',
        'clause_info': 'Для включения в уже заключённый договор необходимо оформить дополнительное соглашение с данной оговоркой.',
        'modal_bio_title': 'Биография',
        'footer_copy': '© 2024 Центрально-Евразийский арбитражный суд. Все права защищены.',
        'clause_info_2': 'Для включения в уже заключённый договор необходимо оформить дополнительное соглашение с данной оговоркой.',
        'breadcrumb_home': 'Главная',
        'breadcrumb_about': 'О нас',
        'breadcrumb_registry': 'Арбитры',
        'footer_contacts': 'Контакты',
        'footer_sections': 'Разделы',
        'btn_pdf_download': 'Скачать PDF',
        'modal_exp_label': 'Стаж:',
        'table2_title_full': 'Сравнение размеров госпошлины и арбитражного сбора',
        'td_force_court': 'Через 1 месяц после изготовления в окончательной форме',
        'td_cancel_arb': 'Только процессуальные нарушения, без пересмотра решения арбитража по существу',
        'td_terr_court': 'Только на определённой территории, на которой расположен суд',
        'td_fee_arb': 'Чем больше сумма иска, тем меньше арбитражный сбор, максимум 15 000 МРП',
        'btn_close': 'Понятно'
    },
    'kz': {
        'brand_name': 'Орталық Еуразиялық', 'brand_sub': 'Төрелік соты',
        'nav_about': 'Біз туралы', 'nav_arbitrators': 'Төрешілер', 'nav_documents': 'Құжаттар', 'nav_contacts': 'Байланыс', 'nav_apply': 'Өтінім беру',
        'hero_title': 'Сіздің бизнесіңіз үшін <br><span class="text-amber-500">дауларды әділ шешу</span>',
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
        'footer_admin': 'Басқару',
        'how_works_title': 'Қалай жұмыс істейді',
        'how_works_desc': 'Дауды шешудің өтініш беруден нәтижеге дейінгі қарапайым процесі',
        'step1_title': '1. Талап қою',
        'step1_desc': 'Онлайн үлгіні толтырыңыз немесе құжаттарды поштаға жіберіңіз',
        'step2_title': '2. Төрешіні таңдау',
        'step2_desc': 'Тараптар біздің тізілімнен тәуелсіз төрешіні таңдайды',
        'step3_title': '3. Қарау',
        'step3_desc': 'Құпиялылықты сақтай отырып, істі жедел қарау',
        'step4_title': '4. Шешім',
        'step4_desc': 'Заңды күші бар түпкілікті шешім шығару',
        'form_storage': 'Қауіпсіз сақтау',
        'lib_desc_full': 'Біз сіздің қорғауыңыз үшін барлық қажетті үлгілерді дайындадық.',
        'doc1': 'Төрелік ескертпесі',
        'doc1_hint': 'Ескертпенің мәтінін көру үшін басыңыз',
        'doc2': 'Талап үлгісі',
        'reg_rules': 'Регламент',
        'reg_desc': 'Төреліктің жұмыс ережелерімен танысыңыз',
        'btn_pdf': 'PDF жүктеу',
        'docs_page_desc': 'Төреліктің ресми құжаттары мен материалдары',
        'docs_section_static': 'Үлгілер мен құжаттар',
        'docs_section_uploads': 'Жүктелген құжаттар',
        'docs_empty': 'Құжаттар әлі жүктелмеген.',
        'faq_title': 'Жиі қойылатын сұрақтар',
        'faq1_q': 'Төрелік шешімі міндетті ме?',
        'faq1_a': 'Иә, төрелік шешімі түпкілікті, ол жарияланғаннан кейін дереу күшіне енеді және тараптар үшін орындалуы міндетті.',
        'faq2_q': 'Іс қанша уақыт қаралады?',
        'faq2_a': 'Орташа алғанда, біздің төрелікте істі қарау 7-ден 14 күнге дейін созылады. Бұл мемлекеттік соттарға қарағанда әлдеқайда жылдам.',
        'faq3_q': 'Шешімге шағымдануға бола ма?',
        'faq3_a': 'Төрелік шешімі түпкілікті және апелляциялық шағымдануға жатпайды, бұл тараптардың уақыты мен қаражатын үнемдейді.',
        'about_title': 'Төрелік туралы',
        'about_desc': 'Төрелік талқылау туралы білу керек барлық нәрсе',
        'about_q1': 'Төрелік дегеніміз не',
        'about_a1_1': 'Төрелік – нақты азаматтық-құқықтық дауды қарау үшін арнайы құрылған мемлекеттік емес сот немесе тұрақты жұмыс істейтін төрелік.',
        'about_a1_2': 'Тұрақты жұмыс істейтін төреліктерді Қазақстан Республикасының заңнамасына сәйкес жеке және (немесе) заңды тұлғалар құра алады.',
        'about_a1_3': 'Нақты дауды қарауға арналған төрелікті дауды шешу үшін тараптар құрады және ол осы дау шешілгенге немесе тараптар дауды сотқа беру туралы шешім қабылдағанға дейін әрекет етеді.',
        'about_q2': 'Төрелікке кім жүгіне алады',
        'about_a2_1': 'Төрелікте Қазақстан Республикасы аумағындағы немесе одан тыс жерлердегі тұрғылықты мекенжайына немесе орналасқан жеріне қарамастан жеке және (немесе) заңды тұлғалар тараптар бола алады. Дау тараптар арасында қандай да бір нақты азаматтық-құқықтық қатынастар бойынша туындаған немесе туындауы мүмкін дауларға қатысты төрелік келісім болған жағдайда төреліктің қарауына берілуі мүмкін.',
        'about_a2_2': 'Соттың қарауында жатқан дауға қатысты төрелік келісім осы сот дау бойынша шешім қабылдағанға дейін жасалуы мүмкін. Бұл жағдайда сот арызды қараусыз қалдыру туралы ұйғарым шығарады.',
        'about_a2_3': 'Төрелік келісім жазбаша түрде жасалады. Ол азаматтық-құқықтық шарттың мәтініне енгізілген төрелік ескертпе түрінде жасалуы мүмкін.',
        'about_q3': 'Төрелік келісімнің түрі мен мазмұны',
        'about_a3_1': 'Төрелік келісім тараптар қол қойған құжатта төрелік ескертпе түрінде болса немесе хаттар, телеграммалар, телефонограммалар, факстар, электрондық құжаттар немесе субъектілер мен олардың ерік-жігер мазмұнын айқындайтын өзге де құжаттармен алмасу арқылы жасалса, жазбаша түрде жасалған болып есептеледі.',
        'about_a3_2': 'Төрелік келісім, сондай-ақ, егер ол талап арыз бен талапқа пікір алмасу арқылы жасалса, онда тараптардың бірі келісімнің бар екенін растаса, ал екіншісі бұған қарсы болмаса, жазбаша түрде жасалған болып саналады.',
        'about_a3_3': 'Шартта дауды төреліктің шешуіне беру туралы шарты бар құжатқа сілтеме жасау төрелік келісім болып табылады, егер шарт жазбаша түрде жасалған болса және бұл сілтеме төрелік келісімді шарттың бір бөлігі ететіндей болса.',
        'about_a3_info': 'Жасалған шартқа (келісімге, келісімшартқа) төрелік ескертпені енгізу үшін оған жоғарыда көрсетілген төрелік ескертпе көзделген қосымша келісім жасасу қажет.',
        'about_q4': 'Төрелік қандай дауларды қарайды?',
        'about_a4_info': 'Төрелік жеке және (немесе) заңды тұлғалар арасындағы азаматтық-құқықтық қатынастардан туындайтын дауларды қарауға құқылы:',
        'about_a4_li1': 'мүліктік даулар;',
        'about_a4_li2': 'мүліктік қатынастармен байланысты жеке мүліктік емес қатынастардан туындайтын даулар.',
        'about_q5': 'Төреліктің қарауына жатпайтын даулар:',
        'about_a5_li1': 'төрелік келісімге қатыспайтын кәмелетке толмағандардың, әрекетке қабілетсіз немесе әрекет қабілеті шектеулі, үшінші тұлғалардың мүдделерін қозғайтын;',
        'about_a5_li2': 'екінші деңгейдегі банктер арасындағы даулар;',
        'about_a5_li3': 'оңалту және банкроттық туралы;',
        'about_a5_li4': 'табиғи монополиялар субъектілері мен олардың тұтынушылары арасындағы;',
        'about_a5_li5': 'мемлекеттік органдар, квазимемлекеттік сектор субъектілері арасындағы;',
        'about_a5_li6': 'мүліктік қатынастармен байланысты емес жеке мүліктік емес қатынастардан туындайтын.',
        'about_q6': 'Дауды мемлекеттік сотпен салыстырғанда төрелікте қараудың артықшылықтары',
        'about_a6_li1': 'Дауласушы тараптар төрелік дауды қарауы тиіс ережелерді өз бетінше анықтауға құқылы.',
        'about_a6_li2': 'Тараптар талқылау орны мен тілін өз бетінше таңдауға құқылы.',
        'about_a6_li3': 'Тараптар төрешілерді өз бетінше таңдауга құқылы.',
        'about_a6_li4': 'Талқылаудың құпиялылығы.',
        'about_a6_li5': 'Процестің жылдамдығы мен тиімділігі.',
        'about_a6_li6': 'Төрелік шешімі түпкілікті болып табылады, істің мәні бойынша қайта қарауға жатпайды.',
        'about_a6_li7': 'Шетелдік төрелік шешімдерді тану және орындау туралы Конвенцияның (Нью-Йорк қ., 1958 жылғы 10 маусым) болуына байланысты төрелік шешімді шет мемлекеттің аумағында орындау оңайырақ.',
        'table1_title': 'Сот пен төрелікті салыстыру',
        'th_comp': 'Салыстыру',
        'th_court': 'Сот',
        'th_arb': 'Төрелік',
        'td_term_title': 'Істі қарау мерзімі',
        'td_term_court': '3 ай',
        'td_term_arb': '1 ай, ең көбі 2 ай',
        'td_force_title': 'Шешімнің заңды күшіне енуі',
        'td_force_court': 'Түпкілікті нысанда дайындалғаннан кейін 1 айдан соң',
        'td_force_arb': 'Шешім түпкілікті нысанда дайындалған күні',
        'td_cancel_title': 'Шешімнің күшін жою негіздері',
        'td_cancel_court': 'Кез келген негіздер бойынша',
        'td_cancel_arb': 'Тек процессуалдық бұзушылықтар, төрелік шешімін мәні бойынша қайта қараусыз',
        'td_terr_title': 'Аумақтық соттылық',
        'td_terr_court': 'Тек сот орналасқан белгілі бір аумақта',
        'td_terr_arb': 'Қазақстанның барлық аумағында',
        'td_fee_title': 'Мемлекеттік баж және төрелік алым сомасы',
        'td_fee_court': '3%, ең көбі 20 000 АЕК',
        'td_fee_arb': 'Талап сомасы неғұрлым көп болса, төрелік алым соғұрлым аз болады, ең көбі 15 000 АЕК',
        'table2_title': 'Мемлекеттік баж бен төрелік алым мөлшерін салыстыру',
        'th2_1': 'Талап бағасы (теңге)',
        'th2_2': 'Мемлекеттік баж (теңге)',
        'th2_3': 'Төрелік алым (теңге)',
        'td2_last': '650 000 АЕК-тен және одан жоғары',
        'arb_registry_title': 'Төрешілер тізілімі',
        'val_search': 'Төрешіні тегі бойынша іздеу...',
        'search_not_found': 'Сіздің сұрауыңыз бойынша ештеңе табылмады',
        'office_title': 'Біздің кеңсе',
        'label_address': 'Мекенжай',
        'address': 'Астана қ., Қабанбай батыр д-лы, 53, D2 блогы',
        'address_br': 'Астана қ., Қабанбай батыр д-лы, 53,<br>D2 блогы',
        'label_working_hours': 'Жұмыс уақыты',
        'working_hours': 'Дс-Жм: 09:00 - 18:00',
        'label_phone_short': 'Телефон',
        'admin_login_title': 'Admin үшін кіру',
        'admin_pass_placeholder': 'Құпия сөз',
        'admin_pass_error': 'Қате. Құпия сөз дұрыс емес.',
        'admin_enter': 'Кіру',
        'admin_cancel': 'Бас тарту',
        'clause_text': 'Осы шарттан (келісімнен, келісімшарттан) немесе оған байланысты туындаған барлық даулар, келіспеушіліктер немесе талаптар тұрақты жұмыс істейтін төрелік – «Орталық Азия экономикалық төрелігі» ЖШС-нде оның Регламентіне сәйкес шешілуге жатады. Төрелік құрамына бір төреші кіреді. Төрелік талқылау тілі – орыс тілі.',
        'clause_info': 'Бұрын жасалған шартқа қосу үшін осы ескертпемен қосымша келісім жасасу қажет.',
        'modal_bio_title': 'Өмірбаян',
        'footer_copy': '© 2024 Орталық Еуразиялық төрелік соты. Барлық құқықтар қорғалған.',
        'clause_info_2': 'Бұрын жасалған шартқа қосу үшін осы ескертпемен қосымша келісім жасасу қажет.',
        'breadcrumb_home': 'Басты бет',
        'breadcrumb_about': 'Біз туралы',
        'breadcrumb_registry': 'Төрешілер',
        'footer_contacts': 'Байланыс',
        'footer_sections': 'Бөлімдер',
        'btn_pdf_download': 'PDF жүктеу',
        'modal_exp_label': 'Тәжірибе:',
        'table2_title_full': 'Мемлекеттік баж бен төрелік алым мөлшерін салыстыру',
        'td_force_court': 'Түпкілікті нысанда дайындалғаннан кейін 1 айдан соң',
        'td_cancel_arb': 'Тек процессуалдық бұзушылықтар, төрелік шешімін мәні бойынша қайта қараусыз',
        'td_terr_court': 'Тек сот орналасқан белгілі бір аумақта',
        'td_fee_arb': 'Талап сомасы неғұрлым көп болса, төрелік алым соғұрлым аз болады, ең көбі 15 000 АЕК',
        'btn_close': 'Түсінікті'
    },
    'en': {
        'brand_name': 'Central Eurasian', 'brand_sub': 'Arbitration Court',
        'nav_about': 'About', 'nav_arbitrators': 'Arbitrators', 'nav_documents': 'Documents', 'nav_contacts': 'Contacts', 'nav_apply': 'Submit claim',
        'hero_title': 'Fair dispute resolution <br><span class="text-amber-500">for your business</span>',
        'hero_desc': 'Resolution of commercial disputes within the legal framework with full observance of confidentiality principles.',
        'btn_apply': 'Apply online', 'btn_clause': 'Arbitration clause',
        'stat_arbitrators': 'Arbitrators in registry', 'stat_cases': 'Cases resolved', 'stat_cancelled': 'Cancelled decisions',
        'features_title': 'Arbitration Advantages',
        'f1_title': 'Efficiency', 'f1_desc': 'Case review takes from 7 to 14 days.',
        'f2_title': 'Ready-made solutions', 'f2_desc': 'Document templates are available for free.',
        'f3_title': 'Legal force', 'f3_desc': 'Decisions enter into force immediately.',
        'calc_title': 'Fee Calculator', 'calc_label': 'Claim amount (KZT)', 'calc_result_label': 'Fee amount:',
        'form_title': 'Submit Application', 'form_desc': 'Fill out the form to start the process.',
        'label_name': 'Full Name / Organization', 'label_phone': 'Phone', 'label_email': 'E-mail', 'label_sum': 'Claim amount', 'label_message': 'Subject of dispute',
        'btn_submit_form': 'Submit application', 'success_title': 'Application accepted', 'success_desc': 'Data saved in the system.',
        'arb_title': 'Our Arbitrators', 'arb_view_all': 'All 71 arbitrators', 'lib_title': 'Documents', 'address': 'Astana, Imanov st 13, office 709/1',
        'footer_admin': 'Administration',
        'how_works_title': 'How it works',
        'how_works_desc': 'A simple process of dispute resolution from application to result',
        'step1_title': '1. File a claim',
        'step1_desc': 'Fill out the online form or send documents by email',
        'step2_title': '2. Select arbitrator',
        'step2_desc': 'Parties select an independent arbitrator from our registry',
        'step3_title': '3. Consideration',
        'step3_desc': 'Prompt review of the case maintaining confidentiality',
        'step4_title': '4. Decision',
        'step4_desc': 'Issuing a final legally binding decision',
        'form_storage': 'Secure storage',
        'lib_desc_full': 'We have prepared all necessary templates for your protection.',
        'doc1': 'Arbitration clause',
        'doc1_hint': 'Click to view the clause text',
        'doc2': 'Sample claim',
        'reg_rules': 'Rules',
        'reg_desc': 'Read the rules of the arbitration',
        'btn_pdf': 'Download PDF',
        'docs_page_desc': 'Official documents and materials of the arbitration',
        'docs_section_static': 'Templates and documents',
        'docs_section_uploads': 'Uploaded documents',
        'docs_empty': 'Documents not uploaded yet.',
        'faq_title': 'Frequently Asked Questions',
        'faq1_q': 'Is the arbitration award binding?',
        'faq1_a': 'Yes, the arbitration award is final, enters into force immediately upon its announcement and is binding on the parties.',
        'faq2_q': 'How long does a case review take?',
        'faq2_a': 'On average, reviewing a case in our arbitration takes 7 to 14 days. This is much faster than in state courts.',
        'faq3_q': 'Can the decision be appealed?',
        'faq3_a': 'The arbitration decision is final and not subject to appeal, which saves time and money for the parties.',
        'about_title': 'About Arbitration',
        'about_desc': 'Everything you need to know about arbitration proceedings',
        'about_q1': 'What is arbitration',
        'about_a1_1': 'Arbitration is a non-governmental court established specifically to hear a particular civil dispute or a permanent arbitration.',
        'about_a1_2': 'Permanent arbitrations can be established by individuals and/or legal entities in accordance with the legislation of the Republic of Kazakhstan.',
        'about_a1_3': 'An arbitration for hearing a specific dispute is created by the parties and operates until this dispute is resolved or until the parties decide to refer the dispute to court.',
        'about_q2': 'Who can apply to arbitration',
        'about_a2_1': 'Parties in arbitration can be individuals and/or legal entities, regardless of their place of residence or location in Kazakhstan or abroad. A dispute can be referred to arbitration if there is an arbitration agreement concluded between the parties regarding disputes that have arisen or may arise.',
        'about_a2_2': 'An arbitration agreement regarding a dispute pending in court may be concluded before the court renders a decision. In this case, the court dismisses the claim.',
        'about_a2_3': 'An arbitration agreement is concluded in writing. It may be concluded as an arbitration clause included in a civil contract.',
        'about_q3': 'Form and content of the arbitration agreement',
        'about_a3_1': 'An arbitration agreement is considered to be concluded in writing if it is contained as an arbitration clause in a document signed by the parties or concluded by exchanging letters, telegrams, faxes, electronic documents, etc.',
        'about_a3_2': 'An arbitration agreement is also considered concluded in writing if it is concluded by exchanging a statement of claim and a defense, in which one party claims the existence of an agreement and the other does not object.',
        'about_a3_3': 'A reference in a contract to a document containing an arbitration clause constitutes an arbitration agreement provided the contract is in writing and the reference makes the clause part of the contract.',
        'about_a3_info': 'To include an arbitration clause in an already concluded contract, it is necessary to sign an additional agreement providing for the above arbitration clause.',
        'about_q4': 'What disputes does arbitration consider?',
        'about_a4_info': 'Arbitration is entitled to consider disputes arising from civil legal relations between individuals and/or legal entities:',
        'about_a4_li1': 'property disputes;',
        'about_a4_li2': 'disputes arising from personal non-property relations associated with property relations.',
        'about_q5': 'Disputes not subject to arbitration:',
        'about_a5_li1': 'affecting the interests of minors, incapacitated persons, or third parties not part of the arbitration agreement;',
        'about_a5_li2': 'disputes between second-tier banks;',
        'about_a5_li3': 'on rehabilitation and bankruptcy;',
        'about_a5_li4': 'between subjects of natural monopolies and their consumers;',
        'about_a5_li5': 'between government bodies and subjects of the quasi-public sector;',
        'about_a5_li6': 'arising from personal non-property relations not related to property.',
        'about_q6': 'Advantages of arbitration over state court',
        'about_a6_li1': 'The disputing parties have the right to independently determine the rules by which the arbitration will hear the dispute.',
        'about_a6_li2': 'The parties have the right to independently choose the place and language of the arbitration.',
        'about_a6_li3': 'The parties have the right to independently choose arbitrators.',
        'about_a6_li4': 'Confidentiality of the proceedings.',
        'about_a6_li5': 'Speed and efficiency of the process.',
        'about_a6_li6': 'The arbitration award is final and cannot be reviewed on its merits.',
        'about_a6_li7': 'An arbitration award is easier to enforce in a foreign state due to the New York Convention on the Recognition and Enforcement of Foreign Arbitral Awards (1958).',
        'table1_title': 'Comparison of Court and Arbitration',
        'th_comp': 'Comparison',
        'th_court': 'Court',
        'th_arb': 'Arbitration',
        'td_term_title': 'Case review period',
        'td_term_court': '3 months',
        'td_term_arb': '1 month, maximum 2 months',
        'td_force_title': 'Entry into force',
        'td_force_court': '1 month after drafting in final form',
        'td_force_arb': 'On the day of drafting the final decision',
        'td_cancel_title': 'Grounds for cancellation',
        'td_cancel_court': 'For any reason',
        'td_cancel_arb': 'Only procedural violations, without reviewing the merits of the case',
        'td_terr_title': 'Territorial jurisdiction',
        'td_terr_court': 'Only in a specific territory where the court is located',
        'td_terr_arb': 'Throughout the entire territory of Kazakhstan',
        'td_fee_title': 'Amount of state fee and arbitration fee',
        'td_fee_court': '3%, maximum 20,000 MCI',
        'td_fee_arb': 'The higher the claim amount, the lower the arbitration fee, maximum 15,000 MCI',
        'table2_title': 'Comparison of state fee and arbitration fee',
        'th2_1': 'Claim price (tenge)',
        'th2_2': 'State fee (tenge)',
        'th2_3': 'Arbitration fee (tenge)',
        'td2_last': 'from 650,000 MCI and more',
        'arb_registry_title': 'Registry of Arbitrators',
        'val_search': 'Search arbitrator by last name...',
        'search_not_found': 'Nothing found for your request',
        'office_title': 'Our Office',
        'label_address': 'Address',
        'address': 'Astana, Kabanbay Batyr ave, 53, block D2',
        'address_br': 'Astana, Kabanbay Batyr ave, 53,<br>block D2',
        'label_working_hours': 'Working Hours',
        'working_hours': 'Mon-Fri: 09:00 - 18:00',
        'label_phone_short': 'Phone',
        'admin_login_title': 'Admin Login',
        'admin_pass_placeholder': 'Password',
        'admin_pass_error': 'Error. Invalid password.',
        'admin_enter': 'Login',
        'admin_cancel': 'Cancel',
        'clause_text': 'All disputes, disagreements, or claims arising out of or in connection with this contract (agreement) shall be resolved by the permanent arbitration – "Central Asian Economic Arbitration" LLP in accordance with its Rules. The arbitral tribunal will consist of one arbitrator. The language of the arbitral proceedings shall be Russian.',
        'clause_info': 'To include this in an already concluded contract, an additional agreement with this clause must be issued.',
        'modal_bio_title': 'Biography',
        'footer_copy': '© 2024 Central Eurasian Arbitration Court. All rights reserved.',
        'clause_info_2': 'To include this in an already concluded contract, an additional agreement with this clause must be issued.',
        'breadcrumb_home': 'Home',
        'breadcrumb_about': 'About Us',
        'breadcrumb_registry': 'Arbitrators',
        'footer_contacts': 'Contacts',
        'footer_sections': 'Sections',
        'btn_pdf_download': 'Download PDF',
        'modal_exp_label': 'Experience:',
        'table2_title_full': 'Comparison of state fee and arbitration fee',
        'td_force_court': '1 month after drafting in final form',
        'td_cancel_arb': 'Only procedural violations, without reviewing the merits of the case',
        'td_terr_court': 'Only in a specific territory where the court is located',
        'td_fee_arb': 'The higher the claim amount, the lower the arbitration fee, maximum 15,000 MCI',
        'btn_close': 'Got it'
    }
};

window.setLanguage = function (lang) {
    window.currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (window.translations[lang][key]) el.innerHTML = window.translations[lang][key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (window.translations[lang][key]) el.placeholder = window.translations[lang][key];
    });
    document.getElementById('lang-ru').classList.toggle('active', lang === 'ru');
    document.getElementById('lang-kz').classList.toggle('active', lang === 'kz');

    // Add EN language trigger safely
    const langEn = document.getElementById('lang-en');
    if (langEn) langEn.classList.toggle('active', lang === 'en');

    if (!document.getElementById('registry-view').classList.contains('view-hidden')) window.renderArbitrators();

    // Also re-render list of documents to refresh english titles
    if (!document.getElementById('documents-view').classList.contains('view-hidden')) window.loadDocuments();
}

window.switchView = function (view) {
    if (view === 'admin' && !isAuth) { window.openAdminAuthModal(); return; }
    document.querySelectorAll('.view-content').forEach(v => v.classList.add('view-hidden'));
    document.getElementById(view + '-view').classList.remove('view-hidden');
    if (view === 'registry') window.renderArbitrators();
    if (view === 'documents') window.loadDocuments();
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
    const yearsLabel = window.currentLang === 'kz' ? 'жыл' : 'лет';
    document.getElementById('modal-exp').innerText = `${exp} ${yearsLabel}`;
    const bioText = window.currentLang === 'kz'
        ? 'Шаруашылық және корпоративтік дауларды шешуде көпжылдық тәжірибесі бар кәсіби төреші. Азаматтық құқық саласында маманданған.'
        : 'Профессиональный арбитр с многолетним опытом разрешения хозяйственных и корпоративных споров. Специализируется на гражданском праве.';
    document.getElementById('modal-bio').innerText = bioText;
    document.getElementById('modal-img').src = `https://ui-avatars.com/api/?name=${name.split(' ').join('+')}&background=0F172A&color=fff&size=200`;
    document.getElementById('arbitrator-modal').classList.remove('hidden');
}

window.calculateFee = function () {
    const sum = parseFloat(document.getElementById('claimSum')?.value) || 0;
    let fee = (sum <= 1600000) ? sum * 0.06 : (sum <= 5000000) ? sum * 0.05 : (sum <= 10000000) ? sum * 0.04 : sum * 0.03;
    if (sum <= 5000000 && fee < 300000) fee = 300000;
    const el = document.getElementById('feeResult');
    if (el) el.innerText = fee.toLocaleString('ru-RU') + ' KZT';
}

window.toggleClauseDoc = function () {
    const text = document.getElementById('clause-doc-text');
    const icon = document.getElementById('clause-doc-chevron');
    if (text) text.classList.toggle('hidden');
    if (icon) icon.classList.toggle('rotate-180');
}

// Load documents from Firestore and append into the unified doc list
window.loadDocuments = function () {
    const list = document.getElementById('all-docs-list');
    const empty = document.getElementById('docs-empty-state');
    if (!list) return;

    const iconMap = {
        pdf: { icon: 'fas fa-file-pdf', bg: 'bg-red-50', color: 'text-red-500' },
        docx: { icon: 'far fa-file-word', bg: 'bg-blue-50', color: 'text-blue-500' },
        xlsx: { icon: 'fas fa-file-excel', bg: 'bg-green-50', color: 'text-green-600' },
        other: { icon: 'fas fa-file', bg: 'bg-slate-100', color: 'text-slate-500' }
    };

    if (typeof firebase === 'undefined') return;
    const db = firebase.firestore();
    db.collection('documents').orderBy('timestamp', 'desc').get().then(snap => {
        // Remove the empty-state placeholder regardless
        if (empty) empty.remove();
        if (snap.empty) return;
        snap.forEach(doc => {
            const d = doc.data();
            const t = iconMap[d.type] || iconMap.other;
            let displayTitle = d.title;
            if (window.currentLang === 'en' && d.titleEn) displayTitle = d.titleEn;
            if (window.currentLang === 'kz' && d.titleKz) displayTitle = d.titleKz;
            const card = document.createElement('a');
            card.href = d.url || '#';
            card.target = '_blank';
            card.rel = 'noopener noreferrer';
            card.className = 'doc-card';
            card.innerHTML = `
                <div class="doc-icon ${t.bg} ${t.color}"><i class="${t.icon}"></i></div>
                <div class="flex-1">
                    <p class="font-bold text-slate-700">${displayTitle}</p>
                    ${d.desc ? `<p class="text-xs text-slate-400 mt-0.5">${d.desc}</p>` : ''}
                    <p class="text-[10px] uppercase font-bold text-amber-600 mt-1">${(d.type || 'OTHER').toUpperCase()}</p>
                </div>
                <i class="fas fa-download text-slate-400"></i>
            `;
            list.appendChild(card);
        });
    }).catch(err => console.error('Docs load error:', err));
}
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
