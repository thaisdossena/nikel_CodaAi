const myModal = new bootstrap.Modal('#register-modal');
let logged = sessionStorage.getItem('logged');
const session = localStorage.getItem('session');

checkLogged();

// LOGAR CONTA

document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email-input').value;
    const senha = document.getElementById('senha-input').value;
    const checkSession = document.getElementById('session-check').value;

    const account = getAccount(email);

    if (!account) {
        alert('Usuário ou senha incorretos');
        return
    }

    if (account) {
        if (account.senha !== senha) {
            alert('Senha incorreta');
            return
        }
    }

    saveSession(email, checkSession);

    window.location.href = 'home.html';
});

// CRIAR CONTA

document.getElementById('create-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email-create-input').value;
    const senha = document.getElementById('password-create-input').value;

    saveAccount({
        login: email,
        senha: senha,
        transactions: []
    });

    if (senha.length < 6) {
        alert('A senha deve conter seis dígitos')
    }

    myModal.hide();
});

//FUNÇÕES

function checkLogged() {
    if (session) {
        sessionStorage.setItem('logged', session);  
        logged = session;    
    }

    if (logged) {
        saveSession(logged, session);
        window.location.href = 'home.html';
    }
}

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession) {
    if (saveSession) {
        localStorage.setItem('session', data);
    }

    sessionStorage.setItem('logged', data);
}

function getAccount(key) {
    const account = localStorage.getItem(key);

    if (account) {
        return JSON.parse(account);
    }

    return "";
}