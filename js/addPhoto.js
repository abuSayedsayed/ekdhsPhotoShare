const uploadImageBtn=document.getElementById('upload_image')
const photoDescription=document.getElementById('desc')
const showImageContainer=document.getElementById('showImage')
const imageBtn=document.getElementById('imageBtn')
const progressNbr=document.getElementById('progressNbr')
const db = firebase.firestore()
const auth=firebase.auth()

auth.onAuthStateChanged((user) => {
    if(!user){
        window.location.href='../login.html'
        
    }

})

// Showing Image To User
showImageContainer.addEventListener('click',function(event){
    imageBtn.click()
    imageBtn.onchange=function(event){
        const files=imageBtn.files;
        
        
         [...files].forEach((file) => {
             const image=document.createElement('img')
             
             // Define The Source Of The User Selected Image
             image.src = URL.createObjectURL(file);
             
             // Additional Works setting height width by class and append
             image.classList.add('userSelectedImage')
             showImageContainer.innerHTML=''
             showImageContainer.appendChild(image)
            });
            
        }
    })

// Uploading Image To firebase and save link to A Database

uploadImageBtn.addEventListener('click',function(event){
        const file=imageBtn.files[0];
        if(file){
            const uploadTask=firebase.storage().ref(`all_images/${file.name}`).put(file)


            // Showing The Percentage Value Of Uploading
            uploadTask.on('state_changed',function(snapshot){
                let progressPercent=(snapshot.bytesTransferred/snapshot.totalBytes)*100
                progressNbr.innerText=`${Math.ceil(progressPercent)} % Transferred`


            },
            function(error){
                showAlert('Error In Saving Image')
            },

            function(){
                // Getting The Image URL And Save It To Firebase
                uploadTask.snapshot.ref.getDownloadURL().then(function(url){
                    db.collection('all_images').add({
                        imgLink:url,
                        heartTaken:0,
                        desc:photoDescription.value,
                        uploadedBy:auth.currentUser.email,

                    })
                    .then(()=>{
                        showAlert('Image Uploaded SuccessFully','success')
                    })
                    .catch(()=>{
                        showAlert('Failed To Upload Image . PLease Try Again','danger')
                    })
                })
            }

            
            )


            // db.collection('all_images').add({
                // })
        }else{
            showAlert('Please Select An Image','danger')
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