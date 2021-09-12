const formQuestion=document.querySelector('.form-question');

formQuestion.addEventListener('submit', async (e)=>{
    e.preventDefault();

    validateForm(formQuestion);

    return;

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
});


const validateForm = (form)=>{
    const inputs = form.querySelectorAll('.validate'),
          fio = /^([А-ЯA-Z]|[А-ЯA-Z][\x27а-яa-z]{1,}|[А-ЯA-Z][\x27а-яa-z]{1,}\-([А-ЯA-Z][\x27а-яa-z]{1,}|(оглы)|(кызы)))\040[А-ЯA-Z][\x27а-яa-z]{1,}(\040[А-ЯA-Z][\x27а-яa-z]{1,})?$/,
          phone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

    const test = (value, reg)=>{
        const regExp = reg;
        return regExp.test(value)
    }

    inputs.forEach(element => {
        element.addEventListener('focus', ()=>element.classList.remove('wrong'));
        
        const val = element.value;
        if (!val){
            element.classList.add('wrong');
        } else {
            
            console.log(test(val, phone));

        } 
    });
}