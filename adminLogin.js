const apiUrl = 'http://localhost:3000/admin/logIn';

const apiData = async (userCredential) => {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userCredential),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const adminData = await response.json();

        return adminData.success; // Return the success property from the API response
    
    } catch (error) {
        console.error('Error fetching data:', error);
        return false; // If an error occurs, return false
    }
};

async function myFunction(event) {
    event.preventDefault(); // Prevent the default form submission

    // Retrieve values from input fields
    const userIdValue = document.getElementById('userId').value;
    const passwordValue = document.getElementById('password').value;

    // Store values in variables (you can perform further actions here)
    console.log('User ID:', userIdValue);
    console.log('Password:', passwordValue);

    const userCredential = {
        "email": userIdValue,
        "password": passwordValue
    };

    // Call the apiData function with user credentials
    const success = await apiData(userCredential);

    if (success) {
        // If credentials are correct, redirect to adminside2.html
        window.location.href = 'adminside2.html';
    } else {
        // If credentials are incorrect, display an error message or handle it accordingly
        alert('Invalid credentials. Please try again.');
    }
}

//fetch User api////////////////////////////////////////////////////////////////////////////////
const createUserApi = 'http://localhost:3000/user/CreateUser';

const createUser = async (userId, password) => {
    try {
        const response = await fetch(createUserApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: userId,
                password: password,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userData = await response.json();

        console.log("User created:", userData);
        return userData.success;
        // You can perform additional actions based on the API response

    } catch (error) {
        console.error('Error creating user:', error);
        return false; // Handle error by returning false
    }
};

// Create User////////////////////////////////////////////////////////////////////////////

async function createUsers(event) {
    event.preventDefault();
    console.log("Executed ++");

    const userIdValue = document.getElementById('id').value;
    const passwordValue = document.getElementById('pass').value;

    const success = await createUser(userIdValue, passwordValue);

    console.log("success ->", success);

    if (success) {
        console.log("User created successfully");
        // If credentials are correct, redirect to userLogin.html
        window.location.href = 'userLogin.html';
    } else {
        console.error("User creation failed");
        // If credentials are incorrect, display an error message or handle it accordingly
    }

    console.log("User ->", userIdValue, passwordValue);
}





//User Fetch Function
const apiLoginUrl = "http://localhost:3000/user/userLogIn";

const apiLoginData = async (userLoginCredential) => {
    try {
        const response = await fetch(apiLoginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userLoginCredential),
        });
        console.log("responssss",response)

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userLoginData = await response.json();
        localStorage.setItem('token', userLoginData.token);
        console.log("userdata",userLoginData.token)
        const userkaData=userLoginData.updateUser.userName;
        const userkaDatafile=userLoginData.updateUser.files;

        console.log("userid",userkaData,"files",userkaDatafile);

        localStorage.setItem('userkaData',userkaData)
        localStorage.setItem("userkaDatafile",userkaDatafile)

        return userLoginData.success; // Return the success property from the API response
    
    } catch (error) {
        console.error('Error fetching data:', error);
        return false; // If an error occurs, return false
    }
};

// User Login ///////////////////////////////////////////////////////////////////////////

const userLogin = async (event) => {
    event.preventDefault();
    const userIdLogin = document.getElementById('userLoginId').value;
    const passwordLogin = document.getElementById('userLoginPass').value;

    console.log("datassssss =>", userIdLogin, passwordLogin);

    const userLoginCredential = {
        "userName": userIdLogin,
        "password": passwordLogin
    };

    // Call the apiLoginData function with user credentials (fixed typo here)
    const success = await apiLoginData(userLoginCredential);

    if (success) {
        // If credentials are correct, redirect to photoUpload.html
        window.location.href = 'photoUpload.html';
    } else {
        // If credentials are incorrect, display an error message or handle it accordingly
        alert('Invalid credentials. Please try again.');
    }
}


/////photoupload api fetch //////////////////////////////////////////////////////////////

// const imageApiUrl="http://localhost:3000/image/imageReducer";


// // function getCookie(tokenname) {
// //     const value = `; ${document.cookie}`;
// //     const parts = value.split(`; ${tokenname}=`);
// //     if (parts.length === 2) return parts.pop().split(';').shift();
// // }



// // Function to upload image by user
// const imageUploadByUser = async (imageName, imageInput) => {
//     try {
//         // console.log("name",imageName,imageInput.files[0])
//         // const formData = new FormData();
//         const formData=new FormData();
//         console.log("form",formData)
//         formData.append('name', imageName);
//         console.log("formdata",formData)

//         if (imageInput && imageInput.files.length > 0) {
//             formData.append('reducedImage', imageInput.files[0]);
//             // console.log(imageInput.files[0])\
//             console.log("form ka data",formData)
//         } else {
//             console.error('No file selected.');
//             return false;
//         }

//         const AccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IjEiLCJpZCI6IjY1YWJkZmU2ZTYzZDZiYWIyNTFlNzYyZCIsImlhdCI6MTcwNTc2MzQ3MywiZXhwIjoxNzA1ODM1NDczfQ.SEl5BKQN9An2RZ5C0PpnMhhULuq0PsWiMgPXQQoRB9M";

//         // const token = getCookie('authToken');
//         // console.log("token in frontend",token);

//         // const token =document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
//         // console.log("token in frontend", token);

//         const token = localStorage.getItem('token').trim();
//         console.log("token in photoupload",`"${token}"`)

//         const headers = new Headers({
//             'Authorization': `Bearer ${AccessToken}`,
//             'Accept': 'application/json', // You may need to adjust this based on your server's expectations
//         });
//         console.log("header",headers)

//         console.log("form wala data",formData)
//         const response = await fetch(imageApiUrl, {
//             method: 'POST',
//             body: formData,
//             credentials: 'include',
//             headers:headers,
            // headers: {
            //     // 'Authorization': `Bearer ${token}`,  // Include the token here
            //     'Authorization': `Bearer ${token}`
            // },
//         });
//         const responseHeaders = response.headers;
//         console.log("Response Headers:", responseHeaders);

//         const authorizationHeader = responseHeaders.get('authorization');
// console.log("Authorization Header:", authorizationHeader);
           
    
//         console.log("response",response)

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const imageUploadData = await response.json();

//         console.log("User Uploaded Image:", imageUploadData);
//         return imageUploadData;

//     } catch (error) {
//         console.error('Error creating user:', error);
//         return false;
//     }
// };

// // Function triggered on form submission/////////////////////////////////////////////////
// const imageUpload = async (event) => {
//     event.preventDefault();

//     const imageName = document.getElementById('names').value;
//     const imageInput = document.getElementById('image');

//     console.log("file",imageInput.files[0])

//     if (!imageInput || !imageInput.files.length) {
//         console.error('No file selected.');
//         return;
//     }

//     // Additional processing if needed...

//     const success = await imageUploadByUser(imageName, imageInput);

//     if (success.success) {
//         console.log("Image uploaded successfully");
//         // Redirect or perform further actions on success
//         console.log("data",success.data.photo)
//         const imageUrl=success.data.photo;
//         document.getElementById("displayedImage").src=imageUrl;
//     } else {
//         console.error("Image upload failed");
//         // Handle failure scenario
//     }
// };




const imageUploadByUser = async (imageName, imageInput) => {
    try {
        const formData = new FormData();
        formData.append('name', imageName);

        if (imageInput && imageInput.files.length > 0) {
            formData.append('reducedImage', imageInput.files[0]);
        } else {
            console.error('No file selected.');
            return false;
        }

        console.log("formdata",formData)
        const imageApiUrl = "http://localhost:3000/image/imageReducer";

        const token = localStorage.getItem('token').trim();
        console.log("token in photoupload",token)

        const headers = new Headers({
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        });
        console.log("headers",headers)
        const response = await fetch(imageApiUrl, {
            method: 'POST',
            body: formData,
            credentials: 'include',
            headers: headers,
        });
        console.log("response",response.headers)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const imageUploadData = await response.json();
        console.log("imageuploaddata",imageUploadData)

        return imageUploadData;
    } catch (error) {
        console.error('Error uploading image:', error);
        return false;
    }
};

// Function triggered on form submission
const imageUpload = async (event) => {
    event.preventDefault();

    const imageName = document.getElementById('names').value;
    const imageInput = document.getElementById('image');

    if (!imageInput || !imageInput.files.length) {
        console.error('No file selected.');
        return;
    }

    const success = await imageUploadByUser(imageName, imageInput);

    if (success.success) {
        console.log("Image uploaded successfully");
        console.log("data", success.data.photo);

        // Display the uploaded image on the front end
        const imageUrl = success.data.photo;
        document.getElementById("displayedImage").src = imageUrl;
    } else {
        console.error("Image upload failed");
        // Handle failure scenario
    }
};












/////////////////fetching api for view user/////////////////////
const viewUserApi = "http://localhost:3000/admin/fetchUserData";
// let fileName;
// let filePhoto;
const apiViewUser = async (userLoginCredential) => {
    try {
        const response = await fetch(viewUserApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userLoginCredential),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userLoginData = await response.json();
        console.log("userLoginData",userLoginData)
        // const fileId=userLogin.userData;
        // console.log("fileki ids",fileId);

        return userLoginData;
    } catch (error) {
        console.error('Error fetching data:', error);
        return { success: false, message: 'Error fetching data' };
    }
};

// ... (your existing code)
// ... (your existing code)

const viewUser = async (event) => {
    event.preventDefault();
    const userIdLogin = document.getElementById('userkiID').value;
    const passwordLogin = document.getElementById('usersID1').value;

    console.log("datassssss =>", userIdLogin);

    const userLoginCredential = {
        "userId": userIdLogin,
    };

    try {
        const userLoginData = await apiViewUser(userLoginCredential);
        const filesData=userLoginData.userData;
        
        const fileName=filesData.files[0].name;
        const filePhoto=filesData.files[0].photo;
        const fileId=filesData.files[0]._id;


        localStorage.setItem('fileid', fileId);
        console.log("id",fileId)
        console.log("name",fileName)
        console.log("photo ",filePhoto)





        // console.log("user ka sb data=> ",filesData,fileName,filePhoto)
        if (userLoginData.success) {
            alert("User data fetched successfully");
            showUserName = userLoginData.userData.userName;
            console.log("User details:", showUserName);

            // Store user data in localStorage
            localStorage.setItem('userData', JSON.stringify(userLoginData.userData));
            localStorage.setItem('userName',JSON.stringify(fileName));
            localStorage.setItem('userPhoto',JSON.stringify(filePhoto));
            

            // Redirect to 'viewTable.html'
            window.location.href = 'viewTable.html';
        } else {
            alert(`Error: ${userLoginData.message}`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching user data');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userName=JSON.parse(localStorage.getItem('userName'));
    const userPhoto=JSON.parse(localStorage.getItem('userPhoto'));
    console.log("userka data",userName,"userki file",userPhoto)

    if (userData) {
        // Update the username cell
        const usernameCell = document.getElementById('usernameCell');
        const userActualName= document.getElementById('nameCell')
        const userUploadedFile= document.getElementById('photoCell')
        if (usernameCell && userActualName && userUploadedFile) {
            usernameCell.textContent = userData.userName;
            userActualName.textContent=userName;
            userUploadedFile.innerHTML=`<img src="${userPhoto}"  style="width:50px;height:50px;">`
        } else {
            console.error("Element with id 'usernameCell' not found.");
        }
    } else {
        console.error('User data not found in localStorage.');
    }
});




//////////////////////////////////////viewtable////////////////////////////////



// const doneApi="http://localhost:3000";

// Function to handle "Done" button click
async function markItemStatus(userId, status) {
    try {
        // Make API request to mark the item as done or deleted
        const response = await fetch(`http://localhost:3000/image/items/${userId}/${status}`, {
            method: 'PUT',
        });

        const result = await response.json();

        if (result.success) {
            console.log(`Successfully updated status as ${status}`);
            return true;
        } else {
            console.error(result.message);
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

const clearTable = (tableId) => {
    const dataTable = document.getElementById(tableId);
    if (dataTable) {
        dataTable.innerHTML = '';
    } else {
        console.error(`Table with ID '${tableId}' not found.`);
    }
};

const removeDeleteButton = () => {
    const deleteButton = document.getElementById('deleteButton');
    if (deleteButton) {
        deleteButton.remove();
    } else {
        console.error(`Delete button not found.`);
    }
};

const viewTable = async (event) => {
    event.preventDefault();
    const fileId = localStorage.getItem('fileid');
    console.log("fileki id", fileId);

    try {
        const success = await markItemStatus(fileId, 'done');
        if (success) {
            removeDeleteButton();
            clearTable('del'); // Assuming your table has an id 'del'
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

const viewTable2 = async (event) => {
    event.preventDefault();
    const fileId = localStorage.getItem('fileid');
    console.log("fileki id", fileId);

    try {
        const success = await markItemStatus(fileId, 'delete');
        if (success) {
            removeDeleteButton();
            clearTable('dataTable'); // Assuming your table has an id 'dataTable'
        }
    } catch (error) {
        console.error('Error:', error);
    }
};












////////////////////////////////////////acceptance and rejection by admin ////////

const showData = async (userkaData,userdatafile) => {
    try {
        // console.log("Token being sent in API call:", token);

        const userDetailsApi = "http://localhost:3000/admin/fetchUserData";
        // const headers = new Headers({
        //     // 'Authorization': `Bearer ${token}`,
        //     'Accept': 'application/json',
        // });
        // console.log("header ki body ",headers)
        console.log("details",userkaData,userdatafile)
        const userdata={
            userkaData,userdatafile
        }
        console.log("user",userdata)

        const response = await fetch(userDetailsApi, {
            method: 'POST',
            body: userdata,
            credentials: 'include',
            headers :{
                // 'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        });

        // console.log("res ki body ", await response.json())
        if (!response.ok) {
            const errorDetails = await response.json().catch(() => null);
            console.error('HTTP error details:', errorDetails);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const userDatas = await response.json();
        console.log("Fetched user ID:", userDatas);

        return userDatas;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return false;
    }
};




/////////////////////////////////////////////////////////////////////////////////////////////////////
//show user status ///////////////////////////////////////////////////////////////

// const navigateToAcceptancePage = () => {
//     window.location.href = 'acceptance.html';
// };

// Function to fetch user data from the server
const fetchUserData = async (userdatafile) => {
    try {
        const fetchApi = `http://localhost:3000/image/fetchImage/${userdatafile}`;

        // console.log("userdata",userdatafile)
        const response = await fetch(fetchApi, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            const errorDetails = await response.json().catch(() => null);
            console.error('HTTP error details:', errorDetails);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userData = await response.json();
        console.log("Fetched user data:", userData);

        return userData;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
};

// Function triggered on form submission
// Function triggered on form submission
// Function triggered on form submission
const showUserDataof = async (event) => {
    event.preventDefault();

    console.log("inside the acceptance or not acceptance page");
    const userdatafile = localStorage.getItem('userkaDatafile');

    console.log("userId", userdatafile);

    // Fetch user data using the provided API
    const userData = await fetchUserData(userdatafile);
    console.log("userData", userData);

    if (userData && userData.success) {
        alert("User data fetched successfully");
        const showUsername = userData.data.name; // Update this line
        const showphoto = userData.data.photo; // Update this line
        const statuss=userData.data.status;
        console.log("status",statuss)
        console.log("userphoto", showphoto);
        console.log("User details:", showUsername);

        // Store user data in localStorage
        localStorage.setItem('userName', JSON.stringify(showUsername));
        localStorage.setItem('userPhoto', JSON.stringify(showphoto));
        localStorage.setItem('userStatus',JSON.stringify(statuss))

        // Redirect to 'acceptance.html'
        window.location.href = 'acceptance.html';
    } else {
        alert(`Error: ${userData.message}`);
    }
};

// ...
document.addEventListener('DOMContentLoaded', () => {
    // Retrieve user data from localStorage
    const userName = localStorage.getItem('userName');
    const userPhoto = localStorage.getItem('userPhoto');
    const userStatus = localStorage.getItem('userStatus');

    console.log("userka data", userName, "userki file", userPhoto, "user status", userStatus);

    // Check if the values are defined before parsing
    const parsedUserName = userName ? JSON.parse(userName) : null;
    const parsedUserPhoto = userPhoto ? JSON.parse(userPhoto) : null;
    const parsedUserStatus = userStatus ? JSON.parse(userStatus) : null;

    // Check if the elements exist before updating
    const userActualName = document.getElementById('displayName');
    const userUploadedFile = document.getElementById('displayImage');
    const statusDisplay = document.getElementById('statusDisplay'); // Assuming you have a div with id 'statusDisplay' in your HTML

    if (parsedUserName && parsedUserPhoto && userActualName && userUploadedFile && statusDisplay) {
        // Update the username and photo
        userActualName.textContent = parsedUserName;
        userUploadedFile.innerHTML = `<img src="${parsedUserPhoto}" style="width:450px;height:450px;">`;

        // Update the status display
        if (parsedUserStatus) {
            if (parsedUserStatus === 'pending') {
                statusDisplay.textContent = 'Admin has not seen yet.';
            } else if (parsedUserStatus === 'done') {
                statusDisplay.textContent = 'Accepted by Admin.';
            } else if (parsedUserStatus === 'deleted') {
                statusDisplay.textContent = 'Rejected by Admin.';
            } else {
                statusDisplay.textContent = 'Unknown status.';
            }
        } else {
            console.error("Status not found in localStorage.");
        }
    } else {
        console.error("One or more elements not found.");
    }
});




































































// // Function triggered on form submission
// const showUserData = async (event) => {
//     event.preventDefault();
//     // const view=document.getElementById("")

//     console.log("inside the acceptance or not acceptance page")

//     // const userName = document.getElementById('names');
//     // const userImage = document.getElementById('image');

//     // if (!userImage || !imageInput.files.length) {
//     //     console.error('No file selected.');
//     //     return;
//     // }
//     const userDataof=localStorage.getItem('userkaData');
//     console.log("userdata",userDataof)
//     // const displayNameInput = document.getElementById("displayName");
//     // if (displayNameInput) {
//     //     displayNameInput.value = userDataof;
//     // } else {
//     //     console.error("Element with ID 'displayName' not found");
//     // }


//     window.location.href = 'acceptance.html';

//     const token = localStorage.getItem('token').trim();
//     console.log("token comming is ",token)
    
//     const userdatafile=localStorage.getItem('userkaDatafile');
//     console.log("userfileid",userdatafile)
//     // const success = await showData(userDataof,userdatafile);
//     try {
//         const userLoginData = await apiViewUser(userLoginCredential);
//         const filesData=userLoginData.userData;
        
//         // const fileName=filesData.files[0].name;
//         // const filePhoto=filesData.files[0].photo;
//         // const fileId=filesData.files[0]._id;


//         localStorage.setItem('fileid', fileId);
//         console.log("id",fileId)
//         console.log("name",fileName)
//         console.log("photo ",filePhoto)





//         // console.log("user ka sb data=> ",filesData,fileName,filePhoto)
//         if (userLoginData.success) {
//             alert("User data fetched successfully");
//             showUserName = userLoginData.userData.userName;
//             console.log("User details:", showUserName);

//             // Store user data in localStorage
//             localStorage.setItem('userData', JSON.stringify(userLoginData.userData));
//             localStorage.setItem('userName',JSON.stringify(fileName));
//             localStorage.setItem('userPhoto',JSON.stringify(filePhoto));
            

//             // Redirect to 'viewTable.html'
//             window.location.href = 'viewTable.html';
//         } else {
//             alert(`Error: ${userLoginData.message}`);
//         }
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         alert('Error fetching user data');
//     }
// };

// document.addEventListener('DOMContentLoaded', () => {
//     // Retrieve user data from localStorage
//     // const userData = JSON.parse(localStorage.getItem('userData'));
//     const userName=JSON.parse(localStorage.getItem('userName'));
//     const userPhoto=JSON.parse(localStorage.getItem('userPhoto'));
//     console.log("userka data",userName,"userki file",userPhoto)

//     if (userData) {
//         // Update the username cell
//         // const usernameCell = document.getElementById('usernameCell');
//         const userActualName= document.getElementById('nameCell')
//         const userUploadedFile= document.getElementById('photoCell')
//         if ( userActualName && userUploadedFile) {
//             // usernameCell.textContent = userData.userName;
//             userActualName.textContent=userName;
//             userUploadedFile.innerHTML=`<img src="${userPhoto}"  style="width:50px;height:50px;">`
//         } else {
//             console.error("Element with id 'usernameCell' not found.");
//         }
//     } else {
//         console.error('User data not found in localStorage.');
//     }
// });
































////////////////////////////////////////////////////////////////////////////////////////////
// const showUserApi = "http://localhost:3000/admin/fetchUserData";
// // let fileName;
// // let filePhoto;
// const apiShowUser = async (userLoginCredential) => {
//     try {
//         const response = await fetch(showUserApi, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(userLoginCredential),
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const userLoginData = await response.json();
//         console.log("userLoginData",userLoginData)
//         // const fileId=userLogin.userData;
//         // console.log("fileki ids",fileId);

//         return userLoginData;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return { success: false, message: 'Error fetching data' };
//     }
// };

// // ... (your existing code)
// // ... (your existing code)

// const showUserStatus = async (event) => {
//     event.preventDefault();
//     const userIdLogin = document.getElementById('userLoginId').value;
//     // const passwordLogin = document.getElementById('usersID1').value;


//     console.log("datassssss =>", userIdLogin);

//     const userLoginCredential = {
//         "userId": userIdLogin,
//     };

//     try {
//         const userLoginData = await apiViewUser(userLoginCredential);
//         const filesData=userLoginData.userData;
        
//         const fileName=filesData.files[0].name;
//         const filePhoto=filesData.files[0].photo;
//         const fileId=filesData.files[0]._id;


//         localStorage.setItem('fileid', fileId);
//         console.log("id",fileId)
//         console.log("name",fileName)
//         console.log("photo ",filePhoto)





//         // console.log("user ka sb data=> ",filesData,fileName,filePhoto)
//         if (userLoginData.success) {
//             alert("User data fetched successfully");
//             showUserName = userLoginData.userData.userName;
//             console.log("User details:", showUserName);

//             // Store user data in localStorage
//             localStorage.setItem('userData', JSON.stringify(userLoginData.userData));
//             localStorage.setItem('userName',JSON.stringify(fileName));
//             localStorage.setItem('userPhoto',JSON.stringify(filePhoto));
            

//             // Redirect to 'viewTable.html'
//             // window.location.href = 'viewTable.html';
//         } else {
//             alert(`Error: ${userLoginData.message}`);
//         }
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         alert('Error fetching user data');
//     }
// };

// // document.addEventListener('DOMContentLoaded', () => {
// //     // Retrieve user data from localStorage
// //     const userData = JSON.parse(localStorage.getItem('userData'));
// //     const userName=JSON.parse(localStorage.getItem('userName'));
// //     const userPhoto=JSON.parse(localStorage.getItem('userPhoto'));
// //     console.log("userka data",userName,"userki file",userPhoto)

// //     if (userData) {
// //         // Update the username cell
// //         const usernameCell = document.getElementById('usernameCell');
// //         const userActualName= document.getElementById('nameCell')
// //         const userUploadedFile= document.getElementById('photoCell')
// //         if (usernameCell && userActualName && userUploadedFile) {
// //             usernameCell.textContent = userData.userName;
// //             userActualName.textContent=userName;
// //             userUploadedFile.innerHTML=`<img src="${userPhoto}"  style="width:50px;height:50px;">`
// //         } else {
// //             console.error("Element with id 'usernameCell' not found.");
// //         }
// //     } else {
// //         console.error('User data not found in localStorage.');
// //     }
// // });




