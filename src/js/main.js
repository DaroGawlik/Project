const section = document.querySelector('section')

const addNewAccountBtn = document.querySelector('.btn-add')
const deleteAccountBtn = document.querySelector('.btn-delete')
const deleteAllAccountBtn = document.querySelector('.btn-all-delete')

const newAccountPanel = document.querySelector('.add-new-account')
const saveBtn = document.querySelector('.save')
const cancelBtn = document.querySelector('.cancel')

const alertAddAccount = document.querySelector('.alert-add-account')
const pass1text = document.querySelector('.pass1-text')
const pass2text = document.querySelector('.pass2-text')

const nameInput = document.querySelector('#username')
const pass1Input = document.querySelector('#password1')
const pass2Input = document.querySelector('#password2')

const avatar = document.querySelector('#avatar')
const reader = new FileReader()

const mainView = document.querySelector('.main-view')
const alertInfo = document.querySelectorAll('.alert-info')
const activeAcc = document.querySelector('.active-acc')

let oneCard
let fotoFromDisc
let ID = 0
let accountsArr = []

/// SHOW PANEL TO CRETAE NEW ACCOUNT

const showPanel = () => {
	newAccountPanel.style.display = 'flex'
	mainView.style.display = 'none'
}

/// CLEAR ALL INPUTS IN PANEL TO ADD NEW ACCOUNT

const clearValuePanel = e => {
	;[username, pass1Input, pass2Input].forEach(el => {
		el.value = ''
	})
}

/// CLOSE PANEL TO ADD NEW ACCOUNT

const closePanel = () => {
	;[alertAddAccount, pass1text, pass2text].forEach(el => {
		el.innerText = ''
	})
	clearValuePanel()
	newAccountPanel.style.display = 'none'
	mainView.style.display = 'block'
}

/// CHECK NAME

const checkName = () => {
	const card = document.getElementsByClassName('account-card')

	if (nameInput.value == '') {
		alertAddAccount.innerText = 'Put your name'
	} else if (card.length > 3) {
		alertAddAccount.innerText = 'You can have max 4 account'
	} else {
		alertAddAccount.innerText = ''
	}
}

/// CHECK PASSWORD LENGTH

const checkPasswordLength = () => {
	if (pass1Input.value == '') {
		pass1text.innerText = 'Put your password'
	} else if (pass1Input.value.length < 1) {
		pass1text.innerText = 'Your password need 7 letter'
	} else {
		pass1text.innerText = ''
	}
}

/// CHECK PASSWORD

const checkPassword = () => {
	if (pass2Input.value == '') {
		pass2text.innerText = 'Put your repeat password'
	} else if (pass1Input.value !== pass2Input.value) {
		pass2text.innerText = 'Passwords dont match'
	} else {
		pass2text.innerText = ''
	}
}

/// ADD NEW ACCOUNT

const createNewAccount = () => {
	if (alertAddAccount.textContent == '' && pass1text.textContent == '' && pass2text.textContent == '') {
		const newAccount = document.querySelector('section')
		const accountCard = document.createElement('div')
		accountCard.setAttribute('id', ID)
		accountCard.classList.add('account-card')
		newAccount.appendChild(accountCard)

		accountCard.innerHTML = `
	        <div class="circle">
	            <div class="letter">${nameInput.value.charAt(0).toUpperCase()}</div>
	        </div>
	        <div class="square">
	            <div class="name">${nameInput.value}</div>
	        </div>`
		accountCard.style.backgroundImage = `url(${avatar.getAttribute('fotoFromDisc')})`
		alertInfo.forEach(item => (item.style.display = 'none'))
		activeAcc.style.display = 'block'

		accountsArr.push(ID)

		closePanel()
		ID++
	}
}

/// TARGET CARD

const checkAccount = e => {
	oneCard = e.target.closest('.account-card')
}

/// DELETE BY TARGET CARD

const deleteOneAccount = () => {
	oneCard.remove()
	const card = document.getElementsByClassName('account-card')
	if (card.length == 0) {
		alertInfo.forEach(item => (item.style.display = 'block'))
		activeAcc.style.display = 'none'
	}
}

/// DELETE ALL ACCOUNT

const deleteAllAccount = () => {
	document.querySelectorAll('.account-card').forEach(item => item.remove())
	alertInfo.forEach(item => (item.style.display = 'block'))
	activeAcc.style.display = 'none'
}

///

/// ADD AVATAR TO NEW ACCOUNT PANEL CARD

document.querySelector('#newAccountForm').addEventListener('submit', e => {
	reader.readAsDataURL(avatar.files[0])
	e.preventDefault()
})

reader.addEventListener('load', e => {
	avatar.setAttribute('fotoFromDisc', e.target.result)
	document.querySelector('#newAccountForm').setAttribute('src', e.target.result)
})

///  LISTENER

addNewAccountBtn.addEventListener('click', showPanel)
saveBtn.addEventListener('click', e => {
	checkName()
	checkPasswordLength()
	checkPassword()
	createNewAccount()
})
cancelBtn.addEventListener('click', closePanel)
section.addEventListener('click', checkAccount)
deleteAccountBtn.addEventListener('click', deleteOneAccount)
deleteAllAccountBtn.addEventListener('click', deleteAllAccount)
