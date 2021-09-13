const formQuestion=document.querySelector('.form-question');

formQuestion.addEventListener('submit', async (e)=>{
    e.preventDefault();

    if(!validateForm(formQuestion)){
        return;
    }
    
    const serverUrl = formQuestion.getAttribute('action');    

    let response = await fetch(serverUrl, {
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
    regs = {
        fio : /^([А-ЯA-Z]|[А-ЯA-Z][\x27а-яa-z]{1,}|[А-ЯA-Z][\x27а-яa-z]{1,}\-([А-ЯA-Z][\x27а-яa-z]{1,}|(оглы)|(кызы)))\040[А-ЯA-Z][\x27а-яa-z]{1,}(\040[А-ЯA-Z][\x27а-яa-z]{1,})?$/,
        phone : /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
        email : /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    };

    let result = true;

    const checkInput = (value, reg)=>{
        const regExp = reg;
        return regExp.test(value)
    }

    inputs.forEach(element => {
        element.addEventListener('focus', ()=>element.classList.remove('wrong'));
        
        const val = element.value,
              validationType = element.getAttribute('data-validation_type');

        if (!val){
            element.classList.add('wrong');
            result = false;
        } else {
            const res = checkInput(val, regs[validationType]);
            
            if(!res){               
                element.classList.add('wrong');
                result = false;
            }
        }

    });

    return result;

}