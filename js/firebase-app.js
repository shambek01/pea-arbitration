// Firebase Compat SDK
// Подключите в HTML перед этим файлом:
//   firebase-app-compat.js
//   firebase-auth-compat.js
//   firebase-firestore-compat.js

const firebaseConfig = {
    apiKey: "AIzaSyBn8YOy_S-eMCqNAF6rKmaNgDvPbknXwPE",
    authDomain: "test-a304d.firebaseapp.com",
    projectId: "test-a304d",
    storageBucket: "test-a304d.firebasestorage.app",
    messagingSenderId: "217531581752",
    appId: "1:217531581752:web:0a09ca824933cabf44edcd"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

const COLLECTION = "claims";

// Анонимная авторизация — нужна для доступа к Firestore
auth.signInAnonymously().catch(err => console.error("Auth error:", err));

// Как только авторизация готова — сразу запускаем listener на заявки
// Это работает и для index.html (элементы просто не найдутся) и для admin.html
auth.onAuthStateChanged((user) => {
    if (!user) return;
    startClaimsListener();
});

function startClaimsListener() {
    const body = document.getElementById('claimsTableBody');
    const empty = document.getElementById('noClaims');
    if (!body) return; // не admin-страница — выходим

    db.collection(COLLECTION).onSnapshot((snap) => {
        if (snap.empty) {
            if (empty) empty.classList.remove('hidden');
            body.innerHTML = '';
            return;
        }
        if (empty) empty.classList.add('hidden');

        let rows = [];
        snap.forEach(doc => {
            const d = doc.data();
            rows.push({
                date: d.timestamp ? new Date(d.timestamp.seconds * 1000).toLocaleDateString('ru-RU') : '...',
                name: d.name || '—',
                contact: `${d.phone || ''}${d.email ? '<br>' + d.email : ''}`,
                amount: d.amount ? `${Number(d.amount).toLocaleString('ru-RU')} KZT` : '—',
                msg: d.message || '—',
                time: d.timestamp ? d.timestamp.seconds : 0
            });
        });

        rows.sort((a, b) => b.time - a.time);

        body.innerHTML = rows.map(r => `
            <tr class="border-b hover:bg-slate-50 transition">
                <td class="p-8 text-slate-400 font-mono">${r.date}</td>
                <td class="p-8 font-black text-navy text-base">${r.name}</td>
                <td class="p-8 text-slate-600 leading-relaxed">${r.contact}</td>
                <td class="p-8 font-black text-amber-600 text-lg">${r.amount}</td>
                <td class="p-8 text-slate-500 max-w-xs truncate italic">${r.msg}</td>
            </tr>
        `).join('');
    }, (error) => {
        console.error("Firestore error:", error);
        body.innerHTML = `<tr><td colspan="5" class="p-8 text-red-400 text-center font-bold">Ошибка: ${error.message}</td></tr>`;
    });
}

// Экспортируем для совместимости (вызывается из admin.html после входа, но теперь не обязателен)
window.setupRealtimeSubmissions = startClaimsListener;

// --- Отправка формы ---
window.handleFormSubmit = async (e) => {
    e.preventDefault();

    const btn = document.getElementById('submitBtn');
    const originalHTML = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<div class="loader"></div>';

    const fd = new FormData(e.target);
    try {
        await db.collection(COLLECTION).add({
            name: fd.get('name'),
            phone: fd.get('phone'),
            email: fd.get('email'),
            amount: fd.get('amount'),
            message: fd.get('message'),
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            status: 'new'
        });
        document.getElementById('success-modal').classList.remove('modal-hidden');
        e.target.reset();
    } catch (err) {
        console.error("Ошибка записи:", err);
        alert("Ошибка при сохранении: " + err.message);
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalHTML;
    }
};
