const loggedInLink=document.querySelector('.logged-in-link')
const loggedOutLink=document.querySelector('.logged-out-link')
const logOutBtn=document.querySelector('#log-out')
const mainContent=document.querySelector('#main_content')
const auth = firebase.auth()
const db=firebase.firestore()


auth.onAuthStateChanged((user) => {
        if(user){
            loggedInLink.style.display='block'
            loggedOutLink.style.display='none'
        }else{
            loggedInLink.style.display='none'
            loggedOutLink.style.display='block'
        }

    })

    

// Show Alert Function
function showAlert(msg,color='primary'){
    const alert=document.createElement('div')
    alert.className=`alert alert-${color} flow`
    alert.innerHTML=msg
    document.body.appendChild(alert)


    setTimeout(() => {
        alert.remove()
    }, 2000);
}


// Log Out Functionality 

logOutBtn.addEventListener('click',function(){
    auth.signOut()
    .then(()=>{
        showAlert('Success Fully Log Out','success')
        loggedInLink.style.display='none'
        loggedOutLink.style.display='block'
    })
    .catch(err=>{
        showAlert('Log Out Failed','danger')

    })
})


// Adding Love react option to the dom and increasing the number of reacts in the database






// Getting Firebase Data And Show Images To The Dom With Heart And Download Option
// Function For Uploading All Images To Ui

db.collection('all_images').get()
.then(snapshot=>{
    const allImages=snapshot.docs
    let allImageHtml=''
    allImages.forEach(image => {
        const imageData=image.data()
        allImageHtml+=`
        <div class="col-md-4  my-3 single_image rounded">
					<div class="image_container">
						<img src=${imageData.imgLink} alt="test_photo" />
					</div>
					<div
						class="img_opt py-2 px-3 d-flex justify-content-between "
					>
						<div class="heart_container">
							<i class="far fa-heart text-danger heart-icon" id="${image.id}" onclick="heartIncrease(event)"></i>
							<span class="ms-3 heartNbr">${imageData.heartTaken}</span>
						</div>
						<div class="download d-flex">
                        <a href="${imageData.imgLink}" class="me-3 text-muted" class="text-danger"
								><i class="fas fa-compress"></i></a>
							<a href="${imageData.imgLink}" download="${new Date().toLocaleDateString()} From PhotoShare App Built By Abu Sayed" class="text-danger"
								><i class="fas fa-level-down-alt"></i
							></a>
							
						</div>
					</div>
		</div>
        
        `
        
    });
    mainContent.innerHTML=allImageHtml
})
.catch(err=>console.log(err))




// heartIcons.forEach( heartIcon=> {
//     heartIcon.addEventListener('click',function(event){
//         heartIcon.className='fab fa-heart text-danger heart-icon heart-bloom'
//         let heartNbr=event.target.nextElementSibling.innerText
//         heartNbr.innerText=++(Number.parseInt(heartNbr))
//         console.log('Heart Clicked');
//     })
    
// });
