const logIn=document.querySelector('#log-in')
const password=document.getElementById('password')
const email=document.getElementById('email')
const auth=firebase.auth()



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


logIn.addEventListener('submit',function(event){
    event.preventDefault()
    const emailResult=validateEmail(email.value)
    if(!emailResult){
        showAlert('Please Input A Correct Email','danger')

    }else{
        auth.signInWithEmailAndPassword(email.value, password.value)
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