# Интеграция формы сотрудничества

Форма на сайте сейчас работает в демо-режиме и показывает успешное сообщение без реальной отправки данных. Для полноценной работы формы вам нужно подключить один из следующих сервисов:

## 🚀 Быстрые решения (без кода)

### 1. Formspree (Рекомендуется)

**Самый простой способ!** Бесплатный тариф: 50 отправок/месяц

1. Зарегистрируйтесь на [formspree.io](https://formspree.io)
2. Создайте новую форму и получите endpoint
3. В `index.html` найдите строку:
```html
<form class="collaboration-form" id="collaborationForm">
```

4. Замените на:
```html
<form class="collaboration-form" id="collaborationForm" 
      action="https://formspree.io/f/YOUR_FORM_ID" 
      method="POST">
```

5. Добавьте атрибуты `name` к полям (уже есть в коде)

**Готово!** Письма будут приходить на вашу почту.

---

### 2. EmailJS

**Полностью клиентское решение**. Бесплатно: 200 писем/месяц

1. Зарегистрируйтесь на [emailjs.com](https://www.emailjs.com/)
2. Создайте Email Service (Gmail, Outlook и т.д.)
3. Создайте Email Template
4. Получите ваши ID

5. В `index.html` добавьте перед закрывающим тегом `</body>`:
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
    emailjs.init('YOUR_PUBLIC_KEY');
</script>
```

6. В `script.js` замените секцию `COLLABORATION FORM HANDLING` на:
```javascript
document.addEventListener('DOMContentLoaded', () => {
    const collaborationForm = document.getElementById('collaborationForm');
    
    if (collaborationForm) {
        collaborationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = collaborationForm.querySelector('.btn-submit');
            btn.disabled = true;
            btn.innerHTML = '<span>Sending...</span>';
            
            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', collaborationForm)
                .then(() => {
                    showFormMessage('success');
                    collaborationForm.reset();
                    btn.disabled = false;
                    btn.innerHTML = '<span data-en="Send Message" data-uk="Надіслати повідомлення">Send Message</span><i class="fas fa-paper-plane"></i>';
                }, (error) => {
                    showFormMessage('error');
                    btn.disabled = false;
                    btn.innerHTML = '<span data-en="Send Message" data-uk="Надіслати повідомлення">Send Message</span><i class="fas fa-paper-plane"></i>';
                });
        });
    }
});
```

---

### 3. Google Forms

1. Создайте Google Form с полями: Name, Email, Company, Type, Message
2. Получите ссылку для встраивания
3. Замените форму в HTML на iframe от Google Forms

**Минус**: менее красивая интеграция

---

### 4. Web3Forms

**Простое API решение**. Бесплатно: 250 писем/месяц

1. Получите API ключ на [web3forms.com](https://web3forms.com/)
2. В `index.html` добавьте скрытое поле:
```html
<input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">
```

3. Установите `action` и `method`:
```html
<form class="collaboration-form" 
      action="https://api.web3forms.com/submit" 
      method="POST">
```

4. Форма будет работать автоматически!

---

## 💻 Продвинутая интеграция (с бэкендом)

### Собственный сервер (Node.js)

Если у вас есть сервер, создайте endpoint для обработки формы:

```javascript
// server.js (Node.js + Express)
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-app-password'
    }
});

app.post('/api/collaboration', async (req, res) => {
    const { name, email, company, type, message } = req.body;
    
    const mailOptions = {
        from: email,
        to: 'avelle.office@gmail.com',
        subject: `New Collaboration Request from ${name}`,
        html: `
            <h2>New Collaboration Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Type:</strong> ${type}</p>
            <p><strong>Message:</strong> ${message}</p>
        `
    };
    
    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

В `script.js` раскомментируйте fetch запрос и укажите ваш endpoint.

---

### Netlify Forms

Если публикуете на Netlify, просто добавьте атрибут:

```html
<form class="collaboration-form" 
      id="collaborationForm" 
      name="collaboration" 
      netlify>
```

**Все!** Netlify автоматически обработает форму.

---

## 📧 Настройка уведомлений

### Куда приходят письма:

- **Formspree**: На email, указанный при регистрации
- **EmailJS**: Вы настраиваете в шаблоне
- **Web3Forms**: На email, указанный в настройках
- **Свой сервер**: На email в коде

### Автоответ клиенту:

Большинство сервисов (Formspree, EmailJS) позволяют настроить автоматический ответ клиенту после отправки формы.

---

## 🔒 Защита от спама

### reCAPTCHA (Google)

1. Получите ключи на [google.com/recaptcha](https://www.google.com/recaptcha)
2. Добавьте скрипт в `<head>`:
```html
<script src="https://www.google.com/recaptcha/api.js" async defer></script>
```

3. Добавьте виджет перед кнопкой отправки:
```html
<div class="g-recaptcha" data-sitekey="YOUR_SITE_KEY"></div>
```

4. Проверяйте токен на сервере

---

## ✅ Рекомендация для начала

**Начните с Formspree** - это самое простое решение:
- Регистрация за 2 минуты
- Одна строка кода
- Бесплатно до 50 писем/месяц
- Защита от спама встроена
- Можно настроить автоответ

Позже, когда сайт вырастет, можно переключиться на собственный сервер.

---

## 🧪 Тестирование формы

1. Откройте сайт в браузере
2. Заполните все поля формы
3. Нажмите "Send Message"
4. Проверьте почту (возможно, в Spam)

**Совет**: Добавьте адрес отправителя в контакты, чтобы письма не попадали в спам.

---

**Нужна помощь с настройкой?** Пишите на avelle.office@gmail.com

