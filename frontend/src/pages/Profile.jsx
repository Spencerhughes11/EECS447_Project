import React, {useState, useEffect} from 'react';
import {Container, Input} from 'reactstrap';
// import './Profile.css'
import ReactRoundedImage from "react-rounded-image"
import Image from "../images/basketball.svg"

export default function Profile() {
    let user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : '';
    let username = user.username;
    let firstName = user.first;
    let lastName = user.last;
    let favorites = sessionStorage.getItem('favorites')  ? sessionStorage.getItem('favorites') : '';
  
    const [image, setImage] = useState(null);

    useEffect(() => {
        const storedImage = sessionStorage.getItem('profilePic');
        if (storedImage) {
            setImage(storedImage);
          }
      }, [image]); // This tells React to call this effect whenever `image` changes
      
      const handleImageChange = (event) => {
        const selectedImage = URL.createObjectURL(event.target.files[0]);
        setImage(selectedImage);
        sessionStorage.setItem('profilePic', selectedImage);

      };
    return (
<Container className='d-flex w-50 h-75 bg-white rounded raised mt-5 justify-content-center align-items-center'>
    <Container className='p-3 '>
        <h1>Profile</h1> 
         <hr/>
        <Container className='p-3 text-start d-flex justify-content-center'>
            
            {image ? 
            <ReactRoundedImage image={Image} /> : <></>}
        </Container>
            {/* {!image ? */}
            <div>
                <input className='w-25'
                type="file"
                id="image"
                accept='image/*'
                onChange={handleImageChange}
                />
            </div> 
        <Container>


                    <h4>Username: <code>{username}</code></h4>
                    <br/>
                    <h4>Name: <code>{firstName} {lastName}</code> </h4><br/>
                    <h4>Favorite Teams: <code></code></h4><br/>
                    <h4>Favorite Players: <code>{favorites}</code></h4><br/>
                </Container>
            </Container>
        </Container>
    );
}

