function calculateDaysUntilBirthday() {
    const today = new Date();
    const currentYear = today.getFullYear();
    
    // Create birthday date for this year (August 22nd)
    let birthday = new Date(currentYear, 7, 22); // Month is 0-indexed, so 7 = August    // If birthday has passed this year, use next year's birthday
    if (today > birthday) {
        birthday = new Date(currentYear + 1, 7, 22);
    }
    
    // Calculate difference in milliseconds and convert to days
    const timeDiff = birthday.getTime() - today.getTime();
    const daysUntil = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    return daysUntil;
}

function isBirthday() {
    const today = new Date();
    
    // For testing purposes - since birthday = today, it's always the birthday
    //return true;
    
    // Original logic (commented out for testing):
    const month = today.getMonth(); // 0-indexed
    const day = today.getDate();
    return month === 7 && day === 22; // August 22nd
}

function updateBirthdayMessage() {
    const messageElement = document.getElementById('birthday-message');
    const countdownElement = document.getElementById('countdown');
    const languageSelector = document.querySelector('.language-selector');
    const confettiCanvas = document.getElementById('confetti');
    
    if (isBirthday()) {
        // IT'S VIVIENNE'S BIRTHDAY! Show everything with celebration
        const birthdayMessages = {
            en: "🎉 Happy Birthday Vivienne! 🎉\nIt's your special day!\nHave a great day and eat loads of ice cream!",
            es: "🎉 ¡Feliz cumpleaños Vivienne! 🎉\n¡Es tu día especial!\n¡que tengas un gran día y come mucho helado!",
            pl: "🎉 Wszystkiego najlepszego Vivienne! 🎉\nTo twój wyjątkowy dzień!\nmiłego dnia i jedz dużo lodów!",
            zh: "🎉 生日快乐 Vivienne! 🎉\n今天是你的特别日子！\n祝你度过愉快的一天，多吃冰淇淋！"
        };
        
        const currentLang = messageElement.getAttribute('data-lang') || 'en';
        messageElement.innerHTML = birthdayMessages[currentLang].replace(/\n/g, '<br>');
        messageElement.style.display = 'block';
        
        // Hide countdown, show birthday elements
        countdownElement.style.display = 'none';
        languageSelector.style.display = 'block';
        confettiCanvas.style.display = 'block';
        
        // Add birthday celebration class for special styling
        document.body.classList.add('birthday-celebration');
    } else {
        // NOT the birthday yet - hide everything except countdown
        const daysUntil = calculateDaysUntilBirthday();
        
        const countdownTexts = {
            en: `${daysUntil} day${daysUntil === 1 ? '' : 's'} until Vivienne's Birthday! 🎂`,
            es: `¡${daysUntil} día${daysUntil === 1 ? '' : 's'} hasta el cumpleaños de Vivienne! 🎂`,
            pl: `${daysUntil} dni do urodzin Vivienne! 🎂`,
            zh: `距离 Vivienne 生日还有 ${daysUntil} 天！🎂`
        };
        
        const currentLang = messageElement.getAttribute('data-lang') || 'en';
        
        // Hide birthday message and show countdown
        messageElement.style.display = 'none';
        countdownElement.textContent = countdownTexts[currentLang];
        countdownElement.style.display = 'block';
        
        // Hide language selector and confetti until birthday
        languageSelector.style.display = 'none';
        confettiCanvas.style.display = 'none';
        
        document.body.classList.remove('birthday-celebration');
    }
}

function changeLanguage(lang) {
    const messageElement = document.getElementById('birthday-message');
    messageElement.setAttribute('data-lang', lang);
    updateBirthdayMessage();
}

// Initialize the birthday message when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateBirthdayMessage();
    
    // Update countdown every hour to check if it's a new day
    setInterval(updateBirthdayMessage, 60 * 60 * 1000);
}); 