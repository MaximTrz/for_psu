const formQuestion=document.querySelector('.form-question');

formQuestion.addEventListener('submit', async (e)=>{
    e.preventDefault();

    validateForm(formQuestion);

    let response = await fetch('https://60376bfd5435040017722533.mockapi.io/form', {
        method: 'POST',
        body: new FormData(formQuestion)
      });
  
      let result = await response.json();
  
      if(response.ok){
          alert(result.text)
      } else {
          alert('Что-то пошло не так');
      }    
})


const validateForm = (form)=>{
    console.log(form);
}