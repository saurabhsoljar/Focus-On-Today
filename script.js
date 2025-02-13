const checkboxList = document.querySelectorAll('.custom-checkbox')

checkboxList.forEach((chekbox)=>{
  chekbox.addEventListener('click',(e)=>{
    chekbox.parentElement.classList.toggle('completed')
  })
  
})