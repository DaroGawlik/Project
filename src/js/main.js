// const imagemin = require('gulp-imagemin')

const section = document.querySelector('section')

const btnLogin = document.querySelector('.btn-login')
const addNewAccountBtn = document.querySelector('.btn-add')
const deleteAccountBtn = document.querySelector('.btn-delete')
const deleteAllAccountBtn = document.querySelector('.btn-all-delete')

const newAccountPanel = document.querySelector('.add-new-account')
const saveNewAccountPanelBtn = document.querySelector('.save')
const cancelNewAccountPanelBtn = document.querySelector('.cancel')

const alertAddAccount = document.querySelector('.alert-add-account')
const pass1text = document.querySelector('.pass1-text')
const pass2text = document.querySelector('.pass2-text')

const nameInput = document.querySelector('#username')
const pass1Input = document.querySelector('#password1')
const pass2Input = document.querySelector('#password2')

const loginViewShadow = document.querySelector('.login-view-shadow')
const loginViewPanel = document.querySelector('.login-view')
const pass3InputLoginPanel = document.querySelector('#password3')
const openLoginPanelBtn = document.querySelector('.open-login')
const cancelLoginPanelBtn = document.querySelector('.cancel-login')
const alertLoginView = document.querySelector('.alert-login-view')

const avatar = document.querySelector('#avatar')
const forwardAvatarBtn = document.querySelector('.forward-avatar')
const deleteForwardAvatarBtn = document.querySelector('.delete-forward-avatar')
const avatarDefault = document.querySelectorAll('.avatarDefault')
const defaultsAvatars = document.querySelector('.defaults-avatars')
const reader = new FileReader()

const mainView = document.querySelector('.main-view')
const alertInfo = document.querySelectorAll('.alert-info')
const activeAcc = document.querySelector('.active-acc')

let card
let oneCard
let fotoFromDisc
let temporaryPhoto
let isZoom = false
let oneTargetDefaultAvatar
let ID = 0
const accountsArr = []

/// SHOW PANEL TO CRETAE NEW ACCOUNT

const showPanel = () => {
	newAccountPanel.style.display = 'flex'
	mainView.style.display = 'none'
	if (avatar && avatar.getAttribute('fotoFromDisc')) {
		avatar.removeAttribute('fotoFromDisc')
	}

	showBtnsInAddAccountPanel()
}

/// CLEAR ALL INPUTS IN PANEL TO ADD NEW ACCOUNT

const clearValuePanel = e => {
	;[nameInput, pass1Input, pass2Input, avatar].forEach(el => {
		el.value = ''
	})
	oneTargetDefaultAvatar = undefined
	avatarDefault.forEach(item => item.classList.remove('avatarDefaultBig'))
}

/// CLOSE PANEL TO ADD NEW ACCOUNT

const closePanel = () => {
	;[alertAddAccount, pass1text, pass2text].forEach(el => {
		el.innerText = ''
	})
	// clearValuePanel()
	newAccountPanel.style.display = 'none'
	mainView.style.display = 'block'
	setIsZoom(false)
}

const showBtnsInMianView = () => {
	card = document.getElementsByClassName('account-card')
	;[btnLogin, deleteAccountBtn, deleteAllAccountBtn].forEach(el => {
		el.style.display = card.length > 0 ? 'block' : 'none'
	})
	;[deleteAccountBtn, btnLogin].forEach(el => {
		el.setAttribute('disabled', true)
	})
}

/// CHECK NAME

const checkName = () => {
	const existingCards = document.getElementsByClassName('account-card')
	if (nameInput.value === '') {
		alertAddAccount.innerText = 'Put your name'
	} else if (existingCards.length > 3) {
		alertAddAccount.innerText = 'You can have max 4 account'
	} else {
		alertAddAccount.innerText = ''
	}
}

/// CHECK PASSWORD LENGTH

const checkPasswordLength = () => {
	if (pass1Input.value === '') {
		pass1text.innerText = 'Put your password'
	} else if (pass1Input.value.length < 1) {
		pass1text.innerText = 'Your password need 7 letter'
	} else {
		pass1text.innerText = ''
	}
}

/// CHECK PASSWORD

const checkPassword = () => {
	if (pass2Input.value === '') {
		pass2text.innerText = 'Put your repeat password'
	} else if (pass1Input.value !== pass2Input.value) {
		pass2text.innerText = 'Passwords dont match'
	} else {
		pass2text.innerText = ''
	}
}

/// ADD NEW ACCOUNT

const createNewCard = (cardID, nickName) => {
	// console.log(typeof cardID, typeof nickName)
	const newAccount = document.querySelector('section')
	const accountCard = document.createElement('div')
	const opacityBg = document.createElement('div')

	const circle = document.createElement('div')
	const letter = document.createElement('div')

	const square = document.createElement('div')
	const name = document.createElement('div')

	newAccount.appendChild(accountCard)
	accountCard.classList.add('account-card')
	accountCard.setAttribute('id', cardID)
	chooseAvatar(opacityBg, accountCard)

	accountCard.appendChild(circle)
	circle.classList.add('circle')
	circle.appendChild(letter)
	letter.classList.add('letter')
	letter.innerHTML = `${nickName.charAt(0).toUpperCase()}`

	accountCard.appendChild(square)
	square.classList.add('square')
	square.appendChild(name)
	name.classList.add('name')
	name.innerHTML = `${nickName}`
	// console.log(cardID, nickName)
}

const createNewAccount = () => {
	if (alertAddAccount.textContent === '' && pass1text.textContent === '' && pass2text.textContent === '') {
		const payload = {
			name: `${nameInput.value}`,
			password: `${pass2Input.value}`,
			backgroundImage: '&{}',
			id: ID,
		}

		avatar.removeAttribute('fotoFromDisc')
		alertInfo.forEach(item => {
			item.style.display = 'none'
		})
		activeAcc.style.display = 'block'
		// accountsArr.push(ID)
		createUsers(payload)
		closePanel()
		ID += 1
	}
}

/// TARGET CARD

const getOneCard = e => {
	oneCard = e.target.closest('.account-card')
	if (oneCard !== undefined) {
		;[deleteAccountBtn, btnLogin].forEach(el => {
			el.removeAttribute('disabled')
		})
	}
}

/// DELETE BY TARGET CARD

const deleteOneAccount = () => {
	card = document.getElementsByClassName('account-card')
	if (oneCard === undefined) {
		showAlertDeleteByOnceCard()
		return
	}
	if (oneCard === undefined) {
		return
	}

	oneCard.remove()

	if (card.length === 0) {
		alertInfo.forEach(item => {
			item.style.display = 'block'
		})
		activeAcc.style.display = 'none'
	}
	deleteUser((oneCard.hasAttribute('id') && oneCard.getAttribute('id')) || oneCard.id)
	oneCard = undefined
}

const showAlertDeleteByOnceCard = () => {
	alert("YOU HAVEN'T CHOSEN ACCOUNT TO DELETE ")
}

/// DELETE ALL ACCOUNT

const deleteAllAccount = () => {
	document.querySelectorAll('.account-card').forEach(item => item.remove())
	alertInfo.forEach(item => {
		item.style.display = 'block'
	})
	activeAcc.style.display = 'none'
}

/// ADD AVATAR BY USER

document.querySelector('#newAccountForm').addEventListener('submit', e => {
	e.preventDefault()
	if (avatar.value !== '') {
		reader.readAsDataURL(avatar.files[0])
	}
})

reader.addEventListener('load', e => {
	e.preventDefault()
	avatar.setAttribute('fotoFromDisc', e.target.result)
	// showBtnsInAddAccountPanel()
})

const deleteForwardAvatar = () => {
	avatar.removeAttribute('fotoFromDisc')
	avatar.value = ''
	showBtnsInAddAccountPanel()
}

avatar.addEventListener('change', e => {
	showBtnsInAddAccountPanel()
})
// 	// showBtnsInAddAccountPanel()
// 	console.log(this.value)
// 	if (e.target.value != '') {
// 		temporaryPhoto = e.target.value
// 		console.log(temporaryPhoto)
// 	}
// 	console.log(typeof e.target.value)
// 	if (!e.target.result) {
// 		e.target.result = 'darek.png'
// 		console.log(e.target.result)
// 		return
// 	}
// })

const showBtnsInAddAccountPanel = () => {
	;[deleteForwardAvatarBtn, forwardAvatarBtn].forEach(el => {
		el.style.display = avatar.value !== '' ? 'block' : 'none'
	})
}

//  ZOOM AND TARGET DEFAULT AVATAR

const setIsZoom = booleanValue => {
	isZoom = booleanValue
}

const extendPhoto = e => {
	const ZoomAvatar = document.querySelectorAll('.avatarDefaultBig')
	const avatarDefaultBigContains = e.target.classList.contains('avatarDefaultBig')

	if (isZoom && !avatarDefaultBigContains) {
		return
	}
	if (ZoomAvatar.length === 0) {
		e.target.classList.toggle('avatarDefaultBig')
		setIsZoom(true)
	}
	if (ZoomAvatar.length === 1) {
		ZoomAvatar.forEach(item => item.classList.remove('avatarDefaultBig'))
		setIsZoom(false)
	}
}

const targetDefaultAvatar = e => {
	oneTargetDefaultAvatar = e.target.closest('.avatarDefault')
}

// CHOOCE AVATAR BY USER

const chooseAvatar = (opacityBg, accountCard) => {
	if (avatar.getAttribute('fotoFromDisc')) {
		opacityBg.style.backgroundImage = `url(${avatar.getAttribute('fotoFromDisc')})`
		const test = `url(${avatar.getAttribute('fotoFromDisc')})`
		console.log(test)

		addClassOpacity(opacityBg, accountCard)
	} else if (oneTargetDefaultAvatar) {
		addClassOpacity(opacityBg, accountCard)

		const GetComputedStyle = getComputedStyle(oneTargetDefaultAvatar).getPropertyValue('background-image')

		console.log(GetComputedStyle)

		opacityBg.style.backgroundImage = GetComputedStyle
	}
}

const addClassOpacity = (opacityBg, accountCard) => {
	accountCard.appendChild(opacityBg)
	opacityBg.classList.add('opacity-Bg')
}

//  LOGIN PANEL

const showLoginPanel = () => {
	loginViewShadow.style.display = 'flex'
}

const closeLoginPanel = () => {
	loginViewShadow.style.display = 'none'
	mainView.style.display = 'block'
	alertLoginView.innerText = ''
	pass3InputLoginPanel.value = ''
	oneCard = undefined
}

const openLoginPanel = () => {
	if (pass3InputLoginPanel.value === '') {
		alertLoginView.innerText = 'Put your password'
	} else if (pass3InputLoginPanel.value !== pass1Input.value) {
		alertLoginView.innerText = 'Passwords dont match'
	} else {
		alertLoginView.innerText = ''
	}
	pass3InputLoginPanel.value = ''
	oneCard = undefined
}

// API

const createUsers = payload => {
	fetch('http://localhost:4000/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	})
		.then(res => res.json())
		// .then((post) => {})
		.then(() => {
			fetchUsers()
		})

		.catch(() => {
			console.log('wystąpił bład w callToApi')
		})
}

const fetchUsers = () => {
	document.querySelectorAll('.account-card').forEach(item => item.remove())
	fetch('http://localhost:4000/users', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(res => res.json())
		.then(download => {
			if (download) {
				download.forEach(item => {
					createNewCard(item.id, item.name)
				})
			}
		})
		.then(() => {
			clearValuePanel()
		})
		.then(() => {
			showBtnsInMianView()
			const fetchUsersAccCard = document.getElementsByClassName('account-card')
			if (fetchUsersAccCard.length > 0) {
				alertInfo.forEach(item => {
					item.style.display = 'none'
				})
				activeAcc.style.display = 'block'
			}
		})
		.catch(err => {
			console.log('wystąpił bład w callFromApi')
			console.log(err)
		})
}

const deleteUser = id => {
	fetch(`http://localhost:4000/users/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	}).then(res => console.log(res.json()))
}

const deleteUsers = () => {
	fetch('http://localhost:4000/users', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	}).then(res => res.json())
}

// const displayUsersAccount = fetchUsers => {}
///  LISTENER

addNewAccountBtn.addEventListener('click', showPanel)
saveNewAccountPanelBtn.addEventListener('click', e => {
	e.preventDefault()
	checkName()
	checkPasswordLength()
	checkPassword()
	createNewAccount()
	setIsZoom(false)
})
cancelNewAccountPanelBtn.addEventListener('click', e => {
	e.preventDefault()
	fetchUsers()
	closePanel()
})
section.addEventListener('click', getOneCard)

section.addEventListener('click', e => {
	getOneCard(e)
	if (oneCard != undefined) {
		if (oneCard.firstChild.style.backgroundImage === '') {
			oneCard.classList.add('cardWithOutBg')
		} else {
			oneCard.classList.add('cardWithBg')
		}
	}
})
deleteAccountBtn.addEventListener('click', () => {
	deleteOneAccount()
	showBtnsInMianView()
})
deleteAllAccountBtn.addEventListener('click', () => {
	deleteAllAccount()
	deleteUsers()
	showBtnsInMianView()
})
deleteForwardAvatarBtn.addEventListener('click', deleteForwardAvatar)
avatarDefault.forEach(item => item.addEventListener('click', extendPhoto))
avatarDefault.forEach(item => item.addEventListener('click', targetDefaultAvatar))
btnLogin.addEventListener('click', showLoginPanel)
cancelLoginPanelBtn.addEventListener('click', e => {
	e.preventDefault()
	closeLoginPanel()
	showBtnsInMianView()
})
openLoginPanelBtn.addEventListener('click', e => {
	e.preventDefault()
	openLoginPanel()
})

window.onload = () => {
	fetchUsers()
}
