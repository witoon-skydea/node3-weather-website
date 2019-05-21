console.log('loading up xxxx')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data)=>{
        console.log(data)
    })
})

fetch('http://localhost:3000/weather?location=bangkok').then((response) => {
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        }else{
            console.log(data[0].location, data[0].forcastmessage)
        }
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')


message1.textContent = ''
message2.textContent = ''



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value

    message1.textContent = 'Searching ...'


    fetch('http://localhost:3000/weather?location='+location).then((response) => {
        response.json().then((data)=>{
            if(data.error){
                message2.textContent = data.error
                message1.textContent = 'error!!!'
                
            }else{
                // message2.textContent = data[0].location, data[0].forcastmessage
                message1.textContent = location
                message2.textContent = data[0].location + data[0].forcastmessage
            }
        })
    })




    console.log('testing '+ location)
})