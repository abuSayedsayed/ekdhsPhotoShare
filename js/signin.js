const form=document.getElementById('sign-in')
const email=document.getElementById('email')
const userName=document.getElementById('name')
const password=document.getElementById('password')
const auth = firebase.auth()

// Email Validation
function validateEmail (emailAddress)
{
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAddress.match(regexEmail)) {
    return true; 
  } else {
    return false; 
  }
}

// Name Validation 
function nameValidator(name){
    if(name.length<4&&name.length>8){
        return true
    }else{
        return false
    }
}

// alert show

function showAlert(msg,color='primary'){
    const alert=document.createElement('div')
    alert.className=`alert alert-${color} flow`
    alert.innerHTML=msg
    document.body.appendChild(alert)


    setTimeout(() => {
        alert.remove()
    }, 2000);
}
form.addEventListener('submit',function(event){
    event.preventDefault()
    const emailResult=validateEmail(email.value)
    const nameResult=nameValidator(userName.value)
    if(!emailResult){
        showAlert('Please Input A Correct Email','danger')

    }else if (nameResult){
        showAlert('Name Should Be More Than 4 or Less Than 8 Characters','danger')
    }else{
        auth.createUserWithEmailAndPassword(email.value, password.value)
		.then((cred) => {
            window.location.href='./index.html'
		})
		.catch((err) =>{
            
            showAlert(err.message,'danger')
            console.log(err);
        }
        )
    }
})
