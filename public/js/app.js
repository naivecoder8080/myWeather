const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageOne.textContent='Loading'
    messageTwo.textContent=''
    const location=search.value;
    
    
    const url=`/weather?address=${location}`

    fetch(url).then((response)=>{
        response.json().then(({error,location,forecast}={})=>{
            if(error)
            return messageOne.textContent=error
            messageOne.textContent=location
            messageTwo.textContent=forecast
        })
    })
})