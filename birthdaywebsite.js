function changeLanguage(lang) {
    const messageElement = document.getElementById('birthday-message');
    const messages = {
        en: "Happy Birthday Vivienne, have a great day and eat loads of ice cream!",
        es: "¡Feliz cumpleaños Vivienne, que tengas un gran día y come mucho helado!",
        pl: "Wszystkiego najlepszego Vivienne, miłego dnia i jedz dużo lodów!",
        zh: "生日快乐 Vivienne，祝你度过愉快的一天，多吃冰淇淋！"
    };
    
    messageElement.textContent = messages[lang];
}
