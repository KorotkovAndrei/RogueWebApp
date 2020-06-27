window.addEventListener('DOMContentLoaded', (event) => {
    const submitButton = document.querySelector('.submit-button');
    const logoutButton = document.querySelector('.logout-button');
    const messageButton = document.querySelector('.add-message-button');

    const usernameInput = document.querySelector('.username');
    const passwordInput = document.querySelector('.password');
    const fileInput = document.querySelector('.file-input');
    const titleInput = document.querySelector('.title-input');
    const subtitleInput = document.querySelector('.subtitle-input');
    const textInput = document.querySelector('.text-input');

    const menuLogin = document.querySelector('.auth-menu-login');
    const menuLogout = document.querySelector('.auth-menu-logout');
    const messagesList = document.querySelector('.main-section-messages-list');
    const messageForm = document.querySelector('.main-section-message-form');
    const greeter = document.querySelector('.auth-logout-greeter');

    const requestConfig = {
        token: null,
    };

    function init() {

        addEventListeners();
        checkIfLogged();
        getMessages();
    }

    init();

    function checkIfLogged() {
        requestConfig.token = localStorage.getItem('rogue-token');

        fetch('http://localhost:9000/token-check', {
            method: 'POST',
            headers: {
                ...requestConfig.token && { Authorization: `Bearer ${requestConfig.token}` },
            }
        })
            .then(response => responseFromPromiseHandle(response))
            .then(res => res.text())
            .then(username => checkIfLoggedSuccessHandle({ username }))
            .catch(loginFalseHandle)

    }

    function getMessages() {
        fetch('http://localhost:9000/message')
            .then(kek => kek.json()).then(messagesArr => updateMessagesInDom(messagesArr));
    }

    function updateMessagesInDom(messagesArr) {
        messagesArr.forEach(({ creationDate, fileName, id, subTitle, text, title }) => messagesList.innerHTML += messageTemplate({creationDate, fileName, id, subTitle, text, title}))
    }

    function messageTemplate({ creationDate, fileName, id, subTitle, text, title }) {
        return ` <div class="main-section-message" id="${id}">
                       <img src="${fileName}">
                       <h4>${title}</h4>
                       <h5>${subTitle}</h5>
                       <p>${text}</p>
                       <span>${creationDate}</span>
                   </div>`
    }

    function checkIfLoggedSuccessHandle({ username }) {
        if (username) greeter.innerText = `Hi, ${username}`;
        menuLogout.classList.remove('hide');
        messageForm.classList.remove('hide');
        menuLogin.classList.add('hide');
    }

    function loginSuccessHandle({ token, username }) {
        if (token) localStorage.setItem('rogue-token', token);

        menuLogout.classList.remove('hide');
        messageForm.classList.remove('hide');
        menuLogin.classList.add('hide');
    }

    function loginFalseHandle() {
        menuLogout.classList.add('hide');
        messageForm.classList.add('hide');
        menuLogin.classList.remove('hide');
    }

    function handleSubmitButton() {
        const body = {
            username: usernameInput.value,
            password: passwordInput.value,
        };

        fetch('http://localhost:9000/authenticate', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => responseFromPromiseHandle(response))
            .then(response => response.json())
            .then(({ token }) => {
                loginSuccessHandle({ token });
                checkIfLogged();
            });
    }

    function responseFromPromiseHandle(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    function logoutHandle() {
        localStorage.setItem('rogue-token', null);
        loginFalseHandle();
    }

    function sendMessageHandle() {
        const formData = new FormData();
        formData.append("file", fileInput.files[0]);


        fetch('http://localhost:9000/upload', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${requestConfig.token}`
            }
        })
            .then(response => responseFromPromiseHandle(response))
            .then(response => response.text())
            .then(filename => {
                const subTitle = subtitleInput.value;
                const text = textInput.value;
                const title = titleInput.value;

                const body = {
                    filename,
                    subTitle,
                    text,
                    title,
                };

                return fetch('http://localhost:9000/upload', {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${requestConfig.token}`
                    }
                })
            })
            .then(response => responseFromPromiseHandle(response))
            .then(() => getMessages());
    }

    function addEventListeners() {
        submitButton.addEventListener('click', handleSubmitButton);
        logoutButton.addEventListener('click', logoutHandle);
        messageButton.addEventListener('click', sendMessageHandle)
    }
});


