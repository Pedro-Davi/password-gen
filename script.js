function getInfo(){
    const uppercase = document.getElementById('uppercase').checked
    const lowercase = document.getElementById('lowercase').checked
    const number = document.getElementById('number').checked
    const specialCharacter = document.getElementById('special-caracter').checked

    const infoTypes = []

    if (uppercase){
        infoTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    }

    if (lowercase){
        infoTypes.push('abcdefghijklmnopqrstuvwxyz')
    }

    if (number){
        infoTypes.push('0123456789')
    }

    if (specialCharacter){
        infoTypes.push('!@#$%^&*()_-+={}[]|\\/?><:;"\'.,~`')
    }

    return infoTypes
}

function passWordSize() {
    const size = document.getElementById('size').value

    if (isNaN(size) || size < 4 || size > 128){
        message('Tamanho inválido, digite um número entre 4 e 128!', 'danger')
    }

    return size
}

function genPassword(size, infoTypes) {
    let passwordGen = ''

    const selectInfos = infoTypes.join('')

    infoTypes.forEach(type => {
        passwordGen += type[Math.floor(Math.random() * type.length)]
    })

    while (passwordGen.length < size){
        passwordGen += selectInfos[Math.floor(Math.random() * selectInfos.length)]
    }

    passwordGen = passwordGen.split('').sort(() => Math.random() - 0.5).join('')


    return passwordGen
}

function message(text, status = 'success'){
    Toastify({
        text: text,
        duration: 2000,
        style: {
            background: status === 'success' ? '#84cc16' : '#dc2626',
            boxShadow: 'none'
        }
    }).showToast()
}

document.getElementById('btn-generator').addEventListener('click', function () {
    const size = passWordSize()
    const infoTypes = getInfo()

    if (!size){
        return
    }

    if (!infoTypes.length){
        message('Selecione pelo menus um tipo de caractere', 'danger')
        return 
    }

    const passwordGen = genPassword(size, infoTypes)

    document.querySelector('.password-container').classList.add('show')
    document.getElementById('password').textContent = passwordGen

})

document.getElementById('copy').addEventListener('click', function () {
    navigator.clipboard.writeText(document.getElementById('password').textContent)

    message('Senha copiada com sucesso!  :)', 'success')
})